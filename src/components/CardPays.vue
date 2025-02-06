<script setup>
import { computed } from 'vue'
const props = defineProps({
  pays: {
    type: Object,
  }
})

const listeCapitale = computed(() => {
  let texte = ''
  if (props.pays.capital) {
    texte = 'Capitale(s) : '
    props.pays.capital.forEach((capitale) => {
      texte += `${capitale}`
    })
  } else {
    texte = 'Pas de capitale'
  }
})

</script>

<template>
  <div class="card">
    <img :src="pays.flags.png" :alt="pays.name.common">
    <h1>{{ pays.name.common }}</h1>
    <p>{{ listeCapitale }}</p>
    <router-link :to="`/fiche-pays/${pays.cca3}`">Voir les infos</router-link>
  </div>
</template>

<style scoped>
.card {
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  width: 300px;
  display: inline-block;
  text-align: center;
}

img {
  width: 100px;
  margin: 10px;
}
</style>