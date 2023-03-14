<template>
    <b-container fluid class="shadow-lg py-3" style="background-color: #2140D8">
        <b-row class="g-3">
            <div class="col-12 col-md-6 col-lg-4">
                <div class="footer_head">
                    Informazioni
                </div>
                <b-row>
                    <b-col>
                        <ul class="footer_list p-2">
                            <li class="my-2"><a href="" class="text-underline-hover">Chi siamo</a></li>
                            <li class="my-2"><a href="" class="text-underline-hover">Redazione</a></li>
                        </ul>                    
                    </b-col>
                    <b-col>
                        <ul class="footer_list p-2">
                            <li class="my-2"><a href="" class="text-underline-hover">Contatti</a></li>
                            <li class="my-2"><a href="" class="text-underline-hover">Comitato scientifico</a></li>
                        </ul>                    
                    </b-col>
                </b-row>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
                <div class="footer_head">
                    In collaborazione con
                </div>
                <b-row>
                    <div class="col-4 d-flex align-items-center justify-content-center">
                        <a href="" class="text-underline-hover">
                            <img src="https://upload.wikimedia.org/wikipedia/it/8/89/WWF_logo.png" alt="" width="60">
                        </a>
                    </div>
                    <div class="col-4 d-flex align-items-center justify-content-center">
                        <a href="" class="text-underline-hover">
                            <img src="https://www.zampando.com/pub/media/logo/default/logo@2x.jpg" alt="" width="150">
                        </a>
                    </div>
                    <div class="col-4 d-flex align-items-center justify-content-center">
                        <a href="" class="text-underline-hover">
                            <img src="https://www.lamaisondejolie.it/wp-content/uploads/2021/12/logo-1.png" alt="" width="90">
                        </a>
                    </div>                 
                </b-row>
            </div>
            <div class="col-12 col-md-6 col-lg-4 fill-col">
                <div class="footer_head">
                    L'azienda
                </div>
                <div class="address text-light my-2 ps-2">
                    AnimalHouse S.r.l <br>
                    Sede legale ed operativa: Via Enrico Mattei, 21 <br>
                    40010 (BO) <br>
                    P.Iva/ C.f. 34871649830 <br>
                </div>
                <div class="term_and_condition text-light my-2 ps-2">
                    Copyright © 2022 - Tutti i diritti riservati
                </div>
                <div class="term_and_condition text-light my-2 ps-2">
                    <a href="">Termini e condizioni</a> | <a href="">Privacy</a> e <a href="">Cookie Policy</a>
                </div>
            </div>
        </b-row>
    </b-container>
</template>

<style scoped>
a {
    text-decoration: none;
    color: white !important;
}

.footer_head {
    font-weight: 700;
    font-size: 20px;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    letter-spacing: 0.1px;
    color: #ffffff;
    border-bottom: 1px solid #ffffff;
}

ul {
    list-style-type:none;
}

.footer_list li a {
    font-weight: bold;
}

@media screen and (max-width: 992px) {
    .fill-col {
        width: 100%;
    }
}

.address {
    font-weight: 700;
    font-size:11px;
    line-height: 21px;
}

.term_and_condition {
    font-weight: 700;
    font-size: 11px;
}

.text-underline-hover {
    text-decoration: none;
}

.text-underline-hover:hover {
    text-decoration: underline;
}

</style>