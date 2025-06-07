<template>
    <div class="flex flex-col flex-1 items-center">
        <!-- Banner -->
        <div 
            v-if="route.query.preview"
            class="text-white p-4 bg-weather-secondary w-full text-center"
        >
            <p>
                You are currently previewing this city, click the "+" icon to start tracking this city.
            </p>
        </div>

        <!-- Weather Overview -->
        <div 
            class="flex flex-col items-center text-white py-12"
        >
            <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
            <p class="text-sm mb-12">
                {{ 
                    new Date(weatherData.currentTime).toLocaleString('en-US', {
                    weekday: 'short',
                    day: '2-digit',
                    month: 'long',
                    }) 
                }}
                {{ 
                    new Date(weatherData.currentTime).toLocaleString('en-US', {
                    timeStyle: 'short',
                    }) 
                }}
            </p>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const getWeatherData = async () => {
    try {
        const weatherData = await axios.get(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lng}&appid=c38bd32440189b8f19f5935322f76a62&units=imperial`
        );

        // cal current date & time
        const localOffset = new Date().getTimezoneOffset() * 60000;
        const utc = weatherData.data.current.dt * 1000 + localOffset;
        weatherData.data.currentTime =
            utc + 1000 * weatherData.data.timezone_offset;

        // cal hourly weather offset
        weatherData.data.hourly.forEach((hour) => {
        const utc = hour.dt * 1000 + localOffset;
        hour.currentTime =
            utc + 1000 * weatherData.data.timezone_offset;
        });

        return weatherData.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
};
const weatherData = await getWeatherData();
console.log(weatherData);

</script>