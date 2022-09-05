import { City } from "@/types/cities";
import { Routes } from "@/types/routes";
import { MutationTree } from "vuex";
import { State } from "./state";

export enum MutationType {
  SetSearchedCities = "SET_SEARCHED_CITIES",
  SetWeatherData = "SET_WEATHER_DATA",
  SetSelectedCities = "SET_SELECTED_CITIES",
  AddSelectedCity = "ADD_SELECTED_CITY",
  RemoveSelectedCity = "REMOVE_SELECTED_CITY",
  SetLoadingSettings = "SET_LOADING_SETTINGS",
  SetLoadingWeather = "SET_LOADING_WEATHER",
  SetRoute = "SET_ROUTE",
}

export type Mutations = {
  [MutationType.SetSearchedCities](state: State, items: City[]): void;
  [MutationType.SetWeatherData](state: State, items: WeatherData[]): void;
  [MutationType.SetSelectedCities](state: State, items: City[]): void;
  [MutationType.AddSelectedCity](state: State, item: City): void;
  [MutationType.RemoveSelectedCity](state: State, item: City): void;
  [MutationType.SetLoadingSettings](state: State, condition: boolean): void;
  [MutationType.SetLoadingWeather](state: State, condition: boolean): void;
  [MutationType.SetRoute](state: State, route: Routes): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetSearchedCities](state, items) {
    state.settingPageState.searchedCities = items;
  },
  [MutationType.SetWeatherData](state, items) {
    state.weatherPageState.weatherData = items;
  },
  [MutationType.SetSelectedCities](state: State, items) {
    state.commonState.selectedCities = items;
  },
  [MutationType.AddSelectedCity](state, item) {
    state.commonState.selectedCities.unshift(item);
  },
  [MutationType.RemoveSelectedCity](state, item) {
    state.commonState.selectedCities = state.commonState.selectedCities.filter(
      (val) => val.name !== item.name
    );
  },
  [MutationType.SetLoadingSettings](state, condition) {
    state.settingPageState.loading = condition;
  },
  [MutationType.SetLoadingWeather](state, condition) {
    state.weatherPageState.loading = condition;
  },
  [MutationType.SetRoute](state, route) {
    state.commonState.route = route;
  },
};
