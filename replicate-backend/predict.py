from cog import BasePredictor, Input, Path, Json
import torch
from diffusers import StableDiffusionPipeline
from PIL import Image
import json
import time
import os

# We need to import the IPAdapter class from the ip_adapter library
from ip_adapter.ip_adapter import IPAdapter

class Predictor(BasePredictor):
    def setup(self):
        """
        This method is called once when the model is loaded into memory.
        It sets up the AI models and loads them onto the GPU.
        """
        print("Loading Stable Diffusion model...")
        self.base_model_path = "runwayml/stable-diffusion-v1-5"
        
        # The model will be loaded onto the GPU
        self.pipe = StableDiffusionPipeline.from_pretrained(
            self.base_model_path,
            torch_dtype=torch.float16,
            safety_checker=None # To reduce memory usage
        )

        print("Loading IP-Adapter for style conditioning...")
        self.ip_model_path = "h94/ip-adapter_sd15"
        self.ip_model = IPAdapter(self.pipe, self.ip_model_path, device="cuda")
        print("AI models loaded successfully onto GPU.")

    def predict(
        self,
        prompt: str = Input(description="The text to be converted to handwriting."),
        style_profile: Json = Input(description="A JSON object containing the user's style embedding."),
        is_premium: bool = Input(description="Flag for premium quality generation.", default=False)
    ) -> Path:
        """
        This method is called for each prediction request.
        It generates the handwriting image based on the provided inputs.
        """
        print("Received prediction request.")
        
        style_embedding_list = style_profile.get("style_embedding")
        if not style_embedding_list:
            raise ValueError("Style embedding not found in the provided style profile.")
            
        # Convert the style embedding back to a torch tensor on the GPU
        style_embedding = torch.tensor([style_embedding_list], device="cuda", dtype=torch.float16)

        negative_prompt = "blurry, distorted, malformed, text overlay, watermark, signature, messy, low-resolution, discolored, cropped, cut-off"
        
        if is_premium:
            print("Using premium settings.")
            num_inference_steps = 30
            scale = 0.7
            full_prompt = f"A high-resolution, centered scan of a handwritten note on a clean sheet of white paper. The text is neatly written in a single column. The note says: '{prompt}'"
        else:
            print("Using standard settings.")
            num_inference_steps = 25
            scale = 0.6
            full_prompt = f"A clear photo of the following text written on paper: '{prompt}'"
            
        print("Starting image generation on GPU...")
        start_time = time.time()
        
        # Generate the image using the IP-Adapter
        images = self.ip_model.generate(
            prompt=full_prompt,
            negative_prompt=negative_prompt,
            image_embeds=style_embedding,
            num_samples=1,
            num_inference_steps=num_inference_steps,
            scale=scale
        )
        
        end_time = time.time()
        print(f"Image generation complete. Time taken: {end_time - start_time:.2f} seconds.")
        
        # Save the generated image to a temporary file path
        output_path = "/tmp/output.png"
        images[0].save(output_path)
        
        # Return the path to the saved image. Replicate will handle uploading it.
        return Path(output_path) 