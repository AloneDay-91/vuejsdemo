<script setup>
import { onMounted, ref } from 'vue'

let id = ref('');
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
  const dataPost = JSON.stringify({
    libelle: libelle.value,
    adresse: {
      rue: adresse.value.rue,
      codepostal: adresse.value.codepostal,
      ville: adresse.value.ville
    }
  });
  if (id.value !== ''){
    await fetch(`http://symfony.mmi-troyes.fr:8319/api/fournisseurs/${id.value}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/merge-patch+json',
      },
      body: dataPost,
    })
  } else {
    await fetch(`http://symfony.mmi-troyes.fr:8319/api/fournisseurs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/ld+json'
      },
      body: dataPost
    })
  }
  resetForm();
  await getFournisseurs();
}

function resetForm() {
  id.value = '';
  libelle.value = '';
  adresse.value = {
    rue: '',
    codepostal: '',
    ville: ''
  };
}

async function getFournisseurs() {
  const response = await fetch(`http://symfony.mmi-troyes.fr:8319/api/fournisseurs`);
  let fournisseurs = await response.json();
  fournisseurs = fournisseurs.member;
  data.value = fournisseurs;
}

async function supprimer(id) {
  await fetch(`http://symfony.mmi-troyes.fr:8319/api/fournisseurs/${id}`, {
    method: 'DELETE',
  })
  await getFournisseurs();
}

async function modifier(fournisseur) {
  id.value = fournisseur.id;
  libelle.value = fournisseur.libelle;
  if (fournisseur.adresse) {
    adresse.value.rue = fournisseur.adresse.rue || '';
    adresse.value.codepostal = fournisseur.adresse.codepostal || '';
    adresse.value.ville = fournisseur.adresse.ville || '';
  }
}
</script>

<template>
  <h1>Fournisseurs</h1>
  <div v-if="data === null">Chargement...</div>
  <div v-else>
    <ul v-for="fournisseur in data" :key="fournisseur.id">
      <li>
        Fournisseur {{ fournisseur.libelle }} |
        <span>
          Adresse:
          {{
            fournisseur.adresse != null
              ? fournisseur.adresse.rue +
                ', ' +
                fournisseur.adresse.codepostal +
                ' ' +
                fournisseur.adresse.ville
              : 'N/A'
          }}
        </span>
        <button @click="supprimer(fournisseur.id)">Supprimer</button>
        <button @click="modifier(fournisseur)">Modifier</button>
      </li>
    </ul>
  </div>
  <hr />
  <div>
    <h2>Ajouter ou modifier un fournisseur</h2>
    <form>
      <label for="libelle">Libellé</label>
      <input type="text" id="libelle" v-model="libelle" required />
      <br />
      <br />
      <label for="adresse">Adresse</label>
      <div>
        <label for="rue">Rue</label>
        <input type="text" id="rue" v-model="adresse.rue" placeholder="Rue" required />
      </div>
      <div>
        <label for="cp">Code postal</label>
        <input type="text" id="cp" v-model="adresse.codepostal" placeholder="Code postal" required
        />
      </div>
      <div>
        <label for="ville">Ville</label>
        <input type="text" id="ville" v-model="adresse.ville" placeholder="Ville" required />
      </div>
      <button @click.prevent="Ajouter">Ajouter</button>
    </form>
  </div>
  <router-view></router-view>
</template>
