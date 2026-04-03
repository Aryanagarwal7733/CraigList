# 🚀 Deployment Guide: Making Your Craigslist Clone Live

Now that the code is synchronized with your [GitHub repository](https://github.com/Aryanagarwal7733/CraigList.git), follow these steps to deploy it to the world!

---

## 1. 📂 Setup Your Cloud Database (MongoDB Atlas)
Since your local database isn't accessible from the internet, you need a cloud-hosted one.
1.  **Create an Account**: Go to [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database) and sign up for a free "M0" tier cluster.
2.  **Allow Access**: In the "Network Access" tab, click **Add IP Address** and select **Allow Access From Anywhere (0.0.0.0/0)**.
3.  **Create a User**: In the "Database Access" tab, create a new user with a **Username** and **Password**.
4.  **Get Connection String**: Go to "Database" -> "Connect" -> "Drivers" -> **Copy the URI string**.
    *   *Example:* `mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`

---

## 2. 🛡️ Deploy the Backend (Vercel)
1.  **Vercel Dashboard**: Log in to [Vercel](https://vercel.com/dashboard) and click **Add New...** -> **Project**.
2.  **Import GitHub Repository**: Search for `Aryanagarwal7733/CraigList` and click **Import**.
3.  **Configure Backend**:
    *   **Project Name**: `craiglist-backend`
    *   **Root Directory**: Click "Edit" and select the **`backend`** folder.
    *   **Framework Preset**: Select **Other**.
4.  **Add Environment Variables**:
    *   `MONGO_URI`: (Paste your MongoDB Atlas connection string from step 1).
    *   `JWT_SECRET`: (Type a random long string for security).
    *   `NODE_ENV`: `production`
5.  **Deploy**: Click **Deploy**.
6.  **Copy URL**: Once it's done, **Copy the published URL** (e.g., `https://craiglist-backend.vercel.app`).

---

## 3. 🖼️ Deploy the Frontend (Vercel)
1.  **Vercel Dashboard**: Go back to the dashboard and click **Add New...** -> **Project** again.
2.  **Import GitHub Repository**: Import the **same** `Aryanagarwal7733/CraigList` repository.
3.  **Configure Frontend**:
    *   **Project Name**: `craiglist-frontend`
    *   **Root Directory**: Click "Edit" and select the **`frontend`** folder.
    *   **Framework Preset**: Select **Vite**.
4.  **Add Environment Variable**:
    *   `VITE_API_BASE_URL`: (Paste the Backend URL you copied from Step 2).
5.  **Deploy**: Click **Deploy**.

---

## 🎉 You're Live!
Your modern MERN Craigslist clone is now accessible via the **Frontend's Vercel URL**.

> [!TIP]
> If you add more features to your local code, simply `git push` them to your main branch, and Vercel will automatically redeploy both the frontend and backend for you! !🚀
