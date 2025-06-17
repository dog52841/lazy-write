from PIL import Image
from typing import List
import time
import random
import torch
from diffusers import StableDiffusionPipeline
import os
import numpy as np
from transformers import ViTImageProcessor, ViTModel
from ip_adapter.ip_adapter import IPAdapter

# --- AI Model Setup ---

# Style Analysis Model (Vision Transformer)
print("AI Engine: Loading Style Analysis model (ViT)...")
style_processor = ViTImageProcessor.from_pretrained('google/vit-base-patch16-224-in21k')
style_model = ViTModel.from_pretrained('google/vit-base-patch16-224-in21k')
if torch.cuda.is_available():
    style_model = style_model.to("cuda")
    print("AI Engine: Style model moved to GPU.")
else:
    print("AI Engine: Style model using CPU.")


# Generation Model (Stable Diffusion)
print("AI Engine: Loading Stable Diffusion model...")
base_model_path = "runwayml/stable-diffusion-v1-5"
pipe = StableDiffusionPipeline.from_pretrained(base_model_path, torch_dtype=torch.float16)

# IP-Adapter for Style Transfer
print("AI Engine: Loading IP-Adapter for style conditioning...")
ip_model_path = "h94/ip-adapter_sd15"
ip_model = IPAdapter(pipe, ip_model_path, device="cuda" if torch.cuda.is_available() else "cpu")
print("AI Engine: IP-Adapter loaded and integrated.")


GENERATED_IMAGES_DIR = "generated_images"
os.makedirs(GENERATED_IMAGES_DIR, exist_ok=True)

def analyze_style_from_images(image_paths: List[str]):
    """
    Analyzes handwriting sample images to extract a feature-based style profile.
    
    This function uses a pre-trained Vision Transformer (ViT) to create a
    numerical embedding that represents the visual style of the handwriting.
    """
    print(f"AI Engine: Starting REAL style analysis on {len(image_paths)} images...")
    
    try:
        images = [Image.open(path).convert("RGB") for path in image_paths]
        
        # Preprocess the images
        inputs = style_processor(images=images, return_tensors="pt")
        if torch.cuda.is_available():
            inputs = {k: v.to("cuda") for k, v in inputs.items()}

        # Get the embeddings from the model
        with torch.no_grad():
            outputs = style_model(**inputs)
        
        # The pooler_output is a summary of the image's features
        embeddings = outputs.pooler_output
        
        # Average the embeddings to get a single style vector
        # Move to CPU for numpy conversion
        avg_embedding = torch.mean(embeddings, dim=0).cpu().numpy()
        
        # The style profile now contains the raw embedding, which is all the generator needs.
        style_profile = {
            "style_embedding": avg_embedding.tolist(),
            "version": "1.1-ip-adapter-ready",
        }
        
        print("AI Engine: Real analysis complete. Generated style embedding.")
        return style_profile

    except Exception as e:
        print(f"AI Engine: An error occurred during style analysis: {e}")
        return None

def generate_handwriting_from_style(style_profile: dict, prompt: str, is_premium: bool = False):
    """
    Generates a handwriting image using a real AI model, conditioned on a style embedding.
    """
    print("AI Engine: Starting REAL handwriting generation with IP-Adapter...")
    
    style_embedding_list = style_profile.get("style_embedding")
    if not style_embedding_list:
        print("AI Engine: Error - Style embedding not found in profile.")
        return None
        
    # Convert the style embedding back to a torch tensor
    style_embedding = torch.tensor([style_embedding_list], device=ip_model.device)

    # --- Advanced Prompt Engineering for Layout Control ---
    # Create a more detailed "negative prompt" to guide the AI away from undesirable traits.
    negative_prompt = "blurry, distorted, malformed, text overlay, watermark, signature, messy, low-resolution, discolored, cropped, cut-off"
    
    # Set different parameters for free vs. premium
    if is_premium:
        print("AI Engine: Using premium settings (higher quality, more steps, better layout).")
        num_inference_steps = 50
        scale = 0.75 # Higher scale means more style influence
        # A more detailed prompt for premium users to encourage better layout
        full_prompt = f"A high-resolution, centered scan of a handwritten note on a clean sheet of white paper. The text is neatly written in a single column. The note says: '{prompt}'"
    else:
        print("AI Engine: Using standard settings.")
        num_inference_steps = 30
        scale = 0.6
        # A simpler prompt for standard users
        full_prompt = f"A clear photo of the following text written on paper: '{prompt}'"
        
    # Generate the image using the IP-Adapter
    try:
        images = ip_model.generate(
            prompt=full_prompt,
            negative_prompt=negative_prompt,
            pil_image=None, # We are providing embeddings directly
            image_embeds=style_embedding,
            num_samples=1,
            num_inference_steps=num_inference_steps,
            scale=scale
        )
        
        # Save the image locally
        # NOTE: This saves the file to the server's temporary, non-persistent disk.
        # This is a necessary step as the uploader library requires a file path.
        # This file is immediately deleted after being uploaded to S3 in main.py.
        # This is safe and standard practice for serverless environments.
        timestamp = int(time.time())
        filename = f"generated_{timestamp}.png"
        
        # Ensure the AI engine saves to the correct persistent data directory
        data_dir = os.environ.get("RENDER_DATA_DIR", "/var/data/lazywrite")
        images_dir = os.path.join(data_dir, "generated_images")
        os.makedirs(images_dir, exist_ok=True) # Ensure the directory exists
        image_path = os.path.join(images_dir, filename)
        
        images[0].save(image_path)
        
        print(f"AI Engine: Handwriting generation complete. Image saved to persistent disk at {image_path}")
        return image_path
        
    except Exception as e:
        print(f"AI Engine: An error occurred during image generation: {e}")
        return None 