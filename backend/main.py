from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
import os
import json
from typing import List
import uuid
import stripe

# Import the AI engine
from ai_engine import analyze_style_from_images, generate_handwriting_from_style

# --- Stripe Configuration ---
stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")

# --- Render Disk Configuration ---
# Render provides a persistent disk that we can mount at a specified path.
# We will save all user data to this disk.
# The path '/var/data/lazywrite' will be our persistent storage mount.
DATA_DIR = os.environ.get("RENDER_DATA_DIR", "/var/data/lazywrite")
PROFILES_DIR = os.path.join(DATA_DIR, "profiles")
GENERATED_IMAGES_DIR = os.path.join(DATA_DIR, "generated_images")

# Create directories on the persistent disk if they don't exist
os.makedirs(PROFILES_DIR, exist_ok=True)
os.makedirs(GENERATED_IMAGES_DIR, exist_ok=True)

app = FastAPI()

# Mount the directory to serve generated images
# This allows the frontend to access images directly via a URL
app.mount("/generated_images", StaticFiles(directory=GENERATED_IMAGES_DIR), name="generated_images")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "LazyWrite Backend is running on AWS!"}

@app.get("/health")
def health_check():
    """A simple health check endpoint for the cloud provider to monitor the service."""
    return {"status": "ok"}

@app.post("/api/submit-handwriting")
async def submit_handwriting(
    user_id: str = Form(...),
    alphabet_sample: UploadFile = File(...),
    numbers_sample: UploadFile = File(...),
    symbols_sample: UploadFile = File(...)
):
    """
    Handles handwriting submission, saves samples to a temporary location, 
    triggers analysis, and saves the style profile to a persistent Render Disk.
    """
    request_id = uuid.uuid4()
    print(f"[{request_id}] Starting handwriting submission for user: {user_id}")
    
    # AI engine needs temporary file paths to process images
    import tempfile
    with tempfile.TemporaryDirectory() as temp_dir:
        saved_paths = []
        samples = { "alphabet": alphabet_sample, "numbers": numbers_sample, "symbols": symbols_sample }
        for name, file in samples.items():
            temp_path = os.path.join(temp_dir, f"{request_id}_{file.filename}")
            with open(temp_path, "wb") as buffer:
                buffer.write(await file.read())
            saved_paths.append(temp_path)
        
        print(f"[{request_id}] Temporary files created. Starting AI analysis.")
        style_profile = analyze_style_from_images(saved_paths)

    if not style_profile:
        print(f"[{request_id}] AI analysis failed.")
        raise HTTPException(status_code=500, detail="Could not analyze handwriting style.")

    # Save the style profile to the persistent disk
    profile_path = os.path.join(PROFILES_DIR, f"{user_id}_style.json")
    try:
        print(f"[{request_id}] Saving style profile to persistent disk: {profile_path}")
        with open(profile_path, "w") as f:
            json.dump(style_profile, f, indent=2)
    except Exception as e:
        print(f"[{request_id}] Failed to save profile to disk: {e}")
        raise HTTPException(status_code=500, detail=f"Could not save style profile: {e}")
    
    print(f"[{request_id}] Submission process completed successfully.")
    return {
        "message": "Handwriting style analyzed and saved successfully.",
        "disk_path": profile_path
    }

@app.post("/api/create-checkout-session")
async def create_checkout_session(user_id: str = Form(...), price_id: str = Form(...)):
    """
    Creates a Stripe Checkout session for a user to purchase a subscription.
    """
    request_id = uuid.uuid4()
    print(f"[{request_id}] Creating checkout session for user: {user_id}, price: {price_id}")

    if not stripe.api_key:
        print(f"[{request_id}] FATAL_ERROR: Stripe API key is not configured on the server.")
        raise HTTPException(status_code=500, detail="Payment system is not configured.")

    # In a real app, you would have your domain here. For now, we'll use a placeholder
    # which you can update later when your frontend is deployed.
    YOUR_DOMAIN = os.environ.get("FRONTEND_URL", "http://localhost:5173")

    try:
        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    'price': price_id,
                    'quantity': 1,
                },
            ],
            mode='subscription',
            success_url=YOUR_DOMAIN + '/app?session_id={CHECKOUT_SESSION_ID}',
            cancel_url=YOUR_DOMAIN + '/pricing',
            client_reference_id=user_id # Link the session to our user
        )
        return {"sessionId": checkout_session.id}
    except Exception as e:
        print(f"[{request_id}] Stripe session creation failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate")
async def generate_handwriting(
    user_id: str = Form(...),
    prompt: str = Form(...),
    style: str = Form(...), 
    is_premium: bool = Form(False)
):
    """
    Loads a user's style profile from the persistent Render Disk, generates handwriting,
    and returns a public URL to the generated image.
    """
    request_id = uuid.uuid4()
    print(f"[{request_id}] Starting generation for user: {user_id}, Premium: {is_premium}")
    
    profile_path = os.path.join(PROFILES_DIR, f"{user_id}_style.json")
    try:
        print(f"[{request_id}] Loading style profile from persistent disk: {profile_path}")
        with open(profile_path, "r") as f:
            style_profile = json.load(f)
    except FileNotFoundError:
        print(f"[{request_id}] Profile not found for user.")
        raise HTTPException(status_code=404, detail="Handwriting profile not found. Please submit samples first.")
    except Exception as e:
        print(f"[{request_id}] Failed to load profile from disk: {e}")
        raise HTTPException(status_code=500, detail=f"Could not load style profile: {e}")

    print(f"[{request_id}] Style profile loaded. Starting AI generation.")
    image_path = generate_handwriting_from_style(style_profile, prompt, is_premium)
    
    if not image_path:
        print(f"[{request_id}] AI generation failed.")
        raise HTTPException(status_code=500, detail="AI engine failed to generate image.")

    # The file is already saved on the persistent disk by the AI engine.
    # We just need to construct the public URL.
    # The 'RENDER_EXTERNAL_URL' is automatically provided by Render.
    base_url = os.environ.get("RENDER_EXTERNAL_URL", "http://localhost:8000")
    image_filename = os.path.basename(image_path)
    image_url = f"{base_url}/generated_images/{image_filename}"
    
    print(f"[{request_id}] Generation complete. Returning URL: {image_url}")
    return {"imageUrl": image_url}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port) 