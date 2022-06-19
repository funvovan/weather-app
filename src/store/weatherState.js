import { defineStore } from "pinia";

export const useWeatherState = defineStore("weatherState", {
  state: () => {
    return {
      isSpinning: false,
      weather: {},
    };
  },

  actions: {
    setWeather(data) {
      this.weather = data;
    },
  },

  getters: {
    getBackground() {
      if (typeof this.weather.data !== "undefined") {
        if (
          this.weather.data[0].weather.code >= 200 &&
          this.weather.data[0].weather.code <= 233
        )
          return "thunderstorm";
        else if (
          this.weather.data[0].weather.code >= 300 &&
          this.weather.data[0].weather.code <= 522
        )
          return "rain";
        else if (
          this.weather.data[0].weather.code >= 600 &&
          this.weather.data[0].weather.code <= 623
        )
          return "snow";
        else if (this.weather.data[0].weather.code == 800) return "clear";
        else if (
          this.weather.data[0].weather.code >= 801 &&
          this.weather.data[0].weather.code <= 804
        )
          return "clouds";
        else return "clouds";
      }
    },

    getCurrentDate() {
      let fullDate = new Date();
      let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      let day = days[fullDate.getDay()];
      let month = months[fullDate.getMonth()];
      let date = fullDate.getDate();
      let year = 1900 + fullDate.getYear();

      return `${day}, ${month} ${date}, ${year}`;
    },
  },
});
