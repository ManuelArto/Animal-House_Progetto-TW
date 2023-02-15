<script>
	import { AccordionItem, Modal, Card, Button } from "flowbite-svelte";
	import ReservationModal from "../user/ReservationModal.svelte";

	export let isSedeSectionOpen
	export let sede
	export let selected_date
	export let selected_services

	function getAllSedeServices() {
		let services = []
		for (const [serviceName, servicesList] of Object.entries(sede.services)) {
			if (selected_services.includes(serviceName)) {
				servicesList.forEach((service) => {
					service["serviceName"] = serviceName
					service["isDisabled"] = false	// TODO: fai check
				})
				services.push(...servicesList)
			}
		}
		return services
	}
	let services = getAllSedeServices()

	let isReservationModalOpen = false

</script>

{#if services.length}
	<AccordionItem bind:open={isSedeSectionOpen}>
		<span slot="header">{sede.address.street}</span>
		<div class="inline-flex">
			{#each services as service}
				<Card class="ml-3">
					<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{service.serviceName}</h5>
					<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
						Speci accettate: {service["tipo"]} <br>
						Peso accettato: {service["peso"]} <br>
						Numero stanza: {service["number"]}
					</p>
					<Button class="w-fit" id="btn" on:click={() => isReservationModalOpen = true} disabled={false}>
						Prenota <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
					</Button>
				</Card>
				<!-- MODAL riepilogo dati prenotazione -->
				<Modal bind:open={isReservationModalOpen} size="xs" autoclose class="w-full h-min my-auto">
					<ReservationModal service={service} date={selected_date} sit={sede}/>
				</Modal>
			{/each}
		</div>
	</AccordionItem>

{/if}
