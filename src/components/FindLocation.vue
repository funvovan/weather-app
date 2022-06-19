<template>
  <i class="fas fa-map-marker-alt" @click="findLocation"></i>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useWeatherState } from "@/store/weatherState";
import { useConstants } from "@/store/constants";

export default {
  name: "FindLocation",

  setup() {
    const weatherState = useWeatherState();
    const constants = useConstants();
    const lat = ref();
    const lon = ref();

    onMounted(() => {
      if (localStorage.getItem("location")) {
        [lat.value, lon.value] = JSON.parse(localStorage.getItem("location"));
        getWeatherByLocation();
      }
    })

    watch([lat, lon], ([newLat, newLon]) => {
      localStorage.setItem("location", JSON.stringify([newLat, newLon]));
      localStorage.removeItem("search");
    });

    async function success(position) {
      lat.value = position.coords.latitude;
      lon.value = position.coords.longitude;

      await getWeatherByLocation();
    }

    function error() {
      weatherState.isSpinning = false;
      alert("ERROR: Unable to retrieve your location");
    }

    function findLocation() {
      if (navigator.geolocation) {
        weatherState.isSpinning = true;
        // checking if browser supports geolocation
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        weatherState.isSpinning = false;
        alert("Your browser doesn't support Geolocation.");
      }
    }

    async function getWeatherByLocation() {
      try {
        let response = await fetch(
            `${constants.api_base}?lat=${lat.value}&lon=${lon.value}&days=8&key=${constants.api_key}`
        );
        weatherState.setWeather(await response.json());
        weatherState.isSpinning = false;
      } catch (err) {
        weatherState.isSpinning = false;
        alert(err);
      }
    }

    return {
      findLocation,
    };
  },
};
</script>
