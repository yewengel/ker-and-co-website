@echo off
echo Copying Saron images to public directory...

:: Create the images directory if it doesn't exist
if not exist "public\images" mkdir "public\images"

:: Copy all images from asset directory to public/images
copy "asset\*.jpg" "public\images\"
copy "asset\*.png" "public\images\"

echo Images copied successfully!
echo.
echo Files copied:
dir "public\images\*.jpg" /b
dir "public\images\*.png" /b
echo.
echo You can now restart your development server to see the images.
pause
