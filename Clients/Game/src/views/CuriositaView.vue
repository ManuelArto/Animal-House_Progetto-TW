<template>
	<div id="animation">
		<img src="@/assets/banner_curiosita.png" class="mb-3 w-100" alt="banner_curiosità">

		<b-container class="mt-2">
			<h1 class="text-center">Visualizza le curiosità sul mondo animale 🐱</h1>
			<b-button variant="primary" class="position-absolute top-10 ms-3" to="/">
				<i class="bi bi-backspace"></i>
			</b-button>

			<CuriositySection />

		</b-container>
	</div>
</template>

<script setup >
import CuriositySection from '@/components/CuriositySection.vue'

</script>

<style scoped>
	#animation {
		animation: ombra 0.5s ease-in both;
	}

  	@keyframes ombra {
		from {
			opacity: 0;
		}
		to {
			opacity:1;
		}
	}
</style>