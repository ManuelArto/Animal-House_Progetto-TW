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
        document.getElementById("like" + x).style.color = "red";
        changedLike = true;
    } else if (!changedLike && changedDisLike) {
        document.getElementById("like" + x).style.color = "red";
        document.getElementById("dislike" + x).style.color = "black";
        changedLike = true;
        changedDisLike = false;
    } else {
        document.getElementById("like" + x).style.color = "black";
        changedLike = false;
    }
}
function myDisLike(x) {
    if (!changedDisLike && !changedLike) {
        document.getElementById("dislike" + x).style.color = "red";
        changedDisLike = true;
    } else if (!changedDisLike && changedLike) {
        document.getElementById("dislike" + x).style.color = "red";
        document.getElementById("like" + x).style.color = "black";
        changedDisLike = true;
        changedLike = false;
    } else {
        document.getElementById("dislike" + x).style.color = "black";
        changedDisLike = false;
    }
}
</script>

<style scoped>
#video {
    background-image: url("@/assets/sfondo_video.jpg");
}

.bi {
    color: black;
    font-size: 35px;
    cursor: pointer;
    user-select: none;
}

.bi:hover {
    color: darkblue;
}

#btn {
    background-color: #EFEFEF;
}
</style>

<template>
    <div id="video">
        <b-container>
            <h1>Video di animali</h1>
            <b-row>
                <b-col v-for="video in videos">
                    <b-card :title="video.title" style="width: 19rem;">
                        <iframe :src="video.src" style="width:100%; height:100%;" allowfullscreen></iframe>
                        <b-card-text>
                            {{ video.description }}
                        </b-card-text>
                        <b-button id="btn" @click="myLike(video.index)">
                            <i :id="'like' + video.index" class="bi bi-hand-thumbs-up-fill"></i>
                        </b-button>
                        <b-button id="btn" @click="myDisLike(video.index)">
                            <i :id="'dislike' + video.index" class="bi bi-hand-thumbs-down-fill"></i>
                        </b-button>
                    </b-card>
                    <br>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
