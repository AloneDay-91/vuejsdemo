<script setup>
import { RouterLink, RouterView } from 'vue-router'

const username = 'JohnDoe'
</script>

<template>
  <div>
    <h1>Mon application</h1>
    <nav>
      <router-link to="/">Accueil</router-link> |
      <router-link :to="{name: 'aboutRoute'}">A propos</router-link> |
      <router-link :to="{name: 'userRoute', params: {username: username}}">Utilisateur</router-link> |
      <router-link :to="{name: 'paysRoute'}">Pays</router-link> |
      <router-link :to="{name: 'searchRoute'}">Rechercher</router-link> |
      <router-link :to="{name: 'fournisseursRoute'}">Fournisseurs</router-link>
      <router-view></router-view>
    </nav>
  </div>
</template>

<style scoped>

</style>
