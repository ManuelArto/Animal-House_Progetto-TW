<template>
	<img src="@/assets/banner_curiosita.png" class="mb-3 w-100" alt="banner_curiosità">

	<b-container class="mt-2">
		<h1 class="text-center">Visualizza le curiosità sul mondo animale 🐱</h1>
		<b-button variant="primary" class="position-absolute top-10 ms-5" v-if="curiosity_type !== ''"
			@click="">
			<i class="bi bi-arrow-clockwise"></i>
		</b-button>
		<b-button variant="secondary" class="position-absolute top-10 me-2" v-if="curiosity_type !== ''"
			@click="curiosity_type = ''">
			<i class="bi bi-backspace"></i>
		</b-button>

		<b-container v-if="curiosity_type === ''" class="my-5 text-center">

			<b-button class="my-3" size="lg" variant="info" @click="curiosity_type = 'generale'">Curiosità sugli animali
				in generale</b-button>
			<br>
			<b-button class="my-3" size="lg" variant="info" @click="curiosity_type = 'miei animali'">Curiosità sui
				<b>miei animali</b></b-button>
		</b-container>

		<CuriosityPage v-else :curiosity_type="curiosity_type" />

	</b-container>

</template>

<script setup >
import { ref } from 'vue';
import CuriosityPage from '@/components/CuriositySection.vue'

var curiosity_type = ref("")

</script>

<style scoped>
</style>