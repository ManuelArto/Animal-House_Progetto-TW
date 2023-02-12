<script>
	import { Button } from "flowbite-svelte"
	import { user } from '../store/user'
	import { animals } from '../store/animals'
	import CardAccount from "../components/user/CardAccount.svelte"
	import AnimalFormModel from "../components/animals/AnimalFormModel.svelte"
	import CardAnimal from "../components/animals/CardAnimal.svelte"

	let formId = "edit-user-form"
	let editMode = false
	
	export let animalsView = false
	let isAnimalFormOpen = false
</script>

<div class="relative w-full"
	style="min-height: 450px; background-image: url(https://img.freepik.com/premium-photo/simple-white-background-with-smooth-lines-light-colors_476363-5558.jpg); background-size: cover; background-position: center top;"
>
	<div class="container mx-auto my-auto p-5">
		<p class="absolute sm:px-4"> PROFILO UTENTE </p>
		<div class="mt-3 pb-8 pt-5">
			<div class="mx-auto sm:px-4 sm:flex justify-between mt-3">
				<div class="sm:w-2/3 mr-4">
					<h1 class="text-2xl sm:mb-8 text-dark sm:mt-4">Ciao {$user.name}</h1>
					<!-- TODO: modifica testo presentazione pagina profilo -->
					<p class="text-dark font-light text-base mb-2 sm:mb-10 mt-5">
						{#if animalsView}
							Questa è la pagina dei tuoi animali. Qui puoi aggiungere tutti i tuoi animali domestici preferiti
						{:else}
							Questa è la tua pagina profilo. Qui puoi visualizzare e modificare i tuoi dati
						{/if}
					</p>
					<div class="my-4">
						{#if animalsView}
							<Button class="bg-blue-500" on:click={() => isAnimalFormOpen = !isAnimalFormOpen }> Aggiungi</Button>
							<Button color="dark" on:click={ () => animalsView = false }> Torna al profilo </Button>
						{:else}
							<Button color={editMode ? "green" : "dark"} type="submit" form={formId} on:click={() => editMode = !editMode }> {editMode ? "Salva" :  "Modifica" } </Button>
							<Button class="bg-blue-500" on:click={ () => animalsView = true } disabled={editMode} >I miei animali</Button>
						{/if}
					</div>
				</div>
				<div class="w-3/5 sm:w-2/5 lg:w-1/4 xl:order-2 xl:mb-0 mb-5 sm:text-center mt-16 sm:mt-14">
					<div class="rounded break-words border bg-white border-1 border-gray-300 card-profile shadow">
						<div class="flex justify-center">
							<div class="lg:w-1/4 lg:order-2">
								<div class="card-profile-image relative">
									<img
										src="https://demos.creative-tim.com/argon-dashboard/assets-old/img/theme/team-4.jpg"
										class="absolute rounded-full left-1/2"
										alt = "user profile icon"
									/>
								</div>
							</div>
						</div>
						<div class="px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900 text-center border-0 pt-8 pb-0"/>
						<div class="flex-auto">
							<div class="text-center">
								<h3 class="mb-2 font-bold text-md">
									{ $user.username }
								</h3>
								<div>
									<!-- TODO: make delete button effective -->
									<Button class="mb-3 sm:ml-2 sm:mr-2" color="red">Delete Account</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="container mx-auto my-6 h-max">
	{#if animalsView}
		<AnimalFormModel isAnimalFormOpen={isAnimalFormOpen} on:closeForm={() => isAnimalFormOpen = false} />
		<div class="lg:grid lg:grid-cols-2 gap-5 p-6">
			{#each $animals as animal (animal._id)}
				<CardAnimal animal={animal}/>
			{/each}
		</div>
		{#if $animals.length == 0}
			<div class="lg:w-1/2 bg-white rounded shadow p-8 text-center mx-auto my-10">
				<h2 class="text-xl font-bold text-gray-800 mb-4">Nessun animale presente</h2>
				<p class="text-gray-600 mb-0">Aggiungi subito il tuo primo animale domestico!</p>
				<Button class="bg-blue-500 mt-4" on:click={() => isAnimalFormOpen = !isAnimalFormOpen }>Aggiungi</Button>
			</div>
		{/if}
	{:else}
		<div class="lg:w-3/4 mx-2 lg:mx-auto rounded break-words border bg-white border-1 border-gray-300 shadow mb-5">
			<CardAccount formId={formId} editMode={editMode}/>
		</div>
	{/if}
</div>


<style>
.bg-white {
  background-color: #fff !important;
}

.pt-8 {
  padding-top: 8rem !important;
}

.card-profile-image img {
  max-width: 180px;
  transform: translate(-50%, -30%);
  border-radius: .375rem;
}
</style>