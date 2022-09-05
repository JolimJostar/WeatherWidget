import { City, Coordinate } from "@/types/cities";
import { GetterTree } from "vuex";
import { State } from "./state";

class CityConstructor {
  country: {
    id: string;
  };
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  constructor(city: City) {
    this.name = city.name;
    this.country = city.country;
    this.coordinates = city.coordinates;
  }
}

export type Getters = {
  getSelectedCities(state: State): City[];
  getSearchedCities(state: State): City[];
  getWeatherData(state: State): WeatherData[];
  getLoadingStateSettings(state: State): boolean;
  getLoadingStateWeather(state: State): boolean;
};

export const getters: GetterTree<State, State> & Getters = {
  getSelectedCities(state) {
    return state.commonState.selectedCities.map(
      (city) => new CityConstructor(city)
    );
  },
  getSearchedCities(state) {
    return state.settingPageState.searchedCities.map(
      (city) => new CityConstructor(city)
    );
  },
  getWeatherData(state) {
    return state.weatherPageState.weatherData;
  },
  getLoadingStateSettings(state) {
    return state.settingPageState.loading;
  },
  getLoadingStateWeather(state) {
    return state.weatherPageState.loading;
  },
};
