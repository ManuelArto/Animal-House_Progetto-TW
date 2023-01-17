<script>
    import SignModal from "./SignModal.svelte"
    import { Dropdown, DropdownItem, DropdownHeader, DropdownDivider, Avatar, Chevron, Navbar, NavBrand, NavHamburger, NavUl, NavLi } from 'flowbite-svelte'

    let isLogged = true;
</script>
  

<Navbar let:hidden let:toggle>
    <NavBrand href="/">
        <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo"/>
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">AnimalHouse</span>
    </NavBrand>
    {#if isLogged}
        <div class="flex md:order-2 ml-auto">
            <SignModal />
        </div>
    {:else}
        <div class="flex md:order-2 ml-auto">
            <Avatar id="avatar-menu">BG</Avatar>
        </div>
        <Dropdown placement="bottom" triggeredBy="#avatar-menu">
            <DropdownHeader>
            <span class="block text-sm"> Bonnie Green </span>
            <span class="block truncate text-sm font-medium"> name@flowbite.com </span>
            </DropdownHeader>
            <DropdownItem href="#/profile">My Profile</DropdownItem>
            <DropdownItem href="#/profile/settings">Account Settings</DropdownItem>
            <DropdownDivider />
            <DropdownItem>Sign out</DropdownItem>
        </Dropdown>
    {/if}
    <NavHamburger on:click={toggle} />
    <NavUl {hidden} class="ml-3">
        <NavLi href="/" active={true}>Home</NavLi>
        <NavLi href="#/shop">Shop</NavLi>
        <NavLi href="#/serviziPresenza">Servizi Presenza</NavLi>
        <NavLi href="#/servizi/leaderboard">LeaderBoard</NavLi>
        <NavLi class="cursor-pointer"><Chevron aligned>Bacheche</Chevron></NavLi>
        <Dropdown offset="18">
            <DropdownItem><NavLi href="#/servizi/bachecaEccoloQua">Eccolo qua</NavLi></DropdownItem>
            <DropdownItem><NavLi href="#/servizi/bachecaCercoPartner">Cerco Partner</NavLi></DropdownItem>
            <DropdownItem><NavLi href="#/servizi/bachecaAiutami">Aiutami</NavLi></DropdownItem>
        </Dropdown>
        <NavLi class="cursor-pointer"><Chevron aligned>Servizi online</Chevron></NavLi>
        <Dropdown offset="18">
            <DropdownItem><NavLi href="#/serviziOnline/videoConfEsperto">Chiamata con esperto</NavLi></DropdownItem>
            <DropdownItem><NavLi href="#/serviziOnline/videoConfVeterinaio">Chiamata con veterinario</NavLi></DropdownItem>
        </Dropdown>
    </NavUl>
</Navbar>
