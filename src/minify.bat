rem DO NOT FORCE PATH: set path=C:\Program Files (x86)\Java\jre7\bin;c:\windows

java -jar ..\..\closure\compiler.jar --js teechart.js --js_output_file teechart-min.js --create_source_map ./teechart-min.js.map --source_map_format=V3

gzip\gzip -9 <teechart-min.js >teechart.js.gz

mkdir minified
copy teechart-min.js minified\teechart.js
copy date.format.js minified\date.format.js
copy teechart-table.js minified\teechart-table.js

