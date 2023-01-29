<script>
    import { Card, Button } from "flowbite-svelte";
</script>

<div>
    <Card class="rounded mt-4" img="https://t1.ea.ltmcdn.com/it/razas/7/0/0/maltese_7_0_600.jpg" horizontal>
        <h5 class="mt-0 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Lillo</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
            <b>Specie: </b> Cane <br>
            <b>Razza: </b> Maltese<br>
            <b>Nascita: </b> 24/12/2021 <br>
            <b>Sesso:</b> Maschio <br>
            <b>Peso: </b> 0-10 kg<br>
        </p>
        <Button class="absolute right-3 top-3 !p-2" color="red" size="lg">
            X
        </Button>
    </Card>
</div>