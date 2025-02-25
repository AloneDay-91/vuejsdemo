<script setup>
import { onMounted, ref } from 'vue'

let data = ref(null);
let libelle = ref('');
const adresse = ref({
  rue: '',
  codepostal: '',
  ville: ''
});

onMounted(async () => {
  await getFournisseurs();
});

const Ajouter = async () => {
  await fetch('http://symfony.mmi-troyes.fr:8319/api/fournisseurs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/ld+json'
    },
    body: JSON.stringify({
      libelle: libelle.value,
      adresse: adresse.value
    })
  })
  await getFournisseurs();
}

async function getFournisseurs() {
  const response = await fetch(`http://symfony.mmi-troyes.fr:8319/api/fournisseurs`);
  let fournisseurs = await response.json();
  fournisseurs = fournisseurs.member;
  data.value = fournisseurs;
}
</script>

<template>
  <h1>Fournisseurs</h1>
  <div v-if="data === null">Chargement...</div>
  <div v-else>
    <ul v-for="fournisseur in data" :key="fournisseur.id">
      <li>
        Fournisseur {{ fournisseur.libelle }} |
        <span v-if="fournisseur.adresse">
          Adresse: {{ fournisseur.adresse != null ? fournisseur.adresse.rue + ', ' + fournisseur.adresse.codepostal + ' ' + fournisseur.adresse.ville : 'N/A' }}
        </span>
      </li>
    </ul>
  </div>
  <hr>
  <div>
    <h2>Ajouter un fournisseur</h2>
    <form>
      <label for="libelle">Libellé</label>
      <input type="text" id="libelle" v-model="libelle" required>
      <br>
      <br>
      <label for="adresse">Adresse</label>
      <input type="text" id="rue" v-model="adresse.rue" placeholder="Rue" required>
      <input type="text" id="cp" v-model="adresse.codepostal" placeholder="Code postal" required>
      <input type="text" id="ville" v-model="adresse.ville" placeholder="Ville" required>
      <button @click.prevent="Ajouter">Ajouter</button>
    </form>
  </div>
  <router-view></router-view>
</template>
