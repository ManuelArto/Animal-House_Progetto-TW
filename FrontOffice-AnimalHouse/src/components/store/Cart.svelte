<script>
	import { Dropdown, DropdownItem, Button, Input, Badge, Modal, Label } from "flowbite-svelte"
	import { createEventDispatcher } from 'svelte'
    import { addToast } from "../../store/toasts";
	import { user } from "../../store/user"
	import { ENDPOINT } from "../../utils/const"
	import { handleRequest } from "../../utils/requestHandler"
	const dispatch = createEventDispatcher();
	
	export let divClass
	export let products = []

	let isUserLogged;
	user.isUserLogged.subscribe(value => isUserLogged = value );

	function changeQuantity(event, product) {
		if (product.quantity < 1)
			product.quantity = 1
		else if (product.quantity > product.maxQuantity)
			product.quantity = product.maxQuantity
			
		products = products
		localStorage.setItem("cartProducts", JSON.stringify(products))
	}

	$: totalPrice = products.reduce( (accumulator, product) => accumulator + (product.quantity * product.price), 0)
	let CheckoutModalOpen = false;

	function showCheckout(){
		if(products.length == 0){
			addToast({message: "Il carrello è vuoto"})
		} else {
			CheckoutModalOpen = !CheckoutModalOpen
		}
	}

	async function newOrderSubmit() {
		const res = await handleRequest(ENDPOINT.ORDERS_NEW, {
			method: 'POST',
			headers: { 'Authorization': `Bearer ${user.getToken()}`, "Content-Type": "application/json" },
			body: JSON.stringify({ price: totalPrice, products: products }),
		})
		const data = await res.json()

		if (data.error)
			addToast({ message: `${data.error.type}<br>${data.error.message}`})
		else {
			addToast({ type: "success", message: "Ordine avvenuto con successo", })
			localStorage.removeItem("cartProducts")
			setTimeout(function(){
   				window.location.reload();
			}, 1000)
		}
	}

	function showUnauthorizedAlert(message) {
        addToast({ message: `Devi essere loggato per poter ${message}`})
    }

	let oggi = new Date();
	let options = { year: 'numeric', month: 'long', day: 'numeric' };
</script>

<div id="bell" class={divClass + " inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"}>
	<svg aria-hidden="true" class="w-8" fill="black" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
	{#if products.length}
		<div class="flex relative">
		  <div class="inline-flex relative -top-3 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></div>
		</div>
	{/if}
</div>
<Dropdown triggeredBy="#bell" class="w-full h-96 overflow-y-scroll sm:scrollbar-hide sm:w-96 divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-700">
	<div slot="header" class="text-center py-2 font-bold"> Carrello </div>
	{#each products as product}
	<DropdownItem class="flex justify-between py-6">
		<div class="flex align-items-center mr-4 h-20 w-20 rounded-md border border-gray-200">
			<img class="object-scale-down" src={ENDPOINT.IMAGEURI(product.imageURI)} alt={product.name}>
		</div>
		<div class="w-full">
			<div class="flex justify-between gap-4 text-base font-medium text-gray-900">
				<p class="flex text-sm sm:text-base">{product.name}</p>
				<p class="flex">{(product.price * product.quantity).toFixed(2)}€</p>
			</div>
			<Badge class="mt-2 mb-0"  slot="text">{product.category}</Badge>
			<div class="flex justify-between text-sm mt-2">
				<p class="text-gray-500"> 
					Quantity:
					<Input defaultClass="inline-flex w-16 h-4 disabled:cursor-not-allowed" let:props>
						<input type="number" {...props} on:change={(event) => changeQuantity(event, product)} bind:value={product.quantity} max={product.maxQuantity} min="1" />
					</Input>
				</p>
				<div class="flex">
					<button on:click={() => dispatch('remove', product)} class="font-medium text-indigo-600 hover:text-indigo-500">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
							<path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</DropdownItem>
	{:else}
		<div class="text-center py-10">
			Il carrello è vuoto
		</div>
	{/each}
	<div slot="footer" class="border-t border-gray-200 py-6 px-4 sm:px-6">
		<div class="flex justify-between text-base font-medium text-gray-900">
			<p>Totale</p>
			<p>{totalPrice.toFixed(2)}€</p>
		</div>
		<div class="mt-6">
			<button on:click={() => !isUserLogged ? showUnauthorizedAlert("per andare al checkout") : showCheckout() } class="flex mx-auto items-center justify-center rounded-md border border-transparent bg-blue-700 px-6 hover:bg-blue-800 py-3 text-base font-medium text-white shadow-sm">
				Checkout
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="ml-2 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
					<path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
				</svg>
			</button>
		</div>
	</div>
</Dropdown>


<Modal bind:open={CheckoutModalOpen} size="md" autoclose>
	<p class="text-2xl">Riepilogo ordine</p>
	{#each products as product}
	<p class="text-xl font-medium text-gray-900">Il tuo ordine arriverà: <b>{new Date(oggi.getTime() + product.giorni*24*60*60*1000).toLocaleDateString('it-IT', options)}</b></p>
	<div class="flex mt-4">
		<div id="p1" class="mr-4 h-20 w-20 overflow-hidden rounded-md border border-gray-200">
			<img src={ENDPOINT.IMAGEURI(product.imageURI)} alt={product.name}>
		</div>
		<div id="p2" class="w-full">
			<div class="flex justify-between gap-4 text-base font-medium text-gray-900">
				<p class="flex text-sm sm:text-base">{product.name}</p>
				<p class="flex">{(product.price * product.quantity).toFixed(2)}€</p>
			</div>
			<Badge class="mt-2 mb-0"  slot="text">{product.category}</Badge>
			<div class="flex justify-between text-sm mt-2">
				<p class="text-gray-500"> 
					Quantity:
					<Input defaultClass="inline-flex w-16 h-4 disabled:cursor-not-allowed" let:props>
						<input type="number" {...props} on:change={(event) => changeQuantity(event, product)} bind:value={product.quantity} max={product.maxQuantity} min="1" />
					</Input>
				</p>
				<div class="flex">
					<button on:click={() => dispatch('remove', product)} class="font-medium text-indigo-600 hover:text-indigo-500">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
							<path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
	<div class="mt-3 border-t border-gray-200"></div>
	{/each}
	<div class="sm:px-6">
		<div class="flex justify-between text-xl font-bold text-gray-900">
			<p>Totale:</p>
			<p class="ml-1">{totalPrice.toFixed(2)}€</p>
		</div>
	</div>
	<Button color="green" class="rounded" on:click={newOrderSubmit}> Conferma </Button>
    <Button color="red" class="rounded" on:click={() => CheckoutModalOpen = false}> Cancella </Button>
</Modal>
