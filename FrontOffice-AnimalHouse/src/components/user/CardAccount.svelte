<script>
    import "../../assets/ProfilePage.css"	
    import { user } from '../../store'

    export let formId
    export let editMode = false

    $: input_style = editMode ? "border: 2px solid black; color: black" : ""

    let formData = {...$user}

    async function submitData(formEvent) {
        if (JSON.stringify(formData) != JSON.stringify($user)) {
            await user.editData(formData)
            formData = {...$user}
        }
    }

</script>

<!-- TODO: verifica form validation -->

<div class="flex-auto p-6">
    <form id={ formId }  on:submit|preventDefault={submitData}>
        <h6 class="text-gray-700 text-xs mb-4">
            USER INFORMATION
        </h6>
        <div class="lg:pl-6">
            <div class="flex flex-wrap">
                <div class="lg:w-1/2 w-full pr-4 pl-4">
                    <div class="mb-4">
                        <label class="text-sm mb-2 font-bold text-cyan-900" for="input-username">
                            Username
                        </label>
                        <input
                            type="text"
                            id = 'input-username'
                            class="block appearance-none w-full py-1 px-2 mb-1 bg-white text-gray-500 border border-stone-300 rounded"
                            style={input_style}
                            bind:value={ formData.username }
                            disabled={!editMode}
                            required
                        />
                    </div>
                </div>
                <div class="lg:w-1/2 w-full pr-4 pl-4">
                    <div class="mb-4">
                        <label class="text-sm mb-2 font-bold text-cyan-900" for="input-email">
                            Email address
                        </label>
                        <input
                            type="email"
                            id = 'input-email'
                            class="block appearance-none w-full py-1 px-2 mb-1 bg-white text-gray-500 border border-stone-300 rounded"
                            style={input_style}
                            bind:value={ formData.email }
                            disabled={!editMode}
                            required
                        />
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap ">
                <div class="lg:w-1/2 w-full pr-4 pl-4">
                    <div class="mb-4">
                        <label class="text-sm mb-2 font-bold text-cyan-900" for="input-full-name">
                            Full name
                        </label>
                        <input
                            type="text"
                            id = 'input-full-name'
                            class="block appearance-none w-full py-1 px-2 mb-1 bg-white text-gray-500 border border-stone-300 rounded"
                            style={input_style}
                            bind:value={formData.fullName}
                            disabled={!editMode}
                            required
                        />
                    </div>
                </div>
                <div class="lg:w-1/2 w-full pr-4 pl-4">
                    <div class="mb-4">
                        <label class="text-sm mb-2 font-bold text-cyan-900" for="input-date">
                            Date of birth
                        </label>
                        <input
                            type="date"
                            id = 'input-date'
                            class="block appearance-none w-full py-1 px-2 mb-1 bg-white text-gray-500 border border-stone-300 rounded"
                            style={input_style}
                            bind:value={formData.birthDate}
                            disabled={!editMode}
                            required
                        />
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap ">
                <div class="lg:w-1/2 w-full pr-4 pl-4">
                    <div class="mb-4">
                        <label class="text-sm mb-2 font-bold text-cyan-900" for="input-phone">
                            Telefono
                        </label>
                        <input
                            type="tel"
                            id = 'input-phone'
                            class="block appearance-none w-full py-1 px-2 mb-1 bg-white text-gray-500 border border-stone-300 rounded"
                            style={input_style}
                            bind:value={ formData.phoneNumber }
                            disabled={!editMode}
                            required
                        />
                    </div>
                </div>
                <div class="lg:w-1/2 w-full pr-4 pl-4">
                    <div class="mb-4">
                        <label class="text-sm mb-2 font-bold text-cyan-900" for="input-preference">
                            Preferenze
                        </label>
                        <input
                            type="text"
                            id = 'input-preference'
                            class="block appearance-none w-full py-1 px-2 mb-1 bg-white text-gray-500 border border-stone-300 rounded"
                            style={input_style}
                            bind:value={ formData.preference }
                            disabled={!editMode}
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>