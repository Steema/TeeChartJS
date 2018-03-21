test( "Creating a TeeChart", function() {
  ok( new Tee.Chart(), "Passed!" );
});

test( "Full Test", function() {
  var chart1 = new Tee.Chart("canvas1");

  chart1.tools.add( new Tee.Animation(chart1) );
  chart1.tools.add( new Tee.ToolTip(chart1) );
  chart1.tools.add( new Tee.CursorTool(chart1) );
  chart1.tools.add( new Tee.DragTool(chart1) );

  chart1.footer.text="abc";
  chart1.footer.expand=true;

  chart1.axes.left.grid.centered=true;
  chart1.axes.bottom.grid.format.fill="yellow";

  chart1.axes.left.title.text="Left Axis";
  chart1.axes.bottom.title.text="Bottom Axis";

  chart1.axes.bottom.labels.rotation=90;

  var bar1=new Tee.Bar(chart1);
  chart1.addSeries(bar1).addRandom();
  bar1.data.labels=['a','b','c','d','e','f'];
  
  chart1.addSeries(new Tee.HorizBar(chart1)).addRandom();
  chart1.addSeries(new Tee.Area(chart1)).addRandom();
  chart1.addSeries(new Tee.HorizArea(chart1)).addRandom();
  chart1.addSeries(new Tee.Line(chart1)).addRandom();

  var smoothArea=new Tee.Area(chart1);
  smoothArea.smooth=0.5;
  chart1.addSeries(smoothArea).addRandom();

  var smooth1=new Tee.Line(chart1);
  smooth1.smooth=0.5;
  chart1.addSeries(smooth1).addRandom();

  smooth1.marks.format.image.url="foo.png";

  chart1.addSeries(new Tee.Pie(chart1)).addRandom();
  chart1.addSeries(new Tee.Donut(chart1)).addRandom();
  chart1.addSeries(new Tee.PointXY(chart1)).addRandom();
  chart1.addSeries(new Tee.Bubble(chart1)).addRandom();
  chart1.addSeries(new Tee.Candle(chart1)).addRandom();

  var gantt1=new Tee.Gantt(chart1);
  chart1.addSeries(gantt1).addRandom();

  gantt1.add(3,"abc",100,200);

  gantt1.marks.visible=true;
  gantt1.marks.format.round.x=0;
  gantt1.marks.format.round.y=0;

  gantt1.format.stroke.gradient.visible=true;
  gantt1.marks.format.font.gradient.visible=true;
  gantt1.marks.format.font.stroke.visible=true;
  gantt1.marks.format.font.setSize(22);

  chart1.addSeries(new Tee.Volume(chart1)).addRandom();

  var polar1 =new Tee.Polar(chart1);
  polar1.marks.visible=true;

  chart1.addSeries(polar1).addRandom();

  chart1.draw();

  var p={x:0, y:0},
      t, l=chart1.series.items.length;

  for(t=0; t<l; t++) {
    chart1.series.items[t].clicked(p);
  }

  var event={ button:0, clientX:150, clientY:100 };
  
  chart1.canvas.onmousedown(event);
  chart1.canvas.onmousemove(event);
  chart1.canvas.onmouseup(event);

  chart1.axes.bottom.setMinMax(0,4);

  chart1.legend.legendStyle="values";
  chart1.legend.fontColor=true;
  chart1.legend.inverted=true;
  chart1.legend.title.text="Legend";
  
  chart1.draw();

  chart1.reflectionColor=[23,50,60];
  chart1.drawReflection();

  var slider1=new Tee.Slider(chart1,25);
  chart1.tools.add(slider1);

  var check1=new Tee.CheckBox(chart1, "Hello", true);
  chart1.tools.add(check1);

  var scroller1=new Tee.Scroller(chart1.canvas, chart1);

  var gauge1=new Tee.CircularGauge(chart1);
  chart1.addSeries(gauge1);
  chart1.draw();

  slider1.mousedown(event);
  
  var chart2=new Tee.Chart();
  var map1=new Tee.Map(chart2);
  chart2.addSeries(map1);

  map1.setMap(new Tee.WorldMap());

  new Tee.EuropeMap();
  new Tee.AfricaMap();
  new Tee.AsiaMap();
  new Tee.AustraliaMap();
  new Tee.SouthAmericaMap();
  new Tee.Europe27Map();

  var map2=new Tee.Map(chart2);
  chart2.addSeries(map2);
  map2.setMap(new Tee.USAMap());

  chart2.draw();

  var chart3=new Tee.Chart();
  var bar2=new Tee.Bar(chart3);
  var bar3=new Tee.Bar(chart3);
  bar2.stacked="yes";
  bar3.stacked="yes";
  chart3.draw();

  var three=new Tee.Three("three");
  three.showShadows=true;
  
  var chart4=new Tee.Chart(three);
  chart4.addSeries(new Tee.ColorGrid());
  chart4.addSeries(new Tee.Surface());
  chart4.draw();

  var fade1=new Tee.FadeAnimation();
  var seriesAnim1=new Tee.SeriesAnimation();
  var marks1=new Tee.MarksAnimation(bar1);

  var table1=new Tee.Table('table1', chart2);

  var json ={}
  json.value= '{"series":{"name":"Friends","color":"Blue","metric":"Quantity","category":"Social Networks","point":[{"name":"Facebook","value":123},{"name":"Twitter","value":456},{"name":"Google+","value":789}]}}';
  bar1.loadJSON(json);

  var xml ={}
  xml.value= '<series name="Friends" color="Blue" metric="Quantity"> <point name="Facebook" value="123"/> <point name="Twitter" value="456"/> <point name="Google+" value="789"/></series>';
  bar2.loadXML(xml);

  parseText(bar3.data,"7,Apples\n4\n3,Oranges\n9\n1,Banana\n6,Kiwis\n2\n");

  Table1=new Tee.Table("table1");
  Table1.enableEditing(true,function() {});
  Table1.enableRowHighlight('gold');

  chart1.fromTable('table1', Tee.Bar, true, 0, 0);
  chart1.fromTable('table1', Tee.Bar, false, 0, 0);

  ok( chart1, "Passed!" );

});

