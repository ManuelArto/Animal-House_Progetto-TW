<script>
	import "../assets/ProfilePage.css";
	
	import { Button } from "flowbite-svelte";
	import CardAccount from "../components/user/CardAccount.svelte";
	import RegisterModal from "../components/animals/AnimalFormModel.svelte"
	import CardAnimal from "../components/animals/CardAnimal.svelte"

	let animals = true;
	let defaultModal = false;
	function modify() {
		let btn_value = document.getElementById("btn_edit").value;
		if (btn_value === "Edit") {
			document.getElementById("input-username").disabled = false;
			document.getElementById("input-email").disabled = false;
			document.getElementById("input-full-name").disabled = false;
			document.getElementById("input-date").disabled = false;
			document.getElementById("input-phone").disabled = false;
			document.getElementById("input-preference").disabled = false;
			document.getElementById("input-username").style.border = "2px solid black";
			document.getElementById("input-email").style.border = "2px solid black";
			document.getElementById("input-full-name").style.border = "2px solid black";
			document.getElementById("input-date").style.border = "2px solid black";
			document.getElementById("input-phone").style.border = "2px solid black";
			document.getElementById("input-preference").style.border = "2px solid black";
			document.getElementById("input-username").style.color = "black";
			document.getElementById("input-email").style.color = "black";
			document.getElementById("input-full-name").style.color = "black";
			document.getElementById("input-date").style.color = "black";
			document.getElementById("input-phone").style.color = "black";
			document.getElementById("input-preference").style.color = "black";
			document.getElementById("btn_edit").value = "Save";
			document.getElementById("btn_edit").innerHTML = "Save";
			document.getElementById("btn_edit").style.background = "green";
		} else {
			document.getElementById("input-username").disabled = true;
			document.getElementById("input-email").disabled = true;
			document.getElementById("input-full-name").disabled = true;
			document.getElementById("input-date").disabled = true;
			document.getElementById("input-phone").disabled = true;
			document.getElementById("input-preference").disabled = true;
			document.getElementById("input-username").style.border = "1px solid #ccc";
			document.getElementById("input-email").style.border = "1px solid #ccc";
			document.getElementById("input-full-name").style.border = "1px solid #ccc";
			document.getElementById("input-date").style.border = "1px solid #ccc";
			document.getElementById("input-phone").style.border = "1px solid #ccc";
			document.getElementById("input-preference").style.border = "1px solid #ccc";
			document.getElementById("input-username").style.color = "gray";
			document.getElementById("input-email").style.color = "gray";
			document.getElementById("input-full-name").style.color = "gray";
			document.getElementById("input-date").style.color=  "gray";
			document.getElementById("input-phone").style.color = "gray";
			document.getElementById("input-preference").style.color = "gray";
			document.getElementById("btn_edit").value = "Edit";
			document.getElementById("btn_edit").innerHTML = "Edit";
			document.getElementById("btn_edit").style.background = "#1F2937";
		}
	}

	function add_animals() {
		let btn_value = document.getElementById("btn_animals").value;
		if(btn_value === "I miei animali"){
			document.getElementById("btn_edit").value = "Aggiungi";
			document.getElementById("btn_edit").innerHTML = "Aggiungi";
			document.getElementById("btn_edit").style.background = "DodgerBlue";
			document.getElementById("btn_animals").value = "Profilo";
			document.getElementById("btn_animals").innerHTML = "Torna al profilo";
			document.getElementById("btn_animals").style.background = "Orange";
			animals = false;
			let btn = document.getElementById("btn_edit");
			btn.onclick = () => defaultModal = true; 
		}else{
			document.getElementById("btn_edit").value = "Edit";
			document.getElementById("btn_edit").innerHTML = "Edit";
			document.getElementById("btn_edit").style.background = "#1F2937";
			document.getElementById("btn_animals").value = "I miei animali";
			document.getElementById("btn_animals").innerHTML = "I miei animali";
			document.getElementById("btn_animals").style.background = "#3B82F6";
			animals = true;
			defaultModal = false;
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
					<h1 class="text-2xl mb-8 text-dark sm:mt-4">Hello Jessica</h1>
					<!-- TODO: modifica testo presentazione pagina profilo -->
					<p class="text-dark font-light text-base mb-10">
						This is your profile page. You can see the progress
						you've made with your work and manage your projects or
						assigned tasks
					</p>
					<Button id="btn_edit" color="dark" value="Edit" on:click={modify}>Edit</Button>
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
									Jessica Jones
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
					{#if animals}
						<CardAccount />
					{:else}
						<RegisterModal defaultModal={defaultModal} />
						<CardAnimal />
						<CardAnimal />
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
