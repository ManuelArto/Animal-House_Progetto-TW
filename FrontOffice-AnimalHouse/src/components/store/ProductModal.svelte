<script>
	import { Button, Rating, Badge } from "flowbite-svelte";
	import { createEventDispatcher } from 'svelte'
    import { ENDPOINT } from "../../utils/const";
	
	export let product
	
	const dispatch = createEventDispatcher();
</script>

<div class="w-full h-full">
	<div class="grid items-start grid-cols-1 md:grid-cols-12 gap-12 h-full">
		<div class="rounded-lg md:col-span-5 pt-48 md:pb-24 mx-auto">
			<img class="-mt-48 h-72 md:h-96" src={ENDPOINT.IMAGEURI(product.imageURI)} alt={product.name} >
		</div>
		<div class="md:col-span-7 h-full flex flex-col content-between">
			<div class="mb-auto">
				<h2 class="text-2xl font-bold text-gray-900 mb-1">{product.name}</h2>
				<p class="text-2xl text-gray-900 mb-2 ">{product.price}€</p>
				<Rating rating={product.rating} size="18" class="mb-4">
					<Badge slot="text" class="ml-3">{product.rating}</Badge>
				</Rating>
				<Badge slot="text">{product.category}</Badge>
				<Badge color="red" slot="text">Rimangono {product.quantity} {product.quantity == 1 ? "prodotto" : "prodotti"} </Badge>
				<hr class="mt-2 mb-4" />
				<p class="text-gray-500 lg:text-lg">{product.description}</p>
			</div>
			<Button on:click={() => dispatch('addToCart', product)} class="mt-auto w-full rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
				Aggiungi al carrello
			</Button>
		</div>
	</div>
</div>