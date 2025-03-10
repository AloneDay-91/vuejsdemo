import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('@/views/Home.vue') },
    { path: '/about', component: () => import('@/views/About.vue'), name: 'aboutRoute' },
    { path: '/user/:username', component: () => import('@/views/User.vue'), name: 'userRoute' },
    { path: '/pays', component: () => import('@/views/Pays.vue'), name: 'paysRoute' },
    { path: '/fiche-pays/:pays', component: () => import('@/views/FichePays.vue'), name: 'listePaysRoute' },
    { path: '/rechercher', component: () => import('@/views/Recherche.vue'), name: 'searchRoute' },
    { path: '/fournisseurs', component: () => import('@/views/Fournisseurs.vue'), name: 'fournisseursRoute' },
    { path: '/regions', component: () => import('@/views/Regions.vue'), name: 'regionsRoute', children: [
        { path: '/fiche-region/:regions', component: () => import('@/views/FicheRegions.vue'), name: 'listeRegionsRoute' },
      ]
    },
  ]
})

export default router
