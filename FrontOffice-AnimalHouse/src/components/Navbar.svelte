<script>
    import { Dropdown, DropdownItem, DropdownHeader, DropdownDivider, Avatar, Chevron, Navbar, NavBrand, NavHamburger, NavUl, NavLi } from 'flowbite-svelte'
    import { user } from '../store'
    import SignInModal from "./user/SignInModal.svelte"

    let isUserLogged;
	user.isUserLogged.subscribe(value => isUserLogged = value );
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
            <Dropdown placement="bottom" triggeredBy="#avatar-menu">
                <DropdownHeader>
                    <span class="block text-sm"> { $user.fullName } </span>
                    <span class="block truncate text-sm font-medium"> { $user.email } </span>
                </DropdownHeader>
                <DropdownItem href="#/profile">My Profile</DropdownItem>
                <DropdownItem href="#/profile/pets">My Pets</DropdownItem>
                <DropdownDivider />
                <DropdownItem on:click={async() => await user.logOut()} >Sign out</DropdownItem>
            </Dropdown>
        {/if}
    </div>
    <NavHamburger on:click={toggle} />
    <NavUl {hidden} class="ml-3">
        <NavLi href="#/shop">Shop</NavLi>
        <NavLi href="#/serviziPresenza">Servizi Presenza</NavLi>
        <NavLi class="cursor-pointer"><Chevron aligned>Servizi comunità</Chevron></NavLi>
        <Dropdown offset="18">
          <DropdownItem><NavLi href="#/servizi/leaderboard">LeaderBoard</NavLi></DropdownItem>
          <DropdownItem><NavLi href="#/servizi/bachecaEccoloQua">Bacheca "Eccolo qua"</NavLi></DropdownItem>
        </Dropdown>
    </NavUl>
</Navbar>
