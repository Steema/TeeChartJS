/**
 * @preserve TeeChart(tm) for JavaScript(tm)
 * @fileOverview TeeChart for JavaScript(tm)
 * v2.1 Oct 2017
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

/**
 * @namespace TeeChart namespace, contains all classes and methods.
 */
var Tee=Tee || {};

(function() {
 "use strict";

if (typeof exports !== 'undefined') exports.Tee=Tee;

/**
 * @returns {Number} Returns the integer part of value, without decimals, rounded to lower.
 */
function trunc(value) {
  return value | 0;
}

/**
 * @constructor
 * @augments Tee.Tool
 * @class Base abstract class to perform Animations.
 * @property {Number} [duration=500] Duration in milliseconds of the animation.
 * @property {boolean} [running=false] Read-only, returns if the animation is currently running.
 */
 /*
Tee.Animation=function(target, onstep) {
  Tee.Tool.call(this,target);

  this.active=true;
  this.mode="linear";
  this.duration=500;
  this.items=[];
  this.running=false;

  if (target)
    if (target instanceof Tee.Chart)
       this.chart=target;
    else
    if (target instanceof Tee.Animation) {
       this.chart=target.chart;
       target.items.push(this);
    }

  var o=null;

  this.animate=function(chart) {
    if (!this.running) {
      this.running=true;

      if (chart) this.chart=chart;

      this.init=new Date().getTime();

      o=this;

      o.start();
      for(var t=0, i; i=o.items[t++];) if (i.active) { i.chart=o.chart; i.start(); }

      o.chart.draw();
      requestAnimFrame(this.step, this);
    }
  }

  this.start=function() {}
  this.stop=function() {}

  this.doStep=function(f) { if (onstep) onstep(f); }

  this.step=function() {
    var now=new Date().getTime(),
        t, i, tmp=(now-o.init)/o.duration,
        f= o.mode=="linear" ? tmp : Math.pow(2,10*(tmp-1));

    if ((f>=0) && (f<1)) {
      o.doStep(f);

      for(t=0; i=o.items[t++];)
        if (i.active) {
          i.chart=o.chart;
          i.doStep(f);
        }

      o.chart.draw();
      requestAnimFrame(o.step,o);
    }
    else {
      o.stop();
      for(t=0; i=o.items[t++];) if (i.active) { i.chart=o.chart; i.stop(); }

      if (o.onstop) o.onstop(o);

      o.running=false;
      
      o.chart.draw();
    }
  }
}

Tee.Animation.prototype=new Tee.Tool;
*/

/**
 * @constructor
 * @augments Tee.Animation
 * @class Fades in/out chart elements.
 */
Tee.FadeAnimation=function(target) {
  Tee.Animation.call(this,target);

  this.kind="in"; // in, out

  var o=this, fa;

  this.fade={}

  this.setTransp=function(value) {

    if (o.kind=="out") value=1-value;

    if (fa.legend)
        o.chart.legend.format.transparency=value;

    if (fa.walls)
        o.chart.walls.transparency=value;

    if (fa.series)
        o.chart.series.each(function(s) { s.format.transparency=value; });

    if (fa.marks)
        o.chart.series.each(function(s) { s.marks.transparency=value; });

    if (fa.title)
        o.chart.title.format.transparency=value;

    if (fa.axes)
        o.chart.axes.transparency=value;

    if (fa.panel)
        o.chart.panel.format.transparency=value;
  }

  this.start=function() { fa=this.fade; this.setTransp(1); }
  this.stop=function() { this.setTransp(0); }
  this.doStep=function(f) { o.setTransp(1-f); }
}

Tee.FadeAnimation.prototype=new Tee.Animation();

/**
 * @constructor
 * @augments Tee.Animation
 * @class Animates series data
 * @property {Tee.Series} series Optional Tee.Series object to animate. When null, all series and axes are animated.
 * @property {String} [kind="axis"] Animation style. Can be: axis, left, top, right, bottom, x, y, each, all, zoomin, zoomout.
 */
Tee.SeriesAnimation=function(target) {
  Tee.Animation.call(this,target);

  if (target instanceof Tee.Series) {
    this.series=target;
    this.chart=target.chart;
  }
  else
    this.series=null;

  this.oldmin=0;
  this.oldmax=0;
  this.oldauto=true;

  var scaling=1, o=this;

  this.kind="axis"; // "left", "right", "top", "bottom", "axis", "x", "y", "zoomin", "zoomout", "each", "all"

  function changeAxis(o,a,amount) {
    a.automatic=false;
    var mid=(o.oldmin+o.oldmax)*0.5, range=(o.oldmax-o.oldmin)*0.5;
    a.maximum=mid+amount*range;
    a.minimum=mid-amount*range;
  }

 /**
  * @returns {Tee.Axis} Returns the mandatory axis of the animated series, or null
  * if no visible series exist.
  */
  this.getAxis=function() {
    var s=this.series || this.chart.series.firstVisible();
    return s ? s.mandatoryAxis : null;
  }

  this.doStep=function(f) {

    var a=o.getAxis();
    if (a) a.automatic=false;

    if (o.kind=="axis") {
       changeAxis(o,a,1+(1-f)*100);
    }
    else
    o.chart.series.each(function(s) {
      if (o.series && (o.series!==s)) return;

      var v=s.data.values, old=s.data._old, t, len=v.length;

      if (s instanceof Tee.Pie) {
        s.rotation=360*(1-f);
        scaling=f;
      }
      else
      if (o.kind=="each") {
       var stepf=trunc(len*f);

       for(t=0; t<stepf; t++) v[t]=old[t];

       if (stepf<len)
          v[stepf]=old[stepf]*((len*f)-stepf);
      }
      else
      if (o.kind=="all") {
       for(t=0; t<len; t++) v[t]=old[t]*f;
      }
      else
      if (o.kind!="axis") {
        scaling=f;
      }
    });
  }

  this.stop=function() {
    var a=o.getAxis();

    if (a) {
      a.maximum=o.oldmax;
      a.minimum=o.oldmin;
      a.automatic=o.oldauto;
    }

    o.chart.series.each(function(s) {
      if (s.transform)
         s.transform=null;

      if ((o.kind=="each") || (o.kind=="all"))
      if (s.data._old)
      {
         s.data.values=s.data._old;
         s.data._old=null;
      }
    });
  }

  this.start=function() {

    var a=this.getAxis(), c=this.chart, ss=c.series.items,
        w=c.chartRect.width, h=c.chartRect.height, t, s,
        ww=c.bounds.width, hh=c.bounds.height;

    if (ss.length===0)
      return false;

    this.oldmin=a.minimum;
    this.oldmax=a.maximum;
    this.oldauto=a.automatic;

    for (t=0; t<ss.length; t++) {
      s=ss[t];

      if (this.series && (this.series!==s)) continue;

      if (s instanceof Tee.Pie)
        s.transform=function() { this.chart.ctx.scale(scaling, scaling); }
      else
      if ((this.kind=="each") || (this.kind=="all")) {
        var v=s.data.values, tt, len=v.length;
        s.data._old=v.slice(0);
        for(tt=0; tt<len; tt++) v[tt]=0;
        a.automatic=false;
      }
      else
      if (this.kind=="left")
        s.transform=function() { this.chart.ctx.translate(-w*(1-scaling),0); }
      else
      if (this.kind=="right")
        s.transform=function() { this.chart.ctx.translate(w*(1-scaling),0); }
      else
      if (this.kind=="x")
        s.transform=function() { this.chart.ctx.scale(scaling, 1); }
      else
      if (this.kind=="y")
        s.transform=function() { this.chart.ctx.scale(1, scaling); }
      else
      if (this.kind=="top")
         s.transform=function() { this.chart.ctx.translate(0,-h*(1-scaling)); }
      else
      if (this.kind=="bottom")
         s.transform=function() { this.chart.ctx.translate(0,h*(1-scaling)); }
      else
      if (this.kind=="zoomin")
         s.transform=function() {
           var ctx=this.chart.ctx;
           ctx.translate(ww*0.5,hh*0.5);
           ctx.scale(scaling,scaling);
           ctx.translate(-ww*0.5,-hh*0.5);
         }
      else
      if (this.kind="zoomout")
         s.transform=function() {
           var ctx=this.chart.ctx;
           ctx.translate(ww*0.5,hh*0.5);
           ctx.scale(2-scaling,2-scaling);
           ctx.translate(-ww*0.5,-hh*0.5);
         }
    }

    if (this.kind=="axis")
       changeAxis(this,a,100);
  }
}

Tee.SeriesAnimation.prototype=new Tee.Animation();


/**
 * @constructor
 * @augments Tee.Animation
 * @class Animates Series marks items.
 */
Tee.MarksAnimation=function(target) {
  Tee.Animation.call(this,target);

  if (target && (target instanceof Tee.Series)) {
    this.series=target;
    this.chart=target.chart;
  }
  else
    this.series=null;

  this.current=-1;

  var m=this.series.marks, o=this, old;

  function marksText(series,index,result) {
    if (index<=o.current)
       return result;
    else
       return "";
  }

  this.start=function() {
     old=m.ongettext;
     m.ongettext=marksText;
  }

  this.stop=function() {
     m.ongettext=old;
     this.current=-1;
  }

  this.doStep=function(f) {
    o.current=trunc(o.series.data.values.length*f);
  }
}

Tee.MarksAnimation.prototype=new Tee.Animation();

}).call(this);
