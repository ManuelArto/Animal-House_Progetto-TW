<script>
	import { AccordionItem, Accordion, Modal, TableBody, TableBodyCell, TableBodyRow, Checkbox, Radio, TableHead, TableHeadCell, TableSearch, Card, Button } from "flowbite-svelte";

	let searchTerm = '';
	let data = [
		{sede: "via le dita dal naso 6, Milano", service: "Dogsitter, Veterinario"},
		{sede: "via le dita dal culo 45, Rovigo", service: "Dogsitter, Veterinario"},
		{sede: "via caduti di via Fani 37, Bologna", service: "Veterinario"},
		{sede: "vico del giglio 2, Torre Annunziata", service: "Dogsitter"},
		{sede: "via Teresa Noce 44, Castel Maggiore", service: "Dogsitter, Veterinario"},
		{sede: "via fratelli Ferrari 21, Anzola dell'Emilia", service: "Veterinario"},
		{sede: "via Giovanni Battisti 37, Calderara di Reno", service: "Veterinario"},
		{sede: "via le dita dal naso 6, Milano", service: "Dogsitter"},
		{sede: "via le dita dal culo 45, Rovigo", service: "Dogsitter"},
		{sede: "via caduti di via Fani 37, Bologna", service: "Dogsitter, Veterinario"},
		{sede: "vico del giglio 2, Torre Annunziata", service: "Dogsitter, Veterinario"},
		{sede: "via Teresa Noce 44, Castel Maggiore", service: "Veterinario"},
		{sede: "via fratelli Ferrari 21, Anzola dell'Emilia", service: "Dogsitter, Veterinario"},
		{sede: "via Giovanni Battisti 37, Calderara di Reno", service: "Dogsitter"},
	];

	$: filteredItems = data.filter(
        (item) => item.sede.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
	
	let error;
	let date_insert = false;
	let error_insert_service=false;
	
	let selected_sits = [];
	let selected_service = [];

	window.addEventListener("load", () => {
		const dateInput = document.getElementById("input-date");
		dateInput.addEventListener("change", function() {
			if (!dateInput.value) {
				date_insert = false;
			} else {
				date_insert = true;
			}
		});
	});
	
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
			document.getElementById("selezione").style.display = "none";
			document.getElementById("prenotazione").style.display = "block";
		}

		//TODO: riempimento valori checkbox con bug (devo prima far uscire un alert per poter salvare il contenuto)
		for(const checkbox of checkboxes_sits){
			checkbox.addEventListener("change", function(){
				if(this.checked){
					if(!selected_sits.includes(this.value)){
						selected_sits.push(this.value);
					}
				}else{
					selected_sits = selected_sits.filter(item => item !== this.value);
				}
			})
		}
		
		for(const checkbox of checkboxes_services){
			checkbox.addEventListener("change", function(){
				if(this.checked){
					if(!selected_service.includes(this.value)){
						selected_service.push(this.value);
					}
				}else{
					selected_service = selected_service.filter(item => item !== this.value);
				}
			})
		}

		selected_sits = selected_sits;
		selected_service = selected_service;
	}

	function back(){
		document.getElementById("selezione").style.display = "block";
		document.getElementById("prenotazione").style.display = "none";
	}

	const items = Array(selected_sits.length);  //il 3 va sostituito con la grandezza dell'array che contiene le sedi selezionate
	const open_all = () => items.forEach((_,i)=> items[i] = true)
	const close_all= () => items.forEach((_,i)=> items[i] = false)
	
</script>

<style>
</style>

<p class="mt-10 ml-10 font-bold font-serif xl:text-4xl sm:text-lg text-gray-900 dark:text-white">Prenota il servizio desiderato dove vuoi e quando vuoi</p>


<div id="selezione" style="display:none;"> <!--   Togliere display none alla fine -->
	<p class="mt-5 ml-10 font-serif xl:text-2xl sm:text-lg text-gray-900 dark:text-white">Compila i campi di seguito e controlla la nostra disponibilità</p>
	<div class="xl:inline-flex sm:block mt-10 ml-5">
		<Card class="xl:ml-5 xl:mb-64">
			<div id="checkbox_services">
				{#if date_insert}
						<p class="text-lg text-red-600">Scegli il servizio desiderato (required)</p>
				{:else}
					<p class="text-lg text-dark">Scegli il servizio desiderato</p>
				{/if}
				<Checkbox class="mt-5 text-lg" name="example" value="Dogsitter">Dogsitter</Checkbox>
				<Checkbox class="mt-5 text-lg" name="example" value="Veterinario">Veterinario</Checkbox>
			</div>
		</Card>
		<Card class="xl:ml-5 max-h-96">
			<p class="text-lg text-dark">Scegli la sede più comoda</p>
			<TableSearch placeholder="Search by site" hoverable={true} bind:inputValue={searchTerm}>
				<TableBody class="divide-y" id="checkbox_sits">
					{#each filteredItems as item}
						<TableBodyRow class="border-separate border-spacing-2 border border-slate-400">
							<TableBodyCell><Checkbox value={item.sede}>{item.sede}</Checkbox></TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</TableSearch>
		</Card>

		<Card class="xl:ml-5 xl:mb-72">
			<p class="text-lg text-dark">Scegli la data desiderata *</p>
			<div class="relative max-w-sm mt-5">
				<input class="w-75 rounded-lg" type="date" id="input-date">
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


<div id="prenotazione" style="display:block;">   <!-- Mettere display none alla fine-->
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
		<Accordion multiple class="mt-5 mr-5">
			{#each selected_sits as sit, i}
				<AccordionItem bind:open={items[i]}>
					<span slot="header">{sit}</span>
					<div class="inline-flex">
						{#if selected_service.length == 0}
							<Card>
								<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Veterinario</h5>
								<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
									Lunedì-Venerdì: 8-20 <br>
									Sabato: 10-20 <br>
									Domenica: 10-19 <br>
								</p>
								<Button class="w-fit">
								Prenota <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
								</Button>
							</Card>
							<Card class="ml-5">
								<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">DogSitter</h5>
								<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
									Lunedì-Venerdì: 8-20 <br>
									Sabato: 10-20 <br>
									Domenica: 10-19 <br>
								</p>
								<Button class="w-fit">
								Prenota <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
								</Button>
							</Card>
						{:else}
							{#each selected_service as service}
								{#if service === "Veterinario"}
									<Card>
										<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Veterinario</h5>
										<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
											Lunedì-Venerdì: 8-20 <br>
											Sabato: 10-20 <br>
											Domenica: 10-19 <br>
										</p>
										<Button class="w-fit">
										Prenota <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
										</Button>
									</Card>
								{:else if service === "Dogsitter"}
									<Card class="ml-5">
										<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">DogSitter</h5>
										<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
											Lunedì-Venerdì: 8-20 <br>
											Sabato: 10-20 <br>
											Domenica: 10-19 <br>
										</p>
										<Button class="w-fit">
										Prenota <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
										</Button>
									</Card>
								{/if}
							{/each}
						{/if}
					</div>
				</AccordionItem>
			{/each}
		</Accordion>
	</div>
</div>