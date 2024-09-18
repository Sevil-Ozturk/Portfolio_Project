<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import type { Media } from "~/types";
const moviesStore = useMovieStore();
const _public = useRuntimeConfig().public;
const router = useRouter();

onMounted(async () => {
await moviesStore.fetchMovies();
});

const goToMovieDetail = (movie: Media) => {
  router.push({
    name: "movieDetail",
    params: {
      id: movie.id,
    },
    
  });
};

</script>

<template>
  
  <div>
    <h1 class="text-white-400/100 text-2xl font-bold p-5">Popüler Filmler</h1>
    <div class="flex flex-wrap w-full h-hull gap-4 justify-center hover-container"  >
      <MovieCard 
        v-for="movie in moviesStore.movies"
        :key="movie.id"
        :media="movie"
        class="hover:scale-[1.05]"
        @click="() => {
          moviesStore.selectedMovie = movie
          moviesStore.movieDetailFetchMovie(movie.id)
          goToMovieDetail(movie)
        }"
       
      />
    </div>
  </div>
</template>
<!-- cart sayfasına yapılacak enter olayı -->

<style scoped>

</style>