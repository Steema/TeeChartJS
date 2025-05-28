var tee=require('./lib/teechart.js'),
    Canvas=require('../canvas/lib/canvas.js'),
    http = require('http'),
    count=0;

http.createServer(function (req, res) {

  var canvas = new Canvas(500,300),
      chart = new tee.Tee.Chart(canvas);

  //chart.panel.transparent = true;
  
  chart.title.text="Node.js and TeeChart";
  chart.addSeries(new tee.Tee.Bar([5,3,7,1,2]));

  console.log("Drawing Chart");

  chart.bounds.set(0,0,500,300);
  
  chart.draw();

  console.log("Sending Chart: " +(count++));

  res.writeHead(200, {'Content-Type': 'text/html'});

  res.end("<html><body><title>TeeChart Node.js node-canvas Example</title><img src='"+canvas.toDataURL()+"'/></body></html>");

}).listen(4242, "127.0.0.1");

console.log('TeeChart Server running at http://127.0.0.1:4242/');

