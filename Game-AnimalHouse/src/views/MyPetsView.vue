<script setup>
    let animals = [{
      name: "Lillo",
      species: "Cane",
      breed: "maltese",
      url: "https://www.ciaogreen.it/wp-content/uploads/2021/03/cane-maltese.jpg",
      birthday: "24/12/2021",
      gender: "Male",
      weight: "0-10 kg",
      owner_name: "Andrea",
      owner_surname: "Napoli",
      owner_phone: "3402141216",
      owner_email: "andreanapoli8801@gmail.com",
      index: "1",
    }, 
    {
      name: "Blu",
      species: "Cane",
      breed: "maltese",
      url: "https://www.focusjunior.it/content/uploads/2019/01/Maltese-2.jpg",
      birthday: "20/10/2018",
      gender: "Male",
      weight: "0-10 kg",
      owner_name: "Alessia",
      owner_surname: "Celentano",
      owner_phone: "3497335785",
      owner_email: "alessiaceleste.celentano@gmail.com",
      index: "2",
    },
    { 
      name: "Zacky",
      species: "Cane",
      breed: "labrador retriever",
      url: "https://petadvisor.it/wp-content/uploads/2019/12/labrador-retriever-cop.jpg",
      birthday: "21/10/2011",
      gender: "Male",
      weight: "40-60 kg",
      owner_name: "Manuel",
      owner_surname: "Arto",
      owner_phone: "3331234567",
      owner_email: "manuelartociao@gmail.com",
      index: "3",
    },
    { 
      name: "Zoe",
      species: "Cane",
      breed: "cavalier king",
      url: "https://img2.storyblok.com/filters:format(webp)/f/83829/1200x628/9a2981fd1e/esperance-vie-cavalier-king-charles.jpg",
      birthday: "07/11/2018",
      gender: "Female",
      weight: "0-10 kg",
      owner_name: "Francesca",
      owner_surname: "Venezian",
      owner_phone: "3331234567",
      owner_email: "francescavenezian@gmail.com",
      index: "4",
    }];
  
</script>

<template>
  <img src="https://www.petme.it/wp-content/themes/petme/header_img/slide_razze.png" alt="animali" id="img_header">
  <div class="container">
    <h1 style="color:black; font-weight: bold; font-family: Georgia">Ecco i miei animali:</h1>
    <!-- Button trigger modal -->
    <button type="button" id="btn" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#Register">
      <i class="bi bi-plus-circle-fill" id="plus"></i>
    </button>

    <!-- Modal -->
    <div class="modal fade" id="Register" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabel">Register your animal</h4>
            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <div class='right-container'>
              <header>
                <div class='row'>
                  <div class="col-8">
                    <h5>Inserisci le informazioni del tuo amico</h5>
                  </div>
                  <div class="col-4">
                    <h5>Dati del proprietario</h5>
                  </div>
                </div>
                <div class='row'>
                  <div class='col'>
                    <label for='pets-name'>Name</label>
                    <input id='pets-name' placeholder="Pet's name" type='text'>
                  </div>
                  <div class='col'>
                    <label for='pets-upload'><i class="bi bi-camera"></i> Upload a photo</label><br>
                    <input id='pets-upload' placeholder="URL of photo" type='text'>
                  </div>
                  <div class='col'>
                    <label for='name-owner'>Name</label><br>
                    <input id='name-owner' placeholder="Owner's name" type='text'>
                  </div>
                </div>
                <div class='row'>
                  <div class='col'>
                    <label for='pets-species'>Species</label>
                    <input id='pets-species' placeholder="Pet's species" type='text'>
                  </div>
                  <div class='col'>
                    <label for='pets-birthday'>Birthday</label>
                    <input id='pets-birthday' type='date'>
                  </div>
                  <div class='col'>
                    <label for='surname-owner'>Surname</label>
                    <input id='surname-owner' placeholder="Owner's surname" type='text'>
                  </div>
                </div>
                <div class='row'>
                  <div class='col'>
                    <label for='pets-breed'>Breed</label>
                    <input id='pets-breed' placeholder="Pet's breed" type='text'>
                  </div>
                  <div class='col'>
                    <label for='pet-gender-female'>Gender</label>
                    <div class='radio-container'>
                      <input id='pet-gender-female' name='pet-gender' type='radio' value='female' checked>
                      <label for='pet-gender-female'>Female</label>
                      <input id='pet-gender-male' name='pet-gender' type='radio' value='male'>
                      <label for='pet-gender-male'>Male</label>
                    </div>
                  </div>
                  <div class="col">
                    <label for='number-owner'>Number of phone</label>
                    <input id='number-owner' placeholder="333-4524127" type='text'>
                  </div>
                </div>
                <div class='row'>
                  <div class="col-8">
                    <label for='pet-weight-0-25'>Weight</label>
                    <div class='radio-container' style="width:415px;">
                      <input id='pet-weight-0-10' name='pet-weight' type='radio' value='0-10' checked>
                      <label for='pet-weight-0-10'>0-10 kg</label>
                      <input id='pet-weight-10-25' name='pet-weight' type='radio' value='10-25'>
                      <label for='pet-weight-10-25'>10-25 kg</label>
                      <input id='pet-weight-25-40' name='pet-weight' type='radio' value='25-40'>
                      <label for='pet-weight-25-40'>25-40 kg</label>
                      <input id='pet-weight-40-60' name='pet-weight' type='radio' value='40-60'>
                      <label for='pet-weight-40-60'>40-60 kg</label>
                      <input id='pet-weight-60-plus' name='pet-weight' type='radio' value='60+'>
                      <label for='pet-weight-60-plus'>60+kg</label>
                    </div>
                  </div>
                  <div class="col-4">
                    <label for='email-owner'>Email</label>
                    <input id='email-owner' placeholder="mariorossi@gmail.com" type='text'> 
                  </div>
                </div>
              </header>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Annulla</button>
            <button type="button" class="btn btn-primary" id="submit">Submit</button>
          </div>
        </div>
      </div>
    </div>

    <b-row>
      <b-col v-for="animal in animals">
        <b-card no-body class="overflow-hidden" style="width:37rem; height:15rem;">
          <b-row no-gutters>
            <b-col>
              <b-card-img :src="animal.url" alt="Image" class="rounded-0" style="width: 350px; height:250px"></b-card-img>
            </b-col>
            <b-col>
              <b-card-body :title="animal.name">
                <b-card-text>
                  {{ "Specie: " + animal.species }} <br>
                  {{ "Razza: " + animal.breed }}<br>
                  {{ "Nascita: " + animal.birthday }} <br>
                  {{ "Sesso: " + animal.gender }}<br>
                  {{ "Peso: " + animal.weight }}<br>
                </b-card-text>
                <button type="button" id="btn2" class="btn btn-primary btn-lg" data-bs-toggle="modal" :data-bs-target="'#myAnimal' + animal.index">
                  Scopri di più
                </button>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
        <br>
      </b-col>
    </b-row>

    <span v-for="animal in animals">
      <div class="modal fade" :id="'myAnimal' + animal.index" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="myModalLabel">{{animal.name}}</h4>
              <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
              <img :src="animal.url" :alt="animal.name + '_photo'" style="width:100%;">
              <div class="col-12 py-2">
                <div class="doggy_discription">
                  <p><b>Origini</b></p>
                  <p>
                    Tartaruga semiacquatica caratteristica di tutta l’Africa centro-meridionale, con insediamenti anche in Madagascar, Yemen e Arabia Saudita. 
                    Vive in piccoli bacini d’acqua stagnante e nella stagione secca, quando gli stagni si prosciugano, trova rifugio nel fango.
                  </p>
                </div>
                <div class="doggy_discription">
                  <p><b>Caratteristiche</b></p> 
                  <p>
                    Carapace di forma ovale e di colore da verde oliva a bruno uniforme; occhi rotondi e globosi; naso all’insù; collo lungo e sottile che la tartaruga 
                    ritrae a “s” e in modo parziale. <br>
                    -Dimorfismo sessuale: la coda dei maschi è più lunga e sottile di quella delle femmine. <br>
                    -Taglia: 25-30 cm di lunghezza.<br>
                    -Durata media della vita: 5-20 anni.
                  </p>
                </div>
                <div class="doggy_discription">
                  <p><b>Ambiente</b></p> 
                  <p>
                    Questa tartaruga non può essere tenuta in vasche esterne (tranne che in piena estate). Richiede un acquaterrario di una dimensione minima di 100x50x40 cm 
                    con 2/3 della superficie coperti di acqua poco profonda (la tartaruga deve poter respirare appoggiandosi sulle zampe posteriori) e una zona asciutta di sabbia. 
                    L’acqua sarà filtrata attraverso una pompa. Bisognerà, inoltre, inserire lampade al neon per la diffusione di raggi UVA e UVB (per la sintesi della vitamina D) 
                    e un riscaldatore a termostato che permetta di mantenere la temperatura dell’acqua tra i 25 e i 31 °C. Di notte, la temperatura dovrà essere di qualche grado 
                    (4 o 5) più bassa.
                  </p>
                </div>
                <div class="doggy_discription">
                  <p><b>Alimentazione</b></p> 
                  <p>
                    Regime essenzialmente carnivoro: insetti, vermi di fango, vermi di terra, vermi della farina, larve, pesciolini, granulare per tartarughe carnivore ecc. 
                    Pochi complementi di vegetali: giacinto d’acqua, radicchio, sagittaria ecc. <br>
                    Gli individui giovani devono mangiare tutti i giorni, mentre per gli adulti è sufficiente un pasto ogni tre giorni.
                  </p>
                </div>
                <div class="doggy_discription">
                  <p><b>Comportamento</b></p> 
                  <p>
                    Attività diurna. Se la tartaruga vive in gruppo, talvolta occorre separare i sessi perché i maschi possono tormentare le femmine e mostrarsi aggressivi.
                  </p>
                </div>
                <div class="doggy_discription">
                  <p><b>Riproduzione</b></p> 
                  <p>
                    Specie ovipara.<br>
                    Maturità sessuale: 2-5 anni.<br>
                    Stagione riproduttiva: da marzo a luglio.<br>
                    Numero di uova: fino a 20 (interrate nella sabbia umida).<br>
                    Durata dell’incubazione: 70-90 giorni.
                  </p>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </span>
  </div>
</template>


<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,600&display=swap");

#img_header {
    width: 100%;
    margin-bottom: 33px;
}

body {
align-items: center;
background: #d8aa96;
color: rgba(0, 0, 0, 0.8);
display: grid;
font-family: "Montserrat", sans-serif;
font-size: 14px;
font-weight: 400;
height: 100vh;
justify-items: center;
width: 100vh;
}

#btn {
  background-color: white;
  border: none;
  width:1px;
  height:1px;
  position: relative;
  left: 1200px;
  top: -70px;
}

#btn2 {
  width: 119px;
  height: 49px;
  font-size: 17px;
  padding: 1px;
  font-weight: bold;
  margin: -5px;
}

.btn:hover{
  background-color: #fff !important;
    color: #2140D8;
    transition: 500ms;
}

#plus {
  font-size:40px;
  color: blue;
}
.right-container {
background: #c2edf9;
width: 760px;
}

.right-container input {
border: 1px solid black;
border-radius: 4px;
height: 38px;
line-height: 38px;
padding-left: 5px;
}
.right-container header {
padding: 40px;
}
.right-container label,
.right-container input,
.right-container .pets-photo {
width: 176px;
}

.radio-container {
background: #fff;
border: 1px solid rgba(0, 0, 0, 0.1);
border-radius: 4px;
display: inline-block;
padding: 5px;
}

.radio-container label {
border: 1px solid transparent;
border-radius: 2px;
display: inline-block;
height: 26px;
line-height: 26px;
margin: 0;
padding: 0;
text-align: center;
transition: 0.2s all ease-in-out;
width: 80px;
}

.radio-container input[type=radio] {
display: none;
}
.radio-container input[type=radio]:checked + label {
background: #abd2f7;
border: 1px solid rgba(0, 0, 0, 0.1);
}
</style>