<template>
  <div id="app">
    <video
      v-if="!weatherState.weather.data"
      class="start-video"
      src="./assets/nature.mp4"
      autoplay
      playsinline
      webkit-playsinline
      loop
      preload="auto"
      muted
      type="video/mp4"
    ></video>
    <Background v-if="weatherState.weather.data" class="background" />
    <main>
      <transition>
        <LoadingSpinner v-if="weatherState.isSpinning" />
      </transition>

      <SearchBox class="search-box" />
      <div v-if="weatherState.weather.data" class="weather-box">
        <div class="location">
          <span class="city">{{ weatherState.weather.city_name }}</span
          >,
          {{ weatherState.weather.country_code }}
        </div>
        <div class="date">
          <span class="day">Today</span> {{ weatherState.getCurrentDate }}
        </div>
        <div class="temp">
          {{ Math.floor(weatherState.weather.data[0].temp)
          }}<span class="degrees">°C</span>
        </div>
        <div class="weather">
          {{ weatherState.weather.data[0].weather.description }}
        </div>
      </div>
      <DailyForecast v-if="weatherState.weather.data" class="daily-forecast" />
    </main>
  </div>
</template>

<script>
import { useWeatherState } from "@/store/weatherState";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import Background from "@/components/Background.vue";
import SearchBox from "@/components/SearchBox.vue";
import DailyForecast from "@/components/DailyForecast.vue";

export default {
  name: "App",
  components: {
    LoadingSpinner,
    Background,
    SearchBox,
    DailyForecast,
  },

  setup() {
    const weatherState = useWeatherState();

    return {
      weatherState,
    };
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

body {
  position: relative;
  font-family: "Montserrat", sans-serif;
}

#app {
  .start-video {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    z-index: -1;
  }

  .background {
    position: absolute;
    z-index: -1;
  }

  main {
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.4)
    );
    min-height: 100vh;
    padding: 30px;

    .weather-box {
      margin-bottom: 30px;
      text-align: center;
      color: #fff;

      > * {
        margin-bottom: 8px;
      }

      .location {
        font-size: 25px;
        font-weight: 400;

        .city {
          font-weight: 500;
        }
      }

      .date {
        font-size: 15px;
        color: rgba(255, 255, 255, 0.75);

        .day {
          margin-top: 30px;
          margin-bottom: 8px;
          display: block;
          font-size: 35px;
          font-weight: 700;
          color: #fff;
        }
      }

      .temp {
        margin-top: 20px;
        margin-bottom: 0;
        font-size: 80px;
        font-weight: 700;

        .degrees {
          display: inline-block;
          margin-top: 14px;
          font-size: 30px;
          font-weight: 400;
          vertical-align: top;
        }
      }

      .weather {
        font-size: 20px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.75);
      }
    }
  }

  .daily-forecast {
    position: relative;
    margin: 0 -30px;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
