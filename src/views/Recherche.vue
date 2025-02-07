<script setup>
import { onMounted, ref } from 'vue'
import CardPays from '@/components/CardPays.vue'

let data = ref('')
const recherche = ref('')

const rechercher = async () => {
  if (recherche.value.length > 2) {
    data.value = await fetch('https://restcountries.com/v3.1/name/' + recherche.value)
      .then(response => response.json())
      .then(data => {
        return data
      })
  } else {
    data.value = null
  }
}
</script>

<template>
  <div>
    <label for="recherche">Rechercher un pays</label>
    <input type="text" id="recherche" v-model.trim="recherche" @keyup="rechercher" />
  </div>

  <h1>Liste des pays</h1>
  <div v-if="recherche && recherche.length > 2">
    <div v-if="data" class="grid">
      <CardPays v-for="pays in data" :key="pays.name.common" :pays="pays" />
    </div>
  </div>
  <div v-else>
    <p>Veuillez saisir au moins 3 caractères pour lancer la recherche.</p>
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