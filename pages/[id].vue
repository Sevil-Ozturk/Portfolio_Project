<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
const moviesStore = useMovieStore();
const route = useRoute();
const _public = useRuntimeConfig().public;



definePageMeta({
    name: 'movieDetail'
});

const movieId=Number(route.params.id);
onMounted(async() =>{ 
    moviesStore.movieDetailFetchMovie(movieId)
    
});

</script>

<template>
    <div>
        <h1>FİLM DETAY</h1>
      <div>

      </div>
    </div>
</template>