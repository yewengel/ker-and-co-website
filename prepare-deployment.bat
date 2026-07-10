@echo off
REM ========================================
REM Saron Orthopedic - Deployment Preparation Script
REM Run this before uploading to cPanel
REM ========================================

echo.
echo ========================================
echo   SARON ORTHOPEDIC DEPLOYMENT PREP
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo ERROR: node_modules not found!
    echo Please run: npm install
    pause
    exit /b 1
)

REM Run build
echo Step 1: Building production version...
echo.
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Build failed! Please fix errors before deploying.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   BUILD SUCCESSFUL!
echo ========================================
echo.
echo Files ready for deployment:
echo   - .next folder
echo   - public folder  
echo   - asset folder
echo   - node_modules folder
echo   - package.json
echo   - package-lock.json
echo   - next.config.js
echo.
echo Next Steps:
echo 1. Upload these files to your cPanel subdomain folder
echo 2. Follow CPANEL_DEPLOYMENT_GUIDE.txt for setup
echo 3. Use deployment-checklist.txt to verify everything
echo.
echo ========================================
pause

