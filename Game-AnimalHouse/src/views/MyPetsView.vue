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
  <div id="animation">
    <img src="@/assets/banner_mypets.png" alt="banner_mypets" id="img_header">
    <div class="container mb-5">
      <div class="d-flex justify-content-between align-items-center">
        <h1 style="color:black; font-weight: bold; font-family: Georgia">Ecco i miei animali:</h1>
        <!-- Button trigger modal -->
        <b-button id="btn" data-bs-toggle="modal" data-bs-target="#RegisterModal">
          <i class="bi bi-plus-circle-fill" id="plus"></i>
        </b-button> 
      </div>

      <!-- Modal -->
      <RegisterAnimalModal :modalId="'RegisterModal'"></RegisterAnimalModal>

      <b-row v-if="state.animals.length">
        <b-col class="col-12 col-md-6" v-for="animal in currentPageAnimals" :id="animal._id">
          <AnimalCard :animal="animal" :isRandAnimal="false" />
        </b-col>
        <b-pagination v-model="currentPage" :perPage="perPage" :total-rows="rows" :limit="3" pills align="center">
        </b-pagination>
      </b-row>
      <div v-else>
        <p style="color:gray; font-style:italic">Benvenuto! Non hai ancora registrato alcun animale.</p>
        <b-button variant="primary" data-bs-toggle="modal" data-bs-target="#RegisterModal">Aggiungi un animale</b-button>
      </div>
    </div>
  </div>
</template>


<style scoped>
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