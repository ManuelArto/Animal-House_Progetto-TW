<script setup lang="ts">
import RandAnimalData from "@/components/RandAnimalData.vue"
import type { RandAnimal, Animal } from '@/model';

defineProps<{
	animal: RandAnimal | Animal,
    isRandAnimal: boolean,
	getCustomText: Function
}>()
</script>
<template>
	<div class="modal fade" :id="'myAnimal' + animal._id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="myModalLabel">{{ animal.name }}</h4>
					<b-button variant="danger" data-bs-dismiss="modal" aria-label="Close"> <i
							class="bi bi-x-circle-fill"></i>
					</b-button>
				</div>
				<div class="modal-body">
					<img class="d-flex mx-auto img-thumbnail" :src="animal.image_link" :alt="animal.name + '_photo'" style="width:75%;">
					<div class="col-12 py-2" v-if='!isRandAnimal'>
						<div class="row">
							<div class="col">
								<div class="row">
									<p id="title-body"><b>Informazioni anagrafiche</b></p>
									<p style="font-size: 18px;">
										{{ (animal as Animal).name }} è un {{ (animal as Animal).specie }} di razza {{ (animal as Animal).razza }}. <br>
										E' {{ (animal as Animal).gender }} ed è nato il {{ (animal as Animal).birthday }}. <br>
										Ha un peso che va dai {{ (animal as Animal).weight }}
									</p>
								</div>
								<div class="row">
									<p id="title-body"><b>Informazioni sul padrone</b></p>
									<p style="font-size: 18px;">
										Nome: {{(animal as Animal).owner_name }}  <br>
										Cognome: {{ (animal as Animal).owner_surname }} <br>
										Email: {{ (animal as Animal).owner_email }} <br>
										Numero di telefono:  {{ (animal as Animal).owner_phone }} 
									</p>
								</div>
							</div>
							<div class="col">
								<p class="mt-5" id="title-body"><b>Informazioni sanitarie</b></p>
								<p style="white-space: pre-line; font-size: 18px;">
									{{ (animal as Animal).condizioni }}
								</p>
							</div>
						</div>
					</div>
					<div class="col-12 py-2" v-else>
						<RandAnimalData :animal="animal as RandAnimal" :getCustomText="getCustomText" />
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
</template>


<style scoped>
	.modal-body {
		font-family:Arial, Helvetica, sans-serif;
	}
	#title-body {
		font-size: 22px;
	}
</style>