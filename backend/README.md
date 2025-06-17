# LazyWrite Backend – Render Deployment Guide

This guide will walk you through deploying the LazyWrite backend to a scalable environment on **Render**. This approach is developer-friendly and ensures you **do not need to run any AI models on your own PC.**

## 🚀 Deploy to Render

### 1. Prerequisites
- A Render account.
- A GitHub account.
- Your project pushed to a GitHub repository.

### 2. Create a "Blueprint" Service on Render
Render's "Blueprint" feature will read our `render.yaml` file and automatically configure everything for us.

- Go to the [Render Dashboard](https://dashboard.render.com/).
- Click **"New +"** and select **"Blueprint"**.
- Connect your GitHub account and select your `LazyWrite` repository.
- Render will automatically detect the `render.yaml` file and show you the services it will create (`lazywrite-backend`).
- Click **"Apply"**.

### 3. Add Your Stripe Secret Key
Your service will start deploying, but we need to give it the secret key for payments.

- In your Render dashboard, navigate to the **"Environment"** tab for your `lazywrite-backend` service.
- Click **"Add Secret File"**.
- For the filename, enter `.env`.
- In the contents box, paste the following, replacing the value with your **new, secure** Stripe secret key:
  ```
  STRIPE_SECRET_KEY=sk_test_...
  ```
- Click **"Save Changes"**. This will trigger a new deploy with the secret key included.

### 4. Update Your Frontend
- Once the deployment is complete, Render will provide you with a public URL for your backend (e.g., `https://lazywrite-backend.onrender.com`).
- In your frontend code, open the `.env.local` file.
- Change the `VITE_API_URL` to your new Render URL.
- Deploy your frontend to a service like Vercel or Netlify.

### How It Works:
- **`render.yaml`:** This file defines all your infrastructure. It tells Render to use a high-performance instance for the backend and to attach a 10GB persistent disk at `/var/data/lazywrite`.
- **Persistent Disk:** All user profiles and generated images are saved to this disk, so they are never lost, even when the server restarts.
- **Serverless:** There are no servers for you to manage. Render handles all the infrastructure, scaling, and maintenance.

---

**Congratulations! Your application is now fully configured for a simple and powerful deployment on Render.** 