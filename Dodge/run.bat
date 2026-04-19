@echo off

START /WAIT /MIN CMD.EXE /C powershell -ExecutionPolicy Bypass -File ".\compile-game.ps1"
call game-launcher.bat REM For launching the game without a cmd window.

pause