# LazyWrite Final Deployment Guide (Replicate + Render)

This guide walks you through deploying the entire LazyWrite application. The architecture is split into two services for maximum performance and cost-efficiency:

1.  **AI Backend (on Replicate):** A powerful, serverless GPU service that runs the large AI model for fast image generation. You only pay for the seconds the model is running, and you get a generous free tier.
2.  **Main Backend (on Render):** A lightweight service for user management, payments, and file storage. Runs on a **Free Tier** plan.

---

## Part 1: Deploy the AI Backend to Replicate

First, we'll deploy the GPU-powered AI model.

### 1. Install `cog`
`cog` is Replicate's command-line tool for packaging and deploying models. Install it on your local machine:
```bash
sudo curl -o /usr/local/bin/cog -L "https://github.com/replicate/cog/releases/latest/download/cog_$(uname -s)_$(uname -m)"
sudo chmod +x /usr/local/bin/cog
```
*(For Windows, you may need to use WSL or another method.)*

### 2. Create a Replicate Account & Get API Token
- Sign up at [replicate.com](https://replicate.com).
- Go to your **Account Settings** and find your API token.
- Log in to Replicate on your command line:
  ```bash
  cog login
  ```
  Paste your API token when prompted.

### 3. Push the Model to Replicate
- Open your terminal and navigate into the `replicate-backend` directory:
  ```bash
  cd replicate-backend
  ```
- Push the model. Replace `[your-username]` with your Replicate username.
  ```bash
  cog push r8.im/[your-username]/lazywrite-ai
  ```
- This will take a long time (20-40 minutes) as it uploads and builds the large AI model in a container. You can monitor the progress in your terminal.

### 4. Get Your Model Version
- Once the push is complete, go to your model's page on the Replicate dashboard.
- Go to the **"Versions"** tab.
- You will see a long string of characters. This is your unique **Model Version ID**.
- **Copy this ID.** You will need it for the next part.

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
    - **Key:** `REPLICATE_API_TOKEN`, **Value:** (Paste your Replicate API Token here).
    - **Key:** `REPLICATE_MODEL_VERSION`, **Value:** (Paste the Model Version ID you copied from Replicate).

### 5. Deploy
- Click **"Create Web Service"**.
- Render will deploy your main backend.

---

## Part 3: Update and Deploy Your Frontend

1.  **Get Your Render URL:** Once your `lazywrite-backend` on Render is deployed, it will have a public URL like `https://lazywrite-backend.onrender.com`.
2.  **Update `.env.local`:** In your local frontend code, open `src/.env.local` and set `VITE_API_URL` to your new Render URL.
3.  **Deploy:** Push your updated frontend code to GitHub and deploy it on a service like Vercel or Netlify.

**Congratulations! Your application is now deployed on a professional, high-performance, and cost-effective architecture.** 