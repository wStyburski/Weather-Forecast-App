import { shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GeoLocationData } from '../interfaces/geo-location-data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private locationRequest: Observable<GeoLocationData>;

  constructor(private http: HttpClient) { }

  GetLocationData()
  {
    if(!this.locationRequest)
    {
      this.locationRequest = this.http.get<GeoLocationData>(environment.locationUrl).pipe(shareReplay());
    }
    return this.locationRequest;
  }
}
