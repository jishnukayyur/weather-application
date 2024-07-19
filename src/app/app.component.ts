import { Component } from '@angular/core';
import { WeatherServicesService } from './services/weather-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-application';
  constructor(private _service:WeatherServicesService){

  }

  ngOnInit(){
    this._service.getCurrentWeather('india').subscribe(data=>{
      console.log('weatherData',data);
      
    })
  }
}
