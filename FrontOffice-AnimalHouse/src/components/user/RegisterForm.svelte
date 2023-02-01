<script>
    import { Button, Label, Input} from 'flowbite-svelte'
    import { ENDPOINT } from '../../utils/const'
    import { handleSubmit } from '../../utils/formRequestHandler'
    let showPwd = false

    export let openLoginForm
</script>

<form class="flex flex-col space-y-6" action={ENDPOINT.REGISTER} on:submit|preventDefault={handleSubmit} method="POST">
    <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Register on our platform</h3>
    <div class="grid grid-rows-1 grid-flow-col gap-2">
        <Label class="space-y-1">
            <span>Nome</span>
            <Input name="name" type="text" placeholder="es: Mario" required />
        </Label>
        <Label class="space-y-1">
            <span>Cognome</span>
            <Input name="surname" type="text" placeholder="es: Rossi" required />
        </Label>
    </div>
    <Label class="space-y-1">
        <span>Email</span>
        <Input name="email" type="email" placeholder="name@company.com" required />
    </Label>
    <div class="grid grid-rows-1 grid-flow-col gap-2">
        <Label class="space-y-1">
            <span>Username</span>
            <Input name="username" type="text" placeholder="es: limone89" required />
        </Label>
    </div>
    <div class="grid grid-rows-1 grid-flow-col gap-1">
        <Label class="space-y-1">
            <span>Data di nascita</span>
            <Input name="birthDate" type="date" required />
        </Label>
        <Label class="space-y-1">
            <span>Telefono</span>
            <Input name="phoneNumber" type="tel" pattern={"[0-9]{10}"}  placeholder="es: 1234567890" required />
        </Label>
    </div>
    <Label class="space-y-1">
        <span>Preferenze</span>
        <Input name="preference" type="text" placeholder="Cani, gatti, animali, ecc..." required />
    </Label>
    <Label class="space-y-1">
        <span>Your password</span>
        <Input name="password" type={showPwd ? 'text' : 'password'} placeholder="Your password here" size="md" required>
        <button type="button" slot="left" on:click={() => (showPwd = !showPwd)} class="pointer-events-auto">
            {#if showPwd}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
            {/if}
        </button>
        </Input>
    </Label>    
    <Button type="submit" class="w-full1">Create your account </Button>
    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
        Already have an account? <button on:click={openLoginForm()} class="text-blue-700 hover:underline dark:text-blue-500">Log in</button>
    </div>
</form>