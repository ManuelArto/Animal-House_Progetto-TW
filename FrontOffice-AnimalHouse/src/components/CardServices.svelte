<script>
    import { Modal, Label, Input, Card, Button } from "flowbite-svelte";
    import ReservationModal from "./user/ReservationModal.svelte";
    export let service, date, sit;
    let Reservation=false;
    let openReservation = () => {
        Reservation = true;
    };

</script>
<Card class="ml-3">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{service}</h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
        Lunedì-Venerdì: 8-20 <br>
        Sabato: 10-20 <br>
        Domenica: 10-19 <br>
    </p>
    <Button class="w-fit" on:click={openReservation}>
        Prenota <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
    </Button>
</Card>


<!-- MODAL riepilogo dati prenotazione -->
<Modal bind:open={Reservation} size="xs" autoclose class="w-full">
	<ReservationModal service={service} date={date} sit={sit}/>
</Modal>