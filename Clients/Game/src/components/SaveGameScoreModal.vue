<template>
	
	<b-button variant="success" class="rounded rounded-4" data-bs-toggle="modal" data-bs-target="#LoginFormModal" :disabled="isRegistraActive">
		Registra il tuo punteggio
	</b-button>

  	<!-- LOGIN MODAL -->
	<div id="LoginFormModal" class="modal fade" ref="modalRef">
		<div class="modal-dialog">
			<div class="modal-content">
				<b-form class="form-signin w-100 m-auto" @submit="tryLogin">
					<div class="modal-header">				
						<h4 class="modal-title">Accedi e registra il tuo punteggio</h4>
						<b-button variant="danger" data-bs-dismiss="modal" aria-label="Close"> <i
							class="bi bi-x-circle-fill"></i>
						</b-button>
					</div>
					<div class="modal-body">
						<div class="input-group mb-3">
							<span class="input-group-text"><i class="bi bi-envelope-fill"></i></span>
							<div class="form-floating">
								<input type="email" v-model="form.email" class="form-control" id="input-email" placeholder="name@example.com" required>
								<label for="input-email">Email address</label>
							</div>
						</div>
						<div class="input-group">
							<span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
							<div class="form-floating">
								<input type="password" v-model="form.password" class="form-control" id="input-password" placeholder="Password" required>
								<label for="input-password">Password</label>
							</div>
						</div>
					</div>
					<div class="modal-footer justify-content-end">
						<a :href="ENDPOINT.FRONT_OFFICE" target="_blank"> Non ho un account </a>
						<input type="submit" class="btn btn-primary" value="Login">
					</div>
				</b-form>
			</div>
		</div>
	</div>
	
	<!-- TOAST MESSAGE -->
	<div class="toast-container position-fixed bottom-0 end-0 p-3">
		<div ref="toastRef" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
			<div class="toast-header">
				<strong class="me-auto">{{ toastData.title }}</strong>
				<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
			</div>
			<div class="toast-body">
				{{ toastData.message }}
			</div>
		</div>
	</div>
	
</template>

<script setup lang="ts">
// @ts-ignore
import { Toast, Modal } from 'bootstrap'
import { ENDPOINT } from '@/utils/const';
import { ref, reactive, onMounted } from 'vue';

const props = defineProps<{
	score: number
}>()

const form = reactive({
    email: '',
    password: '',
})

let isRegistraActive = ref(false)

let toast: Toast
const toastRef = ref(null)
let toastData = reactive({
	title: "",
	message: ""
})

let modal: Modal
const modalRef = ref(null)

onMounted(() => {
	modal = new Modal(modalRef.value!)
	toast = new Toast(toastRef.value!)
})

async function tryLogin(event: FormDataEvent) {
	event.preventDefault()
	const data = await fetch(ENDPOINT.LOGIN, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email: form.email,
			password: form.password,
		}),
	}).then(response => response.json())

	if (data.error) {
		toastData.title = "Error"
		toastData.message = data.error.message
		toast.show()
	} else {
		await registraPunteggio(data.token)
	}
}

async function registraPunteggio(token: string) {
	const data = await fetch(ENDPOINT.POST_SCORE, {
		method: 'POST',
		headers: { 
			'Authorization': `Bearer ${ token }`, 
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			game: "Quiz",
			punteggio: props.score,
		}),
	}).then(response => response.json())

	if (data.error) {
		toastData.title = "Error"
		toastData.message = data.error.message
		toast.show()
	} else {
		toastData.title = "Success"
		toastData.message = "Punteggio registrato correttamente"
		toast.show()
		
		form.email = ""
		form.password = ""
		isRegistraActive.value = true
		modal.hide()
	}
}

</script>

<style scoped>

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>