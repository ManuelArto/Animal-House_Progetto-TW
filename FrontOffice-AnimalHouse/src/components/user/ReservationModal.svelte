<script>
    import { Label, Input, Button, Spinner } from "flowbite-svelte";
    import { createEventDispatcher } from 'svelte'
    import { addToast } from "../../store/toasts";
    import { user } from "../../store/user";
    import { ENDPOINT } from "../../utils/const";
    import { formSubmit, handleRequest } from "../../utils/requestHandler";
    
    const dispatch = createEventDispatcher();

    export let service 
    export let selected_date
    export let sede 
    export let selected_animal

    async function newReservationSubmit(event) {
        event.target.action = ENDPOINT.RESERVATION_NEW(sede._id, service.serviceName, service.number)
        const newReservation = await formSubmit(event)
        if (newReservation.error)
            addToast({ message: `${newReservation.error.type}<br>${newReservation.error.message}`})
        else 
            addToast({ type: "success", message: newReservation.message})

        dispatch("close_modal")
    }

    async function getOrariDisponibili(selected_date) {
        let res
        if ( res = await handleRequest(
            ENDPOINT.RESERVATION_ORARI(sede._id, service.serviceName, service.number, selected_date), 
            { headers: { 'Authorization': `Bearer ${user.getToken()}` }})
        ) {
            const data = await res.json()
    
            if (data.error)
                addToast({ message: `${data.error.type}<br>${data.error.message}`})
            else
                return data
        } else
            return []
    }

    let orari_disponibili = []
    $: if (selected_date) {
        getOrariDisponibili(selected_date)
        .then((orari) => orari_disponibili = orari)
    }
    
</script>

<form class="flex flex-col space-y-6" on:submit|preventDefault={newReservationSubmit} method="POST">
    <h3 class="text-xl font-medium p-0">Riepilogo della tua prenotazione</h3>
    <span>Dati utente</span>
    <Input type="hidden" name="animal" value={selected_animal._id} />
    <div class="grid grid-rows-1 grid-flow-col gap-2">
        <Label class="space-y-1">
            <span>Nome</span>
            <Input type="text" value={$user.name} defaultClass="block w-full" disabled />
        </Label>
        <Label class="space-y-1">
            <span>Cognome</span>
            <Input type="text" value={$user.surname} defaultClass="block w-full" disabled />
        </Label>
    </div>
    
    <div class="grid grid-flow-row-dense grid-cols-3 gap-2">
        <div class="col-span-2">
        <Label class="space-y-1">
            <span>Email</span>
            <Input type="email" value={$user.email} defaultClass="block w-full" disabled />
        </Label>
        </div>
        <div>
            <Label class="space-y-1">
                <span>Telefono</span>
                <Input type="tel" value={$user.phoneNumber} defaultClass="block w-full" disabled />
            </Label>
        </div>
    </div>
    <span>Dettagli della prenotazione</span>
    <div class="grid grid-rows-1 grid-flow-col gap-2">
        <Label class="space-y-1">
            <span>Servizio</span>
            <Input name="serviceName" type="text" value={service.serviceName} defaultClass="block w-full" disabled />
        </Label>
        <Label class="space-y-1">
            <span>Presso</span>
            <Input type="text" value={sede.address.street} defaultClass="block w-full" disabled />
        </Label>
    </div>
    <div class="grid grid-rows-1 grid-flow-col gap-2">
        <Label class="space-y-1">
            <span>Giorno</span>
            <Input name="date" type="date" bind:value={selected_date} placeholder={selected_date} required/>
        </Label>
        <Label class="space-y-1">
            <span>Fascia oraria *</span><br>
            <select name="fascia_oraria" id="orario" class="rounded-lg">
                {#each orari_disponibili as orario}
                    <option value={orario}>{orario}</option>
                {/each}
            </select>
        </Label>
    </div>
    <div>
        <p class="text-xs">* Visualizzerai la fascia oraria quando selezionerai un giorno </p>
    </div>
    <div class="flex flex-row-reverse">
        <Button type="submit" color="green">Confirm</Button>
        <Button color="red" class="mr-2">Cancel</Button>
    </div>
</form>