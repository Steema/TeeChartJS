import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http: HttpClient) { }

  dailyForecast() {
    return this._http.get("https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=890ece5d2a4c64bcaaedd83a0df29b23")
      .pipe(map(result => result));
  }

}
