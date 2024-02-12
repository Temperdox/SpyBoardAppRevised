let localLat;
let localLon;
let sunriseTime;
let sunsetTime;
let sunriseHourNum;
let sunriseMinNum;
let sunsetHourNum;
let sunsetMinNum;
let hour,min;

function suntimes(lat, lng, tz) {
  let d = new Date();
  let radians = Math.PI / 180.0;
  let degrees = 180.0 / Math.PI;

  let a = Math.floor((14 - (d.getMonth() + 1.0)) / 12)
  let y = d.getFullYear() + 4800 - a;
  let m = (d.getMonth() + 1) + 12 * a - 3;
  let j_day = d.getDate() + Math.floor((153 * m + 2)/5) + 365 * y + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400) - 32045;
  let n_star = j_day - 2451545.0009 - lng / 360.0;
  let n = Math.floor(n_star + 0.5);
  let solar_noon = 2451545.0009 - lng / 360.0 + n;
  let M = 356.0470 + 0.9856002585 * n;
  let C = 1.9148 * Math.sin( M * radians ) + 0.02 * Math.sin( 2 * M * radians ) + 0.0003 * Math.sin( 3 * M * radians );
  let L = ( M + 102.9372 + C + 180 ) % 360;
  let j_transit = solar_noon + 0.0053 * Math.sin( M * radians) - 0.0069 * Math.sin( 2 * L * radians );
  let D = Math.asin( Math.sin( L * radians ) * Math.sin( 23.45 * radians ) ) * degrees;
  let cos_omega = ( Math.sin(-0.83 * radians) - Math.sin( lat * radians ) * Math.sin( D * radians ) ) / ( Math.cos( lat * radians ) * Math.cos( D * radians ) );

  // sun never rises
  if( cos_omega > 1)
    return [null, -1];

  // sun never sets
  if( cos_omega < -1 )
    return [-1, null];

  // get Julian dates of sunrise/sunset
  let omega = Math.acos( cos_omega ) * degrees;
  let j_set = j_transit + omega / 360.0;
  let j_rise = j_transit - omega / 360.0;

  /*
  * get sunrise and sunset times in UTC
  * Check section "Finding Julian date given Julian day number and time of
  *  day" on wikipedia for where the extra "+ 12" comes from.
  */
  let utc_time_set = 24 * (j_set - j_day) + 12;
  let utc_time_rise = 24 * (j_rise - j_day) + 12;
  let tz_offset = tz === undefined ? -1 * d.getTimezoneOffset() / 60 : tz;
  let local_rise = (utc_time_rise + tz_offset) % 24;
  let local_set = (utc_time_set + tz_offset) % 24;
  return [local_rise, local_set];
}

let getSunTimes = function (input_lat, input_lng) {
  let times = suntimes(input_lat, input_lng);
  let sunrise_hour = (Math.floor(times[0]) < 10) ? "0" + Math.floor(times[0]) : Math.floor(times[0]);
  let sunrise_minute = (times[0] - Math.floor(times[0])) * 60;
  let sunset_hour = (Math.floor(times[1]) < 10) ? "0" + Math.floor(times[1]) : Math.floor(times[1]);
  let sunset_minute = (times[1] - Math.floor(times[1])) * 60;
  sunriseHourNum = Number(sunrise_hour);
  sunriseMinNum = Number(sunrise_minute);
  sunsetHourNum = Number(sunset_hour);
  sunsetMinNum = Number(sunset_minute);
  let sunrise = sunrise_hour + ":" + Math.floor(sunrise_minute);
  let sunset =  + sunset_hour + ":" + Math.floor(sunset_minute);
  sunriseTime = sunrise;
  sunsetTime = sunset;
}

let getSunTimesWithCity = function (city, state) {
  fetch("../json/cities.json")
    .then(response => response.json())
    .then(json => {
      for(let index = 0; index < json.length; index++){
        let obj = json[index];
        for (let cities in obj) {
          let cityData = obj[cities];
          if(cityData === city){
            for (let states in obj) {
              let stateData = obj[states];
              if (stateData === state){
                localLat = obj[Object.keys(obj)[2]];
                localLon = obj[Object.keys(obj)[3]];
                console.log("Lat: " + localLat + ", Lon:" + localLon + ". For state: " + state + ", and city: " + city);
                getSunTimes(localLat, localLon);
                updateTime();
              }
            }
          }
        }
      }
    });
}

let getSunTimesWithLocale = function () {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  function showPosition(position) {
    localLat = position.coords.latitude;
    localLon = position.coords.longitude;
    console.log("Grid loc based on func show position: " + localLat + ", " + localLon);
    console.log("Lat: " + localLat + ", Lon:" + localLon + ". For grid loc: " + localLat + ", " + localLon);
    getSunTimes(localLat, localLon);
    updateTime();
  }

}

function updateTime(){
  console.log("Sun rise: " + sunriseTime);
  console.log("Sun set: " + sunsetTime);
  let now = new Date(), // current date
    months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]; // you get the idea
  hour = (now.getHours() < 10 ? "0" + now.getHours() : now.getHours());
  let time = (now.getHours() < 10 ? "0" + now.getHours() : now.getHours()) + ':' + (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()); // again, you get the idea

    // a cleaner way than string concatenation
    let date = [now.getDate() < 10 ? "0" + now.getDate() : now.getDate(),
      months[now.getMonth()],
      now.getFullYear()].join(' ');

  // set the content of the element with the ID time to the formatted string
  document.getElementById('splash-time').innerHTML = [time];
  document.getElementById('splash-date').innerHTML = [date];
  if (time > sunriseTime && (time < sunsetTime)){
    //sunrise
    document.getElementById('background').classList.remove('night');
    document.getElementById('background').classList.add('day');
    document.getElementById('app').classList.remove('night');
    document.getElementById('app').classList.add('day');
  }else if (time > sunsetTime || time < sunriseTime){
    //sunset
    document.getElementById('background').classList.add('night');
    document.getElementById('background').classList.remove('day');
    document.getElementById('app').classList.add('night');
    document.getElementById('app').classList.remove('day');
  }
  console.log("Is it dark? " + time > sunsetTime);
  /*console.log("Is this correct? " +(Number(hour) > sunriseHourNum && (Number(hour) < sunsetHourNum)))*/
  // call this function again in 1000ms
  setTimeout(updateTime, 60000);
}

let getSunriseTime = function () {
  return sunriseTime
}

let getSunsetTime = function () {
  return sunsetTime
}

//sunPath.getTotalLength()
//sunPath.getPointAtLength(1)
var sun = document.getElementById('sunEl');
var sunPath = document.getElementById('sunPath');
var time = document.getElementById('time');
var sunPathL = sunPath.getTotalLength();
var curTime = new Date();
var sunrise = new Date();
sunrise.setHours(sunriseHourNum, sunriseMinNum)
var sunset = new Date();
sunset.setHours(sunsetHourNum, sunsetMinNum);

direction = 0;
getPointAtTime(sunrise);
// curTime / (sunset - sunrise)
function getPointAtTime(curTime) {
  console.log("Test")
  console.log("Diff: " + curTime);
  console.log("Sunrise: " + (sunriseTime))
  console.log("Current Time: " + new Date())
  var dif = (curTime - sunrise) / (sunset - sunrise);
  var sunPosOnPath = sunPathL * dif;
  return sunPath.getPointAtLength(sunPosOnPath);
}

function formatDate(date) {
  var monthNames = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  // return monthNames[monthIndex] + ' ' + day + ', ' + year + '\n' +
  //     date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
  return (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
}


setInterval(function(){
  var point = getPointAtTime(new Date());
  if(point) {
    sun.style='transform: translate(' + point.x + 'px,' + point.y + 'px)';
  }
  time.textContent = curTime.getHours() + ":" + curTime.getMinutes();
}, 1000);
