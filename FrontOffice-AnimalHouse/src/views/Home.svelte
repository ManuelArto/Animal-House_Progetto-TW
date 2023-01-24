<script>
	import HomeCarousel from "../components/HomeCarousel.svelte"
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
</script>

<style scoped>
.container {
  width: 100%;
}

.boxes_shadow {
  box-shadow: 2px 2px 20px rgb(0 0 0 / 10%);
  border-radius: 10px;
  transition: transform .2s;
}

.boxes_shadow :hover {
    box-shadow: 2px 2px 60px rgba(25, 66, 189, 0.862);
    transform: scale(1.1); 
  }
.common_heading {
  color: #2f4eec;
  font-weight: bold;
  font-size: 30px;
}

@media screen and (max-width: 992px) {
	.text_18 {
		display: -webkit-box;
		line-clamp: 5;
		font-size: 14px !important;
		font-weight: normal !important;
	}
	.common_heading {
		font-size: 20px;
	}
}
.text_18 {
    font-size: 16px;
}
</style>

<HomeCarousel />


<div class="container mx-auto sm:px-4 px-3" id="animation">
    <div class="common_heading flex py-3">
      <h2 class="fw-bold m-auto text-center">Tutti i servizi per Te e il tuo Pet</h2>
    </div>
	
    <div class="grid grid-cols-4 gap-5">
		{ #each services as service }
		<div class="boxes_shadow p-6 flex flex-col text-center">
			<svg class="h-14 w-14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" d="{service.icon}"></path>
			</svg>
			<div class="common_heading mt-3">
				<h4>{ service.name }</h4>
			</div>
			<p class="text_18 mt-3">
				{ service.description }
			</p>
			<a href={service.path} class="mt-3 inline-block align-middle text-center font-normal whitespace-no-wrap rounded-lg py-2 leading-normal bg-blue-600 text-white py-3 px-4 leading-tight text-xl boxes_shadow mt-auto mx-auto">Scopri di più</a>
		</div>
		{/each}
    </div>
</div>
