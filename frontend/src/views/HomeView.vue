<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input 
        v-model="searchQuery"
        @input="getSearchResults"
        type="text" 
        placeholder="Search for a city or state" 
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]" 
      />
      <ul 
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
        v-if="mapboxSearchResults"
      >
      <p v-if="searchError">
        Sorry, something went wrong with the search. Please try again later. 
      </p>
      <p v-else-if="!searchError && mapboxSearchResults.length === 0">
       No results match your search. try a different query.
      </p>
      <template v-else>
        <li 
          v-for="searchResult in mapboxSearchResults"
          :key="searchResult.id"
          class="py-2 cursor-pointer"
          @click="previewCity(searchResult)" 
        >
          {{ searchResult.place_name }}
        </li>
      </template>        
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const previewCity = (searchResult) => {
  console.log(searchResult);
  const [city, state] = searchResult.place_name.split(",");
  router.push({
    name: "cityView",
    params: {
      city: city,
      state: state.replace(" ", ""),
    },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    },
  });
};

const mapboxAPIKey = "pk.eyJ1IjoibWFnZXRhIiwiYSI6ImNtYmxicW93djB3dnQyanIxeHl0ZjV6dDkifQ.aCwnxFV6GMAuk5gy0Zon0Q";
const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value); // Clear previous timeout if it exists
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        );
        mapboxSearchResults.value = result.data.features;
      } catch {
        searchError.value = true;
      }
      
      return;
    }
    mapboxSearchResults.value = null; // Clear results if searchQuery is empty
  }, 300); // Debounce time of 300ms
};
</script>
