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
				<div class="w-3/5 sm:w-2/5 lg:w-1/4 xl:order-2 xl:mb-0 mb-5 text-center mt-16 sm:mt-14">
					<div class="rounded break-words border bg-white border-1 border-gray-300 card-profile shadow">
						<div class="flex justify-center">
								<button class="mt-3 mb-5 w-32 h-32 rounded-full bg-gray-100 text-5xl text-gray-600 font-bold shadow-md">
									{ $user.name.charAt(0).toUpperCase() +  $user.surname.charAt(0).toUpperCase()}
								</button>
						</div>
						<div class="flex-auto">
							<div class="text-center">
								<h2 class="mb-3 font-bold text-2xl">
									{ $user.username }
								</h2>
								<p class="mb-5 text-gray-600 text-lg">
									{ $user.name + " " + $user.surname }
								</p>
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

</style>