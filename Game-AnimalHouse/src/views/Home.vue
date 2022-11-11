<script setup>
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
  description: "Hai qualche dubbio? Puoi trovare la risposta in questa sezione specificando la razza a cui e l'animale a cui ti stai riferenedo.",
},
{
  name: "I miei animali",
  path: "/my_pets",
  icon: "bi bi-house-heart-fill",
  description: "Compilando un semplice questionario puoi salvare i tuoi animali con la foto e tutte le sue caratteristiche.",
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
  <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div id="hero-1">
          <div class="overlay-1">
            <h1><b>I migliori prodotti <br>li trovi da noi</b></h1>
            <h6>Cerca nel nostro store i prodotti <br>più adatti al tuo amico</h6>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <div id="hero-2">
          <div class="overlay-2">
            <h1><b>Scopri i nostri servizi</b></h1>
            <h6>Villegiature, psicologi, pet sitter. <br>Tutti i servizi a portata di un click .</h6>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <div id="hero-3">
          <div class="overlay-3">
            <h1><b>Le informazioni di <br>cui hai bisogno</b></h1>
            <h6>Villegiature, psicologi, pet sitter. <br>Leggi tutte le informazioni</h6>
          </div>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>

  <div class="container px-3">
    <div class="common_heading d-flex py-3">
      <h2 class="fw-bold m-auto">Tutti i servizi per te e il tuo pet</h2>
    </div>
    <b-row class="g-3 mb-5">
      <div v-for="service in services" class="col-md-4 col-12">
        <div class="boxes_shadow p-4 h-100 d-flex flex-column text-center">
          <i :class="service.icon"></i>
          <div class="common_heading">
            <h4>{{ service.name }}</h4>
          </div>
          <p>
            {{ service.description }}
          </p>
          <router-link tag="button" class="btn btn-primary btn-lg boxes_shadow mt-auto mx-auto" :to="service.path">
            Scopri di più</router-link>
        </div>
      </div>
    </b-row>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 70%;
}

.boxes_shadow {
  box-shadow: 2px 2px 20px rgb(0 0 0 / 10%);
  border-radius: 10px;

  &:hover {
    box-shadow: 2px 2px 60px rgba(25, 66, 189, 0.862);
  }
}

.bi {
  font-size: 30px;
  color: rgb(55, 55, 231);
}

.common_heading {
  color: #2f4eec;
}

// CAROUSEL

.carousel-inner {
  width: 100%;
  height: 450px;
}

/*CSS assolutamente da cambiare, MOMENTANEOOOOO */
.overlay-1 {
  position: absolute;
  top: 20%;
  left: 70%;
  text-align: right;
}

.overlay-2 {
  position: absolute;
  top: 25%;
  left: 10%;
}

.overlay-3 {
  position: absolute;
  top: 10%;
  left: 10%;
}

#hero-1 {
  position: relative;
  height: 100vh;
  background: url('../assets/home-1.jpg');
  background-size: cover;
  color: #ffffff;

  display: flex;
  align-items: center;
}

#hero-1::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}


#hero-2 {
  position: relative;
  height: 100vh;
  background: url('../assets/home-2.png');
  color: #ffffff;
  align-items: center;
}

#hero-2::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}

#hero-3 {
  position: relative;
  height: 100vh;
  background: url('../assets/home-3.png');
  background-size: cover;
  color: #ffffff;
  display: flex;
  align-items: center;
}

#hero-3::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>