<script>
    import { Modal, Label, Input, Card, Button } from "flowbite-svelte";
    import { animals } from '../store/animals'
    import ReservationModal from "./user/ReservationModal.svelte";
    export let service, date, sit, selectedOption, data;
    let Reservation=false;
    let isDisabled = [];
    let i=0;
    let openReservation = () => {
        Reservation = true;
    };

    for(let animal of $animals){
        if(animal.name === selectedOption){
            for(let item of data){
                if(item.address.street === sit){
                    if(item.services[service]){
                        item.services[service].forEach(element => {
                            if(element["tipo"].includes(animal.species.toLowerCase())){   
                                let str = element["peso"];
                                let values = str.split("-");
                                let num1 = parseInt(values[0]);
                                let num2 = parseInt(values[1].replace("kg", ""));
                                if(animal.weight >= num1 && animal.weight <= num2){
                                    isDisabled[i] = false;
                                }else{
                                    isDisabled[i] = true;
                                }
                            }else{
                                isDisabled[i] = true;
                            }
                            i++;
                        });
                    }
                }
            }   
        }
    }
    
</script>
    {#each data as item}
        {#if item.address.street === sit}
            {#each item.services[service] as srv, i}
                <Card class="ml-3">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{service}</h5>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
                        Speci accettate: {srv["tipo"]} <br>
                        Peso accettato: {srv["peso"]} <br>
                        Numero stanza: {srv["number"]}
                    </p>
                    <Button class="w-fit" id="btn" on:click={openReservation} disabled={isDisabled[i]}>
                        Prenota <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    </Button>
                </Card>
            {/each}
        {/if}
    {/each}


<!-- MODAL riepilogo dati prenotazione -->
<Modal bind:open={Reservation} size="xs" autoclose class="w-full">
	<ReservationModal service={service} date={date} sit={sit}/>
</Modal>