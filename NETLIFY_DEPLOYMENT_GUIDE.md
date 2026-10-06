# Netlify Deployment Guide
## Data Science Digital Lab Manual - Mohan Babu University

This guide will help you deploy your existing Data Science Digital Lab Manual to Netlify with a public HTTPS URL.

---

## ✅ Pre-Deployment Checklist

Your project is now ready for deployment with the following configurations:

- ✅ `.gitignore` updated to exclude `.env` files
- ✅ `netlify.toml` created with build configuration
- ✅ `public/_redirects` created for SPA routing
- ✅ `.env.example` documented with all required variables
- ✅ No hardcoded localhost URLs found
- ✅ Build command verified: `npm run build`
- ✅ Output directory: `dist`

---

## 📋 Deployment Steps

### Step 1: Create a Netlify Account
1. Go to [https://www.netlify.com](https://www.netlify.com)
2. Sign up with your GitHub, GitLab, or Bitbucket account (recommended)
3. Or sign up with email

### Step 2: Push Your Code to Git (if not already done)

If you haven't already pushed your code to a Git repository:

```bash
# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Commit
git commit -m "Prepare for Netlify deployment"

# Add remote (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub/GitLab/Bitbucket
git push -u origin main
```

### Step 3: Deploy to Netlify

#### Option A: Deploy via Netlify Dashboard (Recommended)

1. **Log in to Netlify Dashboard**
   - Go to [https://app.netlify.com](https://app.netlify.com)

2. **Import from Git**
   - Click "Add new site" → "Import an existing project"
   - Choose your Git provider (GitHub/GitLab/Bitbucket)
   - Authorize Netlify to access your repositories
   - Select your `Digital_Lab` repository

3. **Configure Build Settings**
   - Netlify will auto-detect settings from `netlify.toml`, but verify:
     - **Base directory:** (leave empty)
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
     - **Production branch:** `main` (or your default branch)

4. **Add Environment Variables**
   - Before deploying, click "Show advanced"
   - Click "New variable" and add each variable from your `.env` file:

   ```
   VITE_SUPABASE_URL = your_actual_supabase_url
   VITE_SUPABASE_ANON_KEY = your_actual_supabase_anon_key
   VITE_INSTITUTION_NAME = Mohan Babu University
   VITE_SCHOOL_NAME = School of Computing
   VITE_DEPARTMENT = Data Science
   VITE_SUBJECT_CODE = 22DS102006
   VITE_SUBJECT_NAME = DATA SCIENCE
   VITE_YEAR_SEMESTER = III Year II Semester
   VITE_INSTRUCTOR_NAME = S. Bosubabu
   VITE_ACADEMIC_YEAR = 2025-2026
   VITE_CONTACT_HOURS = 45
   VITE_PREREQUISITE = Python Programming
   VITE_BATCH = 2028
   ```

   ⚠️ **IMPORTANT:** Copy the actual values from your local `.env` file, especially the Supabase credentials.

5. **Deploy Site**
   - Click "Deploy site"
   - Netlify will clone your repository, install dependencies, and build
   - Wait for the build to complete (usually 2-5 minutes)

6. **Your Site is Live! 🎉**
   - You'll get a random URL like: `https://random-name-123456.netlify.app`
   - Click "Open production deploy" to view your site

#### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize Netlify (from project root)
netlify init

# Follow the prompts:
# - Create & configure a new site
# - Choose your team
# - Site name: data-science-digital-lab (or your preferred name)
# - Build command: npm run build
# - Publish directory: dist

# Add environment variables
netlify env:set VITE_SUPABASE_URL "your_actual_supabase_url"
netlify env:set VITE_SUPABASE_ANON_KEY "your_actual_supabase_anon_key"
netlify env:set VITE_INSTITUTION_NAME "Mohan Babu University"
# ... add all other variables

# Deploy to production
netlify deploy --prod
```

---

## 🎨 Customize Your Domain

### Option 1: Use Netlify Subdomain (Free)

1. Go to **Site settings** → **Domain management**
2. Click "Options" → "Edit site name"
3. Change from `random-name-123456` to:
   - `data-science-digital-lab`
   - `mbu-data-science-lab`
   - `ds-digital-lab-mbu`
4. Your new URL: `https://YOUR-SITE-NAME.netlify.app`

### Option 2: Use Custom Domain (Optional)

If you have a custom domain (e.g., `ds-lab.mbuniversity.edu.in`):

1. Go to **Domain management** → "Add custom domain"
2. Enter your domain name
3. Follow Netlify's DNS configuration instructions
4. Wait for SSL certificate to be provisioned automatically

---

## 🔄 Continuous Deployment

Your site is now set up for automatic deployments:

- **Every push to main branch** → Automatic production deployment
- **Pull requests** → Automatic deploy previews
- **Branch deploys** → Optional: deploy other branches automatically

You can view all deployments in: **Deploys** tab

---

## 🔐 Environment Variables Management

To update environment variables after deployment:

### Via Dashboard:
1. Go to **Site settings** → **Environment variables**
2. Click "Add variable" or edit existing ones
3. Click "Save"
4. Trigger a new deploy for changes to take effect

### Via CLI:
```bash
netlify env:set VARIABLE_NAME "new_value"
netlify deploy --prod
```

---

## 🧪 Testing Your Deployment

After deployment, verify:

1. **Homepage loads:** Visit your Netlify URL
2. **Navigation works:** Click through all pages
3. **Authentication works:** Try login/signup (with Supabase)
4. **React Router works:** Navigate directly to `/dashboard/experiments`
5. **Assets load:** Check if MBU logo and images display correctly
6. **Data loads:** Verify experiments list loads from Supabase

---

## 🐛 Troubleshooting

### Build Fails

**Check build logs:**
- Go to **Deploys** → Click failed deploy → View "Deploy log"

**Common issues:**
- Missing environment variables → Add them in Site settings
- Node version mismatch → Update `NODE_VERSION` in `netlify.toml`
- Dependency issues → Check `package.json` and lock file

### Site Shows 404 on Refresh

**Solution:** Already handled! The `_redirects` file and `netlify.toml` redirect all routes to `index.html`

**Verify:**
- Check if `public/_redirects` exists
- Check if `netlify.toml` has the `[[redirects]]` section

### Supabase Connection Issues

**Symptoms:** Login fails, data doesn't load

**Solutions:**
1. Verify environment variables in Netlify dashboard
2. Check Supabase URL and key are correct (copy from Supabase dashboard)
3. Ensure Supabase project is active (not paused)
4. Check browser console for specific errors

### Assets Not Loading

**Check:**
- Verify `dist/assets/` folder contains all images
- Check if Vite's base path is correct
- Look for 404 errors in browser Network tab

---

## 📊 Monitoring & Analytics

### Netlify Analytics (Optional - Paid)
- Enable in **Site settings** → **Analytics**
- Get server-side analytics without JavaScript

### Third-Party Analytics (Free)
- Add Google Analytics, Plausible, or Umami
- Add tracking script to `index.html`

---

## 🚀 Performance Optimization

Your site already includes:
- ✅ Static asset caching (31536000 seconds / 1 year)
- ✅ Security headers (X-Frame-Options, CSP, etc.)
- ✅ Automatic HTTPS with SSL certificate
- ✅ Global CDN distribution
- ✅ Automatic asset optimization

### Optional Improvements:
- Enable **Asset optimization** in Site settings (minify JS/CSS)
- Enable **Image optimization** (requires Netlify Pro)
- Add **Lighthouse CI** for performance monitoring

---

## 📞 Support Resources

- **Netlify Docs:** [https://docs.netlify.com](https://docs.netlify.com)
- **Netlify Support:** [https://answers.netlify.com](https://answers.netlify.com)
- **Vite Deployment Docs:** [https://vitejs.dev/guide/static-deploy.html#netlify](https://vitejs.dev/guide/static-deploy.html#netlify)
- **Supabase Docs:** [https://supabase.com/docs](https://supabase.com/docs)

---

## ✅ Post-Deployment Checklist

After successful deployment:

- [ ] Site accessible at HTTPS URL
- [ ] All pages load correctly
- [ ] React Router navigation works
- [ ] Login/signup functionality works
- [ ] Experiments load from Supabase
- [ ] Resources page displays correctly
- [ ] Course overview shows all modules
- [ ] Mobile responsive design works
- [ ] MBU branding displays correctly
- [ ] SSL certificate is active (green padlock in browser)

---

## 🎓 Your Expected URL

Based on your project, you can get:

**Netlify subdomain:**
- `https://data-science-digital-lab.netlify.app`
- `https://mbu-ds-lab.netlify.app`
- `https://mohan-babu-data-science.netlify.app`

**Custom domain** (if purchased):
- `https://dslab.mbuniversity.edu.in`
- `https://datalab.mbu.ac.in`

---

## 📝 Quick Command Reference

```bash
# Local development
npm run dev

# Production build (test locally)
npm run build

# Preview production build locally
npm run preview

# Deploy via CLI
netlify deploy --prod

# View deploy status
netlify status

# Open Netlify dashboard
netlify open

# View environment variables
netlify env:list

# View site URL
netlify open:site
```

---

**Deployment prepared by:** Kiro AI
**Date:** October 5, 2026
**Project:** Data Science Digital Lab Manual
**Institution:** Mohan Babu University - School of Computing
**Course:** DATA SCIENCE (22DS102006)
**Instructor:** S. Bosubabu

---

## 🎉 Ready to Deploy!

Your project is fully configured and ready for Netlify deployment. Follow the steps above to get your public HTTPS URL within minutes!
