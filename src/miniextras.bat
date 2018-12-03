rem DO NOT FORCE PATH: set path=C:\Program Files (x86)\Java\jre6\bin;c:\windows

java -jar ..\..\closure\compiler.jar --js teechart-extras.js --js_output_file teechart-extras-min.js
java -jar ..\..\closure\compiler.jar --js teechart-gauges.js --js_output_file teechart-gauges-min.js
java -jar ..\..\closure\compiler.jar --js teechart-animations.js --js_output_file teechart-animations-min.js
java -jar ..\..\closure\compiler.jar --js teechart-data.js --js_output_file teechart-data-min.js

java -jar ..\..\closure\compiler.jar --js teechart-maps.js --js_output_file teechart-maps-min.js
java -jar ..\..\closure\compiler.jar --js teechart-3d.js --js_output_file teechart-3d-min.js

mkdir minified
copy teechart-extras-min.js minified\teechart-extras.js
copy teechart-gauges-min.js minified\teechart-gauges.js
copy teechart-animations-min.js minified\teechart-animations.js
copy teechart-data-min.js minified\teechart-data.js

copy teechart-maps-min.js minified\teechart-maps.js
copy teechart-3d-min.js minified\teechart-3d.js

rem EXCANVAS IE8

java -jar ..\..\closure\compiler.jar --js excanvas\excanvas_text.js --js_output_file excanvas\excanvas_text-min.js
java -jar ..\..\closure\compiler.jar --js excanvas\canvas.text.js --js_output_file excanvas\canvas.text-min.js

mkdir minified\excanvas

copy excanvas\excanvas_text-min.js minified\excanvas\excanvas_text.js
copy excanvas\canvas.text-min.js minified\excanvas\canvas.text.js