# ✅ Netlify Deployment Checklist
## Data Science Digital Lab Manual - Quick Reference

---

## Before You Deploy

- [x] Build command works: `npm run build` ✅
- [x] Output directory configured: `dist` ✅
- [x] Environment variables documented in `.env.example` ✅
- [x] `.gitignore` includes `.env` ✅
- [x] No hardcoded localhost URLs ✅
- [x] `netlify.toml` configured ✅
- [x] `_redirects` file created for SPA routing ✅
- [x] Supabase client properly uses environment variables ✅

---

## Deploy Steps (Quick)

### 1. Push to Git Repository
```bash
git add .
git commit -m "Ready for Netlify deployment"
git push origin main
```

### 2. Deploy on Netlify Dashboard
1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect your Git repository
4. **IMPORTANT:** Add environment variables before deploying:
   - Copy values from your local `.env` file
   - Add them in "Advanced build settings"
5. Click "Deploy site"

### 3. Get Your HTTPS URL
- Wait 2-5 minutes for build to complete
- Your site will be live at: `https://[random-name].netlify.app`
- Customize the subdomain in Site settings

---

## Required Environment Variables

Copy these from your local `.env` file to Netlify:

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_INSTITUTION_NAME
VITE_SCHOOL_NAME
VITE_DEPARTMENT
VITE_SUBJECT_CODE
VITE_SUBJECT_NAME
VITE_YEAR_SEMESTER
VITE_INSTRUCTOR_NAME
VITE_ACADEMIC_YEAR
VITE_CONTACT_HOURS
VITE_PREREQUISITE
VITE_BATCH
```

⚠️ **Critical:** Without Supabase credentials, authentication and data loading will not work!

---

## After Deployment - Test These

- [ ] Homepage loads
- [ ] Login page works
- [ ] Signup page works
- [ ] Dashboard loads
- [ ] Experiments list displays (from Supabase)
- [ ] Course overview shows all modules
- [ ] Resources page loads
- [ ] Navigation between pages works
- [ ] Direct URL access works (e.g., `/dashboard/experiments`)
- [ ] MBU logo displays
- [ ] Mobile view works

---

## Troubleshooting Quick Fixes

**Build fails?**
→ Check environment variables are added

**404 on page refresh?**
→ Already fixed with `_redirects` file ✅

**Supabase connection fails?**
→ Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct

**Assets don't load?**
→ Check browser console, verify build output in `dist/`

---

## Need More Details?

See **NETLIFY_DEPLOYMENT_GUIDE.md** for:
- Detailed step-by-step instructions
- Custom domain setup
- CLI deployment method
- Advanced troubleshooting
- Performance optimization

---

**🚀 You're ready to deploy!**

Estimated deployment time: **5-10 minutes**
