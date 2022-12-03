<script>
  import Router, { link } from "svelte-spa-router";
  import { routes } from "./routes.js";
  import { Button, Dropdown, DropdownItem, Chevron, DropdownDivider, Navbar, NavBrand, NavHamburger, NavUl, NavLi } from 'flowbite-svelte'
  let group3=2;
</script>

<Router {routes}/>
    <Navbar let:hidden let:toggle>
      <NavBrand href="/">
        <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo"/>
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite</span>
      </NavBrand>
      <div class="flex md:order-2">
        <Button size="sm">Accedi</Button>
        <Button class="ml-1" size="sm">Registrati</Button>
      </div>     
      <NavHamburger on:click={toggle} />
      <NavUl {hidden} class="ml-3">
        <NavLi href="/" active={true}>Home</NavLi>
        <NavLi href="/servizi/bachecaCercoPartner">Profilo</NavLi>    
        <NavLi href="/services">Shop</NavLi>
        <NavLi href="/pricing">Servizi Presenza</NavLi>
        <NavLi href="/contact">LeaderBoard</NavLi>
        <NavLi class="cursor-pointer"><Chevron aligned>Bacheche</Chevron></NavLi>
        <Dropdown offset="18">
          <DropdownItem>Eccolo qua</DropdownItem>
          <DropdownItem>Cerco partner</DropdownItem>
          <DropdownItem>Aiutami</DropdownItem>
        </Dropdown>
        <NavLi class="cursor-pointer"><Chevron aligned>Servizi online</Chevron></NavLi>
        <Dropdown offset="18">
          <DropdownItem>Chiamata con esperto</DropdownItem>
          <DropdownItem>Chiama con veterinario</DropdownItem>
        </Dropdown>
      </NavUl>
    </Navbar>
<style>
</style>
