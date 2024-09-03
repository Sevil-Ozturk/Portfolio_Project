<script setup lang="ts">
import { useMovieStore } from "#imports";
import type { Media } from "~/types";
const movieStore= useMovieStore();
  const _public = useRuntimeConfig().public;
const props = defineProps<{
  media: Media;
}>();
// resimleri getirdiğim kod bloğum.
const getPosterUrl = (posterPath: string | null) => {
  //eğer posterPath varsa 
  return posterPath
    ? `${_public.tmdbImgBaseUrl}/${posterPath}`
    : 'https://path-to-your-placeholder-image.jpg';
};

//define emit dışarıya olay yayınlamak (emit etmek) için kullanılır.
const emit = defineEmits(['select']);

const handleClick = () => {
// select ile yayınlanan olayda media.id yi de gönderir.
  emit('select', props.media.id);
}; 
// 
</script>

<template>
<div >
  <UCard class="w-64" @select="handleClick">
      <template #default>
        <img :src="getPosterUrl(props.media.poster_path)">
        </template>
        <template #footer> {{ props.media.title }} </template>
  </UCard>
</div>
</template>
