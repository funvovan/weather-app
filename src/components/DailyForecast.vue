<template>
  <div>
    <h2 class="daily-forecast-title">Next 7 days</h2>
    <swiper
      class="daily-forecast"
      :slidesPerView="1.5"
      :spaceBetween="17"
      :mousewheel="true"
      :keyboard="true"
      :breakpoints="{
        '375': {
          slidesPerView: 2,
        },
        '420': {
          slidesPerView: 2.5,
        },
        '500': {
          slidesPerView: 3,
        },
        '650': {
          slidesPerView: 4,
        },
        '800': {
          slidesPerView: 5,
        },
        '1000': {
          slidesPerView: 6.5,
        },
      }"
      :modules="modules"
    >
      <swiper-slide
        v-for="item in weatherState.weather.data.slice(1)"
        :key="item.id"
        class="daily-forecast-item"
      >
        <p>{{ getDate(item.datetime) }}</p>
        <img
          class="weather-icon"
          :src="require(`@/assets/icons/${setIcon(item.weather.code)}`)"
          width="75"
          height="75"
        />
        <p class="temp">
          {{ Math.floor(item.temp) }}<span class="degrees">°C</span>
        </p>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue.js";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";

// Import required modules
import { Mousewheel, Keyboard } from "swiper";

import { useWeatherState } from "@/store/weatherState";

export default {
  name: "DailyForecast",
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const weatherState = useWeatherState();

    function getDate(date) {
      let fullDate = new Date(date).toDateString();
      let splitDate = fullDate.split(" ");

      return `${splitDate[0]}, ${splitDate[1]} ${splitDate[2]}`;
    }

    function setIcon(weatherCode) {
      if (weatherCode >= 200 && weatherCode <= 233) return "thunderstorm.png";
      else if (weatherCode >= 300 && weatherCode <= 522) return "rain.png";
      else if (weatherCode >= 600 && weatherCode <= 623) return "snow.png";
      else if (weatherCode >= 700 && weatherCode <= 751) return "fog.png";
      else if (weatherCode == 800) return "clear.png";
      else if (weatherCode >= 801 && weatherCode <= 804) return "clouds.png";
      else return "unknown.png";
    }

    return {
      modules: [Mousewheel, Keyboard],
      weatherState,
      getDate,
      setIcon,
    };
  },
};
</script>

<style lang="scss" scoped>
.daily-forecast-title {
  font-size: 25px;
  color: #fff;
  font-weight: 500;
  margin-bottom: 25px;
}

.daily-forecast {
  padding: 0 30px;

  &-item {
    padding: 18px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    //min-width: 135px !important;
    background-color: #fff;
    border-radius: 25px;

    .weather-icon {
      margin: 20px 0;
      user-select: none;
      -webkit-user-select: none;
      pointer-events: none;
    }

    .temp {
      font-size: 22px;
      font-weight: 700;
      color: rgb(102, 102, 102);

      .degrees {
        display: inline-block;
        margin-top: 3px;
        font-size: 13px;
        vertical-align: top;
      }
    }
  }
}
</style>
