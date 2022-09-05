interface WeatherDataResponse {
  status: number;
  statusText: string;
  data: WeatherData;
}

interface WeatherData {
  clouds: {
    all: number;
  };
  cod: number;
  coord: {
    lat: number;
    lon: number;
  };
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
  };
  visibility: number;
  weather: Weather[];
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
}

interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}
