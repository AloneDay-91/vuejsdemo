<script setup>

import { onMounted, ref } from 'vue'
import CardPays from '@/components/CardPays.vue'

let data = ref([])

onMounted(async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    data.value = await response.json();
  } catch (error) {
    console.error('Erreur lors du chargement des données :', error);
  }
})

const pays = ref('');

const listeComplete = () => {
  data.value = data.value.filter(p => p.name.common.toLowerCase().includes(pays.value.toLowerCase()));
}

const filtrer = () => {
  listeComplete();
}

</script>

<template>
  <span>
    Rechercher un pays : <input v-model="pays" placeholder="Rechercher un pays...">
    <button @click="filtrer">Rechercher</button>
    <p>{{pays}}</p>

  </span>
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