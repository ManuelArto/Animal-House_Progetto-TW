<script>
	import { Button } from "flowbite-svelte"
	import { user } from '../store'
	import "../assets/ProfilePage.css"
	import CardAccount from "../components/user/CardAccount.svelte"
	import AnimalFormModel from "../components/animals/AnimalFormModel.svelte"
	import CardAnimal from "../components/animals/CardAnimal.svelte"

	let formId = "edit-user-form"

	export let animalsView = false
	let isAnimalFormOpen = false
	
	let editMode = false

	function add_animals() {
		let btn_value = document.getElementById("btn_animals").value
		if(btn_value === "I miei animali"){
			document.getElementById("btn_edit").value = "Aggiungi"
			document.getElementById("btn_edit").innerHTML = "Aggiungi"
			document.getElementById("btn_edit").style.background = "DodgerBlue"
			document.getElementById("btn_animals").value = "Profilo"
			document.getElementById("btn_animals").innerHTML = "Torna al profilo"
			document.getElementById("btn_animals").style.background = "Orange"
			animalsView = true
			let btn = document.getElementById("btn_edit")
			btn.onclick = () => isAnimalFormOpen = true 
		}else{
			document.getElementById("btn_edit").value = "Edit"
			document.getElementById("btn_edit").innerHTML = "Edit"
			document.getElementById("btn_edit").style.background = "#1F2937"
			document.getElementById("btn_animals").value = "I miei animali"
			document.getElementById("btn_animals").innerHTML = "I miei animali"
			document.getElementById("btn_animals").style.background = "#3B82F6"
			animalsView = false
			isAnimalFormOpen = false
		}
	}
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
						This is your profile page. You can see the progress
						you've made with your work and manage your projects or
						assigned tasks
					</p>
					<Button id="btn_edit" color={editMode ? "green" : "dark"} type="submit" form={formId} on:click={() => editMode = !editMode }> {editMode ? "Save" :  "Edit" } </Button>
					<Button id="btn_animals" class="bg-blue-500" value="I miei animali" on:click={add_animals}>I miei animali</Button>
				</div>
				<div class="xl:w-1/3 pr-4 pl-4 xl:order-2 mb-2 xl:mb-0 sm:mt-14 sm:mb-16 sm:text-center">
					<div
						class="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 card-profile shadow"
					>
						<div class="flex flex-wrap  justify-center">
							<div class="lg:w-1/4 pr-4 pl-4 lg:order-2">
								<div class="card-profile-image relative">
									<img
										src="https://demos.creative-tim.com/argon-dashboard/assets-old/img/theme/team-4.jpg"
										class=" absolute rounded-full left-1/2"
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
									{ user.getFullName() }
								</h3>
								<div>
									<Button class="mb-3 sm:ml-2 sm:mr-2" color="red">Delete Account</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="container mx-auto sm:px-4 max-w-full mx-auto sm:px-4 mt-6">
		<div class="flex flex-wrap ">
			<div class="xl:w-2/3 pr-4 pl-4 xl:order-1 rounded">
				<div class="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 bg-gray-600 shadow mb-5">
					{#if animalsView}
						<AnimalFormModel isAnimalModalFormOpen={isAnimalFormOpen} />
						<CardAnimal />
						<CardAnimal />
					{:else}
						<CardAccount formId={formId} editMode={editMode}/>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
