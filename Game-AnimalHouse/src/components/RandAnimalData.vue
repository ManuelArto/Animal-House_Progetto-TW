<template>
	<b>Informazioni</b>
	<p>
		{{ getCustomText(animal) }}
	</p>
	<b>Dati</b>
	<ol>
		<li>The latin name is <b>{{ animal.il_nome_latino }}</b></li>
		<li>The type of this animal is <b>{{ animal.il_tipo_di_animale }}</b></li>
		<li>The active time of the animal is <b>{{ animal.active_time }}</b></li>
		<li>The lifespan time of the animal is <b>{{ animal.la_vita_media }}</b></li>
		<li>The habitat of the animal is <b>{{ animal.habitat }}</b></li>
		<li>The diet of the animal is <b>{{ animal.il_cibo }}</b></li>
		<li>This animal has a minimum length of <b>{{ animal.length_min }}m</b> and a maximum length of <b>{{ animal.length_max }}m</b></li>
		<li>This animal has a minimum weight of <b>{{ animal.weight_min }}kg</b> and a maximum weight of <b>{{ animal.weight_max }}kg</b></li>
	</ol>
</template>

<script setup lang="ts">
import type { RandAnimal } from '@/model';

defineProps<{
	animal: RandAnimal,
	getCustomText: Function
}>()
</script>

<style scoped>

</style>