<script>
  import { Button, Modal, Label, Input, Checkbox } from 'flowbite-svelte'
  let show = false;
  export let openRegisterForm;
  export let closeLoginForm;
  export let isLogged;
</script>


  <form class="flex flex-col space-y-6" action="#">
    <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Sign in to our platform</h3>
    <Label class="space-y-2">
      <span>Email</span>
      <Input type="email" name="email" placeholder="name@company.com" size="md" required />
    </Label>
    <Label class="space-y-2">
      <Label for="show-password" class="mb-2">Your password</Label>
        <Input id="show-password" type={show ? 'text' : 'password'} placeholder="Your password here" size="md">
          <button slot="left" on:click={() => (show = !show)} class="pointer-events-auto">
            {#if show}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
            {/if}
          </button>
        </Input>
    </Label>
    <div class="flex items-start">
        <Checkbox>Remember me</Checkbox>
        <a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost password?</a>
    </div>
    <Button type="submit" class="w-full1" on:click={() => (isLogged(), closeLoginForm())}>Login to your account</Button>
      <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
        Not registered? <button class="text-blue-700 hover:underline dark:text-blue-500" on:click={() => (openRegisterForm(), closeLoginForm())}>Create account</button>
      </div>
  </form>