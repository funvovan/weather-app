<template>
  <div :class="weatherState.getBackground"></div>
</template>

<script>
import { useWeatherState } from "@/store/weatherState";

export default {
  name: "Background",

  setup() {
    const weatherState = useWeatherState();

    return {
      weatherState,
    };
  },
};
</script>

<style lang="scss" scoped>
div {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}

.clear {
  background-image: url("../assets/clear.jpg");
}

.clouds {
  background-image: url("../assets/clouds.jpg");
}

.rain {
  background-image: url("../assets/rain.jpg");
}

.thunderstorm {
  background-image: url("../assets/thunderstorm.jpg");
}

.snow {
  background-image: url("../assets/snow.jpg");
}
</style>
