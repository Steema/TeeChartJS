import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './weather.service';

declare global {
  interface Window {
    Tee: any;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements AfterViewInit {
  @ViewChild('canvas1', { static: true })
  canvas1!: ElementRef<HTMLCanvasElement>;

  tChart1!: any;

  constructor(private weather: WeatherService) {}

  ngAfterViewInit(): void {
    this.tChart1 = new window.Tee.Chart(this.canvas1.nativeElement);

    const aLine = new window.Tee.Line();
    this.tChart1.addSeries(aLine);
    this.tChart1.applyTheme('minimal');
    this.tChart1.legend.visible = false;
    this.tChart1.axes.bottom.labels.rotation = 90;
    this.tChart1.series.items[0].format.stroke.size = 3;
    aLine.smooth = 0.25;
    this.tChart1.title.text = 'TeeChart for Angular';

    this.weather.dailyForecast().subscribe((res: any) => {
      const temp_max = res['list'].map((r: any) => r.main.temp_max);
      const alldates = res['list'].map((r: any) => r.dt);

      const weatherDates = alldates.map((ts: number) =>
        new Date(ts * 1000).toLocaleDateString('en', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      );

      aLine.data.values = temp_max;
      aLine.data.labels = weatherDates;
      this.tChart1.draw();
    });
  }
}
