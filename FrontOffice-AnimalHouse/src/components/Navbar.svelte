<script>
    import SignModal from "./SignModal.svelte"
    import user from "../assets/user.png"
    import { Button, Dropdown, DropdownItem, DropdownHeader, Avatar, Chevron, DropdownDivider, Navbar, NavBrand, NavHamburger, NavUl, NavLi } from 'flowbite-svelte'
    let group3=2;
    let isLogged = false;
    let Logged = () => isLogged = true;
</script>
  

<Navbar let:hidden let:toggle>
    <NavBrand href="/">
        <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo"/>
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Front Office</span>
    </NavBrand>
    <div class="flex md:order-2">
        {#if !isLogged}
            <SignModal isLogged={Logged}/>
        {:else}
            <Button pill color="light" id="avatar-menu" class="!p-1">
                <Avatar src={user} class="mr-2"/>
                Bonnie Green
            </Button>
            <Dropdown placement="bottom" triggeredBy="#avatar-menu">
                <DropdownHeader>
                    <span class="block text-sm"> Bonnie Green </span>
                    <span class="block truncate text-sm font-medium"> name@flowbite.com </span>
                </DropdownHeader>
                <DropdownItem><NavLi href="#/profile">Profilo</NavLi></DropdownItem>
                <DropdownItem><NavLi href="/">Dashboard</NavLi></DropdownItem>
                <DropdownItem><NavLi href="/">Setting</NavLi></DropdownItem>
                <DropdownDivider />
                <DropdownItem><Button type="button" color="light" on:click={() => isLogged = false}>Sign out</Button></DropdownItem>
            </Dropdown>
        {/if}
    </div>     
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
