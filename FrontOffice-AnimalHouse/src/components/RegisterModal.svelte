<script setup lang="ts">
	import {  Modal, Button } from "flowbite-svelte";
    import "../views/Account.css"
    export let defaultModal;

</script>
<Modal title="Add your animal" bind:open={defaultModal} size="md" autoclose>
    <form>
        <div class="lg:pl-6">
            <div class="flex flex-wrap ">
                <div class="lg:w-1/2 pr-4 pl-4">
                    <div class="mb-4 focused">
                        <label
                            class="form-control-label"
                            for="input-name"
                            >Name</label
                        >
                        <input
                            type="text" 
                            id="input-username"
                            class="block appearance-none w-full py-1 px-2 mb-1 bg-white text-gray-500 border border-stone-300 rounded"
                            placeholder= "Nome"
                        />
                    </div>
                </div>
                <div class="lg:w-1/2 pr-4 pl-4">
                    <div class="mb-4">
                        <label
                            class="form-control-label"
                            for="input-photo"
                            >Upload photo (URL)</label
                        >
                        <input
                            type="email"
                            id="input-photo"
                            class="block appearance-none w-full py-1 px-2 mb-1 bg-white text-gray-500 border border-stone-300 rounded"
                            placeholder="Photo"
                        />
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap ">
                <div class="lg:w-1/2 pr-4 pl-4">
                    <div class="mb-4 focused">
                        <label
                            class="form-control-label"
                            for="input-specie"
                            >Specie</label
                        >
                        <input
                            type="text"
                            id="input-specie"
                            class="block appearance-none w-full py-1 px-2 mb-1 bg-white text-gray-500 border border-stone-300 rounded"
                            placeholder="Cane, gatto, criceto,..."
                        />
                    </div>
                </div>
                <div class="lg:w-1/2 pr-4 pl-4">
                    <div class="mb-4 focused">
                        <label
                            class="form-control-label"
                            for="input-razza"
                            >Razza</label
                        >
                        <input
                            type="text"
                            id="input-razza"
                            class="block appearance-none w-full py-1 px-2 mb-1 bg-white text-gray-500 border border-stone-300 rounded"
                            placeholder="es: maltese"
                        />
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap ">
                <div class="lg:w-1/2 pr-4 pl-4">
                    <div class="mb-4 focused">
                        <label
                            class="form-control-label"
                            for="input-date"
                            >Data di nascita</label
                        >
                        <input
                            type="date"
                            id="input-date"
                            class="block appearance-none w-full py-1 px-2 mb-1 bg-white text-gray-500 border border-stone-300 rounded"
                        />
                    </div>
                </div>
                <div class="lg:w-1/2 pr-4 pl-4">
                    <div class="mb-4 focused">
                        <label
                            class="form-control-label"
                            for="input-weight"
                            >Peso</label
                        >
                        <label
                            class="absolute right-32 form-control-label"
                            for="input-sex"
                            >Sesso</label
                        ><br>
                        <select class="form-select border-gray-300 rounded-xl">
                            <option value="0-10kg">0-10 kg</option>
                            <option value="10-25kg">10-25 kg</option>
                            <option value="25-40kg">25-40 kg</option>
                            <option value="40-60kg">40-60 kg</option>
                            <option value="60+kg">60+ kg</option>
                        </select>
                        <select class="form-select border-gray-300 rounded-xl">
                            <option value="0-10kg">M</option>
                            <option value="10-25kg">F</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <Button class="absolute bottom-1 right-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Confirm</Button>
</Modal>