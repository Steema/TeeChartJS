import { Component, ElementRef, OnInit, ViewChild, asNativeElements } from '@angular/core';
import { WeatherService } from './weather.service';
import { Tee } from 'node_modules/TeeChart/lib/teechart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('canvas1') canvas1;
  @ViewChild('canvas2') canvas2;

  tChart1 : Tee.Chart;
  
  constructor(private _weather: WeatherService) {}

  ngAfterViewInit() {

    this.tChart1 = new Tee.Chart("canvas1");

    var aLine = new Tee.Line();
    this.tChart1.addSeries(aLine);
    this.tChart1.applyTheme("minimal");
    this.tChart1.legend.visible = false;
    this.tChart1.axes.bottom.labels.rotation = 90;
    this.tChart1.series.items[0].format.stroke.size=3;
    aLine.smooth = 0.25;
    this.tChart1.title.text="TeeChart for Angular";

    this._weather.dailyForecast()
      .subscribe(res => {
        let temp_max = res['list'].map(res => res.main.temp_max)
        let temp_min = res['list'].map(res => res.main.temp_min)
        let alldates = res['list'].map(res => res.dt)

        let weatherDates = []
        alldates.forEach((res) => {
          let jsdate = new Date(res * 1000)
          weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric'}))
        })
        //connect to weather data
        aLine.data.values = temp_max;
        aLine.data.labels = weatherDates;
        //plot chart
        this.tChart1.draw();
      })
  }
}