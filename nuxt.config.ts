// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt",'@nuxtjs/color-mode'],
     
    runtimeConfig: {
      // Public olarak tanımlanan değişkenler
      public: {
        tmdbApiKey: process.env.TMDB_API_KEY ,
        tmdbToken:process.env.TMDB_TOKEN,
        tmdbImgBaseUrl:'https://image.tmdb.org/t/p/w200'
      }
    }
  
  
})