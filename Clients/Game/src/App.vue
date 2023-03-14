<script setup lang="ts">
import Navbar from '@/components/TheNavbar.vue'
import Footer from '@/components/Footer.vue'

import type { Route } from '@/model';

const routes: Array<Route> = [
	{ path: "/curiosita", text: "Curiosità", icon: "bi-patch-question"},
	{ path: "/informazioni", text: "Informazioni utili sanitarie e legali", icon: "bi-info-circle"},
	{ path: "/my_pets", text: "I miei animali", icon: "bi-house-heart"},
	{ path: "/videos", text: "Video divertenti", icon: "bi-collection-play"},
	{ path: "/negozio", text: "Prodotti", icon: "bi-shop"},
	{ path: "/servizi", text: "Servizi", icon: "bi-gear"},
	{ path: "/games/quiz", text: "Quiz ", icon: "bi-controller"}
];

</script>

<template>
	<div class="d-flex flex-column min-vh-100">
		<header>
			<Navbar :routes=routes />
		</header>
	
		<main style="z-index: 1; flex-grow: 1">
			<RouterView />
		</main>
	
		<footer>
			<Footer />
		</footer>
	</div>

</template>

<style scoped>

</style>
