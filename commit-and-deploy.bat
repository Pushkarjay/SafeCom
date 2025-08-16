@echo off
echo 🚀 Committing and pushing SafeCom to GitHub for Render deployment...

echo 📦 Adding all files...
git add .

echo 📝 Committing changes...
git commit -m "🧹 Clean repository and update URLs

✅ Updated frontend URL to: https://safecom-frontend-tempo-render.onrender.com
✅ Removed temporary and duplicate files
✅ Cleaned up directory structure
✅ Removed Test.html and Directory.txt
✅ Removed old deployment scripts
✅ Production-ready clean codebase

Repository now contains:
- Core HTML pages (index, login, dashboard, tasks, messages, etc.)
- Organized CSS and JS files
- Express.js server for Render deployment
- Complete API integration with backend
- Documentation and deployment guides
- Android SRS for future mobile app"

echo 🌐 Pushing to GitHub...
git push origin main

echo ✅ Done! Your code is now on GitHub.
echo 📋 Next steps:
echo    1. Go to https://render.com
echo    2. Create new Web Service
echo    3. Connect your GitHub repository
echo    4. Your app will be live at: https://safecom-frontend-tempo-render.onrender.com
echo.
pause
