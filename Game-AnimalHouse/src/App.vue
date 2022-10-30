<script setup lang="ts">
import Navbar from '@/components/TheNavbar.vue'
import type { Route } from '@/model';

const routes: Array<Route> = [
	{ path: "/", text: "Home", icon: "bi-house-door-fill"},
	{ path: "/curiosita", text: "Curiosita", icon: "bi-patch-question"},
	{ path: "/informazioni", text: "Informazioni utili sanitarie e legali", icon: "bi-info-circle"},
	{ path: "/my_pets", text: "I miei animali", icon: "bi-house-heart-fill"},
	{ path: "/videos", text: "Video divertenti", icon: "bi-collection-play"},
	{ path: "/negozio", text: "Prodotti", icon: "bi-shop"},
	{ path: "/servizi", text: "Servizi", icon: "bi-gear"},
	{ text: "Games ", nested: true, icon: "bi-controller", routes: [
		{ path: "/games/quiz", text: "Quiz", icon: "s"},
		{ path: "/games/memory", text: "Memory", icon: "s"},
		{ path: "/games/impiccato", text: "Impiccato", icon: "s"},
		{ path: "/games/scova_le_differenze", text: "Scova le differenze", icon: "s"},
	]}
];

</script>

<template>
  <header>
    <Navbar :routes=routes />
  </header>

  <main>
    <RouterView />
  </main>

  <footer>
  </footer>

</template>

<style scoped>

</style>
