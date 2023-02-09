<script>
    import { Label, Input, Button } from "flowbite-svelte";
    export let service, date, sit;
    let hours = [];
	for(let i=10; i<=19 ; i++){
		hours.push(i);
	}
</script>

<form class="flex flex-col space-y-6" action="#">
    <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Riepilogo della tua prenotazione</h3>
    <span>Dati utente</span>
    <div class="grid grid-rows-1 grid-flow-col gap-2">
        <Label class="space-y-1">
            <span>Nome</span>
            <Input type="text" placeholder="Mario" disabled />
        </Label>
        <Label class="space-y-1">
            <span>Cognome</span>
            <Input type="text" placeholder="Rossi" disabled />
        </Label>
    </div>
    
    <div class="grid grid-flow-row-dense grid-cols-3 gap-2">
        <div class="col-span-2">
        <Label class="space-y-1">
            <span>Email</span>
            <Input type="email" placeholder="name@company.com" disabled />
        </Label>
        </div>
        <div>
            <Label class="space-y-1">
                <span>Telefono</span>
                <Input type="tel" placeholder="es:123-4567890" disabled />
            </Label>
        </div>
    </div>
    <span>Dettagli della prenotazione</span>
    <div class="grid grid-rows-1 grid-flow-col gap-2">
        <Label class="space-y-1">
            <span>Servizio</span>
            <Input type="text" value={service} disabled />
        </Label>
        <Label class="space-y-1">
            <span>Presso</span>
            <Input type="text" value={sit} disabled />
        </Label>
    </div>
    <div class="grid grid-rows-1 grid-flow-col gap-2">
        <Label class="space-y-1">
            <span>Giorno</span>
            {#if date == ""}
                <Input type="date" />
            {:else}
                <Input type="date" value={date} placeholder={date} disabled />
            {/if}
        </Label>
        <Label class="space-y-1">
            <span>Ora</span><br>
            <select name="hours" id="hours" class="rounded-lg">
                {#each hours as hour}
                    <option value={hour}>{hour}</option>
                {/each}
            </select>
            :
            <select name="minutes" id="minutes" class="rounded-lg">
                <option value=00>00</option>
                <option value=30>30</option>
            </select>
        </Label>
    </div>
    <div class="flex flex-row-reverse">
        <Button color="green">Confirm</Button>
        <Button color="red" class="mr-2">Cancel</Button>
    </div>
</form>