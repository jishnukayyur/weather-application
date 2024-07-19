import { Component } from '@angular/core';
import { WeatherServicesService } from 'src/app/services/weather-services.service';

@Component({
  selector: 'app-weather-data',
  templateUrl: './weather-data.component.html',
  styleUrls: ['./weather-data.component.css']
})
export class WeatherDataComponent {
  weatherData: any=[];
  imageUrl:string='';

  location: string = '';
  fromDate: string='';
  toDate: string='';
  locations: string[] = []
  historicalWeatherData:any=[]
  constructor(private _service:WeatherServicesService){
    this.locations=['Delhi', 'Moscow', 'Paris', 'New York', 'Sydney', 'Riyadh'];
    this.location=this.locations[0]
  }

  ngOnInit(){
    this.getWeatherdata()
  }

  getWeatherdata(){
    this._service.getCurrentWeather(this.location).subscribe((data)=>{
      this.weatherData=data;
      if(this.weatherData){
        this.setIconData(this.weatherData.weather[0].icon)
      }
    })
  }

  setIconData(icon:string){
    this.imageUrl=`http://openweathermap.org/img/wn/${icon}.png`
  }

  getHistoricalWeatherData(){
    debugger
    if((this.fromDate || this.toDate == null) || (this.fromDate || this.toDate == '')){
      alert('FromDate/ToDate needed')
    }



    this._service.getCoordinates(this.location).subscribe(coordinates => {
      if (coordinates && coordinates.length > 0) {
        const { lat, lon } = coordinates[0];
        const startDateTimestamp = new Date(this.fromDate).getTime() / 1000;
        const endDateTimestamp = new Date(this.toDate).getTime() / 1000;

        this.historicalWeatherData = [];

        for (let dt = startDateTimestamp; dt <= endDateTimestamp; dt += 86400) {
          this._service.getHistoricalWeather(lat, lon, dt).subscribe(data => {
            this.historicalWeatherData.push(data);
          });
        }
      }
    });
  }

}
