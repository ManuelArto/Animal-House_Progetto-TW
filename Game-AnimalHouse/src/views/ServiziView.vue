<template>
  <div id="animation">
    <div class="container-fluid">
        <div class="row" id="contenitore">
          <div class="col-12 col-md-6 mt-3 mb-3" v-for="service in services" :key="service.id">
            <b-card class="mb-3 h-100" id="card">
              <div class="row no-gutters h-100">
                <div class="col-md-5">
                  <img :src="service.image" class="card-img h-100">
                </div>
                <div class="col-md-7">
                  <div class="card-body d-flex flex-column h-100">
                      <h5 class="card-title fs-2">{{ service.name }}</h5>
                      <p class="card-text fs-5">{{ service.description }}</p>
                      <div class="d-flex justify-content-end mt-auto">
                          <button class="fs-4 btn btn-primary">Prenota adesso</button>
                      </div>
                  </div>
                </div>
              </div>
            </b-card>
          </div>
        </div>
    </div>
  </div>
</template>
  
<script>
  export default {
    data() {
      return {
        services: [
          {
            id: 1,
            name: "Dog sitter",
            description: "Offriamo servizi di dog sitting professionale e personalizzati per i tuoi amici a quattro zampe. Il servizio può essere offerto a domicilio, presso la residenza del dog sitter o in una struttura apposita. Il dog sitter si occuperà di garantire al cane cibo, acqua, esercizio fisico e cure necessarie, come ad esempio la somministrazione di farmaci. L'obiettivo principale è quello di garantire al cane un ambiente sicuro e confortevole",
            image: "https://media.istockphoto.com/id/1345672917/it/foto/gruppo-di-dog-walker-che-lavorano-insieme.jpg?s=612x612&w=0&k=20&c=S8iIAJcPpz1moJ0CM1ISL22VJ5lzgAxd92CHgqYTMHg=",
          },
          {
            id: 2,
            name: "Veterinario",
            description: "E' uno dei servizi più importanti per la cura e il benessere dei nostri animali domestici. I nostri veterinari sono medici altamente specializzati nella diagnosi, prevenzione e trattamento di malattie e disturbi degli animali. Oltre a fornire cure mediche, i veterinari svolgono anche un ruolo importante nella prevenzione delle malattie attraverso la somministrazione di vaccinazioni, la consulenza sulla nutrizione e la salute generale dell'animale. ",
            image: "http://www.imperaformazione.it/sito_html5/immagini/ass_veterinario.jpg",
          },
          {
            id: 3,
            name: "Toelettatura",
            description: "E' un servizio dedicato alla cura dell'igiene e dell'aspetto estetico degli animali domestici. Durante la toelettatura, il pet viene lavato e asciugato, gli vengono tagliati gli unghie, puliti gli occhi, le orecchie e le ghiandole anali, e viene effettuato il trimming del pelo, se necessario. La toelettatura può essere personalizzata per soddisfare le esigenze specifiche dell'animale, con differenti opzioni di shampoo, pettinature e tagli di pelo.",
            image: "https://www.tuttogreen.it/wp-content/uploads/2020/12/shutterstock_1547371988.jpg",
          },
          {
            id: 4,
            name: "Pensione estiva",
            description: "Offriamo un servizio di accoglienza temporanea dedicato agli animali domestici. Le nostre pensioni si trovano in zone tranquille, dotate di grandi spazi aperti per far giocare e correre tutti gli animali. Durante la permanenza nella pensione, gli animali sono seguiti da personale qualificato, che si prendono cura delle loro esigenze quotidiane. La pensione rappresenta la soluzione ideale per il proprio animale durante le vacanze dei proprietari.",
            image: "https://www.quotalo.it/upload/foto/pensione-cani.jpg",
          },
        ],
      };
    },
  };
</script>
  
<style>
  #animation {
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
  .card-img {
    object-fit: cover;
    height: 100%;
    width: 100%;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }

  @media screen and (max-width:1300px){
    #contenitore {
      display:block;
    }
    #card {
      width: 1000px;
    }
  }
  
</style>