<script>
	import { Button, Card, Badge, Modal } from "flowbite-svelte";
	import { createEventDispatcher } from 'svelte'
    import { ENDPOINT } from "../../utils/const";
    import ProductModal from "./ProductModal.svelte";
	
	export let product
	
	const dispatch = createEventDispatcher();
	let isProductModalOpen = false
</script>

<Card class="mx-auto w-full flex">
	<button class="cursor-pointer" id="modalDiv" on:click={() => isProductModalOpen = !isProductModalOpen}>
		<img class="p-1 h-36 sm:h-64 mx-auto rounded-t-lg" src={ENDPOINT.IMAGEURI(product.imageURI)} alt="product 1"/>
		<h5 class="mb-4 text-sm sm:text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
			{product.name}
		</h5>
	</button>
	<div class="pb-5 mt-auto">
		<hr>
		<div class="flex items-center mt-2.5 mb-5">
			{#each Array(product.rating) as _}
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="text-yellow-300 dark:text-yellow-200" aria-label="star" fill="none" viewBox="0 0 24 24" stroke-width="2">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M10.7881 3.2108C11.2364 2.13286 12.7635 2.13286 13.2118 3.2108L15.2938 8.21652L20.6979 8.64976C21.8616 8.74306 22.3335 10.1953 21.4469 10.9549L17.3295 14.4818L18.5874 19.7553C18.8583 20.8909 17.6229 21.7884 16.6266 21.1799L11.9999 18.354L7.37329 21.1799C6.37697 21.7884 5.14158 20.8909 5.41246 19.7553L6.67038 14.4818L2.55303 10.9549C1.66639 10.1953 2.13826 8.74306 3.302 8.64976L8.70609 8.21652L10.7881 3.2108Z" fill="currentColor"></path> 
				</svg>
			{/each}
			{#each Array(5 - product.rating) as _}
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="text-gray-300 dark:text-gray-500" aria-label="star" fill="none" viewBox="0 0 24 24" stroke-width="2">
					<path d="M11.4806 3.49883C11.6728 3.03685 12.3272 3.03685 12.5193 3.49883L14.6453 8.61028C14.7263 8.80504 14.9095 8.93811 15.1197 8.95497L20.638 9.39736C21.1367 9.43735 21.339 10.0598 20.959 10.3853L16.7546 13.9867C16.5945 14.1239 16.5245 14.3392 16.5734 14.5444L17.8579 19.9293C17.974 20.416 17.4446 20.8007 17.0176 20.5398L12.2932 17.6542C12.1132 17.5443 11.8868 17.5443 11.7068 17.6542L6.98238 20.5398C6.55539 20.8007 6.02594 20.416 6.14203 19.9293L7.42652 14.5444C7.47546 14.3392 7.4055 14.1239 7.24531 13.9867L3.04099 10.3853C2.661 10.0598 2.86323 9.43735 3.36197 9.39736L8.88022 8.95497C9.09048 8.93811 9.27363 8.80504 9.35464 8.61028L11.4806 3.49883Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
				</svg>
			{/each}
			<Badge slot="text" class="ml-3">{product.rating}</Badge>
		</div>
		<Badge slot="text">{product.category}</Badge>
		<Badge color="red" slot="text">{product.quantity == 1 ? "Rimane" : "Rimangono"} {product.quantity} {product.quantity == 1 ? "prodotto" : "prodotti"} </Badge>
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