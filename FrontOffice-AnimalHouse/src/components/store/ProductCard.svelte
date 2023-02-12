<script>
	import { Button, Card, Rating, Badge, Modal } from "flowbite-svelte";
	import { createEventDispatcher } from 'svelte'
    import ProductModal from "./ProductModal.svelte";
	
	export let product
	
	const dispatch = createEventDispatcher();
	let isProductModalOpen = false
</script>

<Card class="mx-auto w-full flex items-">
	<button class="cursor-pointer" id="modalDiv" on:click={() => isProductModalOpen = !isProductModalOpen}>
		<img class="p-1 h-36 sm:h-64 mx-auto rounded-t-lg" src={product.imageURI} alt="product 1"/>
		<h5 class="mb-4 text-sm sm:text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
			{product.name}
		</h5>
	</button>
	<div class="pb-5 mt-auto">
		<hr>
		<Rating rating={product.rating} size="18" class="mt-2.5 mb-5">
			<Badge slot="text" class="ml-3">{product.rating}</Badge>
		</Rating>
		<Badge slot="text">{product.category}</Badge>
		<Badge color="red" slot="text">Rimangono {product.quantity} {product.quantity == 1 ? "prodotto" : "prodotti"} </Badge>
		<div class="flex justify-between items-center -m-1 mt-4">
			<span class="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">{product.price}€</span>
			<Button on:click={() => dispatch('addToCart', product)}>
				<svg aria-hidden="true" class="mx-auto sm:mr-2 sm:-ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
				<p class="hidden sm:block">Acquista subito</p>
			</Button>
		</div>
	</div>
</Card>


<Modal bind:open={isProductModalOpen} size="xl" autoclose>
    <ProductModal product={product} on:addToCart />
</Modal>