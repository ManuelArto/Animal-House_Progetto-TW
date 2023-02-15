<script>
    import { Dropdown, DropdownItem, DropdownHeader, DropdownDivider, Avatar, Chevron, Navbar, NavBrand, NavHamburger, NavUl, NavLi } from 'flowbite-svelte'
    import { push } from 'svelte-spa-router';
    import { user } from '../store/user'
    import SignInModal from "./user/SignInModal.svelte"

    let isUserLogged;
    let active = "#/";
	user.isUserLogged.subscribe(value => isUserLogged = value );

    let dropDownsOpen = [false, false]
    function changePage(url, isHamburgerMenuHidden, toggleMenu) {
        // closing dropdowns
        dropDownsOpen = dropDownsOpen.map((_) => false)
        
        active = url;
        console.log("merdaa ", active);
        // close HamburgerMenu
        if (!isHamburgerMenuHidden)
            toggleMenu()

        push(url)
    }
</script>
  

<Navbar let:hidden let:toggle>
    <a class="flex" href="/#" on:click={() => changePage("#/", hidden, toggle)}>
        <img src="favicon.ico" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo"/>
        <span class="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">AnimalHouse</span>
    </a>
    <div class="flex md:order-2 ml-auto">
        {#if !isUserLogged}
                <SignInModal />
        {:else}
            <Avatar class="cursor-pointer" id="avatar-menu">{$user.name.charAt(0) + $user.surname.charAt(0)}</Avatar>
            <Dropdown placement="bottom" triggeredBy="#avatar-menu" open={dropDownsOpen[0]} on:show={(event) => dropDownsOpen[0] = event.detail}>
                <DropdownHeader>
                    <span class="block text-sm"> { $user.fullName } </span>
                    <span class="block truncate text-sm font-medium"> { $user.email } </span>
                </DropdownHeader>
                <DropdownItem on:click={() => changePage("#/profile", hidden, toggle)}>Profilo</DropdownItem>
                <DropdownItem on:click={() => changePage("#/profile/pets", hidden, toggle)}>I miei animali</DropdownItem>
                <DropdownDivider />
                <DropdownItem on:click={ () => { user.logOut(); changePage("/", hidden, toggle)}} >Esci dal profilo</DropdownItem>
            </Dropdown>
        {/if}
    </div>
    <NavHamburger on:click={toggle}/>
    <NavUl {hidden} class="ml-3">
        <NavLi class="cursor-pointer" style="{active === '#/shop' ? 'color:#0000CD; font-weight:bold; font-size:22px;' : ''}" on:click={() => changePage("#/shop", hidden, toggle)}>Shop</NavLi>
        <NavLi class="cursor-pointer" style="{active === '#/serviziPresenza' ? 'color:#0000CD; font-weight:bold; font-size:22px;' : ''}" on:click={() => changePage("#/serviziPresenza", hidden, toggle)}>Servizi Presenza</NavLi>
        <NavLi class="cursor-pointer" style="{active === '#/servizi/leaderboard' ||  active === '#/servizi/bachecaEccoloQua' ? 'color:#0000CD; font-weight:bold; font-size:22px;' : ''}"><Chevron aligned>Servizi comunità</Chevron></NavLi>
        <Dropdown offset="18" open={dropDownsOpen[1]} on:show={(event) => dropDownsOpen[1] = event.detail}>
          <DropdownItem on:click={() => changePage("#/servizi/leaderboard", hidden, toggle)}>LeaderBoard</DropdownItem>
          <DropdownItem on:click={() => changePage("#/servizi/bachecaEccoloQua", hidden, toggle)}>Bacheca "Eccolo qua"</DropdownItem>
        </Dropdown>
    </NavUl>
</Navbar>
