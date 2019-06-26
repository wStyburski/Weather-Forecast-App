import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { shareReplay } from 'rxjs/operators';
import { WeatherData } from '../interfaces/weather-data';

@Injectable({
  providedIn: 'root'
})
export class WeatherService
{
  private weatherRequest: Observable<WeatherData>;

  constructor(private http: HttpClient) { }

  public GetWeatherData(lat: string, lng: string): Observable <WeatherData>
  {
    if (!this.weatherRequest)
    {
      this.weatherRequest = this.http
        .get<WeatherData>(environment.apiWeatherUrl + '?lat=' + lat + '&lon=' + lng + '&units=metric&appid=' + environment.apiWeatherKey)
        .pipe(shareReplay());
    }
    return this.weatherRequest;
  }

  public GetWeatherDataByCity(city: string): Observable <WeatherData>
  {
    if (!this.weatherRequest)
    {
      this.weatherRequest = this.http
        .get<WeatherData>(environment.apiWeatherUrl + '?q=' + city + '&units=metric&appid=' + environment.apiWeatherKey)
        .pipe(shareReplay());
    }

    return this.weatherRequest;
  }

  public ClearCache(): void
  {
    this.weatherRequest = null;
    // console.log('this.weatherRequest = null;');
  }
}
