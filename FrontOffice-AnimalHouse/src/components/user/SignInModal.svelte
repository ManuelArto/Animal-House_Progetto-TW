<script>
    import { Button, Modal } from 'flowbite-svelte'
    import LoginForm from "./LoginForm.svelte"
    import RegisterForm from "./RegisterForm.svelte"
    let formLogin = false
    let formRegister = false

    let openLoginForm = () => {
        formRegister = false
        formLogin = true
    }
    let openRegisterForm = () => {
        formLogin = false
        formRegister = true
    }
</script>

<Button size='sm' on:click={openLoginForm}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
    <p class="text-xs sm:text-base">Accedi</p>
</Button>

<Modal class="h-min my-auto" bind:open={formLogin} size="xs" autoclose={false}>
    <LoginForm openRegisterForm={openRegisterForm}/>
</Modal>
<Modal class="h-min my-auto" bind:open={formRegister} size="xs" autoclose={false}>
    <RegisterForm openLoginForm={openLoginForm}/>
</Modal>