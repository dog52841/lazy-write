# LazyWrite Deployment Guide

This guide will walk you through deploying the entire LazyWrite application. The architecture is split into two main services to keep costs at **$0/month**:

1.  **Main Backend (on Render):** A lightweight service for user management, payments, and file storage. Runs on a **Free Tier** plan.
2.  **AI Backend (on Hugging Face):** A powerful service that runs the large AI models for image generation. Runs on a **Free** community Space.

---

## Part 1: Deploy the AI Backend to Hugging Face Spaces

First, we'll deploy the AI factory.

### 1. Create a Hugging Face Account
- If you don't have one, sign up at [huggingface.co](https://huggingface.co).

### 2. Create a New Space
- In the top menu, click **"Spaces"** and then **"Create new Space"**.
- **Owner:** Select yourself.
- **Space name:** `lazywrite-ai-service` (or a name of your choice).
- **License:** `mit`
- **Select the Space SDK:** Choose **"Docker"** and then **"Choose a file"**. This will let you configure it manually. *Even though we are not using a full Dockerfile, this setup gives us the most control.*
- **Space hardware:** Select the **"CPU basic - FREE"** option. This gives you 16GB of RAM.
- Click **"Create Space"**.

### 3. Upload Your AI Backend Files
- Your new Space is essentially a Git repository.
- Go to the **"Files and versions"** tab in your Space.
- Click **"Add file"** and then **"Upload files"**.
- Upload the two files from your local `hf-backend` directory:
    - `app.py`
    - `requirements.txt`
- This will trigger the build process. You can view the logs in the **"Logs"** tab. It will take a while (15-30 minutes) to install all the libraries for the first time.

### 4. Get Your Space URL
- Once the build is successful and the app is running, your Space will have a public URL like:
  `https://[your-username]-lazywrite-ai-service.hf.space`
- **Copy this URL.** You will need it for the next part.

---

## Part 2: Deploy the Main Backend to Render

Now, we'll deploy the main application server.

### 1. Create a New Web Service on Render
- Go to the [Render Dashboard](https://dashboard.render.com/).
- Click **"New +"** and select **"Web Service"**.
- Connect your GitHub repository.

### 2. Configure the Web Service
- **Name:** `lazywrite-backend`
- **Root Directory:** `backend`
- **Runtime:** `Python 3`
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `uvicorn main:app --host 0.0.0.0 --port 8000`
- **Instance Type:** **Free**

### 3. Add a Persistent Disk
- Scroll to the "Advanced" section and click **"Add Disk"**.
- **Name:** `lazywrite-data`
- **Mount Path:** `/var/data/lazywrite`
- **Size:** `1` GB (The Free plan includes 1GB of disk space).

### 4. Add Environment Variables
- In the "Advanced" section, go to the **"Environment"** tab for your service.
- **Add a Secret File**:
    - **Filename:** `.env`
    - **Contents:** `STRIPE_SECRET_KEY=sk_test_...` (paste your real secret key here).
- **Add Environment Variables**:
    - **Key:** `PYTHON_VERSION`, **Value:** `3.9.18`
    - **Key:** `RENDER_DATA_DIR`, **Value:** `/var/data/lazywrite`
    - **Key:** `HF_SPACE_URL`, **Value:** (Paste the URL of your Hugging Face Space here).

### 5. Deploy
- Click **"Create Web Service"**.
- Render will deploy your main backend.

---

## Part 3: Update and Deploy Your Frontend

1.  **Get Your Render URL:** Once your `lazywrite-backend` on Render is deployed, it will have a public URL like `https://lazywrite-backend.onrender.com`.
2.  **Update `.env.local`:** In your local frontend code, open `src/.env.local` and set `VITE_API_URL` to your new Render URL.
3.  **Deploy:** Push your updated frontend code to GitHub and deploy it on a service like Vercel or Netlify.

**Congratulations! Your entire application is now deployed and running for free.** 