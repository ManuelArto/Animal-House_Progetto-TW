<script>
    import { Button, Modal, Label, Input, Checkbox } from 'flowbite-svelte'
    import Login from "./Login.svelte"
    import Register from "./Register.svelte"
    let formLogin = false;
    let formRegister = false;

    let openLoginForm = () => formLogin = true;
    let openRegisterForm = () => formLogin = true;
</script>

<Button on:click={openLoginForm}>Accedi</Button>
<Modal bind:open={formLogin} size="xs" autoclose={false} class="w-full">
    <Login openRegisterForm={openRegisterForm}/>
</Modal>

<Button on:click={openRegisterForm}>Registrati</Button>
<Modal bind:open={formRegister} size="xs" autoclose={false} class="w-full">
    <Register openLoginForm={openLoginForm}/>
</Modal>