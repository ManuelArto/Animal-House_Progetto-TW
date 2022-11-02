<script setup lang="ts">
import { computed, ref } from 'vue';
import AnimalModal from '@/components/AnimalModal.vue'
import AnimalCard from '@/components/AnimalCard.vue'
import type { Animal } from '@/model/index'

var currentPage = ref(1)
var perPage = ref(4)

var rows = computed(() => {
  return animals.length
})
var currentPageAnimals = computed(() => {
  var index = perPage.value * (currentPage.value - 1)
  return animals.slice(index, index + perPage.value)
})

let animals: Array<Animal> = [{
  name: "Lillo",
  specie: "Cane",
  razza: "maltese",
  image_link: "https://www.ciaogreen.it/wp-content/uploads/2021/03/cane-maltese.jpg",
  birthday: "24/12/2021",
  gender: "Male",
  weight: "0-10 kg",
  owner_name: "Andrea",
  owner_surname: "Napoli",
  owner_phone: "3402141216",
  owner_email: "andreanapoli8801@gmail.com",
  id: "1",
},
{
  name: "Blu",
  specie: "Cane",
  razza: "maltese",
  image_link: "https://www.focusjunior.it/content/uploads/2019/01/Maltese-2.jpg",
  birthday: "20/10/2018",
  gender: "Male",
  weight: "0-10 kg",
  owner_name: "Alessia",
  owner_surname: "Celentano",
  owner_phone: "3497335785",
  owner_email: "alessiaceleste.celentano@gmail.com",
  id: "2",
},
{
  name: "Zaky",
  specie: "Cane",
  razza: "labrador retriever",
  image_link: "https://petadvisor.it/wp-content/uploads/2019/12/labrador-retriever-cop.jpg",
  birthday: "21/10/2011",
  gender: "Male",
  weight: "40-60 kg",
  owner_name: "Manuel",
  owner_surname: "Arto",
  owner_phone: "3331234567",
  owner_email: "manuelartociao@gmail.com",
  id: "3",
},
{
  name: "Zoe",
  specie: "Cane",
  razza: "cavalier king",
  image_link: "https://img2.storyblok.com/filters:format(webp)/f/83829/1200x628/9a2981fd1e/esperance-vie-cavalier-king-charles.jpg",
  birthday: "07/11/2018",
  gender: "Female",
  weight: "0-10 kg",
  owner_name: "Francesca",
  owner_surname: "Venezian",
  owner_phone: "3331234567",
  owner_email: "francescavenezian@gmail.com",
  id: "4",
}];

</script>

<template>
  <img src="https://www.petme.it/wp-content/themes/petme/header_img/slide_razze.png" alt="animali" id="img_header">
  <div class="container">
    <h1 style="color:black; font-weight: bold; font-family: Georgia">Ecco i miei animali:</h1>
    <!-- Button trigger modal -->
    <b-button id="btn" class="position-absolute top-0 end-0" data-bs-toggle="modal" data-bs-target="#Register">
      <i class="bi bi-plus-circle-fill" id="plus"></i>
    </b-button>

    <!-- Modal -->
    <div class="modal fade" id="Register" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabel">Register your animal</h4>
            <b-button variant="danger" data-bs-dismiss="modal" aria-label="Close"> <i class="bi bi-x-circle-fill"></i>
            </b-button>
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

    <b-row v-show="animals.length">
      <b-col class="col-12 col-md-6" v-for="animal in currentPageAnimals">
        <AnimalCard :animal="animal" :isRandAnimal="false" />
      </b-col>
      <b-pagination v-model="currentPage" :perPage="perPage" :total-rows="rows" :limit="3" pills align="center">
      </b-pagination>
    </b-row>

  </div>
</template>


<style scoped>
#img_header {
  width: 100%;
  margin-bottom: 33px;
}

#btn {
  background-color: white;
  border: none;
}

#plus {
  font-size: 40px;
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
.right-container input {
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

.radio-container input[type=radio]:checked+label {
  background: #abd2f7;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
</style>