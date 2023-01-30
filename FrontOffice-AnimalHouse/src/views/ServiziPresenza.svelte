<script>
	import { Modal, TableBody, TableBodyCell, TableBodyRow, Checkbox, Radio, TableHead, TableHeadCell, TableSearch, Card, Button } from "flowbite-svelte";

	let searchTerm = '';
	let data = [
		{sede: "via le dita dal naso 6, Milano"},
		{sede: "via le dita dal culo 45, Rovigo"},
		{sede: "via caduti di via Fani 37, Bologna"},
		{sede: "vico del giglio 2, Torre Annunziata"},
		{sede: "via Teresa Noce 44, Castel Maggiore"},
		{sede: "via fratelli Ferrari 21, Anzola dell'Emilia"},
		{sede: "via Giovanni Battisti 37, Calderara di Reno"},
		{sede: "via le dita dal naso 6, Milano"},
		{sede: "via le dita dal culo 45, Rovigo"},
		{sede: "via caduti di via Fani 37, Bologna"},
		{sede: "vico del giglio 2, Torre Annunziata"},
		{sede: "via Teresa Noce 44, Castel Maggiore"},
		{sede: "via fratelli Ferrari 21, Anzola dell'Emilia"},
		{sede: "via Giovanni Battisti 37, Calderara di Reno"},
	];

	$: filteredItems = data.filter(
        (item) => item.sede.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
	
	let error;
	let date_insert = false;
	let error_insert_service=false;
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
  		let checkboxes = form.querySelectorAll('input[type="checkbox"]');
		let checkboxes2 = form2.querySelectorAll('input[type="checkbox"]');
		let checkedOne = Array.prototype.slice.call(checkboxes).some(x => x.checked);
		let checkedTwo = Array.prototype.slice.call(checkboxes2).some(x => x.checked);
		if (date_insert && !checkedOne) {
			error_insert_service = true;
			error = true;
		}else if(!checkedOne && !checkedTwo){
			error = true;
		}else{
			error = false;
			error_insert_service = false;
		}
	}
	
</script>

<style>
</style>

<p class="mt-10 ml-10 font-bold font-serif xl:text-4xl sm:text-lg text-gray-900 dark:text-white">Prenota il servizio desiderato dove vuoi e quando vuoi</p>

<p class="mt-5 ml-10 font-serif xl:text-2xl sm:text-lg text-gray-900 dark:text-white">Compila i campi di seguito e controlla la nostra disponibilità</p>


	<div class="xl:inline-flex sm:block mt-10 ml-5">
		<Card class="xl:ml-5 xl:mb-64">
			<div id="checkbox_services">
				{#if date_insert}
						<p class="text-lg text-red-600">Scegli il servizio desiderato (required)</p>
				{:else}
					<p class="text-lg text-dark">Scegli il servizio desiderato</p>
				{/if}
				<Checkbox class="mt-5 text-lg" name="example">Dogsitter</Checkbox>
				<Checkbox class="mt-5 text-lg" name="example">Veterinario</Checkbox>
			</div>
		</Card>
		<Card class="xl:ml-5 max-h-96">
			<p class="text-lg text-dark">Scegli la sede più comoda</p>
			<TableSearch placeholder="Search by site" hoverable={true} bind:inputValue={searchTerm}>
				<TableBody class="divide-y" id="checkbox_sits">
					{#each filteredItems as item}
						<TableBodyRow class="border-separate border-spacing-2 border border-slate-400">
							<TableBodyCell><Checkbox>{item.sede}</Checkbox></TableBodyCell>
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

<div class="ml-10">
	<p class="text-xs">* Se inserisci la data, obbligatoriamente devi inserire il servizio</p>
</div>