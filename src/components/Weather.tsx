import { Flex, Text, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Position } from "types/weather-types";
import { useWeatherQuery } from "service/api/weather";

const Weather = () => {
  const [location, setLocation] = useState<Position | null>(null);
  const { data, refetch, isLoading } = useWeatherQuery(location, {
    skip: !location,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude.toFixed(2),
        lon: position.coords.longitude.toFixed(2),
      });
    });

    setInterval(() => {
      refetch();
    }, 1000000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex w="186px" h="60px" alignItems="center" justifyContent="center">
      <Text fontSize="large" fontWeight="500">
        {isLoading && <Skeleton height="20px" w="200px" />}
        {data && (
          <>
            {data?.city_name} {data?.data[0].temp}°C
          </>
        )}
      </Text>
    </Flex>
  );
};

export default Weather;
