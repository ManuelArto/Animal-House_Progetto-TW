<script>
	import { Input, ButtonGroup, Button, Chevron, Dropdown, DropdownItem, Spinner, Pagination } from "flowbite-svelte"
    import { onMount } from "svelte"
	import ProductCard from "../components/store/ProductCard.svelte"
	import Cart from "../components/store/Cart.svelte"
	import { handleRequest } from "../utils/requestHandler"
	import { ENDPOINT } from "../utils/const"
    import { addToast } from "../store/toasts"

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
	
	// PAGINATION
	const MAX_RFP = 9
	function changePage(nextPage) {
		helper.start += nextPage ? MAX_RFP : -MAX_RFP
		helper.end += nextPage ? MAX_RFP : -MAX_RFP
		helper.end = Math.min(filteredProducts.length, helper.end)
		window.scrollTo(0, 0)
	}
	$: helper = {start: 1, end: MAX_RFP, total: filteredProducts.length}
	$: currentPageProducts = filteredProducts.slice(helper.start-1, helper.end)

	let getProductsPromise = getProducts()
	onMount(async() => {
		categories = await getCategories()
	})

	// CART
	let isDropdownCartOpen = false
	let cartProducts = []
	function addToCart(event) {
		let index = cartProducts.findIndex((product) => product._id == event.detail._id)
		if (index !== -1) {
			cartProducts[index].quantity += cartProducts[index].quantity < cartProducts[index].maxQuantity ? 1 : 0
		} else {
			const product = {...event.detail}
			product.maxQuantity = product.quantity
			product.quantity = 1
			cartProducts.push(product)
		}
		localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
		cartProducts = cartProducts
	}
	function removeFromCart(event) {
		cartProducts = cartProducts.filter((product) => product._id != event.detail._id)
		localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
		isDropdownCartOpen = true
	}

</script>

<div class="container mx-auto px-4 lg:px-24 py-8">
	<!-- SEARCH BAR -->
	<ButtonGroup class="w-full mb-12">
		<Button
			color="none"
			class="rounded-l-xl sm:flex-shrink-0 text-gray-900 bg-gray-100 border border-gray-300 dark:border-gray-700 dark:text-white hover:bg-gray-200 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
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
		<Button color="blue" class="!p-2.5 rounded-r-xl" type="submit">
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
			</svg>
		</Button>
		<!-- CART -->
		<Cart divClass={"sm:ml-6"} products={cartProducts} on:remove={removeFromCart} isDropdownCartOpen={isDropdownCartOpen}/>
	</ButtonGroup>
	<!-- CART ICON -->

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
			<ProductCard product={product} on:addToCart={addToCart}/>
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
