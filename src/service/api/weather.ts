import api from "./api";
import { Position, Weather } from "types/weather-types";

const weatherApi = api.injectEndpoints({
  endpoints: (build) => ({
    weather: build.query<Weather, Position | null>({
      query: (position) => ({
        url: `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/minutely`,
        params: { lat: position?.lat, lon: position?.lon },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_WEATHER_KEY,
          "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
        },
      }),
    }),
  }),
});

export const { useWeatherQuery } = weatherApi;
