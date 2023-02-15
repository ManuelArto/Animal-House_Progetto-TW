<script>
	import { Accordion, Modal, TableBody, TableBodyCell, TableBodyRow, Checkbox, Table, Search, Card, Button, Spinner } from "flowbite-svelte";
	import { onMount } from "svelte"
    import { ENDPOINT } from "../utils/const";
    import { handleRequest } from "../utils/requestHandler";
	import { animals } from '../store/animals'
	import { user } from '../store/user'
	import SedeServicesCard from "../components/servizi/SedeServicesCard.svelte";

	let isUserLogged;
	user.isUserLogged.subscribe(value => isUserLogged = value );

	// SEDI
	async function getSedi() {
		let res 
        if (res = await handleRequest(ENDPOINT.SEDI_LIST)) {
            const data = await res.json()
    
            if (data.error)
                addToast({ message: `${data.error.type}<br>${data.error.message}`})
            else
                return data
        } else
            return []
	}
	let sedi = []

	let fetching = false
    onMount(async () => {
        fetching = true
        sedi = await getSedi()
        fetching = false
    })

	// Indirizzi SEDI
	let searchTerm = '';
	$: table_sedi = sedi.filter(
        (sede) => `${sede.address.street}, ${sede.address.city}`.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 
    )

	// FILTRI
	let services = ["Dogsitter", "Veterinario"];	// TODO: capire se lasciare statico
	let selected_sedi = [];
	let selected_services = [];
	let selected_date;
	function cercaServizi() {
		if($animals.length == 0)
			noAnimalError = true;
		else {
			selected_animal = $animals[0]
			noAnimalError = false;
			document.getElementById("selezione").style.display = "none";
			document.getElementById("prenotazione").style.display = "block";
		}
	}

	
	// SEZIONE SERVIZI
	$: filtered_sedi = selected_sedi.length ? selected_sedi : sedi;
	$: filtered_services = selected_services.length ? selected_services : services;

	let noAnimalError
	let selected_animal = $animals[0]

	function back(){
		document.getElementById("selezione").style.display = "block";
		document.getElementById("prenotazione").style.display = "none";
	}

	$: isSediSectionOpen = selected_sedi.map((value) => false)
	const open_all  = () => isSediSectionOpen = isSediSectionOpen.map((value) => true)
	const close_all = () => isSediSectionOpen = isSediSectionOpen.map((value) => false)

</script>

<style>
</style>

{#if !isUserLogged}
<div class="bg-red-600 text-white text-center py-5 my-10 rounded">
	<h2 class="text-xl font-bold">Accesso riservato</h2>
	<p class="text-sm font-light">Per accedere a questa sezione, effettua l'accesso sulla piattaforma</p>
</div>
{:else}
<div class="container mx-auto">
	<p class="mt-10 ml-10 font-bold font-serif xl:text-4xl sm:text-lg text-gray-900 dark:text-white">Prenota il servizio desiderato dove vuoi e quando vuoi</p>
	<div id="selezione" style="display:block;"> 
		<p class="mt-5 mb-2 ml-10 font-serif xl:text-2xl sm:text-lg text-gray-900 dark:text-white">Utilizza i filtri di seguito e visualizza le nostre disponibilità</p>
		<p class="ml-10 text-sm">(clicca direttamente su <b>prenota</b> per visualizzare i servizi di tutte le sedi)</p>
		{#if fetching}
		<div class="text-center"><Spinner/></div>
		{:else}
			<div class="xl:inline-flex sm:block mt-10 ml-5">
				<!-- FILTRO SERVIZI -->
				<Card class="xl:ml-5 xl:mb-auto">
					<div id="checkbox_services">
						<p class="text-lg text-dark">Filtra il servizio desiderato</p>
						{#each services as service}
							<Checkbox class="mt-5 text-lg" value={service} 
							on:change={(event) => {
									if (event.target.checked) {
										if (!selected_services.includes(event.target.value)) {
											selected_services.push(event.target.value);
										}
									} else {
										selected_services = selected_services.filter((service) => service !== event.target.value)
									}
									selected_services = selected_services
								}}>
								{service}
							</Checkbox>
						{/each}
					</div>
				</Card>
				<!-- FILTRO INDIRIZZI SEDI -->
				<Card class="xl:ml-5 max-h-96">
					<p class="text-lg text-dark mb-2 ">Filtra la sede più comoda</p>
					<Search size="sm" placeholder="Cerca un indirizzo o città" on:input={(event) => searchTerm = event.target.value} />
					<Table divClass="relative mt-2 -ml-2 overflow-auto overflow-x-hidden sm:rounded-lg" hoverable={true}>
						<TableBody class="divide-y" id="checkbox_sits">
							{#each table_sedi as sede}
								<TableBodyRow class="border-slate-400">
									<TableBodyCell tdClass="whitespace-nowrap font-medium">
										<Checkbox class="px-6 py-4" value={sede._id}
											on:change={(event) => {
												if(event.target.checked) {
													if (!selected_sedi.includes(sede)) {
														selected_sedi.push(sede);
													}
												} else {
													selected_sedi = selected_sedi.filter((sede) => sede._id !== event.target.value)
												}
												selected_sedi = selected_sedi
											}}>
											{sede.address.street + ", " + sede.address.city}
										</Checkbox>
									</TableBodyCell>
								</TableBodyRow>
							{/each}
						</TableBody>
					</Table>
				</Card>
				<!-- FILTRO DATA -->
				<Card class="xl:ml-5 xl:mb-auto">
					<p class="text-lg text-dark">Filtra la data desiderata *</p>
					<div class="relative max-w-sm mt-5">
						<input class="w-75 rounded-lg" type="date" id="input-date" bind:value={selected_date} />
					</div>
				</Card>
			</div>

			<div class="flex flex-row-reverse mr-20 mb-10">
				<Button on:click={cercaServizi}>Prenota</Button>
			</div>
		{/if}
	</div>
</div>
{/if}

{#if selected_animal != null}
<div id="prenotazione" style="display:none;">
	<p class="mt-5 ml-10 font-serif xl:text-2xl sm:text-lg text-gray-900 dark:text-white">Ecco le sedi che offrono il servizio</p>
	<div class="mt-10 ml-10">
		<a href="#/serviziPresenza" class="py-36" on:click={back}>
			<svg class="w-6 h-6 inline-flex" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="blue">
				<path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
			</svg> <span class="text-blue-700">Back</span>
		</a> 	
	</div>

	<div class="mt-10 ml-10">
		<Button on:click={open_all}>Open all</Button>
		<Button on:click={close_all}>Close all</Button>
		<div class="mr-8 flex justify-end">
			<select class="rounded-lg text-center" bind:value={selected_animal} >
				{#each $animals as animal}
					<option value={animal}>{animal.name} </option>
				{/each}
			</select>
		</div>
		
		<Accordion multiple class="mt-5 mr-5">
			{#each filtered_sedi as sede, i}
				<SedeServicesCard 
					isSedeSectionOpen={isSediSectionOpen[i]} 
					sede={sede} 
					filtered_services={filtered_services} 
					selected_date={selected_date} 
					selected_animal={selected_animal}/>
			{/each}
		</Accordion>
	</div>
</div>
{:else}
	<Modal class="h-min my-auto" bind:open={noAnimalError} size="xs" autoclose>
		<div class="text-center">
			<svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
			<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Non hai ancora inserito animali</h3>
			<Button color='alternative' href="#/profile/pets">Clicca qui</Button>
		</div>
	</Modal>
{/if}