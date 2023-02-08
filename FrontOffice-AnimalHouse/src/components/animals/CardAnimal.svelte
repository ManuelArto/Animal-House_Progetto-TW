<script>
    import { Card, Badge, Modal, Button } from "flowbite-svelte"
    import { animals } from '../../store/animals'

    export let animal

    let deleteAnimalModal = false;

    async function deleteAnimal() {
        await animals.deleteAnimal(animal._id)
    }

</script>

<Card class="relative rounded mt-4 mx-auto md:mx-4  m-0 p-0 flex" img={animal.imageURI} horizontal>
    <h5 class="mt-0 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {animal.name} </h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
        <b>Specie: </b> {animal.species} <br>
        <b>Razza: </b> {animal.breed} <br>
        <b>Nascita: </b> {animal.birthDate} <br>
        <b>Sesso:</b> {animal.gender} <br>
        <b>Peso: </b> {animal.weight} kg<br>
    </p>
    <button on:click={() => deleteAnimalModal = true}>
        <Badge large rounded index color='red'>
            X
        </Badge>
    </button>
</Card>

<Modal class="h-min my-auto" bind:open={deleteAnimalModal} size="xs" autoclose>
  <div class="text-center">
      <svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"> Sei sicuro di voler eliminare {animal.name}?</h3>
      <Button color="red" class="mr-2" on:click={deleteAnimal} >Sì</Button>
      <Button color='alternative'>Cancella</Button>
  </div>
</Modal>