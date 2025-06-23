@echo off
echo Cleaning up...
rmdir /s /q node_modules
del package-lock.json

echo Installing dependencies...
call npm install

echo Starting development server...
call npm run dev 