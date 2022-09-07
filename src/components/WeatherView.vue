<template>
  <div class="weather">
    <n-icon size="20" class="settings-button" @click="onSettingsClick">
      <img src="@/assets/icons/Settings.svg"
    /></n-icon>
    <n-space vertical v-if="cities.length > 0">
      <n-card v-for="city in cities" :key="city.name" :bordered="false">
        <h3>{{ `${city.name}, ${city.sys.country}` }}</h3>
        <div class="weather-main">
          <h1>
            {{ `${Math.round(city.main.temp - 273.15)}°C` }}
          </h1>
          <img :src="getIcon(city.weather[0].icon)" alt="weather icon" />
        </div>
        <h4>
          {{
            `Feels like ${Math.round(city.main.feels_like - 273.15)}°C. 
            ${city.weather[0].main}. 
            ${city.weather[0].description}`
          }}
        </h4>
        <n-grid x-gap="12" y-gap="12" :cols="2" :rows="2" class="grid">
          <n-gi>
            <div class="grid-item">
              <img src="@/assets/icons/Wind.svg" alt="Wind" />
              <n-text>
                {{ `${city.wind.speed} m/s` }}
              </n-text>
            </div>
          </n-gi>
          <n-gi>
            <div class="grid-item">
              <n-text>
                {{ `${city.main.pressure}hPA` }}
              </n-text>
            </div>
          </n-gi>
          <n-gi>
            <div class="grid-item">
              <n-text>
                {{ `Humidity: ${city.main.humidity}%` }}
              </n-text>
            </div>
          </n-gi>
        </n-grid>
      </n-card>
    </n-space>
    <n-text type="warning" v-else>
      No cities selected, please select a city in settings
    </n-text>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";
import { Routes } from "@/types/routes";
import { computed, defineComponent, watch } from "vue";
import { NIcon, NSpace, NCard, NText, NGrid, NGi } from "naive-ui";
import { ActionType } from "@/store/actions";

const store = useStore();

watch(
  () => store.getters.getSelectedCities,
  (cities) => {
    store.dispatch(ActionType.getWeatherData, cities);
  }
);
export default defineComponent({
  setup() {
    const cities = computed(() => store.getters.getWeatherData);

    function onSettingsClick() {
      store.commit(MutationType.SetRoute, Routes.Setting);
    }

    function getIcon(icon: string) {
      return `http://openweathermap.org/img/wn/${icon}@2x.png`;
    }

    return {
      cities,
      onSettingsClick,
      getIcon,
    };
  },
  components: {
    NIcon,
    NCard,
    NSpace,
    NText,
    NGrid,
    NGi,
  },
});
</script>

<style lang="scss" scoped>
h1 {
  font-size: 40px;
}
.settings-button {
  z-index: 100;
  position: absolute;
  top: 5px;
  right: 0;
  cursor: pointer;
}

.weather {
  position: relative;
  &-main {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

h3,
h4 {
  margin: 0;
  text-align: left;
}

.grid {
  margin-top: 20px;
  &-item {
    display: flex;
    flex-direction: row;
    height: 20px;
  }
}
</style>
