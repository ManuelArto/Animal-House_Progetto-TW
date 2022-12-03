<script>
  import Router, { link } from "svelte-spa-router";
  import { routes } from "./routes.js";
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button, Input } from 'flowbite-svelte'
</script>

<Router {routes}/>
    <Navbar>
        <NavBrand href="/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            class="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Flowbite
          </span>
        </NavBrand>
        <div class="flex md:order-2">
            <Button size="sm">Accedi</Button>
            <Button class="ml-1" size="sm">Registrati</Button>
        </div>        
        <NavUl class="order-1">
          <NavLi href="/" active={true}>Home</NavLi>
          <NavLi href="/servizi/bachecaCercoPartner">About</NavLi>    
          <NavLi href="/services">Services</NavLi>
          <NavLi href="/pricing">Pricing</NavLi>
          <NavLi href="/contact">Contact</NavLi>
        </NavUl>
    </Navbar>

<style>
</style>
