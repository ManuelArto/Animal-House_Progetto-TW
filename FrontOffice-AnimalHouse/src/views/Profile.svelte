<script>
	import { Button } from "flowbite-svelte"
	import { user, animals } from '../store'
	import "../assets/ProfilePage.css"
	import CardAccount from "../components/user/CardAccount.svelte"
	import AnimalFormModel from "../components/animals/AnimalFormModel.svelte"
	import CardAnimal from "../components/animals/CardAnimal.svelte"

	let formId = "edit-user-form"
	let editMode = false
	
	export let animalsView = false
	let isAnimalFormOpen = false
</script>

<div class="relative w-full"
	style="min-height: 500px; background-image: url(https://img.freepik.com/premium-photo/simple-white-background-with-smooth-lines-light-colors_476363-5558.jpg); background-size: cover; background-position: center top;"
>
	<div class="container mx-auto my-auto p-5">
		<p class="absolute sm:px-4 sm:px-4"> USER PROFILE </p>
		<div class="mt-3 pb-8 pt-5">
			<div class="sm:px-4 mx-auto sm:px-4 sm:flex justify-between mt-3">
				<div class="sm:w-2/3">
					<h1 class="text-2xl sm:mb-8 text-dark sm:mt-4">Hello {$user.name}</h1>
					<!-- TODO: modifica testo presentazione pagina profilo -->
					<p class="text-dark font-light text-base mb-2 sm:mb-10 mt-5">
						{#if animalsView}
							This is your pets page. You can see the progress
							you've made with your work and manage your projects or
							assigned tasks	 
						{:else}
							This is your profile page. You can see the progress
							you've made with your work and manage your projects or
							assigned tasks
						{/if}
					</p>
					<div class="my-4">
						{#if animalsView}
							<Button class="bg-blue-500" on:click={() => isAnimalFormOpen = !isAnimalFormOpen }> Aggiungi</Button>
							<Button color="dark" on:click={ () => animalsView = false }> Torna al profilo </Button>
						{:else}
							<Button color={editMode ? "green" : "dark"} type="submit" form={formId} on:click={() => editMode = !editMode }> {editMode ? "Save" :  "Edit" } </Button>
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
<div class="container mx-auto my-6 h-max block items-center md:flex md:items-start">
	{#if animalsView}
		<AnimalFormModel isAnimalFormOpen={isAnimalFormOpen} on:closeForm={() => isAnimalFormOpen = false} />
			{#each $animals as animal (animal._id)}
				<CardAnimal animal={animal}/>
			{:else}
				<div class="text-lg font-medium text-gray-700 mb-10 text-center h-full my-5">
					<span class="bg-gray-300 p-2 rounded-full text-gray-700">No animals yet</span>
				</div>
			{/each}
	{:else}
	<div class="w-full rounded break-words border bg-white border-1 border-gray-300 bg-gray-600 shadow mb-5 mx-2">
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