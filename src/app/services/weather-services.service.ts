import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WeatherServicesService {

  baseUrl=environment.baseUrl;
  api_key=environment.api_key;
  icon_url=environment.icon_url;
  geo_url=environment.geo_url;
  oneCall_url=environment.oneCallUrl;
  private oneCallApiUrl: string = 'http://api.openweathermap.org/data/2.5/onecall/timemachine';
  constructor(private _http:HttpClient) { }

  getCurrentWeather(location  : string){
    return this._http.get<string[]>(`${this.baseUrl}/weather?q=${location}&appid=${this.api_key}`).pipe(
      catchError(error => {
        console.error('Error while fetching  data', error);
        return throwError(error);
      })
    );
  }

  getIcon(icon:string){
    return this._http.get<string[]>(`${this.icon_url}${icon}@2x.png`).pipe(
      catchError(error => {
        console.error('Error while fetching  data', error);
        return throwError(error);
      })
    );
  }

  getCoordinates(location: string): Observable<any> {
    return this._http.get(`${this.geo_url}?q=${location}&limit=1&appid=${this.api_key}`);
  }

  // getHistoricalWeather(lat: number, lon: number, dt: number){
  //   return this._http.get(`${this.oneCall_url}?lat=${lat}&lon=${lon}&dt=${dt}&appid=${this.api_key}`);
  // }
  getHistoricalWeather(lat: number, lon: number, dt: number): Observable<any> {
    const url = `${this.oneCallApiUrl}?lat=${lat}&lon=${lon}&dt=${dt}&appid=${this.api_key}`;
    return this._http.get(url);
  }
}
