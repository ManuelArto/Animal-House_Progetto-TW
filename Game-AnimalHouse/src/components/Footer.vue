<template>
    <div class="col-12 footer">
        <div class="container-fluid">
            <div class="row">
                <div class="col-4">
                    <div class="footer_head">
                        Informazioni
                    </div>
                    <div class="row">
                        <div class="col-6 footer_pdng_info">
                            <ul id="menu-footer-1" class="footer_list"><li id="menu-item-4455" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-4455"><a href="https://www.petme.it/chi-siamo/">Chi siamo</a></li>
                                <li id="menu-item-4460" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-4460"><a href="https://www.petme.it/redazione/">Redazione</a></li>
                            </ul>                    
                        </div>
                        <div class="col-6 footer_pdng_info">
                            <ul id="menu-footer-2" class="footer_list"><li id="menu-item-4459" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-4459"><a href="https://www.petme.it/contatti/">Contatti</a></li>
                                <li id="menu-item-4470" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-4470"><a href="https://www.petme.it/comitato-scientifico/">Comitato scientifico</a></li>
                            </ul>                    
                        </div>
                        <a href="https://www.facebook.com/petme.it" class="fa fa-facebook"></a>
                        <a href="https://www.instagram.com/petme.it/" class="fa fa-instagram"></a>
                    </div>
                </div>
                <div class="col-4">
                    <div class="footer_head">
                        In collaborazione con
                    </div>
                    <div class="row">
                        <div class="col-4 d-flex align-items-center">
                            <div class="prtnr_img">
                                <a href="https://www.zampando.com/">
                                    <img src="https://www.petme.it/wp-content/uploads/2022/04/Zampando_bianco_1.png" alt="" width="150">
                                </a>
                            </div>
                        </div>
                        <div class="col-4 d-flex align-items-center">
                            <div class="prtnr_img">
                                <a href="https://www.corsicef.it/">
                                    <img src="https://www.petme.it/wp-content/uploads/2022/04/cef_bianco_1.png" alt="" width="100">
                                </a>
                            </div>
                        </div>
                        <div class="col-4 d-flex align-items-center">
                            <div class="prtnr_img">
                                <a href="https://www.interlinea.com">
                                    <img src="https://www.petme.it/wp-content/uploads/2022/04/inter.png" alt="" width="100">
                                </a>
                            </div>
                        </div>                 
                    </div>
                </div>
                <div class="col-4">
                    <div class="footer_head">
                        L’azienda
                    </div>
                    <div class="address">
                        Petme S.r.l <br>
                        Sede legale ed operativa: Via Enrico Mattei, 21 <br>
                        28100 Novara (NO) <br>
                        P.Iva/ C.f. 08701920962 <br>
                        C.S 72.548,00 € i.v <br>
                        REA NO.244389                    
                    </div>
                    <div class="term_and_condition">
                        Copyright © 2022 - Tutti i diritti riservati
                    </div>
                    <div class="term_and_condition">
                        <a href="https://www.petme.it/termini-e-condizioni/">Termini e condizioni</a> | <a href="https://www.petme.it/privacy-policy/">Privacy</a> e <a href="https://www.iubenda.com/privacy-policy/76992894">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.footer {
    box-shadow: 2px 2px 20px rgb(0 0 0 / 10%);
    padding-top: 40px;
    padding-bottom: 20px;
    background-color: #2140D8;
}

.col-12 {
    flex: 0 0 100%;
    max-width: 100%;
}

*, ::after, ::before {
    box-sizing: border-box;
}

.footer_head {
    font-weight: 700;
    font-size: 20px;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    letter-spacing: 0.1px;
    color: #ffffff;
    padding-left: 15px;
    margin-bottom: 22px;
    border-bottom: 1px solid #ffffff;
    margin-left: 15px;
    padding-left: 0;
}

.prtnr_img {
    display: flex;
    align-items: center;
    justify-content: center;
}
.address {
    padding: 0 15px;
    font-weight: 700;
    font-size:11px;
    line-height: 21px;
    margin-top: 10px;
    color: #ffffff;
}

.term_and_condition {
    padding: 0 15px;
    font-weight: 700;
    font-size: 11px;
    color: #FFFFFF;
    margin-top: 17px;
}

.footer a, .footer a:hover, .footer a:active, .footer a:visited {
    text-decoration: none;
    color: white !important;
}

.footer_list li a {
    font-size: 14px;
    font-weight: bold;
}

ul {
    list-style-type:none;
}
.fa {
    padding: 10px;
    font-size: 25px;
    width: 25px;
    text-align: center;
    text-decoration: none;
}

.fa:hover {
    opacity: 0.7;
}
.fa-facebook, .fa-instagram {
    background: #2140D8;;
    color: white;
}

</style>