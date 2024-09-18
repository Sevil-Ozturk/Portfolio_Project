persons[id].vue=  <script setup lang="ts">
import { useRoute } from "vue-router";
import { _gray } from "#tailwind-config/theme/typography";
import { _backgroundColor } from "#tailwind-config/theme";
const personStore = usePersonStore();
const route = useRoute();
const _public = useRuntimeConfig().public;

const getProfileUrl = (profilePath: string | undefined) => {
  return profilePath
    ? `${_public.tmdbImgBaseUrl}/${profilePath}`
    : "https://path-to-your-placeholder-image.jpg"
};

definePageMeta({
  name: "personDetail",
});

onMounted(async () => {
  const personId = Number(route.params.id);
  await personStore.fetchPersonDetail(personId);
  });

  const selectPerson = computed(() => personStore.selectedPerson);

</script>

<template>
  <div class="detailStyle bg-gradient-to-r from-slate-900 to-slate-700  flex-col justify-center items-align-center gap-3 p-5 ">     
        <div class="flex relative gap-3 rounded " >
          <div class="relative w-8/12 right-0 p-3 rounded ">
            <img
            class="left-0  w-4/12 rounded"
            :src="getProfileUrl(selectPerson?.profile_path)"
          />
            <p class="font-bold capitalize text-3xl w-[500px] p-3 ">
             {{ selectPerson?.name }}
           </p>
          </div>
        </div>
  </div>
</template>

<style scoped>
.detailStyle {
  /* background-color: #383f42; */
  border-radius: 15px;
  align-content: center;
width: 70%;
}


</style>