<script setup>

import { onMounted, ref, watch } from 'vue'
import CardPays from '@/components/CardPays.vue'

let data = ref('')
const recherche = ref('')
const listePays = ref('')

onMounted(async () => {
  data.value = await fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
      return data
    })
  listePays.value = data.value
})

const rechercher = async () => {
  if (recherche.value.length > 2) {
    data.value = listePays.value
    data.value = listePays.value.filter(pays => pays.name.common.toLowerCase().includes(recherche.value.toLowerCase()))
  }
}

</script>

<template>
  <div>
    <label for="recherche">Rechercher un pays</label>
    <input type="text" id="recherche" v-model="recherche" @keyup="rechercher">
    {{ recherche }}
  </div>

  <h1>Liste des pays ({{ data.length }})</h1>
  <div v-if="data.length" class="grid">
    <CardPays v-for="pays in data" :key="pays.name.common" :pays="pays"/>
  </div>
  <div v-else>
    <p>Chargement en cours...</p>
  </div>
  <router-view></router-view>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
  margin: 10px;
  padding: 10px;
  text-align: center;
}
</style>