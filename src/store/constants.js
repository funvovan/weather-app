import { defineStore } from "pinia";

export const useConstants = defineStore("constants", {
  state: () => {
    return {
      api_key: "8ccfe5800bc04907b9665205455b53f4",
      api_base: "https://api.weatherbit.io/v2.0/forecast/daily",
    };
  },
});
