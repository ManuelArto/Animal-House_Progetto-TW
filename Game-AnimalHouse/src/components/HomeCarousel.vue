<script setup lang="ts">
import {ref} from 'vue'

const slide = ref(0)

</script>

<template>
	<b-carousel v-model="slide" class="carousel-fade" img-height="100" controls indicators no-touch>
	  <b-carousel-slide active>
		<template #img>
		  <div style="background-color: #000000;">
			<img class="w-100" src="@/assets/home-2.png" alt="home-banner 2"/>
		  </div>
		  <div class="overlay-2 text-wrap">
			<p class="carousel_text_1 fw-bold mb-0">Scopri i nostri servizi</p>
			<p class="carousel_text_2">Villegiature, psicologi, pet sitter. <br>Tutti i servizi a portata di un click.</p>
		  </div>
		</template>
	  </b-carousel-slide>
	  <b-carousel-slide>
		<template #img>
		  <div style="background-color: #000000;">
			<img class="w-100" src="@/assets/home-3.png" alt="home-banner 3"/>
		  </div>
		  <div class="overlay-3 text-wrap">
			<p class="carousel_text_1 fw-bold mb-0">Le informazioni di <br>cui hai bisogno</p>
			<p class="carousel_text_2">Villegiature, psicologi, pet sitter. <br>Leggi tutte le informazioni</p>
		  </div>
		</template>
	  </b-carousel-slide>
	  <b-carousel-slide>
		<template #img>
		  <div style="background-color: #000000;">
			<img class="w-100" src="@/assets/home-1.jpg" alt="home-banner 1"/>
		  </div>
		  <div class="overlay-1 text-wrap">
			<p class="carousel_text_1 fw-bold mb-0">I migliori prodotti li trovi da noi</p>
			<p class="carousel_text_2">Cerca nel nostro store i prodotti <br>più adatti al tuo amico</p>
		  </div>
		</template>
	  </b-carousel-slide>
	</b-carousel>
</template>

<style scoped lang="scss">

img {
  min-height: 200px;
  object-fit: cover !important;
  opacity: 0.6;
}

@media screen and (max-width: 992px) {
	.carousel_text_1 {
		font-size: 28pt !important;
		line-height: 30pt !important;
	}
	.carousel_text_2 {
		font-size: 14pt !important;
	}
}
@media screen and (max-width: 576px) {
	.carousel_text_1 {
		font-size: 16pt !important;
		line-height: 20pt !important;
	}
	.carousel_text_2 {
		font-size: 10pt !important;
	}
}

.carousel_text_1 {
  font-size: 32pt;
  line-height: 35pt;
}

.carousel_text_2 {
  font-size: 16pt;
}

.overlay-1 {
  position: absolute;
  top: 15%;
  left: 12%;
  color: white;
}

.overlay-2 {
  position: absolute;
  top: 20%;
  left: 12%;
  color: white;
}

.overlay-3 {
  position: absolute;
  top: 10%;
  right: 12%;
  color: white;
}
</style>