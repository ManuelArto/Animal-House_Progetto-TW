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
	<div class="modal fade" :id="'myAnimal' + animal.id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="myModalLabel">{{ animal.name }}</h4>
					<b-button variant="danger" data-bs-dismiss="modal" aria-label="Close"> <i
							class="bi bi-x-circle-fill"></i>
					</b-button>
				</div>
				<div class="modal-body">
					<img class="d-flex mx-auto" :src="animal.image_link" :alt="animal.name + '_photo'" style="width:75%;">
					<div class="col-12 py-2" v-if='!isRandAnimal'>
						<div>
							<p><b>Origini</b></p>
							<p>
								Tartaruga semiacquatica caratteristica di tutta l’Africa centro-meridionale, con
								insediamenti anche
								in Madagascar, Yemen e Arabia Saudita.
								Vive in piccoli bacini d’acqua stagnante e nella stagione secca, quando gli
								stagni si prosciugano,
								trova rifugio nel fango.
							</p>
						</div>
						<div>
							<p><b>Caratteristiche</b></p>
							<p>
								Carapace di forma ovale e di colore da verde oliva a bruno uniforme; occhi
								rotondi e globosi; naso
								all’insù; collo lungo e sottile che la tartaruga
								ritrae a “s” e in modo parziale. <br>
								-Dimorfismo sessuale: la coda dei maschi è più lunga e sottile di quella delle
								femmine. <br>
								-Taglia: 25-30 cm di lunghezza.<br>
								-Durata media della vita: 5-20 anni.
							</p>
						</div>
						<div>
							<p><b>Ambiente</b></p>
							<p>
								Questa tartaruga non può essere tenuta in vasche esterne (tranne che in piena
								estate). Richiede un
								acquaterrario di una dimensione minima di 100x50x40 cm
								con 2/3 della superficie coperti di acqua poco profonda (la tartaruga deve poter
								respirare
								appoggiandosi sulle zampe posteriori) e una zona asciutta di sabbia.
								L’acqua sarà filtrata attraverso una pompa. Bisognerà, inoltre, inserire lampade
								al neon per la
								diffusione di raggi UVA e UVB (per la sintesi della vitamina D)
								e un riscaldatore a termostato che permetta di mantenere la temperatura
								dell’acqua tra i 25 e i 31
								°C. Di notte, la temperatura dovrà essere di qualche grado
								(4 o 5) più bassa.
							</p>
						</div>
						<div>
							<p><b>Alimentazione</b></p>
							<p>
								Regime essenzialmente carnivoro: insetti, vermi di fango, vermi di terra, vermi
								della farina, larve,
								pesciolini, granulare per tartarughe carnivore ecc.
								Pochi complementi di vegetali: giacinto d’acqua, radicchio, sagittaria ecc. <br>
								Gli individui giovani devono mangiare tutti i giorni, mentre per gli adulti è
								sufficiente un pasto
								ogni tre giorni.
							</p>
						</div>
						<div>
							<p><b>Comportamento</b></p>
							<p>
								Attività diurna. Se la tartaruga vive in gruppo, talvolta occorre separare i
								sessi perché i maschi
								possono tormentare le femmine e mostrarsi aggressivi.
							</p>
						</div>
						<div>
							<p><b>Riproduzione</b></p>
							<p>
								Specie ovipara.<br>
								Maturità sessuale: 2-5 anni.<br>
								Stagione riproduttiva: da marzo a luglio.<br>
								Numero di uova: fino a 20 (interrate nella sabbia umida).<br>
								Durata dell’incubazione: 70-90 giorni.
							</p>
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

</style>