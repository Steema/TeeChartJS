import { Component, ElementRef, OnInit, ViewChild, asNativeElements } from '@angular/core';
import { WeatherService } from './weather.service';
import { Tee } from 'node_modules/TeeChart/lib/teechart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  @ViewChild('canvas1') canvas1;
  @ViewChild('canvas2') canvas2;

  tChart1 : Tee.Chart;
  
  constructor(private _weather: WeatherService) {}

  ngAfterViewInit() {

    let tChart1 = new Tee.Chart("canvas1");

    var aLine = new Tee.Line();
    tChart1.addSeries(aLine);
    tChart1.applyTheme("minimal");
    tChart1.legend.visible = false;
    tChart1.axes.bottom.labels.rotation = 90;
    tChart1.axes.bottom.dateTime = true;
    //pending include date-format.js tChart1.axes.bottom.labels.dateFormat = "hh:mm:ss d-mmm-yy";
    tChart1.series.items[0].format.stroke.size=3;
    aLine.smooth = 0.25;

    tChart1.title.text="TeeChart for Angular";

    tChart1.zoom.enabled = false;

    var startX,startY,endX,endY; //abs coords
	  var chartStartX,chartStartY,chartEndX,chartEndY; //chart coords

    chartStartX = -1;

    var canvas = document.getElementById('canvas1') as HTMLCanvasElement;

    let canvasisDrawing = false;

    tChart1.mousemove= function(e) {
        if (!canvasisDrawing) {
          return;
      }

      endX = e.x;
      endY = e.y;
      
      // optional - draw (temp) here .. no Chart1.draw()
      var radius = 10; // or whatever
      var fillColor = '#ff0000';
      tChart1.ctx.fillStyle = "rgba(2, 34, 55, 0.6)";
      tChart1.ctx.strokeStyle = "#10DD00";
      
      var c = document.getElementById("canvas");

      var ctx = tChart1.ctx;
      ctx.beginPath();
      
      ctx.moveTo(startX, startY);
      ctx.lineTo(e.x, e.y);
      ctx.stroke();
      
      tChart1.draw();
    };

    tChart1.mousedown = function(e) {
      canvasisDrawing = true;

      var pMove = new Point(0, 0);
      getOffset(e,pMove);
      
      chartStartX=pMove.x;
      chartStartY=pMove.y;
      
      startX = pMove.x;
      startY = pMove.y;

      tChart1.draw();
    };
    tChart1.mouseup = function(e) {
      
      var pMove = new Point(0, 0);
      getOffset(e,pMove);
      
      chartEndX=pMove.x;
      chartEndY=pMove.y;
      
      canvasisDrawing = false;
      tChart1.draw();
    };
    tChart1.ondraw=function(chart) {
      var MSECSDAY=86400000,
        a=chart.axes.bottom,
        b=chart.axes.left,
        days=Math.round((a.maximum-a.minimum)/MSECSDAY);

      chart.ctx.font="italic 10px Arial";
      chart.ctx.fillStyle="red";
      chart.ctx.fillText("Powered by TeeChart", chart.canvas.width-85,10);

      var axRight = chart.axes.bottom.calc(chart.axes.bottom.maximum);
      var topLineY = 260;

      if (chartStartX != -1) {
        chart.ctx.fillStyle = "rgba(2, 34, 55, 1)";		
        chart.ctx.font = "10px Tahoma";
        chart.ctx.textAlign="start";
        chart.ctx.fillText("Line stats:",axRight-130,topLineY - 15);
        chart.ctx.fillText("startX: "+new Date( a.fromPos(chartStartX)).toDateString()+"",axRight-130,topLineY);
        chart.ctx.fillText("endX: "+ new Date( a.fromPos(chartEndX)).toDateString()+"",axRight-130,topLineY+15);
        chart.ctx.fillText("startY: "+ b.fromPos(chartStartY).toFixed(2)+"",axRight-130,topLineY+30);
        chart.ctx.fillText("endY: "+ b.fromPos(chartEndY).toFixed(2)+"",axRight-130,topLineY+45);       
        chart.ctx.strokeStyle = "#100000";
        chart.ctx.moveTo(startX, startY);
        chart.ctx.arc(startX, startY, 5, 0, 2 * Math.PI);
        chart.ctx.stroke();
        chart.ctx.beginPath();
        chart.ctx.strokeStyle = "#10DD00";
        chart.ctx.moveTo(startX, startY);
        chart.ctx.lineTo(endX, endY);
        chart.ctx.stroke();
        chart.ctx.beginPath();
        chart.ctx.strokeStyle = "#100000";
        chart.ctx.arc(endX, endY, 5, 0, 2 * Math.PI);
        chart.ctx.stroke();
      }
    }

    this._weather.dailyForecast()
      .subscribe(res => {
        let temp_max = res['list'].map(res => res.main.temp_max)
        let temp_min = res['list'].map(res => res.main.temp_min)
        let alldates = res['list'].map(res => res.dt)

        let weatherDates = []
        let chartDates = []
        alldates.forEach((res) => {
          let jsdate = new Date(res * 1000)
          chartDates.push(jsdate);
          //weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric'}))
        })
        //connect to weather data
        aLine.data.values = temp_max;
        //aLine.data.labels = weatherDates;
        aLine.data.x = chartDates;
        //plot chart
        tChart1.draw();
      })


      function Point(x, y) {
        this.x = x;
        this.y = y;
      }
      
      function getOffset(e,p)
      {
          p.x = e.clientX;
          p.y = e.clientY;

          var element = canvas;
          let rect = element.getBoundingClientRect();

          // IE, Moz3+, Chr, Op9.5+, Saf4+
          if (element.getBoundingClientRect) {
            
            let r = element.getBoundingClientRect();
            p.x -= r.left;
            p.y -= r.top;

            } //earlier Moz.
            else if (element.offsetParent)
            do {
              p.x -= element.offsetLeft;
              p.y -= element.offsetTop;
              this.element = element.offsetParent;
          } while (element);
      }      
  }
}