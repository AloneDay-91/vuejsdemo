<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
// Pour récupérer un paramètre de l'URL
const username = route.params.username
</script>

<template>
  <h1>Utilisateur</h1>
  <p>Voici l'utilisateur : {{ username }}</p>
  <router-view></router-view>
</template>

<style scoped>

</style>