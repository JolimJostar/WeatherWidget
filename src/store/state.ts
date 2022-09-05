import { City } from "@/types/cities";
import { Routes } from "@/types/routes";

export interface State {
  commonState: {
    selectedCities: City[];
    route: Routes;
  };
  weatherPageState: {
    weatherData: WeatherData[];
    loading: boolean;
  };
  settingPageState: {
    searchedCities: City[];
    loading: boolean;
  };
}

const state = {
  commonState: {
    selectedCities: [],
    route: Routes.Weather,
  },
  weatherPageState: {
    weatherData: [],
    loading: false,
  },
  settingPageState: {
    searchedCities: [],
    loading: false,
  },
};

export default state;
