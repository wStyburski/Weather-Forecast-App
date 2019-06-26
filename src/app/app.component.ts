import { WeatherData } from './interfaces/weather-data';
import { WeatherService } from './services/weather.service';
import { GeoLocationData } from './interfaces/geo-location-data';
import { LocationService } from './services/location.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  geoLocationData: GeoLocationData;
  weatherData: WeatherData;
  error: string;
  images = [
    'https://images.unsplash.com/photo-1553640141-92b68750cf3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1493314894560-5c412a56c17c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1421091242698-34f6ad7fc088?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1491002052546-bf38f186af56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
  ];
  imageIndex = 0;
  silderHide = false;

  constructor(private locationService: LocationService, private weatherService: WeatherService) { }

  ngOnInit() {
    this.locationService
      .GetLocationData()
      .subscribe
      (
        response => {
          this.geoLocationData = response;
          // tslint:disable-next-line: max-line-length
          this.weatherService.GetWeatherData(response.lat, response.lon).subscribe(response2 => this.weatherData = response2, error => this.error = error.error.message);
        });

    if (window.screen.width < 800) {
      this.silderHide = true;
    }
  }

  ShowWeatherDetails() {
    this.weatherService.ClearCache();
    this.error = '';
    // tslint:disable-next-line: max-line-length
    this.weatherService.GetWeatherDataByCity(this.geoLocationData.city).subscribe(response => this.weatherData = response, error => this.error = error.error.message);
  }

  ChangeImage(index: number) {
    this.imageIndex = index;
  }

  HideSlider() {
    if (this.silderHide === false) {
      this.silderHide = true;
    } else {
      this.silderHide = false;
    }
  }
}
