@echo off
echo Fixing dashboard file...
cd /d "%~dp0"
del "src\app\admin\dashboard\page.tsx"
copy "src\app\admin\dashboard\new-page.tsx" "src\app\admin\dashboard\page.tsx"
echo Done! Dashboard fixed.
pause
