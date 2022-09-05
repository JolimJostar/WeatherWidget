import { City } from "@/types/cities";
import axios from "axios";
import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { State } from "./state";

function getOptions(name: string) {
  return {
    method: "GET",
    url: "https://spott.p.rapidapi.com/places/autocomplete",
    params: { limit: "5", skip: "0", q: name, type: "CITY" },
    headers: {
      "X-RapidAPI-Key": "7aad94a2c8msh3586e05a690a7bdp10911ajsn559ad5bc1097",
      "X-RapidAPI-Host": "spott.p.rapidapi.com",
    },
  };
}

export enum ActionType {
  getSearchedCities = "GET_SEARCHED_CITIES",
  getWeatherData = "GET_WEATHER_DATA",
}

type ActionArguments = Omit<ActionContext<State, State>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [ActionType.getSearchedCities](context: ActionArguments, name: string): void;
  [ActionType.getWeatherData](context: ActionArguments, city: City[]): void;
};

export const actions: ActionTree<State, State> & Actions = {
  async [ActionType.getSearchedCities]({ commit }, name) {
    if (name === "") {
      commit(MutationType.SetSearchedCities, []);
    } else {
      commit(MutationType.SetLoadingSettings, true);

      const res = await axios.request(getOptions(name));
      const cities = res.data as City[];

      commit(MutationType.SetLoadingSettings, false);

      commit(MutationType.SetSearchedCities, cities);
    }
  },
  async [ActionType.getWeatherData]({ commit }, cities) {
    commit(MutationType.SetLoadingWeather, true);

    const res = await Promise.all(
      cities.map((city) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.coordinates.latitude}&lon=${city.coordinates.longitude}&appid=2eb0b61bb1a6ecc4854cc09375a26ff3`
        )
      )
    );

    const weatherData = res.map((weatherData) => weatherData.data);

    commit(MutationType.SetLoadingWeather, false);

    commit(MutationType.SetWeatherData, weatherData);
  },
};
