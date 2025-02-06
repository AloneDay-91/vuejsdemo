<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
const route = useRoute()
const pays = route.params.pays

let data = ref([])

onMounted(async () => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${pays}`);
    data.value = await response.json();
  } catch (error) {
    console.error('Erreur lors du chargement des données :', error);
  }
})
</script>

<template>
  <div v-for="infoPays in data" :key="infoPays.cca3">
    <h1>Fiche du pays : {{ infoPays.name.common }}</h1>
    <img :src="infoPays.flags.png" :alt="'Drapeau de ' + infoPays.name.common">
    <p>Capitale(s) : {{ infoPays.capital?.join(', ') || 'N/A' }}</p>
    <p>Population : {{ infoPays.population.toLocaleString() }}</p>
    <p>Superficie : {{ infoPays.area.toLocaleString() }} km²</p>
    <p>Langue(s) : {{ infoPays.languages ? Object.values(infoPays.languages).join(', ') : 'N/A' }}</p>
    <p>Devise(s) :
      <span v-if="infoPays.currencies">
        {{ Object.values(infoPays.currencies).map(currency => currency.symbol + ' (' + currency.name + ')').join(', ') }}
      </span>
      <span v-else>N/A</span>
    </p>
    <p>Domaine internet : {{ infoPays.tld?.join(', ') || 'N/A' }}</p>
    <p>Code pays : {{ infoPays.cca3 }}</p>
    <p>Continent : {{ infoPays.continents?.join(', ') || 'N/A' }}</p>
  </div>
  <router-view></router-view>
</template>


<style scoped>

</style>