<template>
  <div id="app">
    <SettingsView v-if="store.state.commonState.route === Routes.Setting" />
    <WeatherView v-else-if="store.state.commonState.route === Routes.Weather" />
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "./store";
import WeatherView from "./components/WeatherView.vue";
import SettingsView from "./components/SettingsView.vue";
import { Routes } from "./types/routes";
import { onMounted, watch } from "vue";
import { MutationType } from "./store/mutations";

const store = useStore();

onMounted(() => {
  if (localStorage.getItem("weatherData")) {
    store.commit(
      MutationType.SetSelectedCities,
      JSON.parse(localStorage.getItem("weatherData") || "{}")
    );
  }
});

watch(
  () => store.getters.getSelectedCities,
  (first) => {
    localStorage.setItem("weatherData", JSON.stringify(first));
  }
);
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 300px;
}
</style>
