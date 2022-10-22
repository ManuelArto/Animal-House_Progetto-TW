<template>
    <div id="video">
        <div class="container">
            <h1 style="color:black; font-weight: bold; font-family: Georgia">Video di animali</h1>
            <div class="row">
                <div class="col">
                    <div class="card" style="width: 19rem;">
                        <iframe width="303" height="200"
                            src="https://www.youtube.com/embed/bTcXkLlGFeQ?modestbranding=1&autohide=1&showinfo=0&controls=0"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                        <div class="card-body">
                            <h5 class="card-title">Compilation</h5>
                            <p class="card-text">Serie di video in cui i nostri animaletti ci fanno morire dal ridere
                            </p>
                            <!--LIKE AND UNLIKE-->
                            <button @click="myLike(1)"><i id="like1" class="fa fa-thumbs-up"></i></button>
                            <button @click="myDisLike(1)"><i id="dislike1" class="fa fa-thumbs-down"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card" style="width: 19rem;">
                        <iframe width="303" height="200"
                            src="https://www.youtube.com/embed/OaQePr10CuA?start=8&controls=0" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                        <div class="card-body">
                            <h5 class="card-title">Compilation</h5>
                            <p class="card-text">Serie di video in cui i nostri animaletti ci fanno morire dal ridere
                            </p>
                            <!--LIKE AND UNLIKE-->
                            <button @click="myLike(2)"><i id="like2" class="fa fa-thumbs-up"></i></button>
                            <button @click="myDisLike(2)"><i id="dislike2" class="fa fa-thumbs-down"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card" style="width: 19rem;">
                        <iframe width="303" height="200"
                            src="https://www.youtube.com/embed/a4P61RKrkJc?start=15&controls=0" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                        <div class="card-body">
                            <h5 class="card-title">Animali o supereroi?</h5>
                            <p class="card-text">Possiamo ammirare il coraggio che hanno questi animali nel salvare
                                delle persone.</p>
                            <!--LIKE AND UNLIKE-->
                            <button @click="myLike(3)"><i id="like3" class="fa fa-thumbs-up"></i></button>
                            <button @click="myDisLike(3)"><i id="dislike3" class="fa fa-thumbs-down"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card" style="width: 19rem;">
                        <iframe width="303" height="200 "
                            src="https://www.youtube.com/embed/B6tGDtwh85U?start=15&controls=0" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                        <div class="card-body">
                            <h5 class="card-title">Cani e bimbi</h5>
                            <p class="card-text">Possiamo osservare 10 razze di cane che vanno molto d'accordo con i
                                nostri bimbi.</p>
                            <!--LIKE AND UNLIKE-->
                            <button @click="myLike(4)"><i id="like4" class="fa fa-thumbs-up"></i></button>
                            <button @click="myDisLike(4)"><i id="dislike4" class="fa fa-thumbs-down"></i></button>
                        </div>
                    </div>
                </div>
            </div><br>



            <div class="row">
                <div class="col">
                    <div class="card" style="width: 19rem;">
                        <iframe width="303" height="200"
                            src="https://www.youtube.com/embed/uDzFpp715_0?start=15&controls=0" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                        <div class="card-body">
                            <h5 class="card-title">Cucciolotti</h5>
                            <p class="card-text">Ecco una compilation di cuccioli meravigliosi</p>
                            <!--LIKE AND UNLIKE-->
                            <button @click="myLike(5)"><i id="like5" class="fa fa-thumbs-up"></i></button>
                            <button @click="myDisLike(5)"><i id="dislike5" class="fa fa-thumbs-down"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card" style="width: 19rem;">
                        <iframe width="303" height="200" src="https://www.youtube.com/embed/d4j8ibsjpBM?controls=0"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                        <div class="card-body">
                            <h5 class="card-title">Cani o nani</h5>
                            <p class="card-text">In questo video osserveremo le 10 razze di cane più piccole.</p>
                            <!--LIKE AND UNLIKE-->
                            <button @click="myLike(6)"><i id="like6" class="fa fa-thumbs-up"></i></button>
                            <button @click="myDisLike(6)"><i id="dislike6" class="fa fa-thumbs-down"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card" style="width: 19rem;">
                        <iframe width="303" height="200" src="https://www.youtube.com/embed/OYQllOzeT3s&controls=0"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                        <div class="card-body">
                            <h5 class="card-title">Animali vs Specchio</h5>
                            <p class="card-text">Possiamo osservare la reazione dei nostri amici davanti ad uno specchio
                            </p>
                            <!--LIKE AND UNLIKE-->
                            <button @click="myLike(7)"><i id="like7" class="fa fa-thumbs-up"></i></button>
                            <button @click="myDisLike(7)"><i id="dislike7" class="fa fa-thumbs-down"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card" style="width: 19rem;">
                        <iframe width="303" height="200" src="https://www.youtube.com/embed/AwctIwpiz_E"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                        <div class="card-body">
                            <h5 class="card-title">Animali enormi</h5>
                            <p class="card-text">Troveremo gli esemplari di animali più grande del pianeta</p>
                            <!--LIKE AND UNLIKE-->
                            <button @click="myLike(8)"><i id="like8" class="fa fa-thumbs-up"></i></button>
                            <button @click="myDisLike(8)"><i id="dislike8" class="fa fa-thumbs-down"></i></button>
                        </div>
                    </div>
                </div>
            </div><br>



            <div class="row">
                <div class="col">
                    <div class="card" style="width: 19rem;">
                        <iframe width="303" height="200" src="https://www.youtube.com/embed/ewbARWUttFw&controls=0"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                        <div class="card-body">
                            <h5 class="card-title">Amore e odio</h5>
                            <p class="card-text">Sappiamo tutti che tra cane e gatto c'è un rapporto speciale, fatto di
                                amore ma anche di odio</p>
                            <!--LIKE AND UNLIKE-->
                            <button @click="myLike(9)"><i id="like9" class="fa fa-thumbs-up"></i></button>
                            <button @click="myDisLike(9)"><i id="dislike9" class="fa fa-thumbs-down"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card" style="width: 19rem;">
                        <iframe width="303" height="203" src="https://www.youtube.com/embed/Znd3AJI2kt0&controls=0"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                        <div class="card-body">
                            <h5 class="card-title">Animali ma anche calciatori</h5>
                            <p class="card-text">Possiamo vedere alcune scene buffe in cui gli animali chiedono
                                autografi ai calciatori</p>
                            <!--LIKE AND UNLIKE-->
                            <button @click="myLike(10)"><i id="like10" class="fa fa-thumbs-up"></i></button>
                            <button @click="myDisLike(10)"><i id="dislike10" class="fa fa-thumbs-down"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card" style="width: 19rem;">
                        <iframe width="303" height="200" src="https://www.youtube.com/embed/JhaXTd8DKJk=cotrols=0"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                        <div class="card-body">
                            <h5 class="card-title">I cani e l'acqua</h5>
                            <p class="card-text">Sappiamo che ci sono molti cani che adorano l'acqua, ma anche tanti che
                                la odiano. Osserviamone alcuni.</p>
                            <!--LIKE AND UNLIKE-->
                            <button @click="myLike(11)"><i id="like11" class="fa fa-thumbs-up"></i></button>
                            <button @click="myDisLike(11)"><i id="dislike11" class="fa fa-thumbs-down"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card" style="width: 19rem;">
                        <iframe width="303" height="200" src="https://www.youtube.com/embed/YbAU0YI4kV4&controls=0"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                        <div class="card-body">
                            <h5 class="card-title">Expo 2016</h5>
                            <p class="card-text">Possiamo osservare i nostri amici a quattro zampe all'Expo che si è
                                svolto a Milano nel 2016</p>
                            <!--LIKE AND UNLIKE-->
                            <button @click="myLike(12)"><i id="like12" class="fa fa-thumbs-up"></i></button>
                            <button @click="myDisLike(12)"><i id="dislike12" class="fa fa-thumbs-down"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
let changedLike = false;
let changedDisLike = false;
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

.fa {
    font-size: 35px;
    cursor: pointer;
    user-select: none;
}

.fa:hover {
    color: darkblue;
}
</style>