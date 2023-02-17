<script setup>
import HomeCarousel from "@/components/HomeCarousel.vue"

let services = [{
  name: "Curiosità",
  path: "/curiosita",
  icon: "bi bi-patch-question-fill",
  description: "Vieni a conoscere un pò meglio il mondo animale. Qui troverai migliaia di curiosità interessanti riguardanti gli animali di ogni specie e habitat.",
},
{
  name: "Informazioni",
  path: "/informazioni",
  icon: "bi bi-info-circle-fill",
  description: "Hai qualche dubbio? Puoi trovare la risposta in questa sezione.",
},
{
  name: "I miei animali",
  path: "/my_pets",
  icon: "bi bi-house-heart-fill",
  description: "Compilando un semplice form puoi salvare i tuoi animali con una foto profilo e tutte le loro caratteristiche.",
},
{
  name: "Video",
  path: "/videos",
  icon: "bi bi-collection-play-fill",
  description: "Vuoi farti due risate? Qui puoi trovare una serie di video in cui i nostri piccoli amici ci fanno divertire nelle loro azioni quotidiane.",
},
{
  name: "Prodotti",
  path: "/negozio",
  icon: "bi bi-shop",
  description: "Hai finito il cibo per il tuo amico? Nessun problema, visita il nostro store per trovare quello che desideri.",
},
{
  name: "Servizi",
  path: "/servizi",
  icon: "bi bi-gear-fill",
  description: "Hotel, psicologo, pet sitter, centri benessere e tante altre cose. Vieni a scoprire tutti i servizi che abbiamo da offrirti.",
}];
</script>

<template>
  <div id="animation_body">
    <HomeCarousel />

    <div class="container px-3" id="animation">
      <div class="common_heading d-flex py-3">
        <h2 class="fw-bold m-auto text-center">Tutti i servizi per Te e il tuo Pet</h2>
      </div>
      <b-row class="g-3 mb-5">
        <div id="animation2" v-for="service in services" class="col-lg-4 col-sm-6 col-12">
          <div class="boxes_shadow p-4 h-100 d-flex flex-column text-center">
            <i :class="service.icon"></i>
            <div class="common_heading">
              <h4>{{ service.name }}</h4>
            </div>
            <p class="text_18">
              {{ service.description }}
            </p>
            <router-link tag="button" class="btn btn-primary btn-lg boxes_shadow mt-auto mx-auto" :to="service.path">
              Scopri di più</router-link>
          </div>
        </div>
      </b-row>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 75%;
}

#animation_body {
  animation: ombra 0.5s ease-in both;
}

@keyframes ombra {
	from {
    opacity: 0;
	}
	to {
    opacity:1;
	}
}

#animation {
  animation: fadeIn 0.8s ease-in both;
}

#animation2 {
  animation: fadeIn 0.8s ease-in both;
  animation-delay: 1s;
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translate3d(0, -20%, 0);
	}
	to {
		opacity: 1;
		transform: translate3d(0, 0, 0);
	}
}

.boxes_shadow {
  box-shadow: 2px 2px 20px rgb(0 0 0 / 10%);
  border-radius: 10px;
  transition: transform .2s;

  &:hover {
    box-shadow: 2px 2px 60px rgba(25, 66, 189, 0.862);
    transform: scale(1.1); 
  }
}

.bi {
  font-size: 30px;
  color: rgb(55, 55, 231);
}

.common_heading {
  color: #2f4eec;
}

@media screen and (max-width: 992px) {
	.text_18 {
		display: -webkit-box;
		line-clamp: 5;
		font-size: 14px !important;
		font-weight: normal !important;
	}
}
.text_18 {
    font-size: 16px;
}
</style>