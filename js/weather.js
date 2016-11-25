/**
 * Created by MyhailoAndrushkiv on 01.11.2016.
 */
/**
 * Weather Provider gets weather data.
 * @constructor
 */
function COpenWeatherMapProvider(weatherReminder) {
   this.weatherReminder = weatherReminder;
};
COpenWeatherMapProvider.prototype = {
    place: '',
    debug: false,
    url: 'http://api.openweathermap.org/data/2.5/forecast',
    apiKey: 'bca17aff148befa30201bf4033c7748f',
    result: '',
    weatherReminder: null,
    setPlace: function (place) {
        this.place = place;
    },
    getWeather: function () {
        var self = this;
        if (this.debug)
        {
// DATA for debug.
            var json = {"city":{"id":702550,"name":"Lviv","coord":{"lon":24.023239,"lat":49.838261},"country":"UA","population":0,"sys":{"population":0}},"cod":"200","message":0.0756,"cnt":40,"list":[{"dt":1478282400,"main":{"temp":271.82,"temp_min":271.82,"temp_max":271.867,"pressure":1001.73,"sea_level":1036.81,"grnd_level":1001.73,"humidity":78,"temp_kf":-0.05},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"02n"}],"clouds":{"all":8},"wind":{"speed":3.51,"deg":208.5},"snow":{},"sys":{"pod":"n"},"dt_txt":"2016-11-04 18:00:00"},{"dt":1478293200,"main":{"temp":271.21,"temp_min":271.21,"temp_max":271.238,"pressure":1001.19,"sea_level":1036.45,"grnd_level":1001.19,"humidity":84,"temp_kf":-0.03},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"clouds":{"all":36},"wind":{"speed":3.2,"deg":197.002},"snow":{},"sys":{"pod":"n"},"dt_txt":"2016-11-04 21:00:00"},{"dt":1478304000,"main":{"temp":272.15,"temp_min":272.15,"temp_max":272.167,"pressure":1000.05,"sea_level":1035.36,"grnd_level":1000.05,"humidity":79,"temp_kf":-0.02},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"clouds":{"all":80},"wind":{"speed":3.51,"deg":182.002},"snow":{},"sys":{"pod":"n"},"dt_txt":"2016-11-05 00:00:00"},{"dt":1478314800,"main":{"temp":272.807,"temp_min":272.807,"temp_max":272.807,"pressure":999.18,"sea_level":1034.29,"grnd_level":999.18,"humidity":78,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"clouds":{"all":88},"wind":{"speed":3.62,"deg":164.005},"snow":{},"sys":{"pod":"n"},"dt_txt":"2016-11-05 03:00:00"},{"dt":1478325600,"main":{"temp":273.257,"temp_min":273.257,"temp_max":273.257,"pressure":998.03,"sea_level":1033.09,"grnd_level":998.03,"humidity":75,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"clouds":{"all":32},"wind":{"speed":4.23,"deg":157.501},"snow":{},"sys":{"pod":"d"},"dt_txt":"2016-11-05 06:00:00"},{"dt":1478336400,"main":{"temp":277.126,"temp_min":277.126,"temp_max":277.126,"pressure":996.21,"sea_level":1030.77,"grnd_level":996.21,"humidity":74,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"clouds":{"all":68},"wind":{"speed":4.91,"deg":159.501},"snow":{},"sys":{"pod":"d"},"dt_txt":"2016-11-05 09:00:00"},{"dt":1478347200,"main":{"temp":281.536,"temp_min":281.536,"temp_max":281.536,"pressure":993.36,"sea_level":1027.68,"grnd_level":993.36,"humidity":68,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"clouds":{"all":12},"wind":{"speed":5.01,"deg":184},"snow":{},"sys":{"pod":"d"},"dt_txt":"2016-11-05 12:00:00"},{"dt":1478358000,"main":{"temp":280.532,"temp_min":280.532,"temp_max":280.532,"pressure":991.57,"sea_level":1025.85,"grnd_level":991.57,"humidity":65,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":4.77,"deg":191.506},"snow":{},"sys":{"pod":"n"},"dt_txt":"2016-11-05 15:00:00"},{"dt":1478368800,"main":{"temp":280.099,"temp_min":280.099,"temp_max":280.099,"pressure":989.55,"sea_level":1023.83,"grnd_level":989.55,"humidity":74,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"clouds":{"all":80},"wind":{"speed":4.9,"deg":180},"snow":{},"sys":{"pod":"n"},"dt_txt":"2016-11-05 18:00:00"},{"dt":1478379600,"main":{"temp":280.543,"temp_min":280.543,"temp_max":280.543,"pressure":987.46,"sea_level":1021.54,"grnd_level":987.46,"humidity":92,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":92},"wind":{"speed":4.91,"deg":183.508},"rain":{"3h":1.565},"snow":{},"sys":{"pod":"n"},"dt_txt":"2016-11-05 21:00:00"},{"dt":1478390400,"main":{"temp":281.819,"temp_min":281.819,"temp_max":281.819,"pressure":985.01,"sea_level":1018.84,"grnd_level":985.01,"humidity":92,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":92},"wind":{"speed":5.65,"deg":203.504},"rain":{"3h":1.685},"snow":{},"sys":{"pod":"n"},"dt_txt":"2016-11-06 00:00:00"},{"dt":1478401200,"main":{"temp":282.694,"temp_min":282.694,"temp_max":282.694,"pressure":982.82,"sea_level":1016.5,"grnd_level":982.82,"humidity":93,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":92},"wind":{"speed":6.44,"deg":211.003},"rain":{"3h":2.45},"snow":{},"sys":{"pod":"n"},"dt_txt":"2016-11-06 03:00:00"},{"dt":1478412000,"main":{"temp":282.977,"temp_min":282.977,"temp_max":282.977,"pressure":981.55,"sea_level":1015.06,"grnd_level":981.55,"humidity":93,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":92},"wind":{"speed":6.1,"deg":210.003},"rain":{"3h":1.37},"snow":{},"sys":{"pod":"d"},"dt_txt":"2016-11-06 06:00:00"},{"dt":1478422800,"main":{"temp":284.192,"temp_min":284.192,"temp_max":284.192,"pressure":980.39,"sea_level":1013.74,"grnd_level":980.39,"humidity":95,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":92},"wind":{"speed":5.29,"deg":223.009},"rain":{"3h":0.825},"snow":{},"sys":{"pod":"d"},"dt_txt":"2016-11-06 09:00:00"},{"dt":1478433600,"main":{"temp":284.963,"temp_min":284.963,"temp_max":284.963,"pressure":979.45,"sea_level":1012.67,"grnd_level":979.45,"humidity":96,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":92},"wind":{"speed":4.82,"deg":234.012},"rain":{"3h":2.04},"snow":{},"sys":{"pod":"d"},"dt_txt":"2016-11-06 12:00:00"},{"dt":1478444400,"main":{"temp":283.406,"temp_min":283.406,"temp_max":283.406,"pressure":979.62,"sea_level":1012.76,"grnd_level":979.62,"humidity":100,"temp_kf":0},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10n"}],"clouds":{"all":92},"wind":{"speed":2.91,"deg":286.501},"rain":{"3h":3.05},"snow":{},"sys":{"pod":"n"},"dt_txt":"2016-11-06 15:00:00"},{"dt":1478455200,"main":{"temp":281.521,"temp_min":281.521,"temp_max":281.521,"pressure":980.65,"sea_level":1014,"grnd_level":980.65,"humidity":99,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":92},"wind":{"speed":3.76,"deg":309.5},"rain":{"3h":1.175},"snow":{},"sys":{"pod":"n"},"dt_txt":"2016-11-06 18:00:00"},{"dt":1478466000,"main":{"temp":280.128,"temp_min":280.128,"temp_max":280.128,"pressure":982.42,"sea_level":1015.91,"grnd_level":982.42,"humidity":100,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":80},"wind":{"speed":3.56,"deg":312.501},"rain":{"3h":0.47},"snow":{},"sys":{"pod":"n"},"dt_txt":"2016-11-06 21:00:00"},{"dt":1478476800,"main":{"temp":279.124,"temp_min":279.124,"temp_max":279.124,"pressure":982.73,"sea_level":1016.39,"grnd_level":982.73,"humidity":100,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":80},"wind":{"speed":1.97,"deg":344.005},"rain":{"3h":0.06},"snow":{},"sys":{"pod":"n"},"dt_txt":"2016-11-07 00:00:00"},{"dt":1478487600,"main":{"temp":278.51,"temp_min":278.51,"temp_max":278.51,"pressure":981.57,"sea_level":1015.28,"grnd_level":981.57,"humidity":100,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":92},"wind":{"speed":3.16,"deg":40.0003},"rain":{"3h":0.63},"snow":{},"sys":{"pod":"n"},"dt_txt":"2016-11-07 03:00:00"},{"dt":1478498400,"main":{"temp":278.251,"temp_min":278.251,"temp_max":278.251,"pressure":979.79,"sea_level":1013.32,"grnd_level":979.79,"humidity":100,"temp_kf":0},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"clouds":{"all":92},"wind":{"speed":4.01,"deg":57.002},"rain":{"3h":8.09},"snow":{},"sys":{"pod":"d"},"dt_txt":"2016-11-07 06:00:00"},{"dt":1478509200,"main":{"temp":278.973,"temp_min":278.973,"temp_max":278.973,"pressure":976.2,"sea_level":1009.63,"grnd_level":976.2,"humidity":100,"temp_kf":0},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"clouds":{"all":92},"wind":{"speed":5.13,"deg":72.0065},"rain":{"3h":4.77},"snow":{},"sys":{"pod":"d"},"dt_txt":"2016-11-07 09:00:00"},{"dt":1478520000,"main":{"temp":280.733,"temp_min":280.733,"temp_max":280.733,"pressure":973.89,"sea_level":1007.21,"grnd_level":973.89,"humidity":100,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":92},"wind":{"speed":2.33,"deg":357.507},"rain":{"3h":1.86},"snow":{},"sys":{"pod":"d"},"dt_txt":"2016-11-07 12:00:00"},{"dt":1478530800,"main":{"temp":278.317,"temp_min":278.317,"temp_max":278.317,"pressure":976.95,"sea_level":1010.43,"grnd_level":976.95,"humidity":100,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":92},"wind":{"speed":4.67,"deg":313.003},"rain":{"3h":0.21},"snow":{},"sys":{"pod":"n"},"dt_txt":"2016-11-07 15:00:00"},{"dt":1478541600,"main":{"temp":275.857,"temp_min":275.857,"temp_max":275.857,"pressure":981.24,"sea_level":1015.04,"grnd_level":981.24,"humidity":100,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":76},"wind":{"speed":5.52,"deg":295.005},"rain":{"3h":0.89},"snow":{},"sys":{"pod":"n"},"dt_txt":"2016-11-07 18:00:00"},{"dt":1478552400,"main":{"temp":275.233,"temp_min":275.233,"temp_max":275.233,"pressure":984.41,"sea_level":1018.46,"grnd_level":984.41,"humidity":97,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":92},"wind":{"speed":5.22,"deg":284.5},"rain":{"3h":0.09},"snow":{"3h":0.019},"sys":{"pod":"n"},"dt_txt":"2016-11-07 21:00:00"},{"dt":1478563200,"main":{"temp":275.099,"temp_min":275.099,"temp_max":275.099,"pressure":986.28,"sea_level":1020.48,"grnd_level":986.28,"humidity":98,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":88},"wind":{"speed":4.1,"deg":280.002},"rain":{"3h":0.02},"snow":{"3h":0.025},"sys":{"pod":"n"},"dt_txt":"2016-11-08 00:00:00"},{"dt":1478574000,"main":{"temp":275.252,"temp_min":275.252,"temp_max":275.252,"pressure":987.23,"sea_level":1021.63,"grnd_level":987.23,"humidity":98,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":88},"wind":{"speed":3.92,"deg":279},"rain":{"3h":0.04},"snow":{"3h":0.035},"sys":{"pod":"n"},"dt_txt":"2016-11-08 03:00:00"},{"dt":1478584800,"main":{"temp":274.757,"temp_min":274.757,"temp_max":274.757,"pressure":988.47,"sea_level":1023.04,"grnd_level":988.47,"humidity":97,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":56},"wind":{"speed":2.72,"deg":263.004},"rain":{"3h":0.01},"snow":{"3h":0.015},"sys":{"pod":"d"},"dt_txt":"2016-11-08 06:00:00"},{"dt":1478595600,"main":{"temp":276.821,"temp_min":276.821,"temp_max":276.821,"pressure":989.82,"sea_level":1024.09,"grnd_level":989.82,"humidity":100,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"clouds":{"all":36},"wind":{"speed":3.17,"deg":267.501},"rain":{},"snow":{},"sys":{"pod":"d"},"dt_txt":"2016-11-08 09:00:00"},{"dt":1478606400,"main":{"temp":277.523,"temp_min":277.523,"temp_max":277.523,"pressure":990.55,"sea_level":1024.77,"grnd_level":990.55,"humidity":100,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":80},"wind":{"speed":3.11,"deg":270.005},"rain":{"3h":0.01},"snow":{},"sys":{"pod":"d"},"dt_txt":"2016-11-08 12:00:00"},{"dt":1478617200,"main":{"temp":276.612,"temp_min":276.612,"temp_max":276.612,"pressure":991.4,"sea_level":1025.83,"grnd_level":991.4,"humidity":95,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":68},"wind":{"speed":2.3,"deg":289},"rain":{"3h":0.04},"snow":{},"sys":{"pod":"n"},"dt_txt":"2016-11-08 15:00:00"},{"dt":1478628000,"main":{"temp":275.723,"temp_min":275.723,"temp_max":275.723,"pressure":993.03,"sea_level":1027.77,"grnd_level":993.03,"humidity":99,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":88},"wind":{"speed":2.43,"deg":341.001},"rain":{"3h":0.27},"snow":{},"sys":{"pod":"n"},"dt_txt":"2016-11-08 18:00:00"},{"dt":1478638800,"main":{"temp":273.943,"temp_min":273.943,"temp_max":273.943,"pressure":994.12,"sea_level":1029.06,"grnd_level":994.12,"humidity":100,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":64},"wind":{"speed":2.5,"deg":15.0017},"rain":{"3h":0.12},"snow":{"3h":0.095},"sys":{"pod":"n"},"dt_txt":"2016-11-08 21:00:00"},{"dt":1478649600,"main":{"temp":272.097,"temp_min":272.097,"temp_max":272.097,"pressure":995.26,"sea_level":1030.17,"grnd_level":995.26,"humidity":100,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13n"}],"clouds":{"all":48},"wind":{"speed":1.61,"deg":28.5012},"rain":{},"snow":{"3h":0.065},"sys":{"pod":"n"},"dt_txt":"2016-11-09 00:00:00"},{"dt":1478660400,"main":{"temp":269.867,"temp_min":269.867,"temp_max":269.867,"pressure":995.21,"sea_level":1030.42,"grnd_level":995.21,"humidity":96,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"02n"}],"clouds":{"all":8},"wind":{"speed":1.39,"deg":10.5009},"rain":{},"snow":{},"sys":{"pod":"n"},"dt_txt":"2016-11-09 03:00:00"},{"dt":1478671200,"main":{"temp":269.267,"temp_min":269.267,"temp_max":269.267,"pressure":995.99,"sea_level":1031.17,"grnd_level":995.99,"humidity":90,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"clouds":{"all":20},"wind":{"speed":1.37,"deg":86.0113},"rain":{},"snow":{},"sys":{"pod":"d"},"dt_txt":"2016-11-09 06:00:00"},{"dt":1478682000,"main":{"temp":273.821,"temp_min":273.821,"temp_max":273.821,"pressure":996.61,"sea_level":1031.4,"grnd_level":996.61,"humidity":100,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":24},"wind":{"speed":1.7,"deg":216.506},"rain":{},"snow":{"3h":0.005},"sys":{"pod":"d"},"dt_txt":"2016-11-09 09:00:00"},{"dt":1478692800,"main":{"temp":275.419,"temp_min":275.419,"temp_max":275.419,"pressure":995.69,"sea_level":1030.26,"grnd_level":995.69,"humidity":100,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13d"}],"clouds":{"all":76},"wind":{"speed":2.01,"deg":281.5},"rain":{},"snow":{"3h":0.075},"sys":{"pod":"d"},"dt_txt":"2016-11-09 12:00:00"},{"dt":1478703600,"main":{"temp":274.487,"temp_min":274.487,"temp_max":274.487,"pressure":995.44,"sea_level":1030.11,"grnd_level":995.44,"humidity":94,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13n"}],"clouds":{"all":48},"wind":{"speed":1.44,"deg":269.002},"rain":{},"snow":{"3h":0.03},"sys":{"pod":"n"},"dt_txt":"2016-11-09 15:00:00"}]};

// DATA for debug.
            return true;
        }
        $.ajax(this.url, {
            data: {
                q: this.place,
                APPID: this.apiKey,
                units: 'metric'
            },
            success: function (json) {
                self.weatherReminder.setWeatherData(json).checkWeather();
            },
            error: function (jqXHR, textStatus) {
                alert('Request Error:' + textStatus);
            }
        });
        return this.result;
    }
};

/**
 * Reminder checks weather rules and notify if rules is true.
 * @constructor
 */
function CWeatherReminder() {

}
CWeatherReminder.prototype = {
    weatherData: null,
    notificationData: [],
    maxSpeed: 3,
    startDayHour: 8,
    endDayHour: 18,
    setWeatherData: function (weatherData) {
        this.weatherData = weatherData;
        return this;
    },
    setMaxWindSpped: function (speed) {
        this.maxSpeed = speed;
    },
    checkWeather: function () {
        var list = this.weatherData.list;
        var self = this;
        $.each(list, function (index, item) {
            if (self.validate(item)) {

                self.notificationData.push(item);
            }
        });
        this.checkPermission();
        return this.notificationData;
    },
    validate: function(item) {
        if (item.wind.speed < this.maxSpeed && this.isDay(item.dt)) {
            return true;
        };

        return false;
    },
    isDay : function (timestamp) {
        var tmp = new Date(timestamp * 1000);
        var hour = tmp.getHours();
        if (hour > this.startDayHour && hour < this.endDayHour)
        {
            return true;
        };
        return false;
    },
    notify: function () {
        new Notification('18 15', {
            icon: '48.png',
            body: 'Time to make the toast.'
        });
    },
    checkPermission: function () {
        var self = this;
        if (Notification.permission !== "granted")
            Notification.requestPermission(function (e) {
                if (e == 'granted') {
                    self.notifyMe();
                }
            });
        else {
            this.notifyMe()
        };
    },
    notifyMe: function() {

        var body = '';
        var self = this;
        if (this.notificationData.length > 0)
        {
            this.setBadgeNumber();
            $.each(this.notificationData, function (index, item) {
                var date = new Date(item.dt * 1000);
                var time = self.weekday[date.getDay()] + '.' + date.getMonth() + ' ' + date.getHours() + ':' + date.getMinutes()
                body = body + '' + time + ' T: ' + item.main.temp + ' C. Hum: ' + item.main.humidity + '% Wind: ' + item.wind.speed + ' m/s\n'
            });

        }

        console.log(this.notificationData);
        var notification = new Notification('Good weather for plying notification.', {
            icon: '/icons/sensWind_icon.jpg',
            body: body,
        });

        notification.onclick = function () {
            window.open("https://www.gismeteo.ua/ua/weather-lviv-4949/");
        };

    },

    setBadgeNumber: function () {
        chrome.browserAction.setBadgeText({text: this.notificationData.length.toString()});
    },
    weekday: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],

};

// function CCacheData()
// {
//
// };
// CCacheData.prototype = {
//     setData: function (key, data) {
//         chrome.storage.local.set({ key: data }, function(){
//             //  A data saved callback omg so fancy
//         });
//     },
//     getData: function (key) {
//         chrome.storage.local.get(/* String or Array */[key], function(items){
//             //  items = [ { "yourBody": "myBody" } ]
//         });
//     },
//     hasData: function () {
//
//     }
// };
 function CNotification()
 {

 };

CNotification.prototype = {
  show: function () {
      // Let's check if the browser supports notifications
      if (!("Notification" in window)) {
          alert("This browser does not support desktop notification");
      }

      // Let's check whether notification permissions have already been granted
      else if (Notification.permission === "granted") {
          // If it's okay let's create a notification
          var notification = new Notification("Hi there!");
      }

      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== 'denied') {
          Notification.requestPermission(function (permission) {
              // If the user accepts, let's create a notification
              if (permission === "granted") {
                  var notification = new Notification("Hi there!");
              }
          });
      }
  }
};

/**
 * Main Weather object
 * @param weatherProvider
 * @param weatherReminder
 * @constructor
 */
function CWeather(weatherProvider, weatherReminder) {
    this.weatherProvider = weatherProvider;
    this.weatherReminder = weatherReminder;
};
CWeather.prototype = {
    checkWeather: function (place) {
        this.weatherProvider.setPlace(place);
        var weatherResult = this.weatherProvider.getWeather();
    },
    weatherProvider: null,
    weatherReminder: null,
};


 function checkWeather() {
     var weatherReminder = new CWeatherReminder();
     var weatherProvider = new COpenWeatherMapProvider(weatherReminder);

     var weather = new CWeather(weatherProvider);
     var result = weather.checkWeather('Lviv');
 }
 var HOUR_4 = 14400;
 var HAULF_HOUR = 1800;
 var checkWeatherPeriod = HAULF_HOUR * 1000;
 var timerId = setInterval(checkWeather(), checkWeatherPeriod)



// $('document').ready(function () {
//     checkWeather()
// });