<script>
	import { Input, ButtonGroup, Button, Chevron, Dropdown, DropdownItem, Card, Rating, Badge, Spinner } from "flowbite-svelte";
	import { handleRequest } from "../utils/requestHandler";
	import { ENDPOINT } from "../utils/const";
    import { onMount } from "svelte";
    import { addToast } from "../store/toasts";

	let products = []
	let searchTitle = ""
	async function getProducts() {
		let res
		if (res = await handleRequest(category_selected ?  ENDPOINT.PRODUCTS_CATEGORY_LIST(category_selected): ENDPOINT.PRODUCTS_LIST)) {
			const data = await res.json()
	
			if (data.error) {
				addToast({ message: `${data.error.type}<br>${data.error.message}`})
			} else {
				products = data
				return products
			}
		} else
			throw Error()
	}

	async function getCategories() {
		let res
		if (res = await handleRequest(ENDPOINT.PRODUCTS_CATEGORIES_LIST)) {
			const data = await res.json()
	
			if (data.error) {
				addToast({ message: `${data.error.type}<br>${data.error.message}`})
			} else
				return data
		}
		return []
	}

	let category_selected = ""
	let categories = []
	onMount(async() => {
		categories = await getCategories()
	})
	
	$: filteredProducts = products.filter( (product) => product.name.toLowerCase().indexOf(searchTitle.toLowerCase()) !== -1);

</script>

<div class="container mx-auto px-4 lg:px-24 py-8">
	<ButtonGroup class="w-full mb-12">
		<Button
			color="none"
			class="flex-shrink-0 text-gray-900 bg-gray-100 border border-gray-300 dark:border-gray-700 dark:text-white hover:bg-gray-200 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
		>
			<Chevron>{category_selected !== "" ? category_selected : "Tutte le categorie"}</Chevron>
		</Button>
		<Dropdown>
			{#if category_selected !== ""}
				 <DropdownItem on:click={() => category_selected = ""}>Tutte le categorie</DropdownItem>
			{/if}
			{#each categories as category}
				<DropdownItem on:click={() => category_selected = category}>{category}</DropdownItem>
			{/each}
		</Dropdown>
		<Input bind:value={searchTitle} placeholder="Cerca un prodotto" />
		<Button color="blue" class="!p-2.5" type="submit">
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
			</svg>
		</Button>
	</ButtonGroup>

	{#await getProducts()}
		<div class="text-center"><Spinner/></div>
	{:catch error}
		<div class="text-center">
			<p style="color: red">Ops qualcosa è andato storto: {error.message}<br>Ricarica la pagina</p>
		</div>
	{/await}

	{#if filteredProducts}
		{#each filteredProducts as product}
			<Card padding="none">
				<a href="/">
					<img class="p-8 h-64 mx-auto rounded-t-lg" src={product.imageURI} alt="product 1"/>
				</a>
				<div class="px-5 pb-5">
					<a href="/">
						<h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
							{product.name}
						</h5>
					</a>
					<Rating rating={product.rating} size="18" class="mt-2.5 mb-5">
						<Badge slot="text" class="ml-3">{product.rating}</Badge>
					</Rating>
					<div class="flex justify-between items-center">
						<span class="text-3xl font-bold text-gray-900 dark:text-white">{product.price}€</span>
						<Button href="/">
							<svg aria-hidden="true" class="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
							Acquista subito
						</Button>
					</div>
				</div>
			</Card>
		{/each}
	{/if}

</div>
