<script setup>
import { onMounted, ref } from 'vue'

let data = ref(null);
let libelle = ref('');
let rue = ref('');
let cp = ref('');
let ville = ref('');

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
      adresse: {
        rue: rue.value,
        codepostal: cp.value,
        ville: ville.value
      }
    })
  });
  await getFournisseurs();
}

async function getFournisseurs() {
  const response = await fetch(`http://symfony.mmi-troyes.fr:8319/api/fournisseurs`);
  let fournisseurs = await response.json();
  fournisseurs = fournisseurs.member;

  // On récupère les détails des adresses
  for (let fournisseur of fournisseurs) {
    if (fournisseur.adresse) {
      fournisseur.adresse = await getAdresse(fournisseur.adresse);
    }
  }

  data.value = fournisseurs;
}

async function getAdresse(url) {
  try {
    const response = await fetch(`http://symfony.mmi-troyes.fr:8319${url}`);
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération de l'adresse :", error);
    return null;
  }
}

</script>

<template>
  <h1>Fournisseurs</h1>
  <div v-if="data === null">Chargement...</div>
  <div v-else>
    <ul v-for="fournisseur in data" :key="fournisseur.id">
      <li>Fournisseur {{ fournisseur.libelle }}</li>
      <li v-if="fournisseur.adresse">
        {{ fournisseur.adresse.rue }}, {{ fournisseur.adresse.codepostal }} {{ fournisseur.adresse.ville }}
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
      <input type="text" id="rue" v-model="rue" placeholder="Rue" required>
      <input type="text" id="cp" v-model="cp" placeholder="Code postal" required>
      <input type="text" id="ville" v-model="ville" placeholder="Ville" required>
      <button @click.prevent="Ajouter">Ajouter</button>
    </form>
  </div>
  <router-view></router-view>
</template>
