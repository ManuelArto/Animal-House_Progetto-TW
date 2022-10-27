<template>
  <div id="animals">
    <div class = "container">
      <h1 style="color:black; font-weight: bold; font-family: Georgia">Ecco i miei animali:</h1>
      <div id="accordion">
          <div class="card">
            <div class="card-header" id="headingOne">
              <h5 class="mb-0">
                <a class="btn btn-link" data-bs-toggle="collapse" href="#collapseOne" role="button" aria-expanded="false" aria-controls="collapseOne">
                  Aggiungi un animale
                </a>
              </h5>
            </div>
            <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
              <div class="card-body">

                <div class='signup-container'>
                      <div class='left-container'>
                        <h1>
                          <i class='fas fa-paw'></i>
                          AnimalHouse
                        </h1>
                        <div class='puppy'>
                          <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/38816/image-from-rawpixel-id-542207-jpeg.png'>
                        </div>
                      </div>
                      <div class='right-container'>
                        <header>
                          <h1>Yay, puppies! Ensure your pup gets the best care!</h1>
                          <div class='set'>
                            <div class='pets-name'>
                              <label for='pets-name'>Name</label>
                              <input id='pets-name' placeholder="Pet's name" type='text'>
                            </div>
                            <div class='pets-photo'>
                              <button id='pets-upload'>
                                <i class="bi bi-camera"></i>
                              </button>
                              <label for='pets-upload'>Upload a photo</label>
                            </div>
                          </div>
                          <div class='set'>
                            <div class='pets-breed'>
                              <label for='pets-breed'>Breed</label>
                              <input id='pets-breed' placeholder="Pet's breed" type='text'>
                            </div>
                            <div class='pets-birthday'>
                              <label for='pets-birthday'>Birthday</label>
                              <input id='pets-birthday' type='date'>
                            </div>
                          </div>
                          <div class='set'>
                            <div class='pets-gender'>
                              <label for='pet-gender-female'>Gender</label>
                              <div class='radio-container'>
                                <input id='pet-gender-female' name='pet-gender' type='radio' value='female' checked>
                                <label for='pet-gender-female'>Female</label>
                                <input id='pet-gender-male' name='pet-gender' type='radio' value='male'>
                                <label for='pet-gender-male'>Male</label>
                              </div>
                            </div>
                            <div class='pets-spayed-neutered'>
                              <label for='pet-spayed'>Spayed or Neutered</label>
                              <div class='radio-container'>
                                <input id='pet-spayed' name='spayed-neutered' type='radio' value='spayed' checked>
                                <label for='pet-spayed'>Spayed</label>
                                <input id='pet-neutered' name='spayed-neutered' type='radio' value='neutered'>
                                <label for='pet-neutered'>Neutered</label>
                              </div>
                            </div>
                          </div>
                          <div class='pets-weight'>
                            <label for='pet-weight-0-25'>Weight</label>
                            <div class='radio-container'>
                              <input id='pet-weight-0-25' name='pet-weight' type='radio' value='0-25' checked>
                              <label for='pet-weight-0-25'>0-10 kg</label>
                              <input id='pet-weight-25-50' name='pet-weight' type='radio' value='25-50'>
                              <label for='pet-weight-25-50'>10-25 kg</label>
                              <input id='pet-weight-50-100' name='pet-weight' type='radio' value='50-100'>
                              <label for='pet-weight-50-100'>25-50 kg</label>
                              <input id='pet-weight-100-plus' name='pet-weight' type='radio' value='100+'>
                              <label for='pet-weight-100-plus'>50+ kg</label>
                            </div>
                          </div>
                        </header>
                        <footer>
                          <div class='set'>
                            <button id='submit'>Submit</button>
                          </div>
                        </footer>
                  </div>
                </div>

              </div>  
            </div>
          </div>
      </div>
    </div>
  </div>
 
</template>

<style scoped>
  @import url("https://fonts.googleapis.com/css?family=Montserrat:400,600&display=swap");

  body {
    align-items: center;
    background: #d8aa96;
    color: rgba(0, 0, 0, 0.8);
    display: grid;
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    font-weight: 400;
    height: 100vh;
    justify-items: center;
    width: 100vh;
  }

  #animals{
    background-image: url("@/assets/sfondo_animali.jpg");
  }

  .signup-container {
    display: grid;
    grid-template-areas: "left right";
    max-width: 900px;
  }

  .left-container {
    background: #807182;
    overflow: hidden;
    padding: 40px 0 0 0;
    position: relative;
    text-align: center;
    width: 300px;
    height: 457px;
  }
  .left-container h1 {
    color: rgba(0, 0, 0, 0.8);
    display: inline-block;
    font-size: 24px;
  }
  .left-container h1 i {
    background: #f7b1ab;
    border-radius: 50%;
    color: #807182;
    font-size: 24px;
    margin-right: 5px;
    padding: 10px;
    transform: rotate(-45deg);
  }
  .left-container .puppy {
    bottom: -5px;
    position: absolute;
    text-align: center;
  }
  .left-container .puppy:before {
    background: #807182;
    content: "";
    height: 100%;
    left: 0;
    opacity: 0.4;
    position: absolute;
    width: 100%;
    z-index: 1;
  }
  .left-container img {
    filter: sepia(100%);
    width: 70%;
  }

  .right-container {
    background: #f9c7c2;
    display: grid;
    grid-template-areas: "." ".";
    width: 500px;
  }
  .right-container h1:nth-of-type(1) {
    color: rgba(0, 0, 0, 0.8);
    font-size: 28px;
    font-weight: 600;
  }
  .right-container .set {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }
  .right-container input {
    border: 1px solid rgba(0, 0, 0, 0.586);
    border-radius: 4px;
    height: 38px;
    line-height: 38px;
    padding-left: 5px;
  }
  .right-container input,
  .right-container label {
    color: rgba(0, 0, 0, 0.8);
  }
  .right-container header {
    padding: 40px;
  }
  .right-container label,
  .right-container input,
  .right-container .pets-photo {
    width: 176px;
  }
  .right-container .pets-photo {
    align-items: center;
    display: grid;
    grid-template-areas: ". .";
  }
  .right-container .pets-photo button {
    border: none;
    border-radius: 50%;
    height: 38px;
    margin-right: 10px;
    outline: none;
    width: 38px;
  }
  .right-container .pets-photo button i {
    color: rgba(0, 0, 0, 0.8);
    font-size: 16px;
  }
  .right-container .pets-weight .radio-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .right-container footer {
    align-items: center;
    background: #fff;
    display: grid;
    padding: 5px 40px;
  }
  .right-container footer button {
    border: 1px solid rgba(0, 0, 0, 0.2);
    height: 38px;
    line-height: 38px;
    width: 100px;
    border-radius: 19px;
    font-family: "Montserrat", sans-serif;
  }
  .right-container footer #submit {
    background: #807182;
    border: 1px solid transparent;
    transition: 0.2s all ease-in-out;
    color: #fff;
    position: relative;
    left: 350px;
  }
  .right-container footer #submit:hover {
    background: #171a2b;
  }

  .pets-name label,
  .pets-breed label,
  .pets-birthday label,
  .pets-gender label,
  .pets-spayed-neutered label,
  .pets-weight label {
    display: block;
    margin-bottom: 5px;
  }

  .radio-container {
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    display: inline-block;
    padding: 5px;
  }

  .radio-container label {
    background: transparent;
    border: 1px solid transparent;
    border-radius: 2px;
    display: inline-block;
    height: 26px;
    line-height: 26px;
    margin: 0;
    padding: 0;
    text-align: center;
    transition: 0.2s all ease-in-out;
    width: 80px;
  }

  .radio-container input[type=radio] {
    display: none;
  }
#animals{
  background-image: url("@/assets/sfondo_animali.jpg");
}
  .radio-container input[type=radio]:checked + label {
    background: #f7b1ab;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
</style>
