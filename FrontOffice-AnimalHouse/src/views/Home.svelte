<script>
	import { onMount } from 'svelte'
	import { Card, Button, Rating, Badge, Carousel } from "flowbite-svelte"
	import { handleRequest } from "../utils/requestHandler"
	import { ENDPOINT } from "../utils/const"
	import images from "../data/images.json"

	let products = []
	async function fetchProducts(number) {
		let res
		if (res = await handleRequest(ENDPOINT.PRODUCTS_RAND_LIST(number))) {
			const data = await res.json()
	
			if (data.error) {
				addToast({ message: `${data.error.type}<br>${data.error.message}`})
			} else {
				return data
			}
		} else
			return []
	}
	
	let card_shop = false
	let card_services = false
	let card_leaderboard = false
	let card_bacheca = false
	let screen_Desktop = true
	
	onMount(async () => {
		window.addEventListener("resize", () => screen_Desktop = window.innerWidth >= 1260 )
		products = await fetchProducts(2)
	})

</script>

<style>
	#card_shop:hover, 
	#card_services:hover,
	#card_leaderboard:hover,
	#card_bacheca:hover{
		transform: scale(1.2);
		transition: transform 0.3s ease-in-out;
	}

	#shop, 
	#services1, 
	#services2,
	#leaderboard{
		animation: fadeIn 0.5s; 
	}

	@keyframes fadeIn {
		0% { opacity: 0; }
		100% { opacity: 1; }
	}
	@media screen and (max-width:1260px){
		#card_shop:hover, 
		#card_services:hover,
		#card_leaderboard:hover,
		#card_bacheca:hover{
			transform: none;
		}
	}
	@media screen and (max-width:768px){
		:global(.card > img){
			display: flex;
			position: relative;
			height: 13rem;
		}
	}

</style>
<div class="">
	<Carousel divClass="overflow-hidden relative rounded-lg"{images} showCaptions={false} showThumbs={false}/>
</div>

<div class="container mx-auto">
	<div class="justify-between px-12 mt-8">
		<!-- SHOP CARD -->
		<div class="inline-flex mt-8 relative">
			<div on:mouseenter={ () => card_shop=true } on:mouseleave={ () => card_shop=false } id="card_shop">
				<Card img="https://www.carrello.eu/wp-content/uploads/2020/02/dog-fa-la-spesa.jpg" horizontal class="card">
					<p class="text-3xl sm:text-xl mb-2 font-bold tracking-tight text-gray-900 dark:text-white">Shop</p>
					<p class="text-sm sm:text-base mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
						Vieni a visitare il nostro shop per scoprire le nostre offerte e fare dei veri e propri affari. Qui potrai trovare tutte le cose di cui hai bisogno ad un prezzo molto conveniente <br>
					</p>
					<Button class="mt-4" href="#/shop">Esplora lo shop</Button>
				</Card>
			</div>
			<!-- PREVIEW PRODUCTS -->
			{#if card_shop && screen_Desktop}
			<div class="inline-flex ml-5" id="shop">
				{#each products as product, index (product._id)}
					<div>
						<a href="#/shop">
							<img class="ml-20 w-15 h-36 rounded" src={product.imageURI} alt={`product ${index}`} />
						</a>
						<div class="ml-8 px-5 pb-5">
							<a href="#/shop">
								<h5 class='text-md font-semibold tracking-tight text-gray-900 dark:text-white'>
									{product.name}
								</h5>
							</a>
							<Rating size="18" class="mt-2.5 mb-5" rating={product.rating}>
								<Badge slot="text" class="ml-3">{product.rating}</Badge> 
							</Rating>
							<span class="font-bold text-2xl">{product.price}€</span>
						</div>
					</div>
				{/each}
			</div>
			{/if}
		</div>
		
		<!-- SERVIZI IN PRESENZA CARD -->
		<div class="mt-8 flex flex-row-reverse">
			<div class="grid grid-rows-3 grid-flow-col">
				{#if card_services && screen_Desktop}
					<div id="services1" class="row-start-2 row-span-2">
						<img class="w-60 rounded-lg" src="https://i.etsystatic.com/11516728/r/il/56f9b9/1957336565/il_fullxfull.1957336565_eh3d.jpg" alt="cane-dogsitter">
					</div>
					<div id="services2" class="row-end-3 row-span-2">
						<img src="https://www.petme.it/wp-content/themes/petme/assets/img/form_1.png" alt="cartella">
					</div>
				{/if}
				<div on:mouseenter={ () => card_services=true } on:mouseleave={ () => card_services=false } id="card_services" class="row-start-1 row-end-4">
					<Card img="https://img.freepik.com/premium-vector/cartoon-veterinary-examining-dog_29190-3349.jpg"  horizontal class="card">
						<h5 class="text-2xl sm:text-3xl mb-2 font-bold tracking-tight text-gray-900 dark:text-white">Servizi in presenza</h5>
						<p class="text-sm sm:text-base mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
							Qui potrai trovare i nostri servizi di dogsitter e veterinaria. Puoi scegliere uno dei due servizi in base al giorno oppure alla sede più vicina a te.
							Prenotarsi è semplicissimo: controlla la disponibilità nel giorno desiderato, compila il form con i campi opportuni.<br>
						</p>
						<Button class="mt-4" href="#/serviziPresenza">Esplora i servizi</Button>
					</Card>
				</div>
			</div>
		</div>
	
		<!-- LEADERBOARD CARD -->
		<div class="inline-flex mt-8">
			<div on:mouseenter={ () => card_leaderboard=true } on:mouseleave={ () => card_leaderboard=false } id="card_leaderboard">
				<Card img="https://img.pixers.pics/pho_wat(s3:700/FO/43/70/54/74/700_FO43705474_9207b6f77692347b23988cb4ea48c1ca.jpg,698,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,478,650,jpg)/carte-da-parati-cartoon-vincitori-podio.jpg.jpg"  horizontal class="card">
					<h5 class="mb-2 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Leaderboard</h5>
					<p class="text-sm sm:text-base mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
						Qui non manca il divertimento. Vieni a provarli e divertiti a sfidare i tuoi amici. Qui troverai i risultati e la classifica di tutti i giocatori
					</p>
					<Button class="mt-4" href="#/servizi/leaderboard">Esplora la classifica</Button>
				</Card>
			</div>
			<div>
				<!--  TODO: C'E' DA CAMBIARE L'IMMAGINE  -->
				{#if card_leaderboard && screen_Desktop}
					<img id="leaderboard" style="width:300px;" class="ml-16 rounded-lg" src="http://www.canalesassuolo.it/wp-content/uploads/2018/12/classifica-serie-a-16.jpg" alt="classifica">
				{/if}
			</div>
		</div>
	
		<!-- BACHECA CARD -->
		<!--  TODO: CI SONO DA CAMBIARE LE IMMAGINI  -->
		<div class="mt-8 flex flex-row-reverse">
			<div class="grid grid-rows-3 grid-flow-col">
				{#if card_bacheca && screen_Desktop}
					<div id="services1" class="row-start-2 row-span-2">
						<img class="w-60 rounded-lg" src="https://i.etsystatic.com/11516728/r/il/56f9b9/1957336565/il_fullxfull.1957336565_eh3d.jpg" alt="cane-dogsitter">
					</div>
					<div id="services2" class="row-end-3 row-span-2">
						<img src="https://www.petme.it/wp-content/themes/petme/assets/img/form_1.png" alt="cartella">
					</div>
				{/if}
				<div on:mouseenter={ () => card_bacheca=true } on:mouseleave={ () => card_bacheca=false } id="card_bacheca" class="row-start-1 row-end-4">
					<Card img="https://media.istockphoto.com/id/1219927783/it/vettoriale/nota-carta-con-icona-a-spillo-in-design-piatto-alla-moda.jpg?s=612x612&w=0&k=20&c=ZSKlVswybtBRueNOI5gLhRTZiXAQvujc95Iz84VR1Lk="  horizontal class="card">
						<h5 class="mb-2 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Bacheca</h5>
						<p class="text-sm sm:text-base mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
							Hai qualche dubbio sul tuo amico peloso? Vuoi fornire un aiuto agli altri utenti? Allora la nostra bacheca è il posto giusto per te.
						</p>
						<Button class="mt-4" href="#/servizi/bachecaEccoloQua">Esplora la bacheca</Button>
					</Card>
				</div>
			</div>
		</div>
	</div>
</div>