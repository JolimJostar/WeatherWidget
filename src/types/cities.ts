export interface City {
  country: {
    id: string;
  };
  name: string;
  coordinates: Coordinate;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}
