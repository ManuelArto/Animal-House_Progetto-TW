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

<div class="main-content relative w-full">
	<nav class="absolute flex flex-wrap items-center content-between py-3 px-4 navbar-top w-full text-dark" id="navbar-main">
		<div class="container mx-auto sm:px-4 max-w-full mx-auto sm:px-4">
			<div>USER PROFILE</div>
		</div>
	</nav>
	<div
		class="header pb-8 pt-5 pt-lg-8 flex items-center"
		style="min-height: 600px; background-image: url(https://img.freepik.com/premium-photo/simple-white-background-with-smooth-lines-light-colors_476363-5558.jpg); background-size: cover; background-position: center top;"
	>
		<div class="container mx-auto mt-4 sm:px-4 max-w-full mx-auto sm:px-4 flex items-center">
			<div class="flex flex-wrap ">
				<div class="lg:w-3/5 pr-4 pl-4">
					<h1 class="text-2xl mb-8 text-dark sm:mt-4">Hello {$user.name}</h1>
					<!-- TODO: modifica testo presentazione pagina profilo -->
					<p class="text-dark font-light text-base mb-10">
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
					{#if animalsView}
						<Button class="bg-blue-500" on:click={() => isAnimalFormOpen = !isAnimalFormOpen }> Aggiungi</Button>
						<Button color="dark" on:click={ () => animalsView = false }> Torna al profilo </Button>
					{:else}
						<Button color={editMode ? "green" : "dark"} type="submit" form={formId} on:click={() => editMode = !editMode }> {editMode ? "Save" :  "Edit" } </Button>
						<Button class="bg-blue-500" on:click={ () => animalsView = true } disabled={editMode} >I miei animali</Button>
					{/if}
				</div>
				<div class="xl:w-1/3 px-4 xl:order-2 mb-2 xl:mb-0 mt-14 mb-5 sm:text-center">
					<div class="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 card-profile shadow">
						<div class="flex flex-wrap  justify-center">
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
						<div
							class="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900 text-center border-0 pt-8 md:pt-6 pb-0 md:pb-6"
						/>
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
	<div class="container mx-auto my-6">
		{#if animalsView}
			<AnimalFormModel isAnimalFormOpen={isAnimalFormOpen} on:closeForm={() => isAnimalFormOpen = false} />
				{#each $animals as animal (animal._id)}
					<CardAnimal animal={animal}/>
				{:else}
					No animals yet
				{/each}
		{:else}
		<div class="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 bg-gray-600 shadow mb-5 mx-2">
			<CardAccount formId={formId} editMode={editMode}/>
		</div>
		{/if}
	</div>
</div>
