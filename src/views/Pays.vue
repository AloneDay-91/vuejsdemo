<script setup>
import { onMounted, ref, watch } from 'vue'
import CardPays from '@/components/CardPays.vue'

let data = ref('')
const recherche = ref('')
const listePays = ref('')
const afficherImage = ref(true)
const nbPaysSelectionnes = ref(0)
const selectAll = ref(false)

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

const selectionPays = (selectedPays, pays) => {
  if (selectedPays ===  true) {
    nbPaysSelectionnes.value++
    console.log('Pays sélectionné :', pays.name.common)
  } else {
    nbPaysSelectionnes.value--
    console.log('Pays déselectionné :', pays.name.common)
  }
}

watch(() => selectAll.value, (newValue) => {
  if (newValue === true) {
    nbPaysSelectionnes.value = listePays.value.length
  } else {
    nbPaysSelectionnes.value = 0
  }
})

</script>

<template>
  <div>
    <label for="recherche">Rechercher un pays</label>
    <input type="text" id="recherche" v-model="recherche" @keyup="rechercher">
    <span>|</span>

    <input name="image" id="image" type="checkbox" v-model="afficherImage">
    <label for="image">Afficher uniquement les pays avec drapeau</label>
    <br>
    <span>Nombre de pays séléctionné : ({{nbPaysSelectionnes}})</span>
    <br>
    <input type="checkbox" id="selectAll" v-model="selectAll"/>
    <label for="selectAll">Tout sélectionné</label>


  </div>

  <h1>Liste des pays ({{ data.length }})</h1>
  <div v-if="data.length" class="grid">
    <CardPays v-for="pays in data" :key="pays.name.common" :pays="pays" :image="afficherImage" @pays:selected="selectionPays" :select-all="selectAll"/>
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