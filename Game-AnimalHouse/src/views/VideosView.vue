<script setup>
let changedLike = false;
let changedDisLike = false;
const videos = [
    { src: "https://www.youtube.com/embed/8LR6FbWD4MM", title: "Prova a non ridere", description: "Serie di video in cui i nostri animaletti ci fanno morire dal ridere durante le loro azioni quotidiane"},
    { src: "https://www.youtube.com/embed/a4P61RKrkJc", title: "Animali o supereroi?", description: "Possiamo ammirare il coraggio che hanno questi animali nel salvare delle persone."},
    { src: "https://www.youtube.com/embed/B6tGDtwh85U", title: "Cani e bimbi", description: "Possiamo osservare 10 razze di cane che vanno molto d'accordo con i nostri bimbi."},
    { src: "https://www.youtube.com/embed/uDzFpp715_0", title: "Cucciolotti", description: "Ecco una compilation di cuccioli meravigliosi"},
    { src: "https://www.youtube.com/embed/d4j8ibsjpBM", title: "Cani o nani", description: "In questo video osserveremo le 10 razze di cane più piccole."},
    { src: "https://www.youtube.com/embed/OYQllOzeT3s", title: "Animali vs Specchio", description: "Possiamo osservare la reazione dei nostri amici davanti ad uno specchio"},
    { src: "https://www.youtube.com/embed/OaQePr10CuA", title: "Compilation", description: "Serie di video in cui i nostri animaletti ci fanno morire dal ridere durante le loro azioni quotidiane"},
    { src: "https://www.youtube.com/embed/AwctIwpiz_E", title: "Animali enormi", description: "Troveremo gli esemplari di animali più grande del pianeta"},
    { src: "https://www.youtube.com/embed/YrByaqDxzxQ", title: "Amore e odio", description: "Sappiamo tutti che tra cane e gatto c'è un rapporto speciale, fatto di amore ma anche di odio"},
    { src: "https://www.youtube.com/embed/Znd3AJI2kt0", title: "Animali o calciatori", description: "Possiamo vedere alcune scene buffe in cui gli animali chiedono autografi ai calciatori"},
    { src: "https://www.youtube.com/embed/JhaXTd8DKJk", title: "I cani e l'acqua", description: "Sappiamo che ci sono molti cani che adorano l'acqua, ma anche tanti che la odiano. Osserviamone alcuni."},
    { src: "https://www.youtube.com/embed/YbAU0YI4kV4", title: "Expo 2016", description: "Possiamo osservare i nostri amici a quattro zampe all'Expo che si è svolto a Milano nel 2016"}
]   
function myLike(x) {
    if (!changedLike && !changedDisLike) {
        document.getElementById("like" + x).style.color = "green";
        changedLike = true;
    } else if (!changedLike && changedDisLike) {
        document.getElementById("like" + x).style.color = "green";
        document.getElementById("dislike" + x).style.color = "grey";
        changedLike = true;
        changedDisLike = false;
    } else {
        document.getElementById("like" + x).style.color = "grey";
        changedLike = false;
    }
}
function myDisLike(x) {
    if (!changedDisLike && !changedLike) {
        document.getElementById("dislike" + x).style.color = "red";
        changedDisLike = true;
    } else if (!changedDisLike && changedLike) {
        document.getElementById("dislike" + x).style.color = "red";
        document.getElementById("like" + x).style.color = "grey";
        changedDisLike = true;
        changedLike = false;
    } else {
        document.getElementById("dislike" + x).style.color = "grey";
        changedDisLike = false;
    }
}

function share(x){
    let content = document.getElementById("link" + x);
    navigator.clipboard.writeText(content.value);
}
</script>

<template>
    <b-container id="animation" class="position-static">
        <h1 id="title" class="fw-bold p-3 m-auto text-center">Video buffi</h1>
        <b-row>
            <b-col class="d-flex justify-content-center" v-for="(video, index) in videos">
                <div class="animal-video p-2" id="animation">
                    <div class="animal-video-title mb-2"><strong> {{ video.title }} </strong></div>
                    <div class="vid">
                        <iframe :src="video.src" style="width:100%; height:250px;border-radius: 10px;" allowfullscreen></iframe>
                    </div>
                    <b-row class="d-flex justify-content-between text-center">
                        <b-col>
                            <b-button id="btn" @click="myLike(index)">
                                <i :id="'like' + index" class="bi bi-hand-thumbs-up-fill"></i>
                            </b-button>
                        </b-col>
                        <b-col>
                            <b-button id="btn" @click="myDisLike(index)">
                                <i :id="'dislike' + index" class="bi bi-hand-thumbs-down-fill"></i>
                            </b-button>
                        </b-col>
                        <b-col>
                            <textarea :id="'link' + index" hidden>{{video.src}}</textarea>
                            <b-button id="btn" @click="share(index)" data-bs-toggle="modal" data-bs-target="#notify">
                                <i id="share" class="bi bi-share-fill"></i>
                            </b-button>
                        </b-col>
                    </b-row>
                    <b-row>
                        <div class="col-12">
                            <div class="text_18"> {{ video.description }} </div>
                        </div>
                    </b-row>
                </div>
                <br>
            </b-col>
        </b-row>
    </b-container>

    <div class="modal fade" id="notify" tabindex="-1" role="dialog" aria-labelledby="notify" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <i class="bi bi-check-circle" style="color:green;"></i>
                    <h5 class="modal-title" >
                        Link copiato negli appunti</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#title {
    font-size: 60px;
    padding: 50px;
    color: #2f4eec;
    animation: fadeIn 0.5s ease-in both;
}

#animation {
    animation: fadeIn 0.5s ease-in both;
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

.bi {
    color: darkgrey;
    font-size: 35px;
    cursor: pointer;
    user-select: none;
}

.bi:hover {
    color: darkblue;
}

#btn {
    background-color: transparent;
    border: none;
}

.vid {
    position:relative;
    transition:all 0.4s ease 0s;
    display:block;
}

@media screen and (min-width: 564px) {
    .vid :hover{
        transition:all 0.4s ease 0s;
        transform:scale(1.3);
        z-index:2;
    }
}
.animal-video{
    background: white;
	box-shadow: 2px 2px 20px rgb(0 0 0 / 10%);
	border-radius: 10px;
	margin-top: 10px;
	margin-bottom: 10px;
    width: 26rem;
    height: 32rem;
}

.animal-video-title {
    margin-bottom: 21px;
    font-size: 18px;
    color: #000000;
    font-weight: bold;
    font-size: 30px;
    font-family:cursive;
    text-align: center;
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

.text_18 {
    margin-left:20px;
    margin-right: 10px;
    font-size: 22px;
}

</style>