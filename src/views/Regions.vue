<script setup>
import { ref } from 'vue'

const listeRegions = ref([
  { name: 'Africa', key: 'africa' },
  { name: 'Americas', key: 'americas' },
  { name: 'Asia', key: 'asia' },
  { name: 'Europe', key: 'europe' },
  { name: 'Oceania', key: 'oceania' }
])

</script>

<template>
  <h1>Regions</h1>
  <ul v-for="region in listeRegions">
    <li>
      <router-link :to="{name: 'listeRegionsRoute', params: {regions: region.key}}">{{ region.name }}</router-link>
    </li>
  </ul>
  <router-view></router-view>
</template>

<style scoped>

</style>