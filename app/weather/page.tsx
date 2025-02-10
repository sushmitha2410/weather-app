"use client";

import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Define a proper type for weather data
interface WeatherData {
  main: { temp: number };
  weather: { icon: string }[];
}

export default function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null); // ✅ Fixed unexpected `any`
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserName(parsedData.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    router.push("/");
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      () => {
        setError("Location access denied. Please allow location access.");
        setLoading(false);
      }
    );
  }, []);

  // Function to fetch weather
  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) throw new Error("Failed to fetch weather");

      const data = await response.json();
      setWeather(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between py-2 px-10 h-20 md:h-16 lg:h-16 border-b shadow-md ">
        <div className="text-sm xs:text-xs md:text-md lg:text-lg flex items-center justify-center">
          <Image
            src="/_.png"
            alt="logo"
            width={30}
            height={30}
            className="mr-2"
          />
          Weather App
        </div>
        <TooltipProvider delayDuration={10}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleLogout}
                className="text-sm md:text-md lg:text-lg border-2 px-2 rounded-md"
              >
                {userName}
              </button>
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent className="text-slate-400" sideOffset={5}>
                Log Out
              </TooltipContent>
            </TooltipPortal>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex flex-col items-center justify-start min-h-screen p-4 mt-5">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 text-center">
          Good Morning, {userName || "User"}!
        </h1>
        <p className="text-xs md:text-sm lg:text-md text-gray-600 text-center mb-4">
          Here&apos;s the weather update for you
        </p>
        {loading ? (
          <p className="text-xs md:text-sm lg:text-md text-gray-500">
            Fetching weather...
          </p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="bg-gradient-to-tl from-sky-600 to-sky-400 text-white p-6 w-[140px] h-[110px] md:w-[450px] md:h-[200px] lg:w-[500px] lg:h-[200px] rounded-xl flex justify-center lg:justify-evenly items-center">
            <Image
              src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
              alt="Weather icon"
              width={120}
              height={120}
            />
            <p className="text-xl md:text-2xl lg:text-6xl font-bold">
              {Math.round(weather?.main?.temp ?? 0)}°C
            </p>
          </div>
        )}
      </div>
    </>
  );
}
