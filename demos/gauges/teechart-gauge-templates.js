var Tee=Tee || {};

(function() {
 "use strict";

Tee.gaugeTemplate=function(index,canvas) {
  var c=new Tee.Chart(canvas), gauge;
  c.panel.transparent=true;
  c.title.visible=false;
  gauge=c.addSeries(new Tee.CircularGauge());

  switch (index) {
    case 1:  {
      gauge.shape="segment";
      gauge.back.gradient.colors[1] = "SkyBlue";
      gauge.back.gradient.colors[0] = "RoyalBlue";
      gauge.units.visible=false;
      gauge.angle = 200;
      gauge.marks.format.gradient.colors = ["SkyBlue", "RoyalBlue"];
      gauge.hand.gradient.colors[0] = "RoyalBlue";
      gauge.hand.gradient.colors[1] = "SkyBlue";
      gauge.hand.gradient.direction="leftright";
      gauge.format.font.fill="white";
      gauge.format.font.setSize(10);
      gauge.ticksBack.visible=false;
      gauge.marks.transparent=true;
      break;
    }
    case 2: {
      gauge.shape="rectangle";
      gauge.rotation=135;
      gauge.angle=270;
      gauge.inverted=true;
      gauge.format.gradient.colors[0] = "SeaGreen";
      gauge.format.shadow.color = "SeaGreen";
      gauge.back.gradient.colors[0] = "PaleGreen";
      gauge.back.gradient.colors[1] = "SeaGreen";
      gauge.hand.gradient.colors[0] = "SeaGreen";
      gauge.hand.gradient.colors[1] = "PaleGreen";
      gauge.marks.format.gradient.colors = ["PaleGreen", "SeaGreen"];
      gauge.ticksBack.visible=false;
      gauge.minorBack.visible=false;
      gauge.minor.stroke.size=3;
      gauge.ticks.triangle=true;
      gauge.ticks.stroke.fill="white";
      gauge.marks.location.x=-25; // %
      gauge.marks.location.y=-25; // %
      break;
    }
    case 3: {
      gauge.format.visible=false;
      gauge.ticks.outside=false;
      gauge.decimals=1;
      gauge.hand.size=1;
      gauge.hand.stroke.size=5;
      gauge.hand.stroke.cap="round";
      gauge.hand.fill="black";
      gauge.hand.back=0;

      gauge.back.visible=false;
      gauge.bevel.visible=false;
      gauge.format.font.fill="blue";

      gauge.ticksBack.gradient.colors=["red","blue"];

      gauge.format.font.style="italic 14px Calibri";
      gauge.rotateText=true;
      gauge.pointer.size=6;
      gauge.pointer.stroke.fill="black";
      gauge.pointer.fill="lime";
      gauge.units.location.y=-30;
      gauge.center.gradient.colors[0]="black";
      gauge.center.top.gradient.colors[1]="black";
      gauge.center.top.size=75;
      gauge.marks.format.gradient.colors = ["white", "silver"];
      break;
    }

    case 4: {
      gauge.ticks.outside=false;
      gauge.ticks.stroke.fill="gray";

      gauge.units.format.font.fill="black";
      gauge.units.location.y=-20;
      gauge.units.format.font.style="16px Arial";

      gauge.minorBack.visible=false;
      //gauge.minor.count=2;

      gauge.shape="rectangle";
      gauge.bounds.custom=true;
      gauge.bounds.set(10,10,280,160);

      gauge.format.size=8;

      gauge.format.gradient.colors=["gray","white"];
      gauge.format.gradient.direction="topbottom";

      gauge.format.font.fill="white";
      gauge.format.font.shadow.visible=true;
      gauge.format.font.style="12px monospace";

      gauge.marks.visible=false;

      gauge.back.gradient.colors[1]="#BBBBBB";
      gauge.back.gradient.colors[0]="white"; //"#BBBBBB";
      gauge.back.gradient.direction="radial";
      gauge.back.round.x=8;
      gauge.back.round.y=8;

      gauge.bevel.gradient.direction="rightleft";
      gauge.bevel.gradient.colors=["gray","white"];
      gauge.bevel.round.x=8;
      gauge.bevel.round.y=8;
      
      gauge.center.location.y=60;
      gauge.angle=90;
      gauge.hand.size=3;
      gauge.hand.back=0;
      gauge.hand.length=65;
      gauge.hand.gradient.colors[1]="black";
      gauge.hand.gradient.direction="rightleft";
      gauge.center.transparency=0.6;

      break;
    }

    case 5:  {
      gauge.ticksBack.radius=5;
      gauge.format.gradient.colors[1]="#B85C00";
      gauge.format.font.style = "12px Arial";
      gauge.format.font.fill = "black";
      gauge.format.font.shadow.visible=true;
      gauge.rotation=30;
      gauge.minor.shape="ellipse";
      gauge.minor.fill="white";
      gauge.minor.stroke.fill="";
      break;
    }

  }

  return gauge;
}

Tee.Clock=function(canvas, index) {

  Tee.Chart.call(this, canvas);

  var c=this;
  c.panel.transparent=true;
  c.title.visible=false;

  var g=this.gauge=c.addSeries(new Tee.CircularGauge());

  g._romans=["","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];

  var m=g.minutes=g.addHand();
  m.size=4;
  m.value=4;
  m.length=75;
  m.pointer=false;
  
  var s=g.seconds=g.addHand();
  s.size=0;
  s.value=9;
  s.length=80;

  g.drag.enabled=false;
  g.center.visible=false;
  g.hand.pointer=false;

  g.min=0;
  g.max=12;
  g.step=1;
  g.rotation=180;
  g.angle=360;
  g.ticksBack.gradient.visible=false;
  g.marks.visible=false;
  g.units.location.y=10;
  g.minor.count=5;

  g.ongetText=function(v) {
    if (v==0) v=12;
    return g.romans ? g._romans[v] : v.toFixed(0);
  }

  this.setTime=function() {
      var d=new Date(), h=d.getHours(), m=d.getMinutes(), s=d.getSeconds();

      g.seconds.value=s*0.2;
      g.minutes.value=(m*0.2)+(s/300);

      var h2=(h>12 ? h-12 : h);
      g.value=h2 + (m/60);

      if (!g.units.custom) {
        var st= (g.ampm ? h2:h) + ":" + ((m<10) ? "0" + m : m) +
                     ":" + ((s<10) ? "0" + s : s) + " ";

        if (g.ampm)
           st+= ((h > 11) ? "PM" : "AM");

        g.units.text= st;
      }
  }

  g.tick=function() {
      c.setTime();
      c.draw();

      window.setTimeout(g.tick, 1000, g);
  }

  switch (index) {
    case 1:  {
      g.ticks.stroke.fill="black";
      g.minor.stroke.fill="gray";

      g.format.padding=0.25;

      g.minor.shape="ellipse";
      g.minor.fill="blue";

      g.hand.length=50;

      break;
    }

    case 2:  {
      g.format.size=10;
      g.back.gradient.colors=["silver", "white", "silver"];
      g.back.gradient.direction="radial";

      g.hand.gradient.colors=["white","silver"];
      g.hand.stroke.fill="silver";
      g.hand.shape="rect";
      g.hand.size=3;
      g.hand.length=50;

      g.format.padding=0.2;
      g.format.font.fill="black";
      g.format.shadow.width=0;
      g.format.shadow.height=0;
      g.format.shadow.blur=10;

      g.minutes.shape="rect";
      g.minutes.size=2;
      g.minutes.gradient.colors=["white","silver"];
      g.minutes.stroke.fill="silver";
      g.minutes.length=60;

      g.center.visible=true;
      g.center.size=4;
      g.center.top.visible=false;
      g.center.gradient.colors=["black"];
      
      g.seconds.fill="black";

      g.bevel.gradient.colors=["white","gray","white"];

      g.ticksBack.visible=false;
      
      g.ticks.stroke.fill="black";
      g.ticks.length=3;
      g.ticks.stroke.size=2;
      g.minor.stroke.fill="gray";

      g.units.custom=true;
      g.units.text="Quartz";
      g.units.location.y=15;
      g.units.format.font.fill="black";

      break;
    }

    case 3:  {
      c.panel.transparent=false;
      c.panel.format.stroke.fill="#DBB887";
      c.panel.format.gradient.colors=["#EEDCC3","#B2936C"];

      g.back.gradient.colors=["#EEDCC3","#B2936C"];
      g.format.font.style="16px Impact";
      g.format.font.fill="#433728";

      g.format.padding=0.2;
      g.format.visible=false;
      g.bevel.visible=false;

      g.units.format.font.fill="black";
      g.units.location.y=-20;
      g.units.visible=false;
      
      g.seconds.visible=false;
      g.seconds.fill="black";
      
      g.ticksBack.visible=false;

      g.hand.size=3;
      g.hand.back=3;
      g.hand.gradient.colors=["#433728","#856E51"];

      g.minor.count=10;
      
      g.minutes.size=2;
      g.minutes.back=6;
      g.minutes.gradient.colors=["#433728","#856E51"];
    }
  }
}

Tee.Clock.prototype=new Tee.Chart;

}).call(this);
