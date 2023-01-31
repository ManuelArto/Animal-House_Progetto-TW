<script>
	import HomeCarousel from "../components/HomeCarousel.svelte"
	import { Card, Button, Rating, Badge } from "flowbite-svelte";
	let services = [{
		name: "Shop",
		path: "#/shop",
		icon: "M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",
		description: "Vieni a conoscere un pò meglio il mondo animale. Qui troverai migliaia di curiosità interessanti riguardanti gli animali di ogni specie e habitat.",
		},
		{
		name: "Servizi in presenza",
		path: "#/serviziPresenza",
		icon: "M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495",
		description: "Hai qualche dubbio? Puoi trovare la risposta in questa sezione specificando la razza a cui e l'animale a cui ti stai riferenedo.",
		},
		{
		name: "Leaderboard",
		path: "#/servizi/leaderboard",
		icon: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z",
		description: "Compilando un semplice questionario puoi salvare i tuoi animali con la foto e tutte le sue caratteristiche.",
		},
		{
		name: "Bacheca",
		path: "#/servizi/bachecaEccoloQua",
		icon: "M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z",
		description: "Vuoi farti due risate? Qui puoi trovare una serie di video in cui i nostri piccoli amici ci fanno divertire nelle loro azioni quotidiane.",
	}];

	let card_shop = false;
	let card_services = false;
	let card_leaderboard = false;
	let card_bacheca = false;
	let screen_Desktop;
	
	window.addEventListener("resize", () => {
		if(window.innerWidth < 1260){
			screen_Desktop = false;
		}else{
			screen_Desktop = true;
		}
	});
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
	

</style>

<HomeCarousel />

<div class="container w-3/4 ml-5 mt-10">
	<div class="inline-flex">
		<div on:mouseenter={() => {
			card_shop=true;
		}}
		on:mouseleave={() => {
			card_shop=false;
		}} id="card_shop">
			<Card  class="xl:ml-10 sm:flex justify-center" img="https://www.carrello.eu/wp-content/uploads/2020/02/dog-fa-la-spesa.jpg" horizontal reverse={false}>
				<h5 class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Shop</h5>
				<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
					Vieni a visitare il nostro shop per scoprire le nostre offerte e fare dei veri e propri affari. Qui potrai trovare tutte le cose di cui hai bisogno ad un prezzo molto conveniente <br>
					<Button class="mt-4 flex flex-row-reverse" href="#/shop">Clicca qui</Button>
				</p>
			</Card>
		</div>
		<div>
			{#if card_shop && screen_Desktop}
				<div class="inline-flex" id="shop">
					<div class="ml-5">
						<a href="#/shop">
							<img class="ml-20 w-15 h-36 rounded" src="data:image/jpeg;base64,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" alt="product 1" />
						</a>
						<div class="ml-8 px-5 pb-5">
							<a href="#/shop">
								<h5 class='text-md font-semibold tracking-tight text-gray-900 dark:text-white'>
									Cesar, con pollo e manto
								</h5>
							</a>
							<Rating size="18" class="mt-2.5 mb-5">
								<Badge slot="text" class="ml-3">4</Badge> 
							</Rating>
							<span class="font-bold text-2xl">11,99€</span>
						</div>
					</div>
					<div>
						<a href="#/shop">
							<img class="ml-20 w-15 h-36 rounded" src="data:image/jpeg;base64,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" alt="product 1" />
						</a>
						<div class="ml-8 px-5 pb-5">
							<a href="#/shop">
								<h5 class='text-md font-semibold tracking-tight text-gray-900 dark:text-white'>
									Royal canin, puppy, medio
								</h5>
							</a>
							<Rating size="18" class="mt-2.5 mb-5">
								<Badge slot="text" class="ml-3">4</Badge>
							</Rating>
							<span class="font-bold text-2xl">13,99€</span>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
	
	<div class=" mt-8 flex flex-row-reverse">
		<div class="grid grid-rows-3 grid-flow-col">
			{#if card_services && screen_Desktop}
				<div id="services1" class="row-start-2 row-span-2">
					<img class="w-60 rounded-lg" src="https://i.etsystatic.com/11516728/r/il/56f9b9/1957336565/il_fullxfull.1957336565_eh3d.jpg" alt="cane-dogsitter">
				</div>
				<div id="services2" class="row-end-3 row-span-2">
					<img src="https://www.petme.it/wp-content/themes/petme/assets/img/form_1.png" alt="cartella">
				</div>
			{/if}
			<div on:mouseenter={() => {
				card_services=true;
			}}
			on:mouseleave={() => {
				card_services=false;
			}} id="card_services" class="row-start-1 row-end-4">
				<Card img="https://img.freepik.com/premium-vector/cartoon-veterinary-examining-dog_29190-3349.jpg" horizontal reverse={true}>
					<h5 class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Servizi in presenza</h5>
					<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
						Qui potrai trovare i nostri servizi di dogsitter e veterinaria. Puoi scegliere uno dei due servizi in base al giorno oppure alla sede più vicina a te.
						Prenotarsi è semplicissimo: controlla la disponibilità nel giorno desiderato, compila il form con i campi opportuni.
						<Button class="mt-4 flex flex-row-reverse" href="#/serviziPresenza">Esplora i servizi</Button>
					</p>
				</Card>
			</div>
		</div>
	</div>	
	<div class="inline-flex mt-8">
		<div on:mouseenter={() => {
			card_leaderboard=true;
		}}
		on:mouseleave={() => {
			card_leaderboard=false;
		}} id="card_leaderboard">
			<Card class="ml-10" img="https://img.pixers.pics/pho_wat(s3:700/FO/43/70/54/74/700_FO43705474_9207b6f77692347b23988cb4ea48c1ca.jpg,698,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,478,650,jpg)/carte-da-parati-cartoon-vincitori-podio.jpg.jpg" horizontal reverse={false}>
				<h5 class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Leaderboard</h5>
				<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
					Qui non manca il divertimento. Vieni a provarli e divertiti a sfidare i tuoi amici. Qui troverai i risultati e la classifica di tutti i giocatori
					<Button class="mt-4 flex flex-row-reverse" href="#/servizi/leaderboard">Clicca qui</Button>
				</p>
			</Card>
		</div>
		<div>
			<!--  TODO: C'E' DA CAMBIARE L'IMMAGINE  -->
			{#if card_leaderboard && screen_Desktop}
				<img id="leaderboard" style="width:300px;" class="ml-16 rounded-lg" src="http://www.canalesassuolo.it/wp-content/uploads/2018/12/classifica-serie-a-16.jpg" alt="classifica">
			{/if}
		</div>
	</div>

	<!--  TODO: CI SONO DA CAMBIARE LE IMMAGINI  -->
	<div class=" mt-8 flex flex-row-reverse">
		<div class="grid grid-rows-3 grid-flow-col">
			{#if card_bacheca && screen_Desktop}
				<div id="services1" class="row-start-2 row-span-2">
					<img class="w-60 rounded-lg" src="https://i.etsystatic.com/11516728/r/il/56f9b9/1957336565/il_fullxfull.1957336565_eh3d.jpg" alt="cane-dogsitter">
				</div>
				<div id="services2" class="row-end-3 row-span-2">
					<img src="https://www.petme.it/wp-content/themes/petme/assets/img/form_1.png" alt="cartella">
				</div>
			{/if}
			<div on:mouseenter={() => {
				card_bacheca=true;
			}}
			on:mouseleave={() => {
				card_bacheca=false;
			}} id="card_bacheca" class="row-start-1 row-end-4">
				<Card img="https://media.istockphoto.com/id/1219927783/it/vettoriale/nota-carta-con-icona-a-spillo-in-design-piatto-alla-moda.jpg?s=612x612&w=0&k=20&c=ZSKlVswybtBRueNOI5gLhRTZiXAQvujc95Iz84VR1Lk=" horizontal reverse={true}>
					<h5 class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Bacheca</h5>
					<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
						Hai qualche dubbio sul tuo amico peloso? Vuoi fornire un aiuto agli altri utenti? Allora la nostra bacheca è il posto giusto per te.
						<br><Button class="mt-4 flex flex-row-reverse" href="#/servizi/bachecaEccoloQua">Clicca qui</Button>
					</p>
				</Card>
			</div>
		</div>
		
	</div>


</div>	