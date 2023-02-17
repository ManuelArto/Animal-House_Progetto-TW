<script setup lang="ts">
import { onMounted } from 'vue';
// @ts-ignore
import { Modal } from 'bootstrap'
import AnimalModal from '@/components/AnimalModal.vue'
import { removeAnimal } from '@/store'
import type { RandAnimal, Animal } from '@/model';

const props = defineProps<{
	animal: RandAnimal | Animal,
    isRandAnimal: boolean
}>()

var modal: Modal
onMounted(() => {
	modal = new Modal(document.getElementById(`confirmRemove${props.animal.name}`) as Element)
})

function confirmRemove(id: string) {
    modal.hide()
    removeAnimal(id)
}

function getCustomText(animal: RandAnimal) {
	return `${animal.name} (in latino ${animal.latin_name}) è un ${animal.active_time} ${animal.animal_type} 
	che si può trovare in ${animal.geo_range} nell'habitat ${animal.habitat}.
	Ha una aspettativa di vita di ${animal.lifespan}, 
	un peso che varia da ${animal.weight_min}-${animal.weight_max}kg
	e un'altezza che varia da ${animal.length_min}-${animal.length_max}m.
	`
}

</script>

<template>
    <AnimalModal :animal='animal' :isRandAnimal="isRandAnimal" :getCustomText='getCustomText'/>

    <div :class="`animal-card ${isRandAnimal ? 'flexible-card': ''} p-3 mx-auto`">
        <b-row :key="animal.id">
            <b-col class="col-md-6 col-5">
                <img :src="animal.image_link" class="rounded object-cover w-100 h-100"
                    :alt="`${animal.name} image`">
            </b-col>
            <b-col class="col-md-6 col-5 px-1">
                <b-row>
                    <div class="col-12">
                        <div class="animal-card-title mb-2"><strong> {{ animal.name }} </strong></div>
                    </div>
                    <div class="col-12">
                        <p v-if="isRandAnimal" class="text_18">{{ getCustomText(animal as RandAnimal) }}</p>
                        <p v-else class="text_my_animal">
                            <b>Specie: </b> {{ (animal as Animal).specie }} <br>
                            <b>Razza: </b> {{ (animal as Animal).razza }}<br>
                            <b>Nascita: </b> {{ (animal as Animal).birthday }} <br>
                            <b>Sesso: </b> {{ (animal as Animal).gender }}<br>
                            <b>Peso: </b> {{ (animal as Animal).weight }}<br>
                        </p>
                    </div>
                    <div class="d-none d-md-block">
                        <b-button class="button_bottom" variant='primary' data-bs-toggle="modal" :data-bs-target="'#myAnimal' + animal.id"> 
                            Scopri di più 
                        </b-button>
                    </div>
                </b-row>
            </b-col>
            <div class="col-2 d-flex align-items-center d-md-none d-block ps-0">
            <b-button class="button_bottom_pet" data-bs-toggle="modal" :data-bs-target="'#myAnimal' + animal.id">
                    <i class="bi bi-arrow-right"></i>
                </b-button>
            </div>
        </b-row>
        <b-button v-if="!isRandAnimal" size="sm" variant="danger" class="rounded-pill position-absolute top-0 end-0 me-2 mt-2" data-bs-toggle="modal" :data-bs-target="`#confirmRemove${animal.name}`">
            <i class="bi bi-x-lg"></i>
        </b-button>
    </div>

    <div ref="modal" :id="`confirmRemove${animal.name}`" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-sm" role="document">
			<div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel">Confirm delete</h4>
                    <b-button ref="closeButton" variant="danger" data-bs-dismiss="modal" aria-label="Close"> <i class="bi bi-x-circle-fill"></i>
                    </b-button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to delete <b>{{ animal.name }}</b>?</p>
                </div>
                <div class="modal-footer">
                    <b-button data-bs-dismiss="modal">Annulla</b-button>
                    <b-button variant="danger" @click="confirmRemove(animal.id as string)">Delete</b-button>
                </div>
            </div>
        </div>
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

.flexible-card {
    max-width: 60%;
}

@media screen and (max-width: 768px) {
    .flexible-card {
        max-width: 100%;
    }
}

.object-cover {
	object-fit: cover !important;
	/* object-fit: cover !important; */
}

@media screen and (max-width: 992px) {
	.text_18 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 5;
		line-clamp: 5;
		-webkit-box-orient: vertical;
		font-size: 16px !important;
		font-weight: normal !important;
	}
}

.text_my_animal {
    font-size: 18px;
}

img {
    max-height: 350px;
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