@echo off
set PATH=%PATH%;"C:\Program Files\Git\bin"
git init
git add .
git commit -m "Add interactive map, questionnaire planner, PDF export, and social feed features"
git remote add origin https://github.com/OmarRaafatSayed/guide-eg.git
git push -u origin main
pause