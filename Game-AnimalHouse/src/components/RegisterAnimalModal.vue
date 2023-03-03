

<template>
	<div ref="modal" class="modal fade" :id="modalId" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<form @submit.prevent="submitForm">
					<div class="modal-header">
						<h4 class="modal-title" id="myModalLabel">Register your animal</h4>
						<b-button ref="closeButton" variant="danger" data-bs-dismiss="modal" aria-label="Close"> <i
								class="bi bi-x-circle-fill"></i>
						</b-button>
					</div>
					<div class="modal-body">
						<b-row class='row row-cols-sm-2 mx-1 p-4' style="background: #c2edf9">
							<b-col class="col-md-8">
								<p class="m-0">Dati del tuo amico</p>
								<b-row class='row-cols-md-2 row-cols-1'>
									<b-col>
										<label for='pets-name'>Name</label><br>
										<input v-model.trim="animal.name" id='pets-name' placeholder="Pet's name" type='text' class="form-control form-control-sm" required>
									</b-col>
									<b-col>
										<label for='pets-upload'><i class="bi bi-camera"></i> Profile photo </label><br>
										<input @change="onFileChange" class="form-control form-control-sm" type="file" id="pets-upload" required>
									</b-col>
									<b-col>
										<label for='pets-breed'>Breed</label><br>
										<input v-model.trim="animal.razza" id='pets-breed' placeholder="Pet's breed" type='text' class="form-control form-control-sm" required>
									</b-col>
									<b-col>
										<label for='pets-species'>Species</label><br>
										<input v-model.trim="animal.specie" id='pets-species' placeholder="Pet's species" type='text' class="form-control form-control-sm" required>
									</b-col>
									<b-col>
										<label for='pets-birthday' >Birthday</label><br>
										<input v-model="animal.birthday" id='pets-birthday' placeholder="Pet's birthday" type='date' class="form-control form-control-sm" required>
									</b-col>
									<b-col>
										<label for='pets-condition'>Conditions</label><br>
										<textarea v-model="animal.condizioni" id='pets-condition' placeholder="Pet's conditions" rows='1' class="form-control form-control-sm"></textarea>
									</b-col>
									<b-col>
										<label for="pet-weight">Weight</label>
										<select v-model="animal.weight" class="form-select" id="pet-weight">
											<option value="0-10kg" checked>0-10 kg</option>
											<option value="10-25kg">10-25 kg</option>
											<option value="25-40kg">25-40 kg</option>
											<option value="40-60kg">40-60 kg</option>
											<option value="60+kg">60+ kg</option>
										</select>
									</b-col>
									<b-col class="mb-3">
										<label for="pet-gender">Gender</label>
										<select v-model="animal.gender" class="form-select" id="pet-gender">
											<option value="male">Male</option>
											<option value="female">Female</option>
										</select>
									</b-col>
								</b-row>
							</b-col>
							<b-col class="col-md-4">
								<p class="m-0 text-nowrap">Dati del proprietario</p>
									<div>
										<label for='name-owner'>Name</label><br>
										<input v-model.trim="animal.owner_name" id='name-owner' placeholder="Owner's name" type='text' class="form-control form-control-sm" required>
									</div>
									<div>
										<label for='surname-owner'>Surname</label><br>
										<input v-model.trim="animal.owner_surname" id='surname-owner' placeholder="Owner's surname" type='text' class="form-control form-control-sm" required>
									</div>
									<div>
										<label for='number-owner'>Phone number</label><br>
										<input v-model.trim="animal.owner_phone" id='number-owner' placeholder="333-4524127" type='tel' pattern="[0-9]{10}" class="form-control form-control-sm" required>
									</div>
									<div>
										<label for='email-owner'>Email</label><br>
										<input v-model.trim="animal.owner_email" id='email-owner' placeholder="mariorossi@gmail.com" type='email' class="form-control form-control-sm" required>
									</div>
							</b-col>
						</b-row>
					</div>
					<div class="modal-footer">
						<b-button data-bs-dismiss="modal">Annulla</b-button>
						<input class="btn btn-primary" type="submit" value="Conferma"/>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { addAnimal } from '@/store'
import type { Animal } from '@/model';
// @ts-ignore
import { Modal } from 'bootstrap'

const props = defineProps<{
	modalId: string,
}>()

var modal: Modal
onMounted(() => {
	modal = new Modal(document.getElementById(props.modalId) as Element)
})

var animal = ref(emptyData())


function onFileChange(event: Event) {
	const fileInput = event.target as HTMLInputElement;
	if (fileInput && fileInput.files && fileInput.files[0]) {
		const file = fileInput.files[0];
		animal.value.image_link = file.name;
		console.log(animal.value.image_link);
	}else{
		animal.value.image_link = "";
		console.log(animal.value.image_link);
	}
}

function submitForm(event: Event) {
	animal.value.condizioni = animal.value.condizioni || "Condizioni non specificate"
	addAnimal(animal.value)
	animal.value = emptyData()
	modal.hide()
}

function emptyData(): Animal {
	return {
		name: "",
		specie: "",
		razza: "",
		image_link: "",
		birthday: "",
		condizioni: "",
		gender: "male",
		weight: "0-10kg",
		owner_name: "",
		owner_surname: "",
		owner_phone: "",
		owner_email: "",
		_id: uuidv4(),
	}
}


</script>

<style scoped class="sass">

/* If the screen size is 601px wide or more, set the font-size of <div> to 80px */
@media screen and (min-width: 991px) {
  p {
    font-size: 1.5em;
  }
}

/* If the screen size is 600px wide or less, set the font-size of <div> to 30px */
@media screen and (max-width: 991px) {
  p {
    font-size: 1.10em;
  }
}

.form-control, .form-select {
	border: 1px solid black;
	border-radius: 4px;
}

</style>