<script setup lang="ts">
import { computed, ref } from 'vue';
import AnimalCard from '@/components/AnimalCard.vue'
import RegisterAnimalModal from '@/components/RegisterAnimalModal.vue'
import { state } from '@/store'

// Pagination data
var currentPage = ref(1)
var perPage = ref(6)
var rows = computed(() => {
  return state.animals.length
})
var currentPageAnimals = computed(() => {
  var index = perPage.value * (currentPage.value - 1)
  return state.animals.slice(index, index + perPage.value)
})

</script>

<template>
  <img src="https://www.petme.it/wp-content/themes/petme/header_img/slide_razze.png" alt="animali" id="img_header">
  <div class="container">
    <h1 style="color:black; font-weight: bold; font-family: Georgia">Ecco i miei animali:</h1>
    <!-- Button trigger modal -->
    <b-button id="btn" class="position-absolute top-0 end-0" data-bs-toggle="modal" data-bs-target="#RegisterModal">
      <i class="bi bi-plus-circle-fill" id="plus"></i>
    </b-button>

    <!-- Modal -->
    <RegisterAnimalModal :modalId="'RegisterModal'"></RegisterAnimalModal>

    <b-row v-show="state.animals.length">
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
</style>