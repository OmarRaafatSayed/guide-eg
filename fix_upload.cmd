@echo off
set PATH=%PATH%;"C:\Program Files\Git\bin"
git remote remove origin
git remote add origin https://github.com/OmarRaafatSayed/guide-eg.git
git branch -M main
git push -u origin main
pause