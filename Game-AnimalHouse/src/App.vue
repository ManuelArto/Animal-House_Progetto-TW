<script setup lang="ts">
import Navbar from './components/TheNavbar.vue'

const routes = [
	{ path: "/", text: "Home" },
	{ path: "/my_pets", text: "I miei animali" },
	{ path: "/curiosita", text: "Curiosita" },
	{ path: "/informazioni", text: "Informazioni utili sanitarie e legali" },
	{ path: "/videos", text: "Video divertenti" },
	{ path: "/servizi", text: "Servizi" },
	{ path: "/prodotti", text: "Prodotti" },
	{ text: "Games ", nested: true, routes: [
		{ path: "/games/quiz", text: "Quiz" },
		{ path: "/games/memory", text: "Memory" },
		{ path: "/games/impiccato", text: "Impiccato" },
		{ path: "/games/scova_le_differenze", text: "Scova le differenze" },
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
