<script>
	import { TableBody, TableBodyCell, TableBodyRow, Checkbox, Radio, TableHead, TableHeadCell, TableSearch, Card, Datepicker } from "flowbite-svelte";

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
</script>

<style>
</style>

<p class="mt-10 ml-10 font-bold font-serif xl:text-4xl sm:text-lg text-gray-900 dark:text-white">Prenota il servizio desiderato dove vuoi e quando vuoi</p>

<p class="mt-5 ml-10 font-serif xl:text-2xl sm:text-lg text-gray-900 dark:text-white">Compila i campi di seguito e controlla la nostra disponibilità</p>

<div class="xl:inline-flex sm:block mt-10 ml-5">
	<Card class="xl:ml-5 xl:mb-64">
		<p class="text-lg text-dark">Scegli il servizio desiderato</p>
		<Radio class="mt-5 text-lg" name="example">Dogsitter</Radio>
		<Radio class="mt-5 text-lg" name="example">Veterinario</Radio>
	</Card>

	<Card class="xl:ml-5 w-9/12 max-h-96">
		<p class="text-lg text-dark">Scegli la sede più comoda</p>
		<TableSearch placeholder="Search by site" hoverable={true} bind:inputValue={searchTerm}>
			<TableBody class="divide-y">
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
			<input class="w-75 rounded-lg" type="date" id="birthday" name="birthday">
	</Card>
</div>

<div class="ml-10">
	<p class="text-xs">* Se inserisci la data, obbligatoriamente devi inserire il servizio</p>
</div>