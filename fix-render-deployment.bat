@echo off
echo 🔧 Fixing Render deployment configuration...
echo.

echo 📝 Changes made:
echo ✅ Converted to static site (no Node.js server needed)
echo ✅ Removed server.js file
echo ✅ Updated package.json for static hosting
echo ✅ Updated render.yaml for static site
echo ✅ Fixed _redirects for proper routing
echo.

echo 🚀 Committing and pushing fixes...
git add .
git commit -m "🔧 Fix Render deployment - Convert to static site

✅ Removed Node.js server dependencies
✅ Updated render.yaml for static site hosting  
✅ Fixed _redirects for proper routing
✅ Simplified package.json
✅ Ready for Render Static Site deployment

Note: Make sure to create a 'Static Site' on Render, not 'Web Service'"

git push origin main

echo.
echo ✅ Fixes pushed to GitHub!
echo 📋 Next steps:
echo    1. Go to your Render dashboard
echo    2. Delete the current failed service
echo    3. Create a NEW 'Static Site' (not Web Service)
echo    4. Connect your GitHub repository
echo    5. Leave build command empty
echo    6. Set publish directory to '.' (root)
echo.
pause
