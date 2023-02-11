<script>
	import { Input, ButtonGroup, Button, Chevron, Dropdown, DropdownItem, Card, Rating, Badge, Spinner, Pagination } from "flowbite-svelte";
	import { handleRequest } from "../utils/requestHandler";
	import { ENDPOINT } from "../utils/const";
    import { onMount } from "svelte";
    import { addToast } from "../store/toasts";

	// PRODUCTS
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
	let getProductsPromise = getProducts()
	$: filteredProducts = products.filter( (product) => product.name.toLowerCase().indexOf(searchTitle.toLowerCase()) !== -1)

	// CATEGORIES
	let categoriesDropDownOpen = false
	let category_selected = ""
	let categories = []
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
	function changeCategory(category) {
		category_selected = category
		categoriesDropDownOpen = false
		getProductsPromise = getProducts()
	}
	onMount(async() => {
		categories = await getCategories()
	})

	// PAGINATION
	const MAX_RFP = 9
	$: helper = {start: 1, end: MAX_RFP, total: filteredProducts.length}
	$: currentPageProducts = filteredProducts.slice(helper.start-1, helper.end)
	
	function changePage(nextPage) {
		helper.start += nextPage ? MAX_RFP : -MAX_RFP
		helper.end += nextPage ? MAX_RFP : -MAX_RFP
		window.scrollTo(0, 0);
	}

</script>

<div class="container mx-auto px-4 lg:px-24 py-8">
	<!-- SEARCH BAR -->
	<ButtonGroup class="w-full mb-12">
		<Button
			color="none"
			class="sm:flex-shrink-0 text-gray-900 bg-gray-100 border border-gray-300 dark:border-gray-700 dark:text-white hover:bg-gray-200 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
		>
			<Chevron><p class="text-xs sm:text-base">{category_selected !== "" ? category_selected : "Tutte le categorie"}</p></Chevron>
		</Button>
		<Dropdown open={categoriesDropDownOpen} on:show={(event) => categoriesDropDownOpen = event.detail}>
			<DropdownItem on:click={() => changeCategory("")}><p class="text-xs sm:text-base">Tutte le categorie</p></DropdownItem>
			{#each categories as category}
				<DropdownItem on:click={() => changeCategory(category)}><p class="text-xs sm:text-base">{category}</p></DropdownItem>
			{/each}
		</Dropdown>
		<Input bind:value={searchTitle} placeholder="Cerca un prodotto" />
		<Button color="blue" class="!p-2.5" type="submit">
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
			</svg>
		</Button>
	</ButtonGroup>

	{#await getProductsPromise}
		<div class="text-center"><Spinner/></div>
	{:catch error}
		<div class="text-center">
			<p style="color: red">Ops qualcosa è andato storto: {error.message}<br>Ricarica la pagina</p>
		</div>
	{/await}

	<!-- PRODUCTS -->
	{#if currentPageProducts.length}
	<div class="grid grid-cols-2 xl:grid-cols-3 gap-4">
		{#each currentPageProducts as product}
			<Card class="mx-auto w-full flex items-">
				<img class="p-1 h-36 sm:h-64 mx-auto rounded-t-lg" src={product.imageURI} alt="product 1"/>
				<h5 class="mb-4 text-sm sm:text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
					{product.name}
				</h5>
				<div class="pb-5 mt-auto">
					<hr>
					<Rating rating={product.rating} size="18" class="mt-2.5 mb-5">
						<Badge slot="text" class="ml-3">{product.rating}</Badge>
					</Rating>
					<Badge slot="text">{product.category}</Badge>
					<Badge color="red" slot="text">Rimangono {product.quantity} {product.quantity == 1 ? "prodotto" : "prodotti"} </Badge>
					<div class="flex justify-between items-center -m-1 mt-4">
						<span class="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">{product.price}€</span>
						<Button>
							<svg aria-hidden="true" class="mx-auto sm:mr-2 sm:-ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
							<p class="hidden sm:block">Acquista subito</p>
						</Button>
					</div>
				</div>
			</Card>
		{/each}
	</div>

	<!-- PAGINATION -->
	<div class="flex flex-col items-center justify-center mt-12">
		<div class="text-sm text-gray-700 dark:text-gray-400">
			Showing <span class="font-semibold text-gray-900 dark:text-white">{helper.start}</span> to
			<span class="font-semibold text-gray-900 dark:text-white">{helper.end}</span>
			of <span class="font-semibold text-gray-900 dark:text-white">{helper.total}</span> Entries
		</div>
		<Pagination table on:next={() => changePage(true)} on:previous={() => changePage(false)}>
			<Button slot="prev" class="flex items-center gap-2" disabled={helper.start == 1}>
			  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"/></svg>
			  Prev
			</Button>
			<Button slot="next" class="flex items-center gap-2" disabled={helper.end == helper.total}>
			  Next
			  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
			</Button>
		</Pagination>
	</div>
	{/if}
</div>

