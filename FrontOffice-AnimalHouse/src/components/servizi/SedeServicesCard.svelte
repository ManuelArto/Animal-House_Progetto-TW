<script>
	import { AccordionItem, Modal, Card, Button } from "flowbite-svelte";
	import ReservationModal from "../user/ReservationModal.svelte";

	export let isSedeSectionOpen
	export let sede
	export let selected_date
	export let filtered_services
	export let selected_animal

	function isServiceAvailableForAnimal(service, animal) {
		// Check if selected animal species is accepted
		if(service.tipo.includes(animal.species.toLowerCase())) {
			
			// Check if selected animal weight is accepted
			let range = service.peso.split("-")
			let min = parseInt(range[0])
			let max = parseInt(range[1].replace("kg", ""))
			
			return animal.weight >= min && animal.weight <= max
		} else
			return false;
	}

	function getAllSedeServices(animal) {
		let services = []
		for (const [serviceName, servicesList] of Object.entries(sede.services)) {
			if (filtered_services.includes(serviceName)) {
				servicesList.forEach((service) => {
					service["serviceName"] = serviceName
					service["isDisabled"] = !isServiceAvailableForAnimal(service, animal)
				})
				services.push(...servicesList)
			}
		}
		return services
	}
	$: services = getAllSedeServices(selected_animal)

	let isReservationModalOpen = false

</script>

{#if services.length}
	<AccordionItem bind:open={isSedeSectionOpen}>
		<span slot="header">{sede.address.street}, {sede.address.city}</span>
		<div class="inline-flex overflow-scroll w-full">
			{#each services as service}
				<Card class="ml-3">
					<p class="mb-2 text-lg sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{service.serviceName}</p>
					<p class="mb-3 text-sm sm:text-base font-normal text-gray-700 dark:text-gray-400 leading-tight">
						Speci accettate: {service.tipo.join(", ")} <br>
						Peso accettato: {service.peso} <br>
						Codice: {service.number}
					</p>
					<Button class="w-fit" id="btn" on:click={() => isReservationModalOpen = true} disabled={service.isDisabled}>
						Prenota <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
					</Button>
				</Card>
				<!-- MODAL riepilogo dati prenotazione -->
				<Modal bind:open={isReservationModalOpen} size="xs" class="w-full h-min my-auto">
					<ReservationModal 
						service={service} 
						selected_date={selected_date} 
						sede={sede} 
						selected_animal={selected_animal} 
						on:close_modal={() => isReservationModalOpen = false}/>
				</Modal>
			{/each}
		</div>
	</AccordionItem>

{/if}
