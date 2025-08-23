<template>
 <section id="bookclubList" class="row ghost-bg">
      <div class="col-12 mt-5">
        <section class="row">
          <div class="col-md-6 col-12">
            <p class="fs-3 fw-bold ms-3">
              Bookclub List
            </p>
          </div>

          <div class="col-md-6 col-12 d-flex justify-content-end">
            <div class="mx-3">
              <router-link :to="{name: 'Create Book Club'}">
                <button class="btn orange-btn">
                  Create a Club
                </button>
              </router-link>
            </div>

            <div>
              <form @submit.prevent="getClubsByQuery">
                <div class="d-flex me-3">
                  <label for="search"></label>
                  <input v-model="searchQuery" type="text" name="search" id="search" placeholder="Search clubs..." class="form-control">
                  <button class="btn orange-btn" title="Submit" type="submit">
                    <i class="mdi mdi-magnify"></i>
                  </button>
                </div>
              </form>
            </div>

          </div>
        </section>
      </div>
    </section>

    <section class="row ghost-bg">
      <div class="col-md-6 col-12 club-card my-3" v-for="club in clubs" :key="club.id">
        <BookClubCard :clubProp="club" />
      </div>
    </section>

    <section class="row ghost-bg">
      <div class="col-md-4 col-12 mx-md-auto px-5 pb-3 justify-content-between">
        <div class="d-flex justify-content-between">
          <button @click="getPrevClubs" :disabled="!prevPage" class="btn orange-btn">Previous Page</button>
          <button @click="getNextClubs" :disabled="!nextPage" class="btn orange-btn">Next Page</button>
        </div>
      </div>
    </section>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { clubsService } from '../services/ClubsService';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';

export default {
    setup() {

    async function getAllClubs() {
          try {
              await clubsService.getAllClubs();
          }
          catch (error) {
              Pop.error(error.message);
          }
    }  

    onMounted(() => {
      getAllClubs();
    })
        
    const searchQuery = ref("")
    return {
      searchQuery,
      clubs: computed(() => AppState.clubs),
      prevPage: computed(() => AppState.prevPage),
      nextPage: computed(() => AppState.nextPage),
      async getNextClubs() {
        try {
          await clubsService.getNextClubsPage()
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async getPrevClubs() {
        try {
          await clubsService.getPrevClubsPage()
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async getClubsByQuery() {
        try {
          await clubsService.getAllClubs(searchQuery.value)
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.club-card {
  max-height: 40vh;
}

</style>