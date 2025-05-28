/*
 TeeChart(tm) for JavaScript(tm)
 @fileOverview TeeChart for JavaScript(tm)
 v1.4 December 2012
 Copyright(c) 2012 by Steema Software SL. All Rights Reserved.
 http://www.steema.com

 Licensed with commercial and non-commercial attributes,
 specifically: http://www.steema.com/licensing/html5

 JavaScript is a trademark of Oracle Corporation.
*/
var Tee=Tee||{};
(function(){"undefined"!==typeof exports&&(exports.Tee=Tee);Tee.FadeAnimation=function(g){Tee.Animation.call(this,g);this.kind="in";var f=this,c;this.fade={};this.setTransp=function(a){"out"==f.kind&&(a=1-a);c.legend&&(f.chart.legend.format.transparency=a);c.walls&&(f.chart.walls.transparency=a);c.series&&f.chart.series.each(function(d){d.format.transparency=a});c.marks&&f.chart.series.each(function(d){d.marks.transparency=a});c.title&&(f.chart.title.format.transparency=a);c.axes&&(f.chart.axes.transparency=
a);c.panel&&(f.chart.panel.format.transparency=a)};this.start=function(){c=this.fade;this.setTransp(1)};this.stop=function(){this.setTransp(0)};this.doStep=function(a){f.setTransp(1-a)}};Tee.FadeAnimation.prototype=new Tee.Animation;Tee.SeriesAnimation=function(g){function f(d,a,c){a.automatic=!1;var f=.5*(d.oldmin+d.oldmax);d=.5*(d.oldmax-d.oldmin);a.maximum=f+c*d;a.minimum=f-c*d}Tee.Animation.call(this,g);g instanceof Tee.Series?(this.series=g,this.chart=g.chart):this.series=null;this.oldmax=this.oldmin=
0;this.oldauto=!0;var c=1,a=this;this.kind="axis";this.getAxis=function(){var a=this.series||this.chart.series.firstVisible();return a?a.mandatoryAxis:null};this.doStep=function(d){var b=a.getAxis();b&&(b.automatic=!1);"axis"==a.kind?f(a,b,1+100*(1-d)):a.chart.series.each(function(b){if(!a.series||a.series===b){var f=b.data.values,g=b.data._old,e=f.length;if(b instanceof Tee.Pie)b.rotation=360*(1-d),c=d;else if("each"==a.kind){var h=e*d|0;for(b=0;b<h;b++)f[b]=g[b];h<e&&(f[h]=g[h]*(e*d-h))}else if("all"==
a.kind)for(b=0;b<e;b++)f[b]=g[b]*d;else"axis"!=a.kind&&(c=d)}})};this.stop=function(){var d=a.getAxis();d&&(d.maximum=a.oldmax,d.minimum=a.oldmin,d.automatic=a.oldauto);a.chart.series.each(function(b){b.transform&&(b.transform=null);"each"!=a.kind&&"all"!=a.kind||!b.data._old||(b.data.values=b.data._old,b.data._old=null)})};this.start=function(){var a=this.getAxis(),b=this.chart,g=b.series.items,m=b.chartRect.width,n=b.chartRect.height,e,h=b.bounds.width,k=b.bounds.height;if(0===g.length)return!1;
this.oldmin=a.minimum;this.oldmax=a.maximum;this.oldauto=a.automatic;for(b=0;b<g.length;b++)if(e=g[b],!this.series||this.series===e)if(e instanceof Tee.Pie)e.transform=function(){this.chart.ctx.scale(c,c)};else if("each"==this.kind||"all"==this.kind){var l=e.data.values,p=l.length;e.data._old=l.slice(0);for(e=0;e<p;e++)l[e]=0;a.automatic=!1}else"left"==this.kind?e.transform=function(){this.chart.ctx.translate(-m*(1-c),0)}:"right"==this.kind?e.transform=function(){this.chart.ctx.translate(m*(1-c),
0)}:"x"==this.kind?e.transform=function(){this.chart.ctx.scale(c,1)}:"y"==this.kind?e.transform=function(){this.chart.ctx.scale(1,c)}:"top"==this.kind?e.transform=function(){this.chart.ctx.translate(0,-n*(1-c))}:"bottom"==this.kind?e.transform=function(){this.chart.ctx.translate(0,n*(1-c))}:"zoomin"==this.kind?e.transform=function(){var a=this.chart.ctx;a.translate(.5*h,.5*k);a.scale(c,c);a.translate(.5*-h,.5*-k)}:(this.kind="zoomout",e.transform=function(){var a=this.chart.ctx;a.translate(.5*h,.5*
k);a.scale(2-c,2-c);a.translate(.5*-h,.5*-k)});"axis"==this.kind&&f(this,a,100)}};Tee.SeriesAnimation.prototype=new Tee.Animation;Tee.MarksAnimation=function(g){function f(b,c,d){return c<=a.current?d:""}Tee.Animation.call(this,g);g&&g instanceof Tee.Series?(this.series=g,this.chart=g.chart):this.series=null;this.current=-1;var c=this.series.marks,a=this,d;this.start=function(){d=c.ongettext;c.ongettext=f};this.stop=function(){c.ongettext=d;this.current=-1};this.doStep=function(b){a.current=a.series.data.values.length*
b|0}};Tee.MarksAnimation.prototype=new Tee.Animation}).call(this);
