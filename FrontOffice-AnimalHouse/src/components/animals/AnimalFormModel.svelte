<script>
	import {  Modal, Button, Fileupload } from "flowbite-svelte"
	import { createEventDispatcher } from 'svelte'
    import { ENDPOINT } from "../../utils/const"
    import { newAnimalSubmit } from '../../utils/requestHandler'

    export let isAnimalFormOpen
    
	const dispatch = createEventDispatcher();
    $: if (!isAnimalFormOpen) {
        dispatch("closeForm")
    }

    async function submitForm(event) {
        await newAnimalSubmit(event).then(() => isAnimalFormOpen = false  )
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
                            Upload photo (URL)
                        </label>
                        <input 
                            id="input-photo" 
                            name="pet-image-file"
                            type="file" 
                            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
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
    input[type="file"]::-webkit-file-upload-button {
        color:white;
        text-align: center;
        background-color: #4587f1;
    }
    input[type="file"]::-webkit-file-upload-button:focus, input[type="file"]::-webkit-file-upload-button:hover {
        background-color: rgb(0, 85, 255);
    }
</style>