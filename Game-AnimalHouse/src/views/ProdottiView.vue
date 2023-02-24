<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Product } from '@/model/';
import { ENDPOINT } from '@/utils/const';

let products = ref<Product[]>([
  
])

async function fetchProducts(number: number) {
  let res
  if (res = await fetch(ENDPOINT.PRODUCTS_RAND_LIST(number)).catch(error => alert(`Error<br>${error}`))) {
    const data = await res.json()

    if (data.error) {
      alert(`${data.error.type}<br>${data.error.message}`)
    } else {
      return data
    }
  } else
    return []
}

function* getNProducts(n: number) {
	for (let i = 0; i < products.value.length; i += 3) {
    let buffer: Product[] = []
    for (let j = i; j < i+n && j < products.value.length; j++)
      buffer.push(products.value[j])
		yield buffer
	}
}

onMounted(async () => products.value = await fetchProducts(12) )

</script>

<template>
  <div id="animation">
    <section class="pt-5 pb-5">
      <div class="container">
        <div class="row">
          <div class="col-6">
            <p class="mb-3 fs-1 fw-bold" style="font-family: 'Times New Roman', Times, serif;">Alcuni dei nostri prodotti</p>
          </div>
          <div class="col-6 d-flex flex-row-reverse align-items-center ">
            <a class="btn btn-primary mb-3 ms-2 d-block d-sm-inline" href="#carouselExampleIndicators2" role="button" data-bs-slide="next">
              <i class="fa fa-arrow-right"></i>
            </a>  
            <a class="btn btn-primary mb-3 d-block d-sm-inline" href="#carouselExampleIndicators2" role="button" data-bs-slide="prev">
              <i class="fa fa-arrow-left"></i>
            </a>
          </div>
          <div class="col-12">
            <div id="carouselExampleIndicators2" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                <div v-for="(n_products, index) in getNProducts(3)" :class="{'carousel-item':true, 'active': index === 0 }">
                  <div class="row">
                    <div v-for="product in n_products" class="col-md-4 mb-3" :key="product.id">
                      <div class="card h-100" style="width:100%;">
                        <img :src="product.imageURI" class="rounded" :alt="product.name" >
                        <div class="card-body d-flex align-content-between flex-wrap">
                          <div>
                            <h4 class="card-title fs-3">{{ product.name }}</h4>
                            <p class="card-text fs-5">{{ product.description }}</p>
                          </div>
                          <a class="fs-5 mt-2 ms-auto btn btn-primary" :href="ENDPOINT.FRONT_OFFICE_PRODOTTI" target="_blank">Altri prodotti qui <i class="bi bi-arrow-right-circle"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
  
<style scoped>

img {
		height: 300px;
		object-fit: scale-down !important;
}

.card {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

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
</style>