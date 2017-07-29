const path=require('path');
const http=require('http');
const publicPath=path.join(__dirname,'../public');
const express =require('express');
const socketIO=require('socket.io');
const port =process.env.PORT || 5000;

var app=express();
var server=http.createServer(app);
app.use(express.static(publicPath));
var io=socketIO(server);
	
const geocode = require('../geocode/geocode');
const weather = require('../weather/weather');
address="delhi";
io.on('connection',(socket)=>{
  sendWeather();
  console.log('New user is connected');
socket.on('newMessage',(msg)=>{
	address=msg.text;
	sendWeather();
  console.log('Sending data');
	
});

function sendWeather(){    
geocode.geocodeAddress(address, (errorMessage, results) => {
  if (errorMessage) {
console.log(' Server Geocode error',errorMessage)
  } else {
	console.log('Geocode sending',results.address);
	 socket.emit('newMessage',{
	text:results
});
	
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
  console.log('Weather error',errorMessage);
      } else {
        console.log('Sending weather from server');
        socket.emit('newWeather',{
  main_temp:weatherResults.main_temp,
  
  weather_main: weatherResults.weather_main,
       weather_description:weatherResults.weather_description,
       weather_icon:weatherResults.weather_icon,
        name:weatherResults.name,
        clouds:weatherResults.clouds,
        coord_lon:weatherResults.coord_lon,
        coord_lat:weatherResults.coord_lat,
        main_pressure:weatherResults.main_pressure,
        main_humidity:weatherResults.main_humidity,
        main_temp_min:weatherResults.main_temp_min,
        main_temp_max:weatherResults.main_temp_max,
        main_sea_level:weatherResults.main_sea_level,
        main_grnd_level:weatherResults.main_grnd_level,
        wind_speed:weatherResults.wind_speed,
        wind_deg:weatherResults.wind_deg,
        rain_h:weatherResults.rain_h,
        dt:weatherResults.dt,
        sys_sunrise:weatherResults.sys_sunrise,
        sys_sunset:weatherResults.sys_sunset
});
      }
    });
  }
});

}
});



io.on("disconnect",()=>
	{
		console.log("user is dissconected");
	});
server.listen(3000,()=>{
console.log('Server is up on port 3000');
});

