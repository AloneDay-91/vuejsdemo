<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import CardPays from '@/components/CardPays.vue'

const route = useRoute()
const region = ref(route.params.regions)
const regionData = ref({})

onMounted(async () => {
  getRegionData()
})

const getRegionData = async () => {
  regionData.value = await fetch(`https://restcountries.com/v3.1/region/${region.value}`)
    .then(response => response.json())
    .then(data => {
      return data
    })
}

watch(() => route.params.regions, (newValue) => {
  region.value = newValue
  getRegionData()
})
</script>

<template>
  <h1>Liste des pays de la region : {{region}}</h1>
  <Transition>
    <div class="row">
      <CardPays v-for="pays in regionData" :key="pays.cca3" :pays="pays" :image="true" />
    </div>
  </Transition>
  <router-view></router-view>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>