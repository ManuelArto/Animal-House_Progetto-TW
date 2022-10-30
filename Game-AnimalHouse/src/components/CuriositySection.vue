<template>
	<br>
	<b-container class="my-5">
		<div v-for="animal in animals" class="row animal-card">
			<div class="col-3 col-md-4 p-3">
				<img width="370" height="220"
					:src="animal.image_link"
					class="rounded mob_d_none full-width object-cover h-100 wp-post-image" alt="">
			</div>
			<div class="col p-3">
				<div class="">
					<div class="col-12 p1">
						<div class="animal-card-title mb-2"><strong> {{ animal.name }} </strong></div>
					</div>
					<div class="col-12 p1">
						<p style="">Tartaruga semiacquatica caratteristica di tutta l’Africa
							centro-meridionale, con insediamenti anche in Madagascar, Yemen e Arabia Saudita. Vive
							in piccoli bacini d'acqua stagnante e nella stagione secca, quando gli stagni si
							prosciugano, trova rifugio nel fango. </p>
					</div>
					<div class="ml-3 d-none d-md-block">
						<b-button variant='primary' style="font-weight: bold;">Scopri di più
						</b-button>
					</div>
				</div>
			</div>
		</div>
	</b-container>

</template>

<script setup lang="ts">
import type { RandAnimal } from '@/model';
import { onMounted, reactive} from 'vue';

defineProps<{
	curiosity_type: string
}>()

var animals: RandAnimal[] = reactive([])

function getRandAnimals(number: number) {
	fetch(`https://zoo-animal-api.herokuapp.com/animals/rand/${number}`)
	.then((res) => res.json())
	.then((results) => results.forEach((animal: RandAnimal) => animals.push(animal)))
}

onMounted(() => {
	getRandAnimals(3)
	console.log(animals)
})

defineExpose({getRandAnimals})

</script>

<style scoped>
/* img {
	max-width: 50%;
	height: auto;
} */
.animal-card {
	background: #FFFFFF;
	box-shadow: 2px 2px 20px rgb(0 0 0 / 10%);
	border-radius: 4px;
}

.animal-card-title {
	margin-right: 10px;
	margin-bottom: 21px;
	font-size: 18px;
	color: #2140D8;
	font-weight: bold;
	font-size: 22px;
}
</style>