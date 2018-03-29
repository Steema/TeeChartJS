/**
 * @preserve TeeChart(tm) for JavaScript(tm)
 * @fileOverview TeeChart for JavaScript(tm)
 * v2.4 Feb 2018
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
 * @version 2.4
 */

/*global XMLHttpRequest, ActiveXObject */

/**
 * @namespace Tee.Data namespace, Multi-Dimensional Charting.
 */
var Tee=Tee || {};

(function() {
 "use strict";

Tee.Chart.prototype.drawReflection=function()
{
  var c=this.ctx, h=this.bounds.height;

  c.scale(1,-1);
  c.translate(0,-h*2);

  this.ondraw=null;
  this.draw();
  c.translate(0,h*2);
  c.scale(1,-1);

  var mirrorHeight=this.canvas.height-h, y=h,
      gradient = c.createLinearGradient( 0, y, 0, y+mirrorHeight),
      color=this.reflectionColor;

  gradient.addColorStop( 0, colorAlpha(color,0.5));
  gradient.addColorStop( 1, colorAlpha(color,1));
  c.fillStyle = gradient;
  c.beginPath();
  c.shadowColor="transparent";
  c.rect( 0, y, this.bounds.width, mirrorHeight );
  c.fill();

  this.ondraw=this.drawReflection;
}

function colorAlpha(color,alpha) {
  return 'rgba( '+color[0]+', '+color[1]+', '+color[2]+', '+alpha+' )';
}


/*
  Copyright 2010 by Robin W. Spencer
  http://scaledinnovation.com/analytics/splines/aboutSplines.html

  Modifications by Steema Software.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You can find a copy of the GNU General Public License
    at http://www.gnu.org/licenses/.
*/

Tee.drawSpline=function(ctx,pts,t,move,closed){
  var cp=[], n=pts.length, i;

  function point(x0,y0,x1,y1,x2,y2,t){

      function square(x) { return x*x; }

      var d=Math.sqrt(square(x1-x0)+square(y1-y0)),
          a=t*d/(d+Math.sqrt(square(x2-x1)+square(y2-y1))),
          b=t-a;

      return [x1+a*(x0-x2),y1+a*(y0-y2),x1-b*(x0-x2),y1-b*(y0-y2)];
  }

  if(closed){
    if (move)
       ctx.moveTo(pts[0],pts[1]);

    pts.push(pts[0],pts[1],pts[2],pts[3]);
    pts.unshift(pts[n-1]);
    pts.unshift(pts[n-1]);

    for(i=0;i<n;i+=2)
        cp=cp.concat(point(pts[i],pts[i+1],pts[i+2],pts[i+3],pts[i+4],pts[i+5],t));

    cp=cp.concat(cp[0],cp[1]);

    for(i=2;i<n+2;i+=2)
        ctx.bezierCurveTo(cp[2*i-2],cp[2*i-1],cp[2*i],cp[2*i+1],pts[i+2],pts[i+3]);
  }
  else
  {
    for(i=0;i<n-4;i+=2)
        cp=cp.concat(point(pts[i],pts[i+1],pts[i+2],pts[i+3],pts[i+4],pts[i+5],t));

    if (move)
       ctx.moveTo(pts[0],pts[1]);

    ctx.quadraticCurveTo(cp[0],cp[1],pts[2],pts[3]);

    for(i=2;i<n-5;i+=2)
        ctx.bezierCurveTo(cp[2*i-2],cp[2*i-1],cp[2*i],cp[2*i+1],pts[i+2],pts[i+3]);

    ctx.quadraticCurveTo(cp[2*n-10],cp[2*n-9],pts[n-2],pts[n-1]);
  }
}

function modCustomAxes(c,featureColor,defaultStrokeColor) {
  for (var i = 0; i < c.axes.items.length; i++) {
	  if (i>3){
		c.axes.items[i].labels.format.font.setSize(11);
		c.axes.items[i].format.stroke.fill = defaultStrokeColor;
		c.axes.items[i].labels.format.font.fill = featureColor;
		c.axes.items[i].title.format.font.fill = featureColor;
		c.axes.items[i].title.format.font.setSize(20);
		c.axes.items[i].grid.visible=false;
  	    c.axes.items[i].grid.format.stroke.size = 0.6;
	    c.axes.items[i].grid.format.stroke.fill = "silver";
	  }
	}
}

function defaultTheme(c) {

  var featureColor = "rgba(0,0,0,1)";
  var defaultStrokeColor = "rgba(39,79,105,0.8)";
  var backBlendColor = "white";
  var seriesPenColor = "white";
  
  c.title.format.font.style="18px Verdana";
  c.walls.visible=true;
  c.panel.format.shadow.visible=false;
  c.panel.format.round.x=8;
  c.panel.format.round.y=8;
  c.panel.format.gradient.visible=true;
  c.panel.format.gradient.colors=["rgba(224,224,224,1.0)","white"];
  c.panel.format.gradient.direction="diagonalup";
  c.panel.format.stroke.fill="rgba(204,204,204,1.0)";
  c.panel.format.stroke.size = 1;
  
  applyPalette(c,"opera");
  
  if (c.series.items.length > 0) {
  	for (var i = 0; i < c.series.items.length; i++)
	  {
			c.series.items[i].format.fill=c.palette.get(i);
			if (c.series.items[i].pointer != null)
			{
				c.series.items[i].pointer.format.fill=c.palette.get(i);
				c.series.items[i].pointer.format.stroke.fill = backBlendColor;
			}
	  }
  }  
  
  c.axes.left.labels.format.font.setSize(11);
  c.axes.bottom.labels.format.font.setSize(11);
  c.axes.left.format.stroke.fill = defaultStrokeColor;
  c.axes.bottom.format.stroke.fill = defaultStrokeColor;
  c.axes.left.labels.format.font.fill = featureColor;
  c.axes.bottom.labels.format.font.fill = featureColor;
  c.axes.left.title.format.font.fill = featureColor;
  c.axes.left.title.format.font.setSize(20);  
  c.axes.bottom.title.format.font.fill = featureColor;
  c.axes.bottom.title.format.font.setSize(20);
  c.axes.left.grid.visible=true;
  c.axes.bottom.grid.visible=false;

  c.axes.left.grid.format.stroke.size = 0.6;
  c.axes.bottom.grid.format.stroke.size = 0.6;
  c.axes.left.grid.format.stroke.fill = "silver";
  c.axes.bottom.grid.format.stroke.fill = "silver";

  c.axes.left.grid.visible=true;
  c.axes.top.grid.visible=true;
  c.axes.right.grid.visible=true;
  c.axes.bottom.grid.visible=true;

  if (c.axes.items.length > 0) {
    modCustomAxes(c,featureColor,defaultStrokeColor)
  }

  //legend
  c.legend.transparent=false;
  c.legend.format.fill = "white";
  c.legend.format.font.setSize(11);
  c.legend.format.font.fill = featureColor;  
  c.legend.fontColor = false;  
  
  //title
  c.title.format.font.fill = featureColor;
  
  c.walls.visible = false;  
}

function twilightTheme(c) {

  var featureColor = "rgba(224,224,224,0.6)";
  var defaultStrokeColor = "rgba(39,79,105,0.8)";
  var backBlendColor = "rgba(82,82,82,1)";
  var seriesPenColor = "white";
  
  c.title.format.font.style="18px Verdana";
  c.walls.visible=true;
  c.panel.format.shadow.visible=false;
  c.panel.format.round.x=8;
  c.panel.format.round.y=8;
  c.panel.format.gradient.visible=true;
  c.panel.format.gradient.colors=["rgba(99,99,99,1.0)","rgba(19,19,19,1.0)"];
  c.panel.format.gradient.direction="topbottom";
  c.panel.format.stroke.fill="rgba(204,204,204,1.0)";
  c.panel.format.stroke.size = 1;
  
  applyPalette(c,"redRiver");
  
  if (c.series.items.length > 0) {
  	for (var i = 0; i < c.series.items.length; i++)
	  {
			c.series.items[i].format.fill=c.palette.get(i);
			if (c.series.items[i].pointer != null)
			{
				c.series.items[i].pointer.format.fill=c.palette.get(i);
				c.series.items[i].pointer.format.stroke.fill = backBlendColor;
			}
	  }
  }
  
  //axes
  c.axes.left.format.stroke.fill = featureColor;
  c.axes.bottom.format.stroke.fill = featureColor;
  c.axes.left.labels.format.font.setSize(11);
  c.axes.bottom.labels.format.font.setSize(11);
  c.axes.left.labels.format.font.fill = featureColor;
  c.axes.bottom.labels.format.font.fill = featureColor;
  c.axes.left.title.format.font.fill = featureColor;
  c.axes.left.title.format.font.setSize(20);  
  c.axes.bottom.title.format.font.fill = featureColor;
  c.axes.bottom.title.format.font.setSize(20);
  c.axes.bottom.grid.visible=false;
  c.axes.left.grid.visible=true; 
  c.axes.left.grid.format.stroke.fill = "silver";
  c.axes.bottom.grid.format.stroke.fill = "silver";
  
  if (c.axes.items.length > 0) {
    modCustomAxes(c,featureColor,defaultStrokeColor)
  }
  
  //legend
  c.legend.transparent=true;
  c.legend.format.font.setSize(14);
  c.legend.format.font.fill = featureColor;
  c.legend.format.fill = "rgba(0,0,0,0.1)";
  
  //title
  c.title.format.shadow.visible=false;
  var baseFontStyle = "18px Arial";
  c.title.format.font.style=baseFontStyle;
  c.title.format.font.style="bold " + baseFontStyle;
  c.title.format.font.fill = featureColor;
  c.title.format.font.shadow.visible=false;    
  
  c.walls.visible = false;  
}

function daybreakTheme(c) {

  var darkContrastColor = "rgba(14,14,54,0.6)";
  var featureColor = "rgba(224,224,224,0.6)";
  var defaultStrokeColor = "rgba(39,79,105,0.8)";
  var backBlendColor = "rgba(82,82,82,1)";
  var seriesPenColor = "white";
  
  c.title.format.font.style="18px Verdana";
  c.walls.visible=true;
  c.panel.format.shadow.visible=false;
  c.panel.format.round.x=8;
  c.panel.format.round.y=8;
  c.panel.format.gradient.visible=true;
  c.panel.format.gradient.colors=["rgba(201,204,242,1.0)","rgba(255,252,255,1.0)","rgba(21,21,23,1.0)"];
  c.panel.format.gradient.direction="topbottom";
  c.panel.format.stroke.fill="rgba(204,204,204,1.0)";
  c.panel.format.stroke.size = 1;
  
  applyPalette(c,"redRiver");
  
  if (c.series.items.length > 0) {
  	for (var i = 0; i < c.series.items.length; i++)
	  {
			c.series.items[i].format.fill=c.palette.get(i);
			if (c.series.items[i].pointer != null)
			{
				c.series.items[i].pointer.format.fill=c.palette.get(i);
				c.series.items[i].pointer.format.stroke.fill = backBlendColor;
			}
	  }
  }

  //axes
  for (var i=0; i<c.axes.items.length; i++) {
    var a = c.axes.items[i];
    a.format.stroke.fill = darkContrastColor;
    a.labels.format.font.setSize(11);
    a.labels.format.font.fill = featureColor;
    a.title.format.font.setSize(20);
    a.title.format.font.fill = featureColor;
    a.grid.visible=i<3;
    a.grid.format.stroke.fill = "silver";
  }
  
  //legend
  c.legend.transparent=true;
  c.legend.format.font.setSize(14);
  c.legend.format.font.fill = "silver";
  
  //title
  c.title.format.shadow.visible=false;
  var baseFontStyle = "18px Arial";
  c.title.format.font.style=baseFontStyle;
  c.title.format.font.style="bold " + baseFontStyle;
  c.title.format.font.fill = darkContrastColor;
  c.title.format.font.shadow.visible=false;  
  
  c.walls.visible = false;  
}

function minimalTheme(c) {
  //designed with white background in mind
  c.title.transparent=true;
  c.walls.visible=false;
  c.footer.transparent=true;
  c.panel.format.shadow.visible=false;
  c.panel.format.stroke.fill="";
  c.panel.format.round.x=0;
  c.panel.format.round.y=0;
  c.panel.format.gradient.visible=false;
  c.panel.format.fill="white";
  
  var featureColor = "rgba(124,124,144,0.9)";
  var defaultStrokeColor = "rgba(39,79,105,0.8)";
  var invisibleStrokeColor = "rgba(0,0,0,0.0)";
  var backBlendColor = "white";
  var seriesPenColor = "white";
  
  applyPalette(c,"seaWash");
  
  if (c.series.items.length > 0) {
      for (var i = 0; i < c.series.items.length; i++) {
          c.series.items[i].format.fill=c.palette.get(i);
          if ((c.series.items[i].pointer != null) && (c.series.items[i].pointer.format != null)) {
              c.series.items[i].pointer.format.fill=c.palette.get(i);
              c.series.items[i].pointer.format.stroke.fill = backBlendColor;
          }
      }
  }
  
  //axes
  for (var i=0; i<c.axes.items.length; i++) {
    var a = c.axes.items[i];
    a.format.stroke.fill = defaultStrokeColor;
    a.labels.format.font.setSize(14);
    a.labels.format.font.fill = featureColor;
    a.title.format.font.setSize(20);
    a.title.format.font.fill = featureColor;
  }

  /*c.series.each(function(series) {
    series.notmandatory.grid.visible=false;
  });*/  
  c.axes.left.grid.visible=true;
  c.axes.bottom.grid.visible=false;
  c.axes.left.grid.format.stroke.size = 0.6;
  c.axes.bottom.grid.format.stroke.size = 0.6;
  c.axes.left.grid.format.stroke.fill = "silver";
  c.axes.bottom.grid.format.stroke.fill = "silver";
  
  if (c.axes.items.length > 0) {
    modCustomAxes(c,featureColor,defaultStrokeColor)
  }

  //legend
  c.legend.transparent=true;
  c.legend.format.font.setSize(14);
  c.legend.format.font.fill = featureColor;
  
  //title
  c.title.format.shadow.visible=false;
  var baseFontStyle = "18px Arial";
  c.title.format.font.style=baseFontStyle;
  c.title.format.font.style="bold " + baseFontStyle;
  c.title.format.font.fill = featureColor;
  c.title.format.font.shadow.visible=false;

}

function excelTheme(c) {

  minimalTheme(c);
 
  var featureColor = "rgba(0,0,0,0.9)";
  var defaultStrokeColor = "rgba(39,79,105,0.8)";
  var backBlendColor = "white";
  var seriesPenColor = "white";
  
  applyPalette(c,"excel");
  
  c.axes.left.grid.format.stroke.fill = featureColor;
  c.axes.bottom.grid.format.stroke.fill = featureColor;
  
  if (c.series.items.length > 0) {
	  for (var i = 0; i < c.series.items.length; i++)
	  {
			c.series.items[i].format.fill=c.palette.get(i);
			if (c.series.items[i].pointer != null)
			{
				c.series.items[i].pointer.format.fill=c.palette.get(i);
				c.series.items[i].pointer.format.stroke.fill = backBlendColor;
			}
	  }
  }
}

function darkTheme(c) {
  
  applyPalette(c,"onBlack");
    
  var featureColor = "rgba(224,224,224,0.6)";
  var defaultStrokeColor = "rgba(39,79,105,0.8)";
  var backBlendColor = "rgba(82,82,82,1)";
  var seriesPenColor = "white";
  
  c.title.transparent=true;
  c.legend.transparent=true;
  c.footer.transparent=true;
  
  //panel
  c.panel.format.shadow.visible=false;
  c.panel.format.stroke.fill="";
  c.panel.format.round.x=0;
  c.panel.format.round.y=0;
  c.panel.format.gradient.colors=["rgba(0,0,0,1)","rgba(0,0,0,1)"];
  c.panel.format.gradient.visible=true;

  if (c.series.items.length > 0) {
  	for (var i = 0; i < c.series.items.length; i++)
	  {
			c.series.items[i].format.fill=c.palette.get(i);
			if (c.series.items[i].pointer != null)
			{
				c.series.items[i].pointer.format.fill=c.palette.get(i);
				c.series.items[i].pointer.format.stroke.fill = backBlendColor;
			}
	  }
  }
  
  //axes
  c.axes.left.format.stroke.fill = featureColor; //defaultStrokeColor;
  c.axes.bottom.format.stroke.fill = featureColor; //defaultStrokeColor;
  c.axes.left.labels.format.font.setSize(14);
  c.axes.bottom.labels.format.font.setSize(14);
  c.axes.left.labels.format.font.fill = featureColor;
  c.axes.bottom.labels.format.font.fill = featureColor;
  c.axes.left.title.format.font.fill = featureColor;
  c.axes.left.title.format.font.setSize(20);  
  c.axes.bottom.title.format.font.fill = featureColor;
  c.axes.bottom.title.format.font.setSize(20);
  c.axes.bottom.grid.visible=false;
  c.axes.left.grid.visible=true;
  c.axes.left.grid.format.stroke.fill = "silver";
  c.axes.bottom.grid.format.stroke.fill = "silver";
  
  if (c.axes.items.length > 0) {
    modCustomAxes(c,featureColor,defaultStrokeColor)
  }
  
  //walls
  c.walls.visible=false;

  //legend
  c.legend.transparent=true;
  c.legend.format.font.setSize(14);
  c.legend.format.font.fill = featureColor;
  
  //title
  c.title.format.shadow.visible=false;
  var baseFontStyle = "18px Arial";
  c.title.format.font.style=baseFontStyle;
  c.title.format.font.style="bold " + baseFontStyle;
  c.title.format.font.fill = featureColor;
  c.title.format.font.shadow.visible=false;
}

Tee.Chart.prototype.applyTheme=function(theme) {
  if ((!theme) || (theme==""))
    this.applyTheme("default");
  else
  if (theme=="default")
     defaultTheme(this);
  else
  if (theme=="minimal")
     minimalTheme(this);
  else
  if (theme=="excel")
     excelTheme(this);
  else
  if (theme=="dark")
    darkTheme(this);
  else
  if (theme=="twilight")  	
	twilightTheme(this);
  else
  if (theme=="daybreak")  	
	daybreakTheme(this);	

  this.themeName = theme;	
  this.draw();
}

Tee.Chart.prototype.applyPalette=function(paletteName) {
  applyPalette(this,paletteName);
}

function applyPalette(c,paletteName) {
 
  //default (Opera)
  var colorList = [ "#4466a3", "#f39c35", "#f14c14", "#4e97a8", "#2b406b",
                    "#1d7b63", "#b3080e", "#f2c05d", "#5db79e", "#707070",
                    "#f3ea8d", "#b4b4b4"];

  /*Castaway*/					 
  if (paletteName=="castaway")
    colorList = ["#4466a3", "#E8D0A9","#B7AFA3","#C1DAD6","#F5FAFA","#ACD1E9","#6D929B"];
  else /*ClassicPalette*/
  if (paletteName=="classic")	
	colorList = ["#0000FF","#00FF00","#00FFFF","#FF0000","#FF00FF","#FFFF00","#000080",
	             "#008000","#008080","#800000","#808000","#808080"];				   
  else /*Cool*/				
	if (paletteName=="cool")
		colorList=["rgba(43,64,107,1.0)","rgba(59,84,140,1.0)","rgba(68,102,163,1.0)",
		           "rgba(78,151,168,1.0)","rgba(93,183,158,1.0)","rgba(65,160,138,1.0)",
				   "rgba(43,146,125,1.0)","rgba(29,123,99)"];				 
  else /*Excel*/
  if (paletteName=="excel")
     colorList = ["#FF9999","#663399","#CCFFFF","#FFFFCC","#660066","#8080FF","#CC6600",
                  "#FFCCCC","#800000","#FF00FF","#00FFFF","#FFFF00","#800080","#000080",
				  "#808000","#FF0000","#FFCC00","#FFFFCC","#CCFFCC","#00FFFF","#FFCC99",
				  "#CC99FF"];
  else /*GrayscalePalette*/ 
  if (paletteName=="grayscale")	
	colorList = ["#F0F0F0","#E0E0E0","#D0D0D0","#C0C0C0","#B0B0B0","#A0A0A0","#909090",
	             "#808080","#707070","#606060","#505050","#404040","#303030","#202020",
				 "#101010"];	
  else /*MacOSPalette*/ 
  if (paletteName=="macOS")	
	colorList = ["#FFFFFF","#FCF305","#FF6402","#DD0806","#F20884","#4600A5","#0000D4",
	             "#02ABEA","#1FB714","#006411","#562C05","#90713A","#C0C0C0","#808080",
				 "#404040","#000000"];	
  else /*ModernPalette*/ 
  if (paletteName=="modern")	
	colorList = ["#FF9966","#FF6666","#99CCFF","#669966","#CCCC99","#9966CC","#CC6666",
	             "#FFCC99","#9966FF","#CCCCCC","#66FFCC","#6699FF","#996699","#CCCCFF"];				 
  else /*OnBlack*/
	if (paletteName=="onBlack")
		colorList=["rgba(200,230,90,1.0)","rgba(90,150,220,1.0)","rgba(230,90,40,1.0)",
		           "rgba(230,160,15)"];
  else /*Opera - default*/
  if (paletteName=="opera")
	 colorList = colorList; //do nothing, Opera is default.
  else /*PastelsPalette*/
  if (paletteName=="pastels")	
	colorList = ["#CCFFFF","#FFFFCC","#CCCCFF","#00CCCC","#CCCCCC","#009999","#999999",
	             "#DDCCCC","#FFCC66","#CCCCFF","#FF9999","#FFFF99","#99CCFF","#CCFFCC"];	 
  else /*Rainbow*/
  if (paletteName=="rainbow")	
	colorList = ["#FF0000","#FF7F00","#FFFF00","#00FF00","#0000FF","#6600FF","#8B00FF"]
  else /*RedRiver*/
  if (paletteName=="redRiver")
    colorList = ["#DC5C05","#FFC519","#6EC5B8","#FF9000","#978B7D","#C7BAA7"];  //#FFAC00
  else /*Rust*/
  if (paletteName=="rust")	
	colorList = ["#CBFFFA","#7F3D17","#7F5E17","#22287F","#DD1E2F","#EBB035","#06A2CB",
	             "#218559","#D0C6B1","#B67721","#68819E","#747E80","#D5E1DD","#F7F3E8",
				 "#F2583E","#77BED2"];
  else /*SeaWash*/
  if (paletteName=="seaWash")
    colorList = ["#DC5C05","#FFAC00","#6EC5B8","#E8D0A9","#978B7D","#C7BAA7","#C1DAD6",
	             "#FFC99F","#ACD1E9","#6D929B","#D3E397","#FFF5C3"];
  else /*SolidPalette*/ 
  if (paletteName=="solid")	
	colorList = ["#0000FF","#FF0000","#00FF00","#FFCC00","#404040","#FFFF00","#FF00C0",
	             "#FFFFFF"];
  else /*TeeChart*/
  if (paletteName=="teechart")
	colorList=["rgba(255,0,0,1.0)","rgba(0,128,0,1.0)","rgba(255,255,0,1.0)","rgba(0,0,255,1.0)",
	           "rgba(255,255,255,1.0)","rgba(128,128,128,1.0)","rgba(255,0,255,1.0)",
			   "rgba(0,128,128,1.0)","rgba(0,0,128,1.0)","rgba(128,0,0,1.0)","rgba(0,255,0,1.0)",
			   "rgba(128,128,0,1.0)","rgba(128,0,128,1.0)","rgba(192,192,192,1.0)",
			   "rgba(0,255,255,1.0)","rgba(0,0,0,1.0)","rgba(173,255,47,1.0)","rgba(135,206,235,1.0)",
			   "rgba(255,228,196,1.0)","rgba(75,0,130,1.0)"];
  else /*Warm*/
  if (paletteName=="warm")
	colorList = ["rgba(243,234,141,1.0)","rgba(242,192,93,1.0)","rgba(243,156,53,1.0)",
	             "rgba(245,129,28,1.0)","rgba(243,107,21,1.0)","rgba(241,76,20,1.0)",
				 "rgba(230,24,10,1.0)","rgba(179,8,14)"];
  else /*WebPalette*/ 
  if (paletteName=="web")	
	colorList = ["#FFA500","#0000CE","#00CE00","#FFFF40","#40FFFF","#FF40FF","#FF4000",
	             "#8080A5","#808040"];				 
  else /*RainbowWidePalette*/ 
  if (paletteName=="rainbowWide")	
	colorList = ["#990000","#C30000","#EE0000","#FF1A00","#FF4600","#FF7300","#FF9F00",
	             "#FFCB00","#FFF700","#E3F408","#C3E711","#A3DA1B","#83CD25","#63C02E",
				 "#42B338","#22A642","#029A4B","#0C876A","#1A758A","#2863AA","#3650CB",
				 "#443EEB","#612AFF","#9615FF","#CC00FF"];				 
  else /*WindowsVistaPalette*/
  if (paletteName=="windowsVista")	
	colorList = ["#001FD2","#E00201","#1E6602","#E8CD7E","#AFABAC","#A4D0D9","#3D3B3C",
	             "#95DD31","#9E0001","#DCF774","#45FDFD","#D18E74","#A0D891","#D57A65",
				 "#9695D9"];
  else /*WindowsXPPalette*/ 
  if (paletteName=="windowsxp")	
	colorList = ["rgba(130,155,254,1.0)","rgba(252,209,36,1.0)","rgba(124,188,13,1.0)","rgba(253,133,47,1.0)",
				 "rgba(253,254,252,1.0)","rgba(226,78,33,1.0)","rgba(41,56,214,1.0)","rgba(183,148,0,1.0)",
				 "rgba(90,134,0,1.0)","rgba(210,70,0,1.0)","rgba(211,229,250,1.0)","rgba(216,216,216,1.0)",
				 "rgba(95,113,123,1.0)"];
  else /*VictorianPalette*/
  if (paletteName=="victorian")	
	colorList = ["#5DA5A1","#C45331","#E79609","#F6E84A","#B1A2A7","#C9A784","#8C7951",
	             "#D8CDB7","#086553","#F7D87B","#016484"];				 
	
				 
  c.paletteName = paletteName;				 
  c.palette.colors = colorList;
    
  if (c.series.items.length > 0) {
	  for (var i = 0; i < c.series.items.length; i++)
	  {
		c.series.items[i].format.fill=c.palette.get(i);
		if ((c.series.items[i].pointer != null) && (c.series.items[i].pointer.format != null))
		{
		  c.series.items[i].pointer.format.fill=c.palette.get(i);
		}
	  }
  }	
  
  c.draw();
}

function makeHttpObject() {
  try {return new XMLHttpRequest();}
  catch (error) {}
  try {return new ActiveXObject("Msxml2.XMLHTTP");}
  catch (error) {}
  try {return new ActiveXObject("Microsoft.XMLHTTP");}
  catch (error) {}

  throw new Error("Could not create HTTP request object.");
}

Tee.doHttpRequest=function(target, url, success, failure) {
  var request = makeHttpObject();
  if (request) {
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        if ( (request.status === 200) || (request.status === 0) )
          success(target, request.responseText);
        else
        if (failure)
          failure(request.status, request.statusText);
      }
    };
    request.open("GET", url, true);
    request.send(null);
  }
}

Tee.Slider=function(chart,position) {
  Tee.Tool.call(this,chart);

  var touchDragging=false;
  
  var t=this.thumb=new Tee.Format(chart);
  t.round={ x:4, y:4}
  t.stroke.size=0.5;
  t.gradient.visible=false;
  t.gradient.direction="leftright";
  t.shadow.visible=false;

  var f=this.back=new Tee.Format(chart);
  f.fill="white";
  f.gradient.visible=false;
  f.stroke.fill="darkgrey";
  f.round={ x:4, y:4 }

  var g=this.grip=new Tee.Format(chart);
  g.round={ x:4, y:4}
  g.stroke.fill="rgb(20,20,20,1.0)";

  this.gripSize=3;

  var b=this.bounds={x:10, y:10, width:200, height:20};
  this.transparent=false;

  this.margin=16; // %
  this.min=0;
  this.max=100;

  this.position=(typeof position == 'undefined') ? 50 : position;

  this.useRange=false;
  this.thumbSize=8;
  this.horizontal=true;
  this.cursor="pointer";
  this.delta=0;

  function contains(r,p) {
    return (p.x>=r.x) && (p.x<=(r.x+r.width)) && (p.y>=r.y) && (p.y<=(r.y+r.height));
  }

  this.thumbRect=function(r) {
    var range=this.max-this.min,
        v=range > 0 ? (this.position-this.min)/range : 0;

    if (this.horizontal) {
       r.width=this.thumbSize;
       r.x=b.x+v*b.width-(r.width*0.5);
       r.y=b.y;
       r.height=b.height;
    }
    else
    {
      r.height=this.thumbSize;
      r.y=b.y+v*b.height-(r.height*0.5);
      r.x=b.x;
      r.width=b.width;
    }
  }

  var r={};

  this.gripRect=function(r) {
    if (this.horizontal) {
      var h=r.height*0.2;
      return {x:r.x-this.gripSize,y:(r.y+r.height*0.5)-h,width:2*this.gripSize,height:2*h};
    }
    else
    {
      var w=r.width*0.2;
      return {x:(r.x+r.width*0.5)-w,y:r.y-this.gripSize,width:2*w,height:2*this.gripSize};
    }
  }

  this.draw=function() {
    var d=this.horizontal ? b.height : b.width,
        m=d*this.margin*0.01;

    if (!this.transparent) {
       if (this.horizontal)
         this.back.rectangle(b.x,b.y+m,b.width,d-2*m);
       else
         this.back.rectangle(b.x+m,b.y,d-2*m,b.height);
    }

    if (this.onDrawThumb)
      this.onDrawThumb(this);

    this.thumbRect(r);

    if (this.invertThumb) {
      var th=this.thumb;

      if (this.horizontal) {
         th.rectangle(b.x,b.y+m,r.x,b.height-2*m);
         th.rectangle(b.x+r.x+r.width,b.y+m,b.width,b.height-2*m);
      }
      else
      {
         th.rectangle(b.x+m,b.y,b.width-2*m,r.y);
         th.rectangle(b.x+m,b.y+r.y+r.height,b.width-2*m,b.height);
      }
    }
    else
      this.thumb.rectangle(r);

    if (this.useRange) {
      if (this.horizontal) {
         var r1=this.gripRect(r);
         this.grip.rectangle(r1);
         r1.x+=r.width;
         this.grip.rectangle(r1);
      }
    }
  }

  this.clickAt=function(pos) {
    var off=this.horizontal ? b.x : b.y,
        s=this.horizontal ? b.width : b.height,
        ra=(this.max-this.min),
        v;

    v=this.min+Math.max(0,(pos+this.delta-off)*ra/s);

    if (v>this.max) v=this.max;

    if (this.onChanging) {
       var v2=this.onChanging(this,v);
       if (typeof v2 !== 'undefined')
          v=v2;
    }

    if (v<this.min) v=this.min; else if (v>this.max) v=this.max;

    this.chart.newCursor=this.cursor;

    if (this.position!=v)  {
      this.position=v;

      //requestAnimFrame(function() { this.chart.draw(); });

      this.chart.draw();
    }
  }

  this.resized=function() {
     if (this.onChanging) this.onChanging(this,this.position);
     this.chart.draw();
     this.chart.newCursor="col-resize";
  }
  this.chart.canvas.addEventListener('touchstart', function(e){
  	touchDragging=true;
  	e.preventDefault();
  });
  this.chart.canvas.addEventListener('touchend', function(e){
  	touchDragging=false;
  	e.preventDefault();
  });
  this.mousemove=function(p) {
    var s=this.horizontal ? b.width : b.height,
        pp=this.horizontal ? p.x : p.y,
        ra=(this.max-this.min);

    this.thumbRect(r);

    if (this.resizeBegin && (pp<(r.x+r.width))) {
      var old=this.thumbSize, dif=r.x-pp, v2=0.5*(dif*ra/s);
      this.thumbSize+=dif;
      this.position-=v2;

      if (this.position<this.min) {
        this.position=this.min;
        this.thumbSize=old;
      }

      this.resized();
    }
    else
    if (this.resizeEnd && (pp>r.x)) {
      var dif2=r.x+r.width-pp, v3=0.5*(dif2*ra/s);
      this.thumbSize -= dif2;
      this.position -= v3;
      this.resized();
    }
    else
    if (this.dragging||touchDragging) {
      this.clickAt(pp);
    }
    else
    {
      var ingrip=false;

      if (this.useRange) {
         var r1=this.gripRect(r);
         ingrip=contains(r1,p);
         if (!ingrip) {
           r1.x+=r.width;
           ingrip=contains(r1,p);
         }
      }

      if (ingrip)
         this.chart.newCursor="col-resize";
      else
      if (contains(r,p))
         this.chart.newCursor=this.cursor;
    }
  }

  var p={x:0,y:0};

  this.mousedown=function(event) {
    this.thumbRect(r);
    this.chart.calcMouse(event,p);

    var r1=this.gripRect(r);
    this.resizeBegin=this.useRange && contains(r1,p);
    r1.x+=r.width;

    this.resizeEnd=this.useRange && (!this.resizeBegin) && contains(r1,p);
    this.dragging=(!this.resizeBegin) && (!this.resizeEnd) && contains(r,p);

    if ((!this.resizeBegin) && (!this.resizeEnd)) {
      if (this.dragging)
        this.delta=(this.horizontal ? (r.x+r.width*0.5)-p.x : (r.y+r.height*0.5)-p.y);
      else
      if (contains(b,p))
      {
        var tmp=this.horizontal ? r.width*0.5 : r.height*0.5;
        this.delta=-tmp;
        this.clickAt(tmp+ (this.horizontal ? p.x : p.y));
      }
    }

    return this.dragging || this.resizeBegin || this.resizeEnd;
  }

  this.clicked=function() {
    var d=this.dragging || this.resizeBegin || this.resizeEnd;
    this.resizeBegin=this.resizeEnd=this.dragging=false;
    this.delta=0;
    return d;
  }

  this.mouseout=function() {
    this.resizeBegin=this.resizeEnd=this.dragging=false;
  }
}

Tee.Slider.prototype=new Tee.Tool();

Tee.Scroller=function(canvas,target) {
  Tee.Chart.call(this,canvas);

  this.target=target;

  this.aspect.clip=false;
  this.panel.transparent=true;
  this.title.visible=false;

  var scroller=this.scroller=new Tee.Slider(this);
  scroller.useRange=true;
  scroller.thumbSize=100;

  var u=scroller.thumb;
  u.shadow.height=0;
  u.transparency=0.6;
  u.stroke.fill="black";
  u.shadow.visible=false;

  scroller.horizontal=true;
  var b=scroller.bounds;
  b.x=0;
  b.y=0;
  b.width=this.bounds.width;
  b.height=this.bounds.height;
  scroller.margin=0;

  scroller.lock=false;

  this.tools.add(scroller);

  var o=this;

  target.ondraw=function() { if (!scroller.lock) o.draw(); }
  target.onscroll=function() {
    var a=this.axes.bottom, li=this.series, mi=li.minXValue(), ma=li.maxXValue(),
       dif=a.maximum-a.minimum;

    if (a.minimum<mi) { a.minimum=mi; a.maximum=a.minimum+dif; }
    if (a.maximum>ma) { a.maximum=ma; a.minimum=a.maximum-dif; }
  }

  this.useRange=function(value) {
    scroller.useRange=value;
    this.draw();
  }

  this.invertThumb=function(value) {
    scroller.invertThumb=value;
    this.draw();
  }

  scroller.onChanging=function(s,v) {
    var r=(s.thumbSize*(s.max-s.min)/s.bounds.width)*0.5,
        li=target.series, mi=li.minXValue(), ma=li.maxXValue();

    if ((v-r)<mi) v=mi+r;
    else
    if ((v+r)>ma) v=ma-r;

    target.axes.bottom.setMinMax(v-r,v+r);
    this.lock=true;

    //requestAnimFrame(function() {target.draw();});

    target.draw();
    this.lock=false;

    if (o.onChanging)
      o.onChanging(o,v-r,v+r);

    return v;
  }

  this.setBounds=function(x,y,width,height) {
    this.bounds.x=x;
    this.bounds.y=y;
    this.bounds.width=width;
    this.bounds.height=height;

    b.x=x;
    b.y=y;
    b.width=width;
    b.height=height;
  }

  scroller.onDrawThumb=function(s) {

    var r=target.chartRect, ctx=target.ctx;
    target.chartRect=scroller.bounds;
    target.ctx=scroller.chart.ctx;

    function saveAxis(axis,data) {
      var res={mi:axis.minimum, ma:axis.maximum, sp:axis.startPos, ep:axis.endPos}
      restoreAxis(axis,data);
      return res;
    }

    function restoreAxis(axis,old) {
      axis.minimum=old.mi;
      axis.maximum=old.ma;
      axis.startPos=old.sp;
      axis.endPos=old.ep;
      axis.scale=(old.ep-old.sp)/(old.ma-old.mi);
    }

    var b=scroller.bounds,
        c=target,
        li=c.series,
        h,v;

    s.min=li.minXValue();
    s.max=li.maxXValue();

    h=saveAxis(c.axes.bottom,{sp:b.x,ep:b.x+b.width,mi:s.min,ma:s.max});
    v=saveAxis(c.axes.left,{sp:b.y,ep:b.y+b.height,mi:li.minYValue(),ma:li.maxYValue()});

    var p=(h.mi+h.ma)*0.5,dif=(h.ma-h.mi),ra;

    if (s.position!=p) {
      s.thumbSize=dif*s.bounds.width/(s.max-s.min);
      ra=dif*0.5;
      if (o.onChanging) o.onChanging(o,p-ra,p+ra);
      s.position=p;
    }

    c.series.each(function(s) { if (s.visible && s.useAxes) s.draw();});

    restoreAxis(c.axes.bottom,h);
    restoreAxis(c.axes.left,v);

    c.chartRect=r;
    c.ctx=ctx;
  }
}

Tee.Scroller.prototype=new Tee.Chart();

Tee.SliderControl=function(canvas) {
  var tmp=new Tee.Chart(canvas);
  tmp.panel.transparent=true;
  tmp.title.visible=false;

  var s=new Tee.Slider(tmp);

  s.bounds.x=s.thumbSize+1;
  s.bounds.width=tmp.canvas.width-2*s.thumbSize-2;
  s.bounds.y=(tmp.canvas.height-s.bounds.height)*0.5;

  tmp.tools.add(s);
  return s;
}

Tee.CheckBox=function(chart,text,checked) {
  Tee.Annotation.call(this,chart);

  this.transparent=true;
  this.text=text;
  this.checked=checked || true;
  this.margins.left=10;

  this.cursor="pointer";
  
  this.check=new Tee.Format(chart);
  this.check.fill="white";

  this.draw=function() {
    Tee.Annotation.prototype.draw.call(this);

    var c=this.chart.ctx, x=this.position.x+2;

    var h=this.bounds.height*0.6, y=this.position.y+(this.bounds.height-h)*0.4;

    this.check.rectangle(x,y,h,h);

    if (this.checked) {
      c.beginPath();
      c.moveTo(x+3,y+5);
      c.lineTo(x+4,y+8);
      c.lineTo(x+7,y+2);
      this.check.stroke.prepare();
      c.stroke();
    }
  }

  this.chart.canvas.addEventListener('touchstart', function(){
	  
  });
  this.onclick=function( /*a,x,y*/ ) {
	  this.checked=!this.checked;
    if (this.onchange) this.onchange(this);
    return true;
  }

}

Tee.CheckBox.prototype=new Tee.Annotation();

}).call(this);
