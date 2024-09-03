import { defineStore } from 'pinia' 
import { ref } from 'vue'
import type { Media } from '~/types'

export const useMovieStore = defineStore('movieStore', () => {
  const movies = ref<Media[]>([])
  const {$axios}=useNuxtApp();
  
const selectedMovie = ref<Media>()

  const fetchMovies = async () => {
    try {
      const response = await $axios.get('/movie/popular', {
        params: { language: 'tr-TR' }
      })
      movies.value = response.data.results
    } catch (error) {
      console.error('Hata:', error)
    }
  };

  const movieDetailFetchMovie= async (movieId: number) => {
    try
      {const {$axios}=useNuxtApp();
        const response = await $axios.get(`/movie/${movieId}`, {
        params: { language: 'tr-TR' }
      })
      selectedMovie.value=response.data;
    }catch(error){
      console.error('Hata:', error)
    }


  }
  

  return {
    movies,
    selectedMovie,
    fetchMovies,
    movieDetailFetchMovie,
  }
})
