@echo off

set zip="c:\program files\7-zip\7z.exe"

echo Creating TeeChart for node-webkit installer

mkdir tee
del /Q tee\*.*

mkdir tee\demos
del /Q tee\demos\*.*

mkdir tee\src
del /Q tee\src\*.*

copy ..\..\src\minified\*.js tee\src

xcopy /s ..\..\demos\*.* tee\demos

copy package.json tee

del teechart_node.zip

cd tee

%zip% a -w%temp% -r ..\teechart_node.zip *.*

cd ..

del teechart_node.nw
ren teechart_node.zip teechart_node.nw

rem echo Prepackaged as exe:
rem copy /b nw.exe+teechart_node.nw teechart_nw.exe

nw.exe --no-toolbar teechart_node.nw

