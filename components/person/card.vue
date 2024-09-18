<script setup lang="ts">
import { usePersonStore } from "#imports";
import type { Person } from "~/types";
const personStore= usePersonStore();
const _public = useRuntimeConfig().public;
const props = defineProps<{
  media: Person;
}>();
// resimleri getirdiğim kod bloğum.
const getProfileUrl = (profilePath: string | null) => {
  //eğer posterPath varsa 
  return profilePath
    ? `${_public.tmdbImgBaseUrl}/${profilePath}`
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
        <img :src="getProfileUrl(props.media.profile_path)">
        </template>
        <template #footer> {{ props.media.name }} </template>
  </UCard>
</div>
</template>