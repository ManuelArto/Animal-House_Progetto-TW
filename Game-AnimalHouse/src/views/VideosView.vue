<script setup>
let changedLike = false;
let changedDisLike = false;
const videos = [
    { src: "https://www.youtube.com/embed/bTcXkLlGFeQ?controls=0", title: "Compilation", description: "Serie di video in cui i nostri animaletti ci fanno morire dal ridere durante le loro azioni quotidiane", index: 1 },
    { src: "https://www.youtube.com/embed/OaQePr10CuA?start=8&controls=0", title: "Compilation", description: "Serie di video in cui i nostri animaletti ci fanno morire dal ridere durante le loro azioni quotidiane", index: 2 },
    { src: "https://www.youtube.com/embed/a4P61RKrkJc?start=15&controls=0", title: "Animali o supereroi?", description: "Possiamo ammirare il coraggio che hanno questi animali nel salvare delle persone.", index: 3 },
    { src: "https://www.youtube.com/embed/B6tGDtwh85U?start=15&controls=0", title: "Cani e bimbi", description: "Possiamo osservare 10 razze di cane che vanno molto d'accordo con i nostri bimbi.", index: 4 },
    { src: "https://www.youtube.com/embed/uDzFpp715_0?start=15&controls=0", title: "Cucciolotti", description: "Ecco una compilation di cuccioli meravigliosi", index: 5 },
    { src: "https://www.youtube.com/embed/d4j8ibsjpBM?controls=0", title: "Cani o nani", description: "In questo video osserveremo le 10 razze di cane più piccole.", index: 6 },
    { src: "https://www.youtube.com/embed/OYQllOzeT3s&controls=0", title: "Animali vs Specchio", description: "Possiamo osservare la reazione dei nostri amici davanti ad uno specchio", index: 7 },
    { src: "https://www.youtube.com/embed/AwctIwpiz_E&controls=0", title: "Animali enormi", description: "Troveremo gli esemplari di animali più grande del pianeta", index: 8 },
    { src: "https://www.youtube.com/embed/ewbARWUttFw&controls=0", title: "Amore e odio", description: "Sappiamo tutti che tra cane e gatto c'è un rapporto speciale, fatto di amore ma anche di odio", index: 9 },
    { src: "https://www.youtube.com/embed/Znd3AJI2kt0&controls=0", title: "Animali o calciatori", description: "Possiamo vedere alcune scene buffe in cui gli animali chiedono autografi ai calciatori", index: 10 },
    { src: "https://www.youtube.com/embed/JhaXTd8DKJk=cotrols=0", title: "I cani e l'acqua", description: "Sappiamo che ci sono molti cani che adorano l'acqua, ma anche tanti che la odiano. Osserviamone alcuni.", index: 11 },
    { src: "https://www.youtube.com/embed/YbAU0YI4kV4&controls=0", title: "Expo 2016", description: "Possiamo osservare i nostri amici a quattro zampe all'Expo che si è svolto a Milano nel 2016", index: 12 }
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
    <b-container>
        <h1 id="title" class="fw-bold m-auto text-center">Video buffi</h1>
        <div id="body">
            <b-row>
                <b-col v-for="video in videos">
                    <div class="animal-video">
                        <b-row>
                            <div class="col-12">
                                <div class="animal-video-title mb-2"><strong> {{ video.title }} </strong></div>
                            </div>
                        </b-row>
                        <b-row>
                            <div class="vid">
                                <iframe :src="video.src" style="width:100%; height:250px;border-radius: 10px;" allowfullscreen></iframe>
                            </div>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-button id="btn" @click="myLike(video.index)">
                                    <i :id="'like' + video.index" class="bi bi-hand-thumbs-up-fill"></i>
                                </b-button>
                            </b-col>
                            <b-col>
                                <b-button id="btn" @click="myDisLike(video.index)">
                                    <i :id="'dislike' + video.index" class="bi bi-hand-thumbs-down-fill"></i>
                                </b-button>
                            </b-col>
                            <b-col>
                                <textarea :id="'link' + video.index" hidden>{{video.src}}</textarea>
                                <b-button id="btn" @click="share(video.index)" data-bs-toggle="modal" data-bs-target="#notify">
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
        </div>
    </b-container>

    <div class="modal fade" id="notify" tabindex="-1" role="dialog" aria-labelledby="notify" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header" id="alert">
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
    color: #2f4eec;
    animation: zoom 0.5s ease-in both;
}

#body {
    animation: zoom 0.5s ease-in both;
    
}

@keyframes zoom {
	from {
		transform: scale(1.5);
	}
	to {
		transform: scale(1);
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

.vid :hover{
    transition:all 0.4s ease 0s;
    transform:scale(1.3);
    z-index:2;
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

#alert {
    background-color: lightgreen;
}
</style>