<script setup lang="ts">
import { onMounted } from 'vue';
import type { Product } from '@/model/';
import { ENDPOINT } from '@/utils/const';

let products: Product[] = [
    {
      id: '1',
      imageURI: 'https://static.naturaltrainer.com/catalog/8015699006990/3d-Pack/mediumImage',
      name: 'Natural Trainer',
      description: 'Cibo per cani natural trainer. Ai gusti carne e riso bianco per puppy',
      category: "",
      price: 10,
      quantity: 10,
      rating: 4
    },
    {
      id: '2',
      imageURI: 'https://www.canibo.it/wp-content/uploads/2018/10/pallina-retata-per-cani.jpg',
      name: 'Special title treatment 2',
      description: 'With supporting text below as a natural lead-in to additional content.',
      category: "",
      price: 10,
      quantity: 10,
      rating: 4
    },
    {
      id: '3',
      imageURI: 'https://croci.net/wp-content/uploads/2020/06/Lettiera_gatti_agglomerante.jpg',
      name: 'Special title treatment 3',
      description: 'With supporting text below as a natural lead-in to additional content.',
      category: "",
      price: 10,
      quantity: 10,
      rating: 4
    },
    {
      id: '4',
      imageURI: 'https://m.media-amazon.com/images/I/71-tsDiw8iL._AC_SY355_.jpg',
      name: 'Special title treatment 4',
      description: 'With supporting text below as a natural lead-in to additional content.',
      category: "",
      price: 10,
      quantity: 10,
      rating: 4
    },
    {
      id: '5',
      imageURI: 'https://m.media-amazon.com/images/I/81BGCfKSPHL._AC_SX425_.jpg',
      name: 'Special title treatment 5',
      description: 'With supporting text below as a natural lead-in to additional content.',
      category: "",
      price: 10,
      quantity: 10,
      rating: 4
    },
    {
      id: '6',
      imageURI: 'https://images.unsplash.com/photo-1532781914607-2031eca2f00d?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=7c625ea379640da3ef2e24f20df7ce8d',
      name: 'Special title treatment 6',
      description: 'With supporting text below as a natural lead-in to additional content.',
      category: "",
      price: 10,
      quantity: 10,
      rating: 4
    }
]
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
	for (let i = 0; i < products.length; i += 3) {
    let buffer: Product[] = []
    for (let j = i; j < i+n && j < products.length; j++)
      buffer.push(products[j])
		yield buffer
	}
}

onMounted(async () => {
  //products = await fetchProducts(12) || products
  //console.log(products)
})

</script>

<template>
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
                <div class="row d-flex justify-content-around flex-wrap">
                  <div v-for="product in n_products" class="col-md-4 mb-3 d-flex" :key="product.id">
                    <div class="card h-100" style="width:100%;">
                      <img :src="product.imageURI" class="img-fluid" alt="100%x280">
                      <div class="card-body d-flex align-content-end flex-wrap">
                        <h4 class="card-title fs-3">{{ product.name }}</h4>
                        <p class="card-text fs-5">{{ product.description }}</p>
                        <button class="fs-5 ms-auto btn btn-primary">Front Office <i class="bi bi-arrow-right-circle"></i></button>
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
</template>
  
  
<style>
.card {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
</style>