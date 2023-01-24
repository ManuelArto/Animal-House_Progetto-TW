<script setup lang="ts">
	import {
		Modal,
		Card,
		ToolbarButton,
		Dropdown,
		DropdownItem,
		Avatar,
		Button,
	} from "flowbite-svelte";
	import CardAccount from "../components/CardAccount.svelte";
	import "./Account.css";
	import RegisterModal from "../components/RegisterModal.svelte"
	import CardAnimal from "../components/CardAnimal.svelte"
	let animals = true;
	let defaultModal = false;
	function modify() {
		let btn_value = (document.getElementById("btn_edit") as any).value;
		if (btn_value === "Edit") {
			(document.getElementById("input-username") as any).disabled = false;
			(document.getElementById("input-email") as any).disabled = false;
			(document.getElementById("input-full-name") as any).disabled = false;
			(document.getElementById("input-date") as any).disabled = false;
			(document.getElementById("input-phone") as any).disabled = false;
			(document.getElementById("input-pref") as any).disabled = false;
			(document.getElementById("input-username") as any).style.border = "2px solid black";
			(document.getElementById("input-email") as any).style.border = "2px solid black";
			(document.getElementById("input-full-name") as any).style.border = "2px solid black";
			(document.getElementById("input-date") as any).style.border = "2px solid black";
			(document.getElementById("input-phone") as any).style.border = "2px solid black";
			(document.getElementById("input-pref") as any).style.border = "2px solid black";
			(document.getElementById("input-username") as any).style.color = "black";
			(document.getElementById("input-email") as any).style.color = "black";
			(document.getElementById("input-full-name") as any).style.color = "black";
			(document.getElementById("input-date") as any).style.color = "black";
			(document.getElementById("input-phone") as any).style.color = "black";
			(document.getElementById("input-pref") as any).style.color = "black";
			(document.getElementById("btn_edit") as any).value = "Save";
			(document.getElementById("btn_edit") as any).innerHTML = "Save";
			(document.getElementById("btn_edit") as any).style.background = "green";
		} else {
			(document.getElementById("input-username") as any).disabled = true;
			(document.getElementById("input-email") as any).disabled = true;
			(document.getElementById("input-full-name") as any).disabled = true;
			(document.getElementById("input-date") as any).disabled = true;
			(document.getElementById("input-phone") as any).disabled = true;
			(document.getElementById("input-pref") as any).disabled = true;
			(document.getElementById("input-username") as any).style.border = "1px solid #ccc";
			(document.getElementById("input-email") as any).style.border = "1px solid #ccc";
			(document.getElementById("input-full-name") as any).style.border = "1px solid #ccc";
			(document.getElementById("input-date") as any).style.border = "1px solid #ccc";
			(document.getElementById("input-phone") as any).style.border = "1px solid #ccc";
			(document.getElementById("input-pref") as any).style.border = "1px solid #ccc";
			(document.getElementById("input-username") as any).style.color = "gray";
			(document.getElementById("input-email") as any).style.color = "gray";
			(document.getElementById("input-full-name") as any).style.color = "gray";
			(document.getElementById("input-date") as any).style.color=  "gray";
			(document.getElementById("input-phone") as any).style.color = "gray";
			(document.getElementById("input-pref") as any).style.color = "gray";
			(document.getElementById("btn_edit") as any).value = "Edit";
			(document.getElementById("btn_edit") as any).innerHTML = "Edit";
			(document.getElementById("btn_edit") as any).style.background = "#1F2937";
		}
	}

	function add_animals() {
		let btn_value = (document.getElementById("btn_animals") as any).value;
		if(btn_value === "I miei animali"){
			(document.getElementById("btn_edit") as any).value = "Aggiungi";
			(document.getElementById("btn_edit") as any).innerHTML = "Aggiungi";
			(document.getElementById("btn_edit") as any).style.background = "DodgerBlue";
			(document.getElementById("btn_animals") as any).value = "Profilo";
			(document.getElementById("btn_animals") as any).innerHTML = "Torna al profilo";
			(document.getElementById("btn_animals") as any).style.background = "Orange";
			animals=false;
			let btn = (document.getElementById("btn_edit") as any);
			btn.onclick = () => defaultModal = true; 
		}else{
			(document.getElementById("btn_edit") as any).value = "Edit";
			(document.getElementById("btn_edit") as any).innerHTML = "Edit";
			(document.getElementById("btn_edit") as any).style.background = "#1F2937";
			(document.getElementById("btn_animals") as any).value = "I miei animali";
			(document.getElementById("btn_animals") as any).innerHTML = "I miei animali";
			(document.getElementById("btn_animals") as any).style.background = "#3B82F6";
			animals=true;
			defaultModal = false;
		}
	}
</script>

<div class="main-content">
	<!-- Top navbar -->
	<nav
		class="relative flex flex-wrap items-center content-between py-3 px-4 navbar-top text-dark"
		id="navbar-main"
	>
		<div class="container mx-auto sm:px-4 max-w-full mx-auto sm:px-4">
			<!-- Brand -->
			<div>USER PROFILE</div>
			<!-- User -->
			<ul
				class="flex flex-wrap list-reset pl-0 mb-0 items-center hidden md:flex"
			>
				<li class=" relative">
					<div class="inline-block py-2 px-4 no-underline pr-0">
						<div class="flex items-start items-center">
							<span class="avatar avatar-sm rounded-full">
								<img
									alt="Image placeholder"
									src="https://demos.creative-tim.com/argon-dashboard/assets-old/img/theme/team-4.jpg"
								/>
							</span>
							<div class="flex-1 ml-2 hidden lg:block">
								<span class="mb-0 text-sm font-bold"
									>Jessica Jones</span
								>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</nav>
	<!-- Header -->
	<div
		class="header pb-8 pt-5 pt-lg-8 flex items-center"
		style="min-height: 600px; background-image: url(https://img.freepik.com/premium-photo/simple-white-background-with-smooth-lines-light-colors_476363-5558.jpg); background-size: cover; background-position: center top;"
	>
		<!-- Header container -->
		<div
			class="container mx-auto sm:px-4 max-w-full mx-auto sm:px-4 flex items-center"
		>
			<div class="flex flex-wrap ">
				<div class="lg:w-3/5 pr-4 pl-4	">
					<h1 class="text-2xl text-dark">Hello Jessica</h1>
					<p class="text-dark ">
						This is your profile page. You can see the progress
						you've made with your work and manage your projects or
						assigned tasks
					</p>
					<Button id="btn_edit" color="dark" value="Edit" on:click={modify}>Edit</Button>
					<Button id="btn_animals" class="bg-blue-500" value="I miei animali" on:click={add_animals}>I miei animali</Button>
				</div>
			</div>
		</div>
	</div>
	<!-- Page content -->
	<div class="container mx-auto sm:px-4 max-w-full mx-auto sm:px-4 mt--7">
		<div class="flex flex-wrap ">
			<div class="xl:w-1/3 pr-4 pl-4 xl:order-2 mb-5 xl:mb-0">
				<div
					class="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 card-profile shadow"
				>
					<div class="flex flex-wrap  justify-center">
						<div class="lg:w-1/4 pr-4 pl-4 lg:order-2">
							<div class="card-profile-image">
								<img
									src="https://demos.creative-tim.com/argon-dashboard/assets-old/img/theme/team-4.jpg"
									class="rounded-full"
								/>
							</div>
						</div>
					</div>
					<div
						class="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900 text-center border-0 pt-8 md:pt-6 pb-0 md:pb-6"
					/>
					<div class="flex-auto p-6 pt-0 md:pt-6">
						<div class="text-center">
							<h3>
								Jessica Jones, 27
							</h3>
							<div class="h5 font-light">
								Bucharest,Romania
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="xl:w-2/3 pr-4 pl-4 xl:order-1 rounded">
				<div
					class="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 bg-gray-600 shadow"
				>
					{#if animals}
						<CardAccount />
					{:else}
						<RegisterModal defaultModal={defaultModal} />
						<CardAnimal />
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
