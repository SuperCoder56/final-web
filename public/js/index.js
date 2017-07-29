	var socket=io();

	socket.on("connect",function()
	{
		
 socket.on('newMessage',function(msg)
	{
		
	document.getElementById("location").innerHTML=`${msg.text.address}`;	
	});
			});

jQuery('#message-form').on('submit',function(e){
e.preventDefault();
			socket.emit('newMessage',{
	text:jQuery('[name=message]').val()});	
	});

		socket.on("disconnect",function()
	     {
		
		});
	
//Create module
function getTimeLocal(unix_timestamp){
	var date = new Date(unix_timestamp*1000);
// Hours part from the timestamp
var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;	
}

function currentTime(str){
$("#dt").html(getTimeLocal(str));
}
var longitude,lattitude
      
   
socket.on('newWeather',function(currentWeather){

$("#searchInput").val("");
$("#temp").html(`${currentWeather.main_temp}`);
$("#main").html(`${currentWeather.weather_main}`);
document.getElementById("myImg").src = "http://openweathermap.org/img/w/"+`${currentWeather.weather_icon}`+".png";
$("#weather_description").html(`${currentWeather.weather_description}`);
$("#clouds").html(`${currentWeather.clouds}`);
$("#coord_lon").html(`${currentWeather.coord_lon}`);
$("#coord_lat").html(`${currentWeather.coord_lat}`);
longitude =`${currentWeather.coord_lon}`;
lattitude =`${currentWeather.coord_lat}`;
$("#main_pressure").html(`${currentWeather.main_pressure}`);
$("#main_humidity").html(`${currentWeather.main_humidity}`);
$("#main_temp_min").html(`${currentWeather.main_temp_min}`);
$("#main_temp_max").html(`${currentWeather.main_temp_max}`);
$("#wind_speed").html(`${currentWeather.wind_speed}`);
$("#wind_deg").html(`${currentWeather.wind_deg}`);
$("#sys_sunrise").html(getTimeLocal(`${currentWeather.sys_sunrise}`));
$("#sys_sunset").html(getTimeLocal(`${currentWeather.sys_sunset}`));

   
setInterval(currentTime(`${currentWeather.dt}`),60000);	
});
