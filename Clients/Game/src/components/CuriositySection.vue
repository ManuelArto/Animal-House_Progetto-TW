<template>
	<br>
	<b-container class="mb-5">
		<span v-for="animal in currentPageAnimals" :id="animal._id">
			<AnimalCard  :animal="animal" :isRandAnimal="true" />
		</span>

		<b-pagination v-show="animals.length" v-model="currentPage" :perPage="perPage" :total-rows="rows" :limit="3"
			pills align="center" @page-click="changePage"></b-pagination>
	</b-container>

</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import AnimalCard from '@/components/AnimalCard.vue'
import type { RandAnimal } from '@/model';
import type { BvEvent } from 'bootstrap-vue-next';
import { ENDPOINT } from '@/utils/const';

var animals: RandAnimal[] = reactive([])
function getRandAnimals(number: number) {
	fetch(ENDPOINT.RAND_ANIMALS_LIST(number))
		.then((res) => res.json())
		.then((data) => animals.push(...data))
}

function changePage(bvEvent: BvEvent, page: number) {
	if (page > currentPage.value)
		getRandAnimals(perPage.value)
    window.scrollTo(0, 200);
}

var currentPage = ref(1)
var perPage = ref(3)

var rows = computed(() => {
	return animals.length
})
var currentPageAnimals = computed(() => {
	var index = perPage.value * (currentPage.value - 1)
	return animals.slice(index, index + perPage.value)
})

onMounted(() => {
	getRandAnimals(perPage.value * 3)
})

</script>

<style scoped>

</style>