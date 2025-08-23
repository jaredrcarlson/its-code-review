<template>
  <div class="container-fluid dark-blue-bg text-light">
    <section class="row">
      <div class="col-12 mt-3 text-center">
        <h1>
          The New York Times Best Sellers
        </h1>
      </div>
    </section>
    <section class="row">
      <div class="col-md-3 col-12 my-2 d-flex align-items-center justify-content-center justify-content-md-start">
        <div class="dropdown">
          <button class="btn orange-btn dropdown-toggle ms-md-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Choose a best seller list
          </button>
          <ul class="dropdown-menu dropdown-menu-width">
            <li class="px-3 selectable" @click="sortList('Paperback Trade Fiction')">Paperback Trade Fiction</li>
            <li class="px-3 selectable" @click="sortList('Young Adult Paperback')">Young Adult Paperback</li>
            <li class="px-3 selectable" @click="sortList('Graphic Books and Manga')">Graphic Books and Manga</li>
            <li class="px-3 selectable" @click="sortList('Paperback Nonfiction')">Paperback Nonfiction</li>
            <li class="px-3 selectable" @click="sortList('Advice, How-To & Miscellaneous')">Advice, How-To & Miscellaneous</li>
          </ul>
        </div>
      </div>
    </section>
    <section class="row justify-content-center">
      <div class="col-md-9 col-12 mb-3" v-if="Array.isArray(activeNytBooks)">
        <div id="carouselExample" class="carousel slide">
          <div class="carousel-inner text-center">
            <div class="carousel-item active">
              <div v-if="activeNytBooks[0].isbn10 != 'None'">
                <img @click="searchGbApi(activeNytBooks[0].isbn10)" :src=activeNytBooks[0].bookImg class="img-fluid carousel-img selectable" role="button" :alt=activeNytBooks[0].title>
              </div>
              <div class="d-flex flex-column align-items-center" v-else>
                <img :src=activeNytBooks[0].bookImg class="img-fluid carousel-img position-relative" :alt=activeNytBooks[0].title style="filter: grayscale(100%);">
                <p class="bg-danger fw-bold px-5 position-absolute top-50 start-50 translate-middle">
                  Not Available
                </p>
              </div>
            </div>
            <div class="carousel-item">
              <div v-if="activeNytBooks[1].isbn10 != 'None'">
                <img @click="searchGbApi(activeNytBooks[1].isbn10)" :src=activeNytBooks[1].bookImg class="img-fluid carousel-img selectable" role="button" :alt=activeNytBooks[1].title>
              </div>
              <div class="d-flex flex-column align-items-center" v-else>
                <img :src=activeNytBooks[1].bookImg class="img-fluid carousel-img position-relative" :alt=activeNytBooks[1].title style="filter: grayscale(100%);">
                <p class="bg-danger fw-bold px-5 position-absolute top-50 start-50 translate-middle">
                  Not Available
                </p>
              </div>
            </div>
            <div class="carousel-item">
              <div v-if="activeNytBooks[2].isbn10 != 'None'">
                <img @click="searchGbApi(activeNytBooks[2].isbn10)" :src=activeNytBooks[2].bookImg class="img-fluid carousel-img selectable" role="button" :alt=activeNytBooks[2].title>
              </div>
              <div class="d-flex flex-column align-items-center" v-else>
                <img :src=activeNytBooks[2].bookImg class="img-fluid carousel-img position-relative" :alt=activeNytBooks[2].title style="filter: grayscale(100%);">
                <p class="bg-danger fw-bold px-5 position-absolute top-50 start-50 translate-middle">
                  Not Available
                </p>
              </div>
            </div>
            <div class="carousel-item">
              <div v-if="activeNytBooks[3].isbn10 != 'None'">
                <img @click="searchGbApi(activeNytBooks[3].isbn10)" :src=activeNytBooks[3].bookImg class="img-fluid carousel-img selectable" role="button" :alt=activeNytBooks[3].title>
              </div>
              <div class="d-flex flex-column align-items-center" v-else>
                <img :src=activeNytBooks[3].bookImg class="img-fluid carousel-img position-relative" :alt=activeNytBooks[3].title style="filter: grayscale(100%);">
                <p class="bg-danger fw-bold px-5 position-absolute top-50 start-50 translate-middle">
                  Not Available
                </p>
              </div>
            </div>
            <div class="carousel-item">
              <div v-if="activeNytBooks[4].isbn10 != 'None'">
                <img @click="searchGbApi(activeNytBooks[4].isbn10)" :src=activeNytBooks[4].bookImg class="img-fluid carousel-img selectable" role="button" :alt=activeNytBooks[4].title>
              </div>
              <div class="d-flex flex-column align-items-center" v-else>
                <img :src=activeNytBooks[4].bookImg class="img-fluid carousel-img position-relative" :alt=activeNytBooks[4].title style="filter: grayscale(100%);">
                <p class="bg-danger fw-bold px-5 position-absolute top-50 start-50 translate-middle">
                  Not Available
                </p>
              </div>
            </div>
            
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { newYorkTimesService } from '../services/NewYorkTimesService.js';
import { googleBooksService } from '../services/GoogleBooksService.js';
import { router } from '../router.js';

export default {
  setup(){

    return {
      activeNytBooks: computed(() => AppState.activeNytBooks),

      sortList(listName){
        newYorkTimesService.sortList(listName)
      },

      async searchGbApi(isbnCode){
        const gbId = await googleBooksService.searchByCode(isbnCode)

        if(gbId == null){
          return
        } else(router.push({name:'Book Details', params:{gbId: gbId}}))
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.carousel-img{
  height: 40vh;
  object-fit: cover;
  object-position: center;
}

.dropdown-menu-width{
  width: max-content;
}
</style>
