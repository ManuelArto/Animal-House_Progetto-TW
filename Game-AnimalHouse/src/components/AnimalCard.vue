<script setup lang="ts">
import AnimalModal from '@/components/AnimalModal.vue'
import type { RandAnimal, Animal } from '@/model';

defineProps<{
	animal: RandAnimal | Animal,
    isRandAnimal: boolean
}>()

function getCustomText(animal: RandAnimal) {
	return `${animal.name} (in latino ${animal.latin_name}) è un ${animal.active_time} ${animal.animal_type} 
	che si può trovare in ${animal.geo_range} nell'habitat ${animal.habitat}.
	Ha una aspettativa di vita di ${animal.lifespan} anni, 
	un peso che varia da ${animal.weight_min}-${animal.weight_max}lbs
	e un'altezza che varia da ${animal.length_min}-${animal.length_max}ft.
	`
}

</script>

<template>
    <AnimalModal :animal='animal' :isRandAnimal="isRandAnimal" :getCustomText='getCustomText'/>

    <!-- RandAnimal card template -->
    <div class="animal-card p-3" v-if="isRandAnimal">
        <b-row :key="animal.id">
            <div class="col-3">
                <img width="370" height="100" :src="animal.image_link" class="rounded object-cover h-100 w-100 "
                    :alt="`${animal.name} image`">
            </div>
            <div class="col-md-8 col-7 px-1">
                <div class="row">
                    <div class="col-12">
                        <div class="animal-card-title mb-2"><strong> {{ animal.name }} </strong></div>
                    </div>
                    <div class="col-12">
                        <p class="text_18">{{ getCustomText(animal as RandAnimal) }}</p>
                    </div>
                    <div class="d-none d-md-block">
                        <b-button class="button_bottom" variant='primary' data-bs-toggle="modal" :data-bs-target="'#myAnimal' + animal.id"> 
                            Scopri di più 
                        </b-button>
                    </div>
                </div>
            </div>
            <div class="col-2 d-flex align-items-center d-md-none d-block ps-0">
                <b-button class="button_bottom_pet" data-bs-toggle="modal" :data-bs-target="'#myAnimal' + animal.id">
                    <i class="bi bi-arrow-right"></i>
                </b-button>
            </div>
        </b-row>
    </div>

    <!-- My Animal card template -->
    <div class="animal-card p-3" v-else>
        <b-row :key="animal.id">
            <div class="col-5">
                <img width="370" height="100" :src="animal.image_link" class="rounded object-cover h-100 w-100 "
                    :alt="`${animal.name} image`">
            </div>
            <div class="col-md-5 col-5 px-1">
                <div class="row">
                    <div class="col-12">
                        <div class="animal-card-title mb-2"><strong> {{ animal.name }} </strong></div>
                    </div>
                    <div class="col-12">
                        <p>
                            {{ "Specie: " + (animal as Animal).specie }} <br>
                            {{ "Razza: " + (animal as Animal).razza }}<br>
                            {{ "Nascita: " + (animal as Animal).birthday }} <br>
                            {{ "Sesso: " + (animal as Animal).gender }}<br>
                            {{ "Peso: " + (animal as Animal).weight }}<br>
                        </p>
                    </div>
                    <div class="d-none d-md-block">
                        <b-button class="button_bottom" variant='primary' data-bs-toggle="modal" :data-bs-target="'#myAnimal' + animal.id">
                            Scopri di più 
                        </b-button>
                    </div>
                </div>
            </div>
            <div class="col-2 d-flex align-items-center d-md-none d-block ps-0">
                <b-button class="button_bottom_pet" data-bs-toggle="modal" :data-bs-target="'#myAnimal' + animal.id">
                    <i class="bi bi-arrow-right"></i>
                </b-button>
            </div>
        </b-row>
    </div>

</template>

<style scoped>
.animal-card {
	background: #FFFFFF;
	box-shadow: 2px 2px 20px rgb(0 0 0 / 10%);
	border-radius: 4px;
	margin-top: 28px;
	margin-bottom: 28px;
}

.animal-card-title {
    margin-right: 10px;
    margin-bottom: 21px;
    font-size: 18px;
    color: #2140D8;
    font-weight: bold;
    font-size: 22px;
}

.object-cover {
	object-fit: cover !important;
}

@media screen and (max-width: 992px) {
	.text_18 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		font-size: 16px !important;
		font-weight: normal !important;
	}
}

.text_18 {
    font-size: 18px;
}

.button_bottom {
    font-weight: bold;
    font-size: 18px;
    background: #2140D8;
    color: #fff;
    border-radius: 10px;
    padding: 10px;
    border: 1px solid #2140D8;
}

.button_bottom_pet {
	background: #2140D8;
	border: #2140D8 1px solid;
	color: #fff;
	border-radius: 50%;
	width: 40px;
	font-size: 20px;
	height: 40px;
}

</style>