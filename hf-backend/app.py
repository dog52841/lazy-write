import torch
from diffusers import StableDiffusionPipeline
from PIL import Image
from typing import List, Dict, Any
import os
import time
import io

from fastapi import FastAPI, HTTPException, Body
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

# Import IP-Adapter for style conditioning
# Note: The 'ip_adapter' library needs to be in the execution path or installed.
from ip_adapter.ip_adapter import IPAdapter

# --- AI Model Setup ---
# This section runs once when the Hugging Face Space starts up.

print("AI Service: Loading Stable Diffusion model...")
base_model_path = "runwayml/stable-diffusion-v1-5"
# Use float32 on CPU, as float16 is not well-supported
pipe = StableDiffusionPipeline.from_pretrained(base_model_path, torch_dtype=torch.float32)

print("AI Service: Loading IP-Adapter for style conditioning...")
ip_model_path = "h94/ip-adapter_sd15"
# Explicitly set the device to CPU
ip_model = IPAdapter(pipe, ip_model_path, device="cpu")
print("AI Service: AI models loaded successfully on CPU.")

# --- FastAPI Application ---
app = FastAPI()

# --- Pydantic Models for Request Body ---
class GenerationRequest(BaseModel):
    style_profile: Dict[str, Any]
    prompt: str
    is_premium: bool = False

# --- API Endpoints ---

@app.get("/health")
def health_check():
    """A simple health check endpoint."""
    return {"status": "ok", "message": "AI Service is running."}

@app.post("/generate")
async def generate_handwriting(request: GenerationRequest = Body(...)):
    """
    Generates a handwriting image using the loaded AI model, conditioned on a style embedding.
    """
    print("AI Service: Received request for handwriting generation.")
    
    style_embedding_list = request.style_profile.get("style_embedding")
    if not style_embedding_list:
        print("AI Service: Error - Style embedding not found in profile.")
        raise HTTPException(status_code=400, detail="Style embedding not found in profile.")
        
    # Convert the style embedding back to a torch tensor for the CPU
    style_embedding = torch.tensor([style_embedding_list], device="cpu", dtype=torch.float32)

    negative_prompt = "blurry, distorted, malformed, text overlay, watermark, signature, messy, low-resolution, discolored, cropped, cut-off"
    
    if request.is_premium:
        print("AI Service: Using premium settings.")
        num_inference_steps = 50 # More steps for higher quality
        scale = 0.75
        full_prompt = f"A high-resolution, centered scan of a handwritten note on a clean sheet of white paper. The text is neatly written in a single column. The note says: '{request.prompt}'"
    else:
        print("AI Service: Using standard settings.")
        num_inference_steps = 30 # Fewer steps for faster generation
        scale = 0.6
        full_prompt = f"A clear photo of the following text written on paper: '{request.prompt}'"
        
    try:
        print("AI Service: Starting image generation... This may take a few minutes on CPU.")
        start_time = time.time()
        
        images = ip_model.generate(
            prompt=full_prompt,
            negative_prompt=negative_prompt,
            image_embeds=style_embedding,
            num_samples=1,
            num_inference_steps=num_inference_steps,
            scale=scale
        )
        
        end_time = time.time()
        print(f"AI Service: Image generation complete. Time taken: {end_time - start_time:.2f} seconds.")
        
        # Get the first (and only) generated image
        image: Image.Image = images[0]
        
        # Save the image to an in-memory buffer
        buffer = io.BytesIO()
        image.save(buffer, format="PNG")
        buffer.seek(0)
        
        # Return the image as a streaming response
        return StreamingResponse(buffer, media_type="image/png")
        
    except Exception as e:
        print(f"AI Service: An error occurred during image generation: {e}")
        raise HTTPException(status_code=500, detail=f"An error occurred during image generation: {e}") 