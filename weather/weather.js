const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
   
    url:`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=ed506edc6d1e34e231df5cb9a9963acd`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Forecast.io server.');
    } else if (response.statusCode === 400) {
      callback('Unable to fetch weather.');
    } else if (response.statusCode === 200) {
      callback(undefined, {
       weather_main: body.weather[0].main,
       weather_description:body.weather[0].description,
       weather_icon:body.weather[0].icon,

        main_temp:body.main.temp,
        name:body.name,
        clouds:body.clouds.all
      ,
       coord_lon:body.coord.lon,
       coord_lat:body.coord.lat,
       main_pressure:body.main.pressure,
       main_humidity:body.main.humidity,
       main_temp_min:body.main.temp_min,
        main_temp_max:body.main.temp_max,
       main_sea_level:body.main.sea_level,
       main_grnd_level:body.main.grnd_level,
       wind_speed:body.wind.speed,
       wind_deg:body.wind.deg,
       rain_h:body.rain,
       dt:body.dt,
       sys_sunrise:body.sys.sunrise,
       sys_sunset:body.sys.sunset

      });
    }
  });
};

module.exports.getWeather = getWeather;
