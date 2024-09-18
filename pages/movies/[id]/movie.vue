<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref, vModelCheckbox } from "vue";
// import { _gray } from "#tailwind-config/theme/typography";
import { _backgroundColor } from "#tailwind-config/theme";
import 'swiper/swiper-bundle.css'
import { Swiper, SwiperSlide } from 'swiper/vue';

const moviesStore = useMovieStore();
const route = useRoute();
const _public = useRuntimeConfig().public;
const personStore = usePersonStore();

// resimleri getirdiğim kod bloğum.
const getPosterUrl = (posterPath: string | undefined) => {
  //eğer posterPath varsa
  return `${_public.tmdbImgBaseUrl}/${posterPath}`}

definePageMeta({
  name: "movieDetail",
  
});
onMounted(async () => {
  const movieId = Number(route.params.id);
  const personId = String(route.params.id);
  const VideoId = Number(route.params.id);
  await moviesStore.movieDetailFetchMovie(movieId);
  await personStore.fetchFeaturedPeople(personId);
  await moviesStore.fetchMovieVideoTrailers(VideoId);
  });

const selectMovie = computed(() => moviesStore.selectedMovie);
const saveValue = ref<boolean>(false);
const heartValue = ref<boolean>(false);

const getProfileUrl = (profilePath:string|undefined) => {
  return profilePath
    ?`${_public.tmdbImgBaseUrl}/${profilePath}`
    :"https://path-to-your-placeholder-image.jpg";
};

const isOpen = ref(false)
</script>

<template>
<div
    class=" bg-gradient-to-r from-slate-900 to-slate-700 flex flex-col justify-center items-align-center gap-3 p-5 "
>
    <div class="flex relative gap-3 rounded">
      <img
        class="left-0 w-3/12 rounded"
        :src="getPosterUrl(selectMovie?.poster_path)"
      />
      <div class="relative w-8/12 right-0 p-3 rounded">
        <p class="font-bold capitalize text-3xl w-[500px] p-3">
          {{ selectMovie?.title }}
        </p>
        <p class="font-bold text-1xl">({{ selectMovie?.release_date }})</p>
        <UButton
          class="p-3 m-1"
          :icon="`i-heroicons-bookmark${saveValue ? '' : '-solid'}`"
          @click="saveValue = !saveValue"
          color="gray"
          :ui="{ rounded: 'rounded-full' }"
        />
        <UButton
          class="p-3 m-1"
          :icon="`i-heroicons-heart${heartValue ? '' :'-solid'}`"
          @click="heartValue = !heartValue"
          color="gray"
          :ui="{ rounded: 'rounded-full' }"
        />
        <UButton
          class="p-3 m-1"
          :icon="`i-heroicons-list-bullet`"
          color="gray"
          :ui="{ rounded: 'rounded-full' }"
        />
        <ol class="flex flex-wrap gap-2 m-3" >
          <li v-for="(genre, _) in moviesStore.selectedMovie?.genres" >
    <button class="bg-purple-900 text-white rounded p-2 ">
      {{ genre.name }}
    </button>
  </li>
        </ol>
        <p class="opacity-50 italic">'{{ selectMovie?.tagline }}'</p>

      <div>
        <UButton color="gray" label="fragman izle"
          class="w-[150px] h-[40px] bg-white justify-center items-align-center  m-3"
          @click="isOpen = true">
          <template #leading>
          <UAvatar src="/video-play.svg"/>
          </template>
      </UButton>
      <!-- prevent-close  class="w-[1500px] h-[500]" -->
    <UModal v-model="isOpen"   >
      <UCard class="w-[750px] h-[500]" 
        :ui="{ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              {{ moviesStore.selectedMovie?.title }}
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
          </div>
        </template>
        
      <template #default>
        <div v-if="moviesStore.trailers" class="grow flex justify-center items-center">
          <iframe width="750" height="400" class="items-center alighn-middle" :src="`https://www.youtube.com/embed/${moviesStore.trailers[0].key}`"></iframe>
        </div>
        <div v-else> Üzgünüm Video Bulunamadı </div>
      </template>

         <!-- <Placeholder class="h-full" /> -->
      </UCard>
    </UModal>
  </div>
</div>
      
    </div>
    <!-- text-overflow-ellipsis kullanabilirsin bak! -->
    <div
      class="indent-2 bg-gradient-to-r from-teal-600 to-teal-900staticStyle static bottom-0 left-0 p-5 rounded"
    >
      {{ selectMovie?.overview }}

    </div>
  </div>
 
<!-- carousel kullanabilirsin nuxtui -->
  <div class=" justify-center items-align-center"><br>ÖNE ÇIKAN OYUNCULAR:<br><br> 
    <div class=" justify-center items-align-center">
        <Swiper :slides-per-view="5" :space-between="3" :loop="false" :effect="'creative'"
        pagination 
        navigation 
        arrows> 
   
        <SwiperSlide
          v-for="person in personStore.featuredPeople"
          :key="person.id"
        >
          <strong><img
            class="w-full h-auto rounded"
            :src="getProfileUrl(person.profile_path)"
          />
          <p class="text-center mt-2 flex">
            {{ person.name }}
          </p>
        
        </strong>
        </SwiperSlide>
      </Swiper>
    
    </div>
  </div>
   
</template>

<style scoped >
 .swiper{
  height: 500px;
 }

</style>
 <!-- <Swiper
    :slides-per-view="1"
    :loop="false"
    :effect="'creative'"
    :autoplay="{
      delay: 8000,
      disableOnInteraction: true,
    }"
    :creative-effect="{
      prev: {
        shadow: false,
        translate: ['-20%', 0, -1],
      },
      next: {
        translate: ['100%', 0, 0],
      },
    }"> 
    
    
    SWİPER İÇİ
    :autoplay="{
      delay: 360,
      disableOnInteraction: true,
    }"
      :creative-effect="{
      prev: {
        shadow: false,
        translate: ['-20%', 0, -1],
      },
      next: {
        translate: ['100%', 0, 0],
      },
    }"
      

    <template #default>
      <div v-for="(trailer) in moviesStore.trailers"  :key="trailer.id" class="grow flex justify-center items-center">
      <iframe width="1500px" height="500px" :src="`https://www.youtube.com/embed/${trailer[1].key}?cc_lang_pref=tr&cc_load_policy=1`" ></iframe>
      </div> 
    -->