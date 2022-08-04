export interface Position {
  lat: string;
  lon: string;
}

interface WeatherData {
  precip: number;
  snow: number;
  temp: number;
}

export interface Weather {
  city_name: string;
  country_code: string;
  data: WeatherData[];
}
