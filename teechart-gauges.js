/**
 * @preserve TeeChart(tm) for JavaScript(tm)
 * @fileOverview TeeChart for JavaScript(tm)
 * v1.9 April 2017
 * Copyright(c) 2012-2017 by Steema Software SL. All Rights Reserved.
 * http://www.steema.com
 *
 * Licensed with commercial and non-commercial attributes,
 * specifically: http://www.steema.com/licensing/html5
 *
 * JavaScript is a trademark of Oracle Corporation.
 */

/**
 * @author <a href="mailto:david@steema.com">Steema Software</a>
 * @version 1.9
 */

/*global requestAnimFrame */

/**
 * @namespace TeeChart Gauges namespace, contains all classes and methods.
 */
var Tee=Tee || {};

(function() {
 "use strict";

/**
 * @constructor
 * @memberOf Tee
 * @class Parameters to draw a circular gauge meter.
 * @property {Number} [min=0] The minimum gauge range value.
 * @property {Number} [max=100] The maxnimum gauge range value.
 * @property {Number} [step=0] The increment between gauge range labels.
 * @property {Number} [value=0] The position of gauge hand inside the min max range.
 * @property {Number} [angle=280] Amount in degrees of the circular gauge size.
 * @property {Number} [rotation=0] Gauge rotation in degrees.
 * @property {Boolean} [rotateText=false] Gauge labels are rotated or not according to label angle position.
 * @property {String} [shape="circle"] Gauge style ("circle", "rectangle", "segment").
 * @property {Boolean} [drag.enabled=true] Allows mouse/touch dragging the Gauge hand to change current value.
 * @property {Tee.Format} bevel Formatting properties to outmost external gauge bevel.
 * @property {Tee.Format} center Formatting properties for center gauge symbol.
 */
Tee.CircularGauge=function(o,o2) {
  Tee.Series.call(this,o,o2);

  this.useAxes=false;  // no axis

  // Range and value:

  this.min=0;
  this.max=100;
  this.step=0;
  this.value=0;

  // Rotation options:

  this.angle=280;  // degree
  this.rotation=0; // degree
  this.rotateText=false;
  this.shape="circle";  // rectangle, segment

  this.drag={ enabled:true};
  
  var be=this.bevel=new Tee.Format(this.chart);
  be.gradient.visible=true;
  be.gradient.colors=["white","blue","white"];
  be.shadow.visible=false;
  be.visible=true;
  be.stroke.fill="";

  var ce=this.center=new Tee.Format(this.chart);
  ce.stroke.fill="";
  ce.gradient.visible=true;
  ce.size=10;
  ce.visible=true;
  ce.shadow.visible=true;
  ce.gradient.offset={ x:2, y:-2 }
  ce.location={x:0, y:0 } // %

  ce.top=new Tee.Format(this.chart);
  ce.top.size=40; // %
  ce.top.visible=true;
  ce.top.stroke.fill="";
  ce.top.gradient.colors=["silver","white"];
  ce.top.gradient.visible=true;
  ce.top.gradient.direction="topbottom";

  var ti=this.ticks=new Tee.Format(this.chart);
  ti.length=6; // %
  ti.stroke.fill="silver";
  ti.visible=true;
  ti.outside=true;
  ti.triangle=false;
  ti.fill="white";

  var tb=this.ticksBack=new Tee.Format(this.chart);
  tb.stroke.fill="";
  tb.fill="black";
  tb.gradient.visible=true;
  tb.gradient.colors=["red", "yellow", "green"];
  tb.gradient.direction="rightleft";
  tb.visible=true;
  tb.radius=0;

  var mi=this.minor=new Tee.Format(this.chart);
  mi.stroke.fill="silver";
  mi.visible=true;
  mi.count=4;
  mi.shape=""; // ellipse

  var mb=this.minorBack=new Tee.Format(this.chart);
  mb.stroke.fill="";
  mb.visible=true;
  mb.fill="white";
  mb.gradient.visible=true;
  mb.gradient.direction="bottomtop";
  mb.gradient.colors=["white","gray","white","silver"];
  mb.radius=0;
  
  this.hands=[];

  this.addHand=function() {
    var han=new Tee.Format(this.chart);
    han.size=6;
    han.length=60; // %
    han.back=20; // %
    han.gradient.visible=true;
    han.gradient.colors[0]="orange";
    han.shadow.visible=true;
    han.shadow.blur=12;
    han.shadow.color="black";
    han.stroke.fill="";

    han.pointer=true;
    han.shape="needle"; // "rectangle"

    han.visible=true;

    this.hands.push(han);
    return han;
  }

  var han=this.hand=this.addHand();

  var b=this.back=new Tee.Format(this.chart);
  b.fill="black";
  b.visible=true;
  b.gradient.visible=true;
  b.gradient.colors=["black","gray"];
  b.stroke.fill="";

  var po=this.pointer=new Tee.Format(this.chart);
  po.size=3;
  po.fill="black";
  po.stroke.fill="";
  po.visible=true;

  var m=this.marks, mf=m.format;
  m.location={ x:0, y:10 } // %
  m.visible=true;
  mf.fill="black";
  mf.font.fill="white";
  mf.gradient.visible=true;
  mf.gradient.colors=["gray","black"];
  mf.shadow.visible=true;
  mf.shadow.blur=8;
  mf.shadow.color="black";

  var f=this.format;
  f.visible=true;
  f.gradient.visible=true;
  f.gradient.colors=["white","black","white"];
  f.shadow.visible=true;
  f.font.style="12px Verdana";
  f.font.fill="white";
  f.font.visible=true;
  f.size=14; // %
  f.round={ x:6, y:6 }

  f.padding=0.5; // %
  
  this.units=new Tee.Annotation(this.chart);
  this.units.transparent=true;
  this.units.format.font.fill="orange";
  this.units.location={ x:0, y:24 } // %

  this.bounds=this.getRect();

  this.hover.enabled=true;

  var oldValue, newValue, gauge=this;

  this.animate=new Tee.Animation(this.chart, function(f) {
    gauge.value=oldValue+(f*(newValue-oldValue));
    gauge.chart.draw();
  });

  this.animate.duration=100;
  this.animate.onstop=function() {
     gauge.value=newValue;

     if (gauge.onchange)
         gauge.onchange(gauge);

     gauge.chart.draw();
  }

  var tick0, tick1, tickMin, tickText,
      initRot, endRot,
      cx, cy, cex, cey;

  this.calcBounds=function() {
    return this.bounds.custom ? this.bounds : this.cellRect(this.bounds,true);
  }

  this.draw=function() {

    var ta=(this.angle*0.01745), r=this.calcBounds(), rax, ray;

    cx=r.x+r.width*0.5;
    cy=r.y+r.height*0.5;

    if (this.bounds.custom) {
        rax=r.width;
        ray=r.height;
    }
    else
      ray=rax=Math.min(r.width,r.height);

    var tar=this, ctx=tar.chart.ctx, xx=1.57, ra=rax;

    initRot=(tar.rotation*0.01745)+(6.283-ta)*0.5;
    while(initRot>=6.283) initRot-=6.283;

    endRot=initRot+ta;
    while(endRot>=6.283) endRot-=6.283;

    function drawRange(t,p0,p1,start,end) {
      if (t.radius>0) p1=ra*t.radius*0.01;

      ctx.beginPath()
      ctx.arc(0,0,p0,start,end, false);
      ctx.arc(0,0,p1,end,start, true);

      t.draw(ctx,null,-p1,-p1,2*p1,2*p1);
    }

    this.drawHand=function(han) {
      han.value=this.limitValue(han.value);

      var ppos=this.inverted ? this.max-han.value : han.value,
          handRot=(this.rotation*0.01745)+(9.4248-ta)*0.5+ta*(ppos-this.min)/range;

      cex=cx+rax*ce.location.x*0.005,
      cey=cy+ray*ce.location.y*0.005;

      ctx.save();

      ctx.translate(cex, cey);
      ctx.rotate(handRot);

      var hs=han.size, rah=ra*han.back*0.5*0.01, rad=Math.min(hs,6), raend=ra*han.length*0.5*0.01;

      ctx.beginPath();

      if (hs>1) {

        ctx.moveTo(-rah+rad,-hs);

        if (han.shape=="needle") {
          ctx.quadraticCurveTo(-rah, -hs, -rah, -hs+rad);
          ctx.lineTo(-rah,hs-rad);
          ctx.quadraticCurveTo(-rah, hs, -rah+rad, hs);
          ctx.lineTo(raend,0);
        }
        else
        {
          ctx.lineTo(-rah+rad,hs);
          ctx.lineTo(raend,hs);
          ctx.lineTo(raend,-hs);
        }

        ctx.closePath();
      }
      else
      {
        ctx.moveTo(-rah,0);
        ctx.lineTo(raend,0);
      }

      if (hs>1)
        han.draw(ctx,null,-rah,-hs, rah+raend, 2*hs);
      else  {
        han.stroke.prepare();
        ctx.strokeStyle=han.fill;
        ctx.stroke();
      }

      if (this.ondrawHand) this.ondrawHand(this, han);

      // Pointer:
      if (han.pointer && po.visible)
          po.ellipse((tickMin+tick1)*0.5,0,po.size,po.size);

      ctx.restore();
    }

    function tryBack(t,p0,p1) {
      if (t.visible && (t.fill!=="")) {

        if (t.ranges && (t.ranges.length>0)) {

          var sx=xx, endsx,
              old=t.fill, oldg=t.gradient.visible,
              tartot=tar.max-tar.min, difRot=endRot-initRot;

          t.gradient.visible=false;

          if (tar.inverted) sx+=difRot;

          for(var r=0; r<t.ranges.length; r++) {

            var item=Math.min(tar.max, t.ranges[r].value);

            var rangev=(r===0) ? item : item-t.ranges[r-1].value+tar.min;

            if (tar.inverted)
              endsx=sx-difRot*(rangev-tar.min)/tartot;
            else
              endsx=sx+difRot*(rangev-tar.min)/tartot;

            t.fill=t.ranges[r].fill;

            if (t.fill!=="") {
              if (tar.inverted)
               drawRange(t,p0,p1,endsx,sx);
              else
               drawRange(t,p0,p1,sx,endsx);
            }

            sx=endsx;

            if (item>=tar.max) break;
          }

          t.fill=old;
          t.gradient.visible=oldg;

        }
        else
          drawRange(t,p0,p1,xx,xx+(endRot-initRot));
      }
    }

    function drawShape(fo) {
      if (fo.visible)
        if (tar.shape=="circle")
           fo.ellipse(cx,cy,rax,ray);
        else
        if (tar.shape=="segment") {
           ctx.beginPath();

           var minAngle=tar.units.visible ? 275 : 240,
               rot0=xx+(tar.rotation*0.01745)+(6.283-(Math.max(minAngle,tar.angle)*0.01745))*0.5;

           var halfx=0.5*rax, halfy=0.5*ray;

           ctx.arc(cx,cy,halfx,rot0,rot0+Math.max(minAngle*0.01745,ta),false);
           ctx.closePath();
           fo.draw(ctx,null,cx-halfx,cy-halfy,rax,ray);
        }
        else
           fo.rectangle(cx-rax*0.5,cy-ray*0.5,rax,ray);

      return fo.visible;
    }

    if (drawShape(f)) {
      rax*=(1-f.size*0.01);
      ray*=(1-f.size*0.01);
      if (!this.bounds.custom) { ra=ray=rax; }
    }

    if (drawShape(this.bevel)) {
      rax*=(1-f.size*0.002);
      ray*=(1-f.size*0.002);
      if (!this.bounds.custom) { ra=ray=rax; }
    }

    drawShape(b);

    var o=ti.outside,
        //a=this.mandatoryAxis,
        pos=this.min, range=this.max-this.min,
        step=this.step;

        if (step===0) step=range/20;

        step=Math.max(0.1,step);

        tick1=o? ra*0.48 : ra*0.41,
        tick0=tick1-ra*(ti.length*0.01),

        tickText=o? ra*0.39 : this.rotateText ? ra*0.46 : ra*0.48,

        tickMin=o? ra*0.45 : ra*0.38;

    f.font.prepare();

    function trunc(value) { return value | 0; }

    var fh=f.textHeight("Wj"),
        tickCount=range/step,
        textStep=Math.max(1,trunc(tickCount/((ra*ta/6.283)/fh)));

    ctx.fillStyle=f.font.fill;

    ctx.save();

    var cex2=cx, cey2=cy;

    if (tar.bounds.custom)
    if (rax>ray)
       cey2+=0.75*ray*ray/rax;
    else
       cex2+=0.75*rax*rax/ray;

    ctx.translate(cex2, cey2);

    ctx.rotate(initRot);

    tryBack(tb,tick0,tick1);
    tryBack(mb,tickMin,tick1);

    function isHover(h,p,dif) {
     return h.enabled && h.valid ? Math.abs(p-h.value)<dif ? h : null : null;
    }

    var roStep=step*ta/range/mi.count,
        totRot=initRot,
        offY=this.rotateText ? 0 : f.textHeight("Wj")*0.3,
        tickIndex=0;

    if ((!ti.visible) && o)
       tickText=tickMin*0.9;

    while(pos<=this.max) {

      if (ti.visible) {
        var fTick= isHover(this.hover,pos,0.2*step) || ti;

        ctx.beginPath();
        ctx.moveTo(0,tick0);

        if (ti.triangle) {
          ctx.lineTo(-3,tick1);
          ctx.lineTo(3,tick1);
          ctx.closePath();
          fTick.draw(ctx,-3,tick0,3,tick1);
        }
        else
        {
          ctx.lineTo(0,tick1);

          fTick.stroke.prepare();
          ctx.stroke();
        }
      }

      if (f.font.visible && ((tickIndex % textStep)===0)) {

        if ((this.angle!=360) || (pos+step<=this.max)) {
          var ts=tickText-f.textHeight()*f.padding;

          ctx.translate(0,ts);

          var rr=(this.rotateText) ? 3.1416 : totRot;

          ctx.rotate(-rr);

          f.font.prepare();

          ctx.fillStyle=f.font.fill;

          var ppos= tar.inverted ? this.max-pos : pos, st;

          if (tar.ongetText)
             st=tar.ongetText(ppos);
          else
          if (trunc(ppos)==ppos)
             st=ppos.toFixed(0);
          else
             st=ppos.toFixed(this.decimals);

          ctx.fillText(st, 0, offY);

          ctx.rotate(rr);
          ctx.translate(0,-ts);
        }
      }

      if (mi.visible) {
        if (pos<this.max)
        for (var mit=0; mit<mi.count; mit++) {
          ctx.rotate(roStep);

          if (mit<(mi.count-1)) {
            var miStep=step/mi.count,
                nPos=pos+(mit+1)*miStep,
                fminTick= isHover(this.hover,nPos,0.2*miStep) || mi;

            if (nPos>this.max) break;

            if (mi.shape=="ellipse")
               mi.ellipse(0,(tickMin+tick1)*0.5,mi.size,mi.size);
            else
            {
              ctx.beginPath();
              ctx.moveTo(0,tickMin);
              ctx.lineTo(0,tick1);

              fminTick.stroke.prepare();
              ctx.stroke();
            }
          }

        }
      }
      else
          ctx.rotate(roStep*mi.count);

      totRot+=roStep*mi.count;

      pos+=step;
      tickIndex++;
    }

    ctx.restore();

    // marker
    //var m=this.marks;
    if (m.visible) {
      m.text=this.value.toFixed(this.decimals);
      m.resize();
      m.position.x=cx-m.bounds.width*0.5+(m.location.x*rax*0.01);
      m.position.y=cy+(m.location.y*ray*0.01);
      m.draw();
    }

    // units;
    var u=this.units;
    if (u.visible) {
      u.resize();
      u.position.x=cx-u.bounds.width*0.5+(u.location.x*rax*0.01);
      u.position.y=cy+(u.location.y*ray*0.01);
      u.draw(ctx);
    }

    ctx.save();

    // hands

    han.value=this.value;

    for(var h=0; h<this.hands.length; h++)
    if (this.hands[h].visible)
       this.drawHand(this.hands[h]);

    ctx.restore();

    // Center:

    if (ce.visible) {
      var ces=ra*ce.size*0.01;

      ce.ellipse(cex,cey,ces,ces);

      if (ce.top.visible) {
       var cet=ces*ce.top.size*0.01;
       ce.top.ellipse(cex,cey,cet,cet);
      }
    }

  }

  this.limitValue=function(v) {
    return Math.min(this.max,Math.max(this.min,v));
  }

  this.setValue=function(v) {
    v=this.limitValue(v);

    var res=(this.value!=v);

    if (res) {
      if (this.animate.active && (this.animate.duration>0)) {
        oldValue=this.value;
        newValue=v;
        this.animate.animate(this.chart);
      }
      else
      {
        this.value=v;

        if (this.onchange)
           this.onchange(this);
      }
    }

    return res;
  }

  this.onclick=function() {}

  this.clicked=function() {
     this.dragging=false;
     return -1;
  }

  this.inValue=function(p,r) {
    if (!r.contains(p)) return false;

    var dx=p.x-cex, dy=p.y-cey,
        d=Math.sqrt((dx*dx)+(dy*dy));

    var ang=Math.atan2(dy,dx)-Math.PI*0.5;
    while (ang<0) ang+=6.283;

    var rIni, rEnd, val;

    if (initRot>endRot) {
      rIni=endRot;
      rEnd=initRot;
      val=(ang>=rEnd) || (ang<=rIni);
    }
    else
    {
      rEnd=endRot;
      rIni=initRot;
      val=(ang>=rIni) && (ang<=rEnd);
    }

    if (val) {
      var res;

      if (initRot>endRot)
        if (ang>rEnd)
          res=(ang-rEnd)/(6.283-rEnd+rIni);
        else
          res=(6.283-rEnd+ang)/(6.283-rEnd+rIni);
      else
        res=(ang-rIni)/(rEnd-rIni);

      var v=this.min+(this.max-this.min)*res;

      if (this.inverted) v=this.max-v;

      p.value=v;

      p.inTicks=(d>=Math.min(tick0,tickText)) && (d<=tick1);

      return true;
    }
    else {
      p.inTicks=false;
      return false;
    }
  }

  function changeHover(g,v) {
     if (g.hover.value!=v) {
      g.hover.value=v;
      g.hover.valid=(v!==null);
      requestAnimFrame(function() {g.chart.draw()});
     }
  }
  this.mousemove=function(p) {
	  
    var r=this.calcBounds(),
        ok=this.inValue(p,r);
    if (this.dragging || ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&this.drag.enabled)) {
       if (ok && this.setValue(p.value))
          this.chart.draw();

       this.chart.newCursor="pointer";
    }
    else
    if (p.inTicks && this.drag.enabled) {
       changeHover(this,p.value);
       this.chart.newCursor="pointer";
    }
    else
      changeHover(this,null);
  }
  
  var p={x:0,y:0};
  
  this.mousedown=function(e) {
    if (this.drag.enabled) {
      var r=this.calcBounds();
      this.chart.calcMouse(e,p);

      if (this.inValue(p,r)) {
        this.dragging=true;

        this.hover.value=null;
        this.hover.valid=false;

        if (this.setValue(p.value))
           this.chart.draw();
      }
      else
        this.dragging=false;

      return this.dragging;
    }
    else
      return false;
  }
}

Tee.CircularGauge.prototype=new Tee.Series();

/**
 * @private
 */
Tee.CircularGauge.prototype.setChart=function(series,chart) {
    var tmp=Tee.Series.prototype.setChart;
    tmp(series,chart);
    series.back.setChart(chart);
    series.center.setChart(chart);
    series.center.top.setChart(chart);
    series.ticks.setChart(chart);
    series.ticksBack.setChart(chart);
    series.minor.setChart(chart);
    series.minorBack.setChart(chart);
    series.hand.setChart(chart);
    series.units.setChart(chart);
    series.pointer.setChart(chart);
    series.bevel.setChart(chart);
}

})();
