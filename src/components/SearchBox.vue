<template>
  <div>
    <div class="overlay" @click="isVisible = false; arrowCounter = 0"></div>
    <div class="search-box">
      <input
        type="text"
        class="search-bar"
        placeholder="Search for your city..."
        v-model="query"
        @input="filterCities"
        @keydown.down="onArrowDown"
        @keydown.up="onArrowUp"
        @keydown.enter="onEnter"
        @focus="if (query.length >= 3) isVisible = true;"
      />
      <FindLocation
        class="location-icon"
        title="Share location"
        @click="isVisible = false; query = ''"
      />
      <i @click="onEnter" class="fas fa-search"></i>
      <div v-if="isVisible" class="autocomplete">
        <ul>
          <li
            v-for="(city, id) in filteredCities"
            :key="id"
            @mouseover="setArrowCounter(id)"
            @click="setCity(city)"
            :class="{ 'active': id === arrowCounter }"
          >
            {{ city }}
          </li>
          <li v-if="!filteredCities.length" class="no-results">
            <span>No matching results</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, watch } from "vue";
import { useConstants } from "@/store/constants";
import { useWeatherState } from "@/store/weatherState";
import FindLocation from "@/components/FindLocation.vue";

export default {
  name: "SearchBox",
  components: {
    FindLocation,
  },

  setup() {
    const weatherState = useWeatherState();
    const constants = useConstants();

    const query = ref("");
    const search = ref("");
    const arrowCounter = ref(0);

    const cities = ref([]);
    const filteredCities = computed(() => {
      return arrayOfCities.value.filter((city) => {
        return city.toLowerCase().startsWith(query.value.toLowerCase());
      }).slice(0, 8);
    });
    const arrayOfCities = ref([]);

    const isVisible = ref(false);
    const isLoaded = ref(false);

    onMounted(() => {
      if (localStorage.getItem("search")) {
        query.value = localStorage.getItem("search");
        getWeather();
      }
    })

    watch(search, (newSearch) => {
      localStorage.setItem("search", newSearch);
      localStorage.removeItem("location");
    })

    async function filterCities() {
      if (query.value.length >= 3) {
        if (!isLoaded.value) {
          await findCity();
        }

        arrowCounter.value = 0;
        arrayOfCities.value = cities.value
          .map(({ fields }) => fields)
          .map(
            ({ ascii_name, country_code }) => `${ascii_name}, ${country_code}`
          );
        isVisible.value = true;
      } else {
        isLoaded.value = false;
        isVisible.value = false;
      }
    }

    async function findCity() {
      try {
        const response = await fetch(
          `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=${query.value}&rows=100&sort=population`
        );

        const result = await response.json();
        cities.value = result.records;
        isLoaded.value = true;
      } catch (error) {
        console.log(error);
      }

      if (query.value.length >= 3) {
        isVisible.value = true;
      } else {
        isVisible.value = false;
      }
    }

    function setArrowCounter(id) {
      arrowCounter.value = id;
    }

    function setCity(city) {
      query.value = city;
      isVisible.value = false;

      getWeather();
    }

    function onArrowDown(event) {
      event.preventDefault();

      if (arrowCounter.value < filteredCities.value.length - 1) {
        arrowCounter.value++;
      } else {
        arrowCounter.value = 0;
      }
    }

    function onArrowUp(event) {
      event.preventDefault();

      if (arrowCounter.value > 0) {
        arrowCounter.value--;
      } else {
        arrowCounter.value = filteredCities.value.length - 1;
      }
    }

    function onEnter() {
      if (filteredCities.value.length && query.value.length >= 3) {
        query.value = filteredCities.value[arrowCounter.value];
        getWeather();
      }
    }

    async function getWeather() {
      if (query.value !== "") {
        search.value = query.value;
        weatherState.isSpinning = true;
        isVisible.value = false;
        try {
          const response = await fetch(
            `${constants.api_base}?city=${query.value}&days=8&key=${constants.api_key}`
          );
          weatherState.setWeather(await response.json());
          weatherState.isSpinning = false;
        } catch (error) {
          weatherState.isSpinning = false;
          alert(error);
        }

        query.value = "";
      }
    }

    return {
      query,
      arrowCounter,
      isVisible,
      cities,
      filteredCities,
      filterCities,
      findCity,
      setArrowCounter,
      setCity,
      onArrowDown,
      onArrowUp,
      onEnter,
      getWeather,
    };
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  inset: 0;
}

.search-box {
  position: relative;
  margin: 0 auto;
  margin-bottom: 40px;
  width: 100%;
  max-width: 700px;

  .search-bar {
    width: 100%;
    padding: 13px 25px;
    padding-right: 92px;
    font-family: "Montserrat", sans-serif;
    font-size: 15px;
    outline: none;
    border: none;
    background: none;
    background-color: #fff;
    color: rgb(56, 56, 56);
    border-radius: 40px;
    cursor: text;
  }

  .location-icon {
    padding: 8px;
    position: absolute;
    top: 13%;
    right: 56px;
    color: rgb(55, 110, 182);
    font-size: 18px;
    cursor: pointer;
  }

  .fa-search {
    padding: 8px;
    position: absolute;
    top: 13%;
    right: 18px;
    color: rgb(55, 110, 182);
    font-size: 18px;
    cursor: pointer;
  }

  .autocomplete {
    position: absolute;
    top: 50px;
    background-color: white;
    width: 100%;
    border-radius: 7px;
    transition: 0.3s;

    ul {
      list-style-type: none;
      padding: 7px 0;

      li {
        padding: 9px 23px;
        font-size: 15px;
        color: rgb(56, 56, 56);
        cursor: default;

        &.active {
          background-color: rgb(235, 235, 235);
        }

        &.no-results {
          margin: 12px auto;
          text-align: center;
          background-color: rgba(236, 152, 152, 0.733) !important;
          max-width: 210px;
          border-radius: 30px;
        }
      }
    }
  }
}
</style>
