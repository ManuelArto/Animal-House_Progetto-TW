<script>
	import { AccordionItem, Accordion, Modal, TableBody, TableBodyCell, TableBodyRow, Checkbox, Input, Label, Radio, TableHead, TableHeadCell, TableSearch, Card, Button } from "flowbite-svelte";
	import { animals } from '../store'
	import { user } from '../store'
	import CardServices from "../components/CardServices.svelte";
	let searchTerm = '';
	let isUserLogged;
	user.isUserLogged.subscribe(value => isUserLogged = value );
	let data = [
		{
			"address": {
				"street": "Via caltanisetta 12",
				"city": "Foggia",
				"zipCode": "711000"
			},
			"services": {
				"Dogsitter": [
					{
						"tipo": ["cane", "gatto"],
						"peso": "10-30kg",
						"number": 0
					},
					{
						"tipo": "cane",
						"peso": "30-50kg",
						"number": 1
					}
				],
				"Veterinario": [
					{
						"tipo": "cane",
						"peso": "10-20kg",
						"number": 0
					}
				]
			}
		},
		{
			"address": {
				"street": "Via Roma 1",
				"city": "Roma",
				"zipCode": "00185"
			},
			"services": {
				"Dogsitter": [
					{
						"tipo": "cane",
						"peso": "10-20kg",
						"number": 0
					},
					{
						"tipo": "cane",
						"peso": "20-40kg",
						"number": 1
					}
				]
			}
		},
		{
			"address": {
				"street": "Piazza del Duomo 5",
				"city": "Milano",
				"zipCode": "20122"
			},
			"services": {
				"Veterinario": [
					{
						"tipo": "cane",
						"peso": "10-40kg",
						"number": 0
					}
				]
			}
		},
		{
			"address": {
				"street": "Via dei Giardini 15",
				"city": "Napoli",
				"zipCode": "80121"
			},
			"services": {
				"Dogsitter": [
					{
						"tipo": "cane",
						"peso": "10-20kg",
						"number": 0
					}
				],
				"Veterinario": [
					{
						"tipo": "cane",
						"peso": "10-20kg",
						"number": 0
					}
				]
			}
		}
	]

	$: filteredItems = data.filter(
        (item) => item.address.street.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 
    );
	
	let error;
	let date_insert = false;
	let error_insert_service=false;
	let error_animal;
	let selectedOption = $animals.name;

	let total_services = ["Dogsitter", "Veterinario"];
	let selected_sits = [];
	let selected_service = [];
	let date_value;
	
	function control(){
		let form = document.getElementById("checkbox_services");
		let form2 = document.getElementById("checkbox_sits");
		let checkboxes_services = form.querySelectorAll('input[type="checkbox"]');
		let checkboxes_sits = form2.querySelectorAll('input[type="checkbox"]');
		let checkedOne = Array.prototype.slice.call(checkboxes_services).some(x => x.checked);
		let checkedTwo = Array.prototype.slice.call(checkboxes_sits).some(x => x.checked);
		if (date_insert && !checkedOne) {
			error_insert_service = true;
			error = true;
		}else if(!checkedOne && !checkedTwo){
			error = true;
		}else{
			error = false;
			error_insert_service = false;
			if($animals.length == 0){
				error_animal = true;
			}else{
				error_animal = false;
				document.getElementById("selezione").style.display = "none";
				document.getElementById("prenotazione").style.display = "block";
			}
		}

		selected_sits = selected_sits;
		selected_service = selected_service;
	}

	function back(){
		document.getElementById("selezione").style.display = "block";
		document.getElementById("prenotazione").style.display = "none";
	}

	const items = Array(selected_sits.length); 
	const open_all = () => items.forEach((_,i)=> items[i] = true)
	const close_all= () => items.forEach((_,i)=> items[i] = false)

</script>

<style>
</style>

{#if !isUserLogged}
	<div class="text-danger font-bold text-red-600 text-2xl mt-10 ml-24">
		Per accedere a questa sezione devi eseguire l'accesso sulla piattaforma
	</div>
{:else}
	<p class="mt-10 ml-10 font-bold font-serif xl:text-4xl sm:text-lg text-gray-900 dark:text-white">Prenota il servizio desiderato dove vuoi e quando vuoi</p>
	<div id="selezione" style="display:block;"> 
		<p class="mt-5 ml-10 font-serif xl:text-2xl sm:text-lg text-gray-900 dark:text-white">Compila i campi di seguito e controlla la nostra disponibilità</p>
		<div class="xl:inline-flex sm:block mt-10 ml-5">
			<Card class="xl:ml-5 xl:mb-64">
				<div id="checkbox_services">
					{#if date_insert}
							<p class="text-lg text-red-600">Scegli il servizio desiderato (required)</p>
					{:else}
						<p class="text-lg text-dark">Scegli il servizio desiderato</p>
					{/if}
					<Checkbox class="mt-5 text-lg" name="example" value="Dogsitter" 
						on:change={(event) => {
							const target = event.target;
							if (target.checked) {
								if (!selected_service.includes(target.value)) {
									selected_service.push(target.value);
								}
							} else {
								selected_service = selected_service.filter(item => item !== target.value);
							}
					  	}}
					>Dogsitter</Checkbox>
					<Checkbox class="mt-5 text-lg" name="example" value="Veterinario" 
						on:change={(event) => {
							const target = event.target;
							if (target.checked) {
								if (!selected_service.includes(target.value)) {
									selected_service.push(target.value);
								}
							} else {
								selected_service = selected_service.filter(item => item !== target.value);
							}
						}}
					>Veterinario</Checkbox>
				</div>
			</Card>
			<Card class="xl:ml-5 max-h-96">
				<p class="text-lg text-dark">Scegli la sede più comoda</p>
				<TableSearch placeholder="Search by address" hoverable={true} bind:inputValue={searchTerm}>
					<TableBody class="divide-y" id="checkbox_sits">
						{#each filteredItems as item}
							<TableBodyRow class="border-separate border-spacing-2 border border-slate-400">
								<TableBodyCell><Checkbox value={item.address.street} 
									on:change={() => {
										if(event.target.checked) {
										if (!selected_sits.includes(item.address.street)) {
											selected_sits.push(item.address.street);
										}
										} else {
										selected_sits = selected_sits.filter(address => address !== item.address.street);
										}
									}}
								>{item.address.street + ", " + item.address.city}</Checkbox></TableBodyCell>
							</TableBodyRow>
						{/each}
					</TableBody>
				</TableSearch>
			</Card>

			<Card class="xl:ml-5 xl:mb-72">
				<p class="text-lg text-dark">Scegli la data desiderata *</p>
				<div class="relative max-w-sm mt-5">
					<input class="w-75 rounded-lg" type="date" id="input-date" bind:value={date_value} on:change={() => date_insert = !date_insert}>
				</div>
			</Card>
		</div>

		<div class="flex flex-row-reverse mr-20 mb-10">
			<Button type="submit" on:click={control}>Prenota</Button>
		</div>
		<div class="ml-10 mb-5">
			<p class="text-xs">* Se inserisci la data, obbligatoriamente devi inserire il servizio</p>
		</div>
	</div>
{/if}	

{#if error}
	<Modal bind:open={error} size="xs" autoclose>
		<div class="text-center">
			<svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
			<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Devi selezionare almeno una checkbox</h3>
			<Button color='alternative'>ok</Button>
		</div>
	</Modal>
{/if}

{#if error_insert_service}
	<Modal bind:open={error} size="xs" autoclose>
		<div class="text-center">
			<svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
			<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Devi selezionare almeno un servizio se imposti una data</h3>
			<Button color='alternative'>ok</Button>
		</div>
	</Modal>
{/if}

{#if error_animal}
	<Modal bind:open={error_animal} size="xs" autoclose>
		<div class="text-center">
			<svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
			<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Non hai ancora inserito animali</h3>
			<Button color='alternative' href="#/profile/pets">Clicca qui</Button>
		</div>
	</Modal>
{/if}

<div id="prenotazione" style="display:none;">   <!--  DA CAMBIAREEEEEE -->
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
			<select class="rounded-lg text-center" bind:value={selectedOption} on:change={close_all}>
				{#each $animals as animal}
					<option value={animal.name}>{animal.name} </option>
				{/each}
			</select>
		</div>
		
		<Accordion multiple class="mt-5 mr-5">
			<!-- SELEZIONE SOLO PER SEDE, OPPURE PER SEDE E SERVIZIO -->
			{#if selected_sits.length != 0}
				{#each selected_sits as sit, i}
					<AccordionItem bind:open={items[i]}>
						<span slot="header">{sit}</span>
						<div class="inline-flex">
							{#each data as item}
								{#if sit === item.address.street}
									{#if selected_service.length == 0} 
										{#each total_services as ts}
											{#if item.services[ts]}
												<CardServices data={data} selectedOption={selectedOption} service={ts} date_value={date_value} sit={item.address.street}/>
											{/if}
										{/each}
									{:else}
										{#each selected_service as service}
											{#if item.services[service]}
												<CardServices data={data} selectedOption={selectedOption} service={service} date_value={date_value} sit={item.address.street} />
											{/if}
										{/each}
									{/if}
								{/if}
							{/each}
						</div>
					</AccordionItem>
				{/each}

			<!--  SELEZIONE SOLO PER SERVIZIO  -->
			{:else}
				{#each data as item, i}
					{#if selected_service.length == 1 && item.services[selected_service]}
						<AccordionItem bind:open={items[i]}>
							<span slot="header">{item.address.street}</span>
							<div class="inline-flex">
								<CardServices data={data} selectedOption={selectedOption} service={selected_service[0]} date_value={date_value} sit={item.address.street}/>
							</div>
						</AccordionItem>
					{:else if selected_service.length == 2 && (item.services[selected_service[0]] || item.services[selected_service[1]])}
						<AccordionItem bind:open={items[i]}>
							<span slot="header">{item.address.street}</span>
							<div class="inline-flex">
								{#each selected_service as service}
									{#if item.services[service]}
										<CardServices data={data} selectedOption={selectedOption} service={service} date_value={date_value} sit={item.address.street} />
									{/if}
								{/each}	
							</div>
						</AccordionItem>
					{/if}
				{/each}
			{/if}
		</Accordion>
	</div>
</div>