<script>
	import {  Modal, Button } from "flowbite-svelte"
	import { createEventDispatcher } from 'svelte'
    import { ENDPOINT } from "../../utils/const"
    import { newAnimalSubmit } from '../../utils/requestHandler'

    export let isAnimalFormOpen
    
	const dispatch = createEventDispatcher();
    $: if (!isAnimalFormOpen) {
        dispatch("closeForm")
    }

    async function submitForm(event) {
        newAnimalSubmit(event).then(() => isAnimalFormOpen = false  )
    }

    
</script>
<Modal class="h-min my-auto" title="Add your animal" bind:open={isAnimalFormOpen} size="md" autoclose={false}>
    <form action={ENDPOINT.ANIMALS_NEW} on:submit|preventDefault={submitForm} method="POST">
        <div class="lg:pl-6 text-black">
            <div class="flex flex-wrap">
                <div class="lg:w-1/2 w-full pr-4 pl-4">
                    <div class="mb-4">
                        <label class="form-control-label" for="input-name">
                            Name
                        </label>
                        <input
                            type="text" 
                            name="name"
                            id="input-name"
                            class="block appearance-none w-full py-1 px-2 mb-1 text-black border border-stone-300 rounded"
                            placeholder= "Nome"
                            required
                        />
                    </div>
                </div>
                <div class="lg:w-1/2 w-full pr-4 pl-4">
                    <div class="mb-4">
                        <label class="form-control-label" for="input-photo" >
                            Upload photo
                        </label>
                        <input
                            type="file"
                            name="imageURI"
                            id="input-photo"
                            class="fb-input-file"
                            required
                        />
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap ">
                <div class="lg:w-1/2 w-full pr-4 pl-4">
                    <div class="mb-4">
                        <label class="form-control-label" for="input-specie">
                            Specie
                        </label>
                        <input
                            type="text"
                            name="species"
                            id="input-specie"
                            class="block appearance-none w-full py-1 px-2 mb-1 text-black border border-stone-300 rounded"
                            placeholder="Cane, gatto, criceto,..."
                            required
                        />
                    </div>
                </div>
                <div class="lg:w-1/2 w-full pr-4 pl-4">
                    <div class="mb-4">
                        <label class="form-control-label" for="input-razza">
                            Razza
                        </label>
                        <input
                            type="text"
                            name="breed"
                            id="input-razza"
                            class="block appearance-none w-full py-1 px-2 mb-1 text-black border border-stone-300 rounded"
                            placeholder="es: maltese"
                            required
                        />
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap ">
                <div class="lg:w-1/2 w-full pr-4 pl-4">
                    <div class="mb-4">
                        <label class="form-control-label" for="input-date" >
                            Data di nascita
                        </label>
                        <input
                            type="date"
                            name="birthDate"
                            id="input-date"
                            class="block appearance-none w-full py-1 px-2 mb-1 text-black border border-stone-300 rounded"
                            required
                        />
                    </div>
                </div>
                <div class="lg:w-1/2 w-full pr-4 pl-4">
                    <div class="mb-4">
                        <label class="form-control-label" for="weight-input">
                            Peso
                        </label>
                        <label class="relative left-20 form-control-label" for="gender-input">
                            Sesso
                        </label>
                        <br>
                        <input
                            type="number"
                            name="weight"
                            id="weight-input"
                            class="appearance-none w-20 py-1 px-2 mb-1 text-black border border-stone-300 rounded-xl"
                            required
                        /> kg
                        <select class="ml-4 form-select border-gray-300 rounded-xl" id="gender-input" name="gender" required>
                            <option value="M">M</option>
                            <option value="F">F</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <Button type="submit" class="absolute right-2 bottom-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm">
            Confirm
        </Button>
    </form>
</Modal>

<style>
    .fb-input-file {
        background-color: white;
        border: 1px solid;
        border-color: rgb(202, 199, 199);
        border-radius: 5px;
        padding: 1px;
        font-size: 16px;
        width: 250px;
    }

    .fb-input-file:focus, .fb-input-file:active{
        border: 2px solid;
        border-color: blue;
    }

    input[type="file"]::-webkit-file-upload-button {
        color:white;
        margin-left:1px;
        text-align: center;
        border-radius:10px;
        background-color: #4587f1;
    }
    input[type="file"]::-webkit-file-upload-button:focus, input[type="file"]::-webkit-file-upload-button:hover {
        background-color: rgb(0, 85, 255);
    }
</style>