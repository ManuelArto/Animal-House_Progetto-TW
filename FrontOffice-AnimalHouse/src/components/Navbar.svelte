<script>
    import { Dropdown, DropdownItem, DropdownHeader, DropdownDivider, Avatar, Chevron, Navbar, NavBrand, NavHamburger, NavUl, NavLi } from 'flowbite-svelte'
    import Router, { push } from 'svelte-spa-router';
    import { user } from '../store'
    import SignInModal from "./user/SignInModal.svelte"

    let isUserLogged;
	user.isUserLogged.subscribe(value => isUserLogged = value );

    let dropDownsOpen = [false, false]
    function changePage(url, isHamburgerMenuHidden, toggleMenu) {
        // closing dropdowns
        dropDownsOpen = dropDownsOpen.map((_) => false)
        // close HamburgerMenu
        if (!isHamburgerMenuHidden)
            toggleMenu()

        push(url)
    }

</script>
  

<Navbar let:hidden let:toggle>
    <NavBrand href="/">
        <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo"/>
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">AnimalHouse</span>
    </NavBrand>
    <div class="flex md:order-2 ml-auto">
        {#if !isUserLogged}
                <SignInModal />
        {:else}
            <Avatar id="avatar-menu">{$user.name.charAt(0) + $user.surname.charAt(0)}</Avatar>
            <Dropdown placement="bottom" triggeredBy="#avatar-menu" open={dropDownsOpen[0]} on:show={(event) => dropDownsOpen[0] = event.detail}>
                <DropdownHeader>
                    <span class="block text-sm"> { $user.fullName } </span>
                    <span class="block truncate text-sm font-medium"> { $user.email } </span>
                </DropdownHeader>
                <DropdownItem on:click={() => changePage("#/profile", hidden, toggle)}>My Profile</DropdownItem>
                <DropdownItem on:click={() => changePage("#/profile/pets", hidden, toggle)}>My Pets</DropdownItem>
                <DropdownDivider />
                <DropdownItem on:click={async() => await user.logOut()} >Sign out</DropdownItem>
            </Dropdown>
        {/if}
    </div>
    <NavHamburger on:click={toggle}/>
    <NavUl {hidden} class="ml-3">
        <NavLi on:click={() => changePage("#/shop", hidden, toggle)}>Shop</NavLi>
        <NavLi on:click={() => changePage("#/serviziPresenza", hidden, toggle)}>Servizi Presenza</NavLi>
        <NavLi class="cursor-pointer"><Chevron aligned>Servizi comunità</Chevron></NavLi>
        <Dropdown offset="18" open={dropDownsOpen[1]} on:show={(event) => dropDownsOpen[1] = event.detail}>
          <DropdownItem on:click={() => changePage("#/servizi/leaderboard", hidden, toggle)}>LeaderBoard</DropdownItem>
          <DropdownItem on:click={() => changePage("#/servizi/bachecaEccoloQua", hidden, toggle)}>Bacheca "Eccolo qua"</DropdownItem>
        </Dropdown>
    </NavUl>
</Navbar>
