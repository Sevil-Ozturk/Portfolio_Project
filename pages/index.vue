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
    <div class="flex flex-wrap w-full h-hull gap-4 justify-center">
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

<style scoped>
.movie-item {
  background-color: white;
  padding: 0;
  width: 280px; 
  text-align: center; 
  color: black;
  border-radius: 20px;
}

.movie-item img {
  width: 100%;
  height: auto;
  margin-bottom: 8px;
  border-radius: 20px 20px 0 0;
}
.movie-list {
  display: flex;
  flex-wrap: wrap; 
  gap: 16px; 
  padding: 25px;
  list-style-type: none; 
}
</style>
