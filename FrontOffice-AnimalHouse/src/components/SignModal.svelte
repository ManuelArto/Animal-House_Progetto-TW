<script>
    import { Button, Modal, Label, Input, Checkbox } from 'flowbite-svelte'
    import Login from "./Login.svelte"
    import Register from "./Register.svelte"
    let formLogin = false;
    let formRegister = false;
    export let isLogged;

    let openLoginForm = () => formLogin = true;
    let openRegisterForm = () => formRegister = true;
    let closeLoginForm = () => formLogin = false;
   
</script>

<Button gradient color="tealToLime" on:click={openLoginForm}>Accedi</Button>
<Modal bind:open={formLogin} size="xs" autoclose={false} class="w-full">
    <Login closeLoginForm={closeLoginForm} 
            openRegisterForm={openRegisterForm} 
            isLogged={isLogged}/>
</Modal>

<Button gradient color="greenToBlue" on:click={openRegisterForm}>Registrati</Button>
<Modal bind:open={formRegister} size="xs" autoclose={false} class="w-full">
    <Register openLoginForm={openLoginForm}/>
</Modal>

