<template>
  <div class="container-fluid">
    <section class="row dark-blue-bg text-light">
      <div class="col-12 text-center mt-5 mb-3 pb-5">
        <div class="mb-4">
          <h1 class="fw-bold">
            Find a <span class="orange-text">book club</span> right for you
          </h1>
          <h3>
            Discuss, rate, and enjoy the books you love with a community you create.
          </h3>
        </div>

        <div id="v-step-0">
          <button  @click="goToBookclubs" class="fs-3 btn orange-btn m-2" >
            
            Find a Book Club
          </button >
          <router-link :to="{name: 'Create Book Club'}">
            <button id="v-step-1" class="fs-3 btn light-blue-btn m-2">
              Make a Book Club
            </button>
          </router-link>
        </div>

      </div>
    </section>
    <section class="row">

      <div class="col-12 d-flex p-0">
        <img class="img-fluid home-banner flex-fill" src="https://images.unsplash.com/photo-1618414952052-289dab88b409?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="book shelf">
      </div>

    </section>

    <section class="row">
      <NYTCard id="v-step-2"/>
    </section>

<section  class="row justify-content-center">
  <div class="mt-3" id="v-step-3"></div>

  <BookClubSearch />
</section>
  
  </div>
  <Tour v-if="account.needsTour" :steps="steps" :callbacks="tourCallBacks"/>
</template>

<script>
import Pop from '../utils/Pop.js'
import { computed, onMounted } from 'vue'
import NYTCard from '../components/NYTCard.vue'
import { newYorkTimesService } from '../services/NewYorkTimesService.js'
import BookClubSearch from '../components/BookClubSearch.vue'
import { AppState } from "../AppState.js"
import { accountService } from "../services/AccountService.js"
import { useRouter } from "vue-router"

export default {
  // name: 'my-tour',
    setup() {
        const router = useRouter()
        async function getTopBooks(){
          try {
            await newYorkTimesService.getTopBooks()

            newYorkTimesService.sortList('Paperback Trade Fiction')
          } catch (error) {
            Pop.error(error.message)
          }
        }

        onMounted(() => {
            getTopBooks();
        });
        
        return {
          steps: [
            {
              target: '#v-step-0',
              header: {
                title: "Welcome to the JABB BookClub Site!",
              },
              content: 'Click on one of these buttons to see clubs or Make your own club',
              params: {
                placement: 'top-start',
                originalPlacement: 'top-start',
              }
            },
            {
              target: '#v-step-2',
              content: 'Here is a display of the New York Times Best Sellers that you can Scroll through',
              params: {
                placement: 'top',
                originalPlacement: 'top',
              }
            },
            {
              target: '#v-step-3',
              content: 'Down here you can find book clubs with the search bar, then click on one to navigate to one of your liking',
              params: {
                placement: 'bottom',
                originalPlacement: 'bottom',
              }
            },
          ],
          tourCallBacks: {
            onSkip: (() => accountService.editAccount({needsTour: false}))
          },
          account: computed(() => AppState.account),
            goToBookclubs() {
              document.getElementById('bookclubList').scrollIntoView()
            }
        };
    },
    components: { NYTCard, BookClubSearch }
}
</script>

<style scoped lang="scss">

.hero-title {
  font-size: 4.5rem;
}

.home-banner{
  height: 45vh;
  object-fit: cover;
  object-position: center;
}

</style>
