function arrayToString(a) {
  var s="";
  if (a) {
    for(var t=0; t<a.length; t++) {
      if (t>0) s+=',';
      if (typeof a[t] === "string")
        s+="'"+a[t]+"'";
      else
        s+=a[t];
    }
  }
  return s;
}

function getType(s) {
  if (s instanceof Tee.Donut) return "Tee.Donut"; else
  if (s instanceof Tee.Bubble) return "Tee.Bubble"; else
  if (s instanceof Tee.Candle) return "Tee.Candle"; else
  if (s instanceof Tee.Pie) return "Tee.Pie"; else
  if (s instanceof Tee.HorizBar) return "Tee.HorizBar"; else
  if (s instanceof Tee.Bar) return "Tee.Bar"; else
  if (s instanceof Tee.HorizArea) return "Tee.HorizArea"; else
  if (s instanceof Tee.Line) return "Tee.Line"; else
  if (s instanceof Tee.PointXY) return "Tee.PointXY"; else
  if (s instanceof Tee.Area) return "Tee.Area";
  if (s instanceof Tee.SmoothLine) return "Tee.SmoothLine"; else return "";
}

function emitAnnotation(prefix,a) {
  var s="";
  if (a.text!="") s+=prefix+".text='"+a.text+"';\n";
  if (!a.transparent) s+=prefix+".transparent=false;\n";
  return s;
}

function colorsToString(c) {
  var s="";
  for (var t=0; t<c.length; t++) {
    if (t>0) s+=',';
    s+='"'+c[t]+'"';
  }
  return s;
}

function scriptify(chart) {
  var w=window.open('','',''), d=w.document, se;

  var sc='<script src="..\/..\/src\/teechart.js" type="text\/javascript"><\/script>\n';

  var code='var Chart1=new Tee.Chart("canvas1");\n';
  code+=emitAnnotation('Chart1.title',Chart1.title);
  code+=emitAnnotation('Chart1.footer',Chart1.footer);

  var s=Chart1.series, data, anySmooth=false;

  for (var t=0; t<s.count(); t++) {
    se=s.items[t];

    if (se.data.values.length>0)
       data='['+arrayToString(se.data.values)+']';
    else
       data='';

    code+='var s'+t+'=Chart1.addSeries(new '+getType(se)+'('+data+'));\n';
    if (se.title!="")
       code+='s'+t+'.title="'+se.title+'";\n';

    if (se.data.labels.length>0)
       code+='s'+t+'.data.labels=['+arrayToString(se.data.labels)+'];\n';

    if (se.stacked && (se.stacked!="no"))
       code+='s'+t+'.stacked="'+se.stacked+'";\n';

    if (se.marks.visible)
       code+='s'+t+'.marks.visible='+se.marks.visible+';\n';

    if ((se.smooth) && (se.smooth!=0)) {
       code+='s'+t+'.smooth='+se.smooth+';\n';
       anySmooth=true;
    }

    if (!se.visible)
       code+='s'+t+'.visible=false;\n';

    if (se.palette.colors)
       code+='s'+t+'.palette.colors=['+colorsToString(se.palette.colors)+'];\n';
  }

  var tmp=new Tee.Chart(), tmpp=colorsToString(tmp.palette.colors),
  tmpn=colorsToString(Chart1.palette.colors);

  if (tmpp!=tmpn)
     code+='Chart1.palette.colors=['+tmpn+'];\n';

  var tools=Chart1.tools.items;
  for (var tool=0; tool<tools.length; tool++) {
    if (tools[tool] instanceof Tee.ToolTip)
      code+='Chart1.tools.add(new Tee.ToolTip(Chart1));\n';
  }

  code+='Chart1.draw();';

  if (anySmooth)
    sc+='<script src="..\/..\/..\/src\/teechart-extras.js" type="text\/javascript"><\/script>\n';

  sc +='<script type="text\/javascript">\nfunction draw()\n{\n'+code+'\n}\n<\/script>';

  var tmpcanvas='<canvas id="canvas1" width="'+chart.bounds.width+'" height="'+chart.bounds.height+'"><\/canvas>';

  var ca='<div style="float:left;"><textarea style="width:100%" cols="70" rows="20">'+sc+'\n'+tmpcanvas+
      '<\/textarea><\/br><input type="button" value="Run"></input></textarea><\/div>';
      
  ca+='<div id="splitter"><\/splitter>';
  ca+='<div style="float:right;">'+tmpcanvas+'<\/div>';

  d.write('<!DOCTYPE html><html><head><title>Made with TeeChart Generator</title>'+sc+'</HEAD><body onload="draw();">'+ca+'</BODY></HTML>');

  d.close();
  
  if (window.focus) w.focus();
}

