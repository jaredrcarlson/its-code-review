<template>
<div class="container-fluid" v-if="profile">
    <section class="row">
      <div class="col-12 p-0">
        <div class="image-container">
          <img class="img-fluid account-img me-4" :src=profile.picture :alt=profile.name>
          <div class="account-name">
            <p class="fs-2 pe-2 m-0">
                {{ profile.name }}
            </p>
          </div>
          <img v-if="!profile.coverImg" class="coverImg-style img-fluid" src="https://images.unsplash.com/photo-1551043047-1d2adf00f3fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" :alt=profile.name>
          <img v-else class="coverImg-style img-fluid" :src="profile.coverImg" :alt=profile.name>
        </div>
      </div>
    </section>

    <section class="row mt-5">
      <div class="col-12 mt-5">
        <p class="m-3">
          <span class="fs-2">
            About Me:
          </span>
          <span class="fs-4">
            {{ profile.bio }}
          </span>
        </p>
      </div>
    </section>

    <section class="row mt-5">
      <div class="col-12 mt-5">
        <p class="m-3 fs-1">
          Clubs
        </p>
      </div>
    </section>

    <section class="row mb-4" v-if="Array.isArray(profileMemberships)">
      <div class="col-md-4 col-12 my-3" v-for="membership in profileMemberships" :key="membership.id">
          <div class="membership-card mx-3">
            <router-link :to="({name: 'Club About Page', params: {clubId: membership.club.id}})">
            <img class="img-fluid card-img" :src=membership.club.coverImg alt="card img">
            <div class="dark-blue-bg p-3 text-light card-description">
              <p class="fs-5">
                {{ membership.club.name }}
              </p>
              <p v-if="width > 1350">
                {{ computedDescription(membership.club.description, 75) }}
              </p>
              <p v-else>
                {{ computedDescription(membership.club.description, 25) }}
              </p>
            </div>
          </router-link>
          </div>
      </div>
    </section>

    <section class="row mb-4">
      <div class="col-12">
        <p class="m-3 fs-1">
          <span class="pe-3">
            My Booklist
          </span>
          <span class="fs-3 pe-4">
            <i class="mdi mdi-book-multiple"></i> {{ profileBooks?.length }}
          </span>
        </p>
      </div>
    </section>

    <section class="row mb-4">
      <div class="col-12">
        <div style="overflow-x: auto;" class="ms-3">
          <table id="books">
            <tr>
              <th class="ps-2">
                Title
              </th>
              <th class="ps-2">
                Progress
              </th>
              <th class="ps-2 text-center">
                Rating
              </th>
              <th class="ps-2 text-end">
                Timestamp
              </th>
            </tr>
            <tr>
              <td class="large-text-style fs-4 orange-text">Currently Reading</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr v-for="book in currentBooks" :key="book.id">
              <UserBookListItem :bookProp="book" />
            </tr>
            <tr>
              <td class="large-text-style fs-4 orange-text">Planning to Read</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr v-for="book in plannedBooks" :key="book.id">
              <UserBookListItem :bookProp="book" />
            </tr>
            <tr>
              <td class="large-text-style fs-4 orange-text">Finished Books</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr v-for="book in finishedBooks" :key="book.id">
              <UserBookListItem :bookProp="book" />
            </tr>
          </table>
        </div>
      </div>
    </section>
    
    <!-- <section class="row mb-4">
      <div class="col-12">
        <p class="m-3 fs-1">
          Badges
        </p>
      </div>
    </section>

    <section class="row mb-4">
      <div class="col-12">
        placeholder
      </div>
    </section> -->
  </div>
</template>


<script>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { profilesService } from '../services/ProfilesService.js';
import { AppState } from '../AppState.js';
import { booksService } from '../services/BooksService';
import { accountService } from "../services/AccountService.js";

export default {
  setup(){

    const route = useRoute()

    async function getProfile(){
      try {
        const profileId = route.params.profileId

        await profilesService.getProfile(profileId)
      } catch (error) {
        Pop.error(error.message)
      }
    }

    async function getProfileMemberships(){
      try {
        const profileId = route.params.profileId

        await profilesService.getProfileMemberships(profileId)
      } catch (error) {
        Pop.error(error.message)
      }
    }
    async function getProfileBooks(){
      try {
        const profileId = route.params.profileId
        await booksService.getProfileBooks(profileId)
      } catch (error) {
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getProfile(route.params.profileId)
      getProfileMemberships()
      getProfileBooks()
      resize()
      window.addEventListener("resize", resize);
    })


    const width = ref(null);
    function resize() {
      width.value = window.innerWidth;
    }
    
    onUnmounted(() => {
      window.removeEventListener("resize", resize);
    });

    return {
      computedDescription(str, length) {
        if (str.length > 100) {
          return str.substring(0,length) + "..."
        }
        return str
      },
      width,
      route,
      profile: computed(() => AppState.profile),
      profileMemberships: computed(() => {
        if (AppState.profileMemberships)
          return AppState.profileMemberships.filter(m => m.club && m.status == 'joined')
        return []
      }),
      profileBooks: computed(() => AppState.profileBooks),
      finishedBooks: computed(() => {
        let finishedBooks = AppState.profileBooks?.filter(b => b.status == 'finished')
        return finishedBooks
      }),
      plannedBooks: computed(() => {
        let plannedBooks = AppState.profileBooks?.filter(b => b.status == 'planned')
        return plannedBooks
      }),
      currentBooks: computed(() => {
        let currentBooks = AppState.profileBooks?.filter(b => b.status == 'reading')
        return currentBooks
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.coverImg-style{
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.account-img{
  height: 17vh;
  width: 17vh;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  bottom: -8vh;
  left: 5vw;
  position: absolute;
}

.account-name {
  position: absolute;
  bottom: -7vh;
  left: 14vw;
}

.account-info-style{
  top: -6.5vh;
  margin-bottom: -6.5vh;
  position: relative;
}

.card-img{
  height: 40%;
  object-fit: cover;
  object-position: center;
}
.card-description{
  height: 60%;
  display: flex;
  flex-direction: column;
}

.membership-card{
  height: 55vh;
}

.image-container {
  height: 30vh;
  position: relative;
}

table{
  width: 95%;
}

#books th{
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: lighter;
}

#books th, #books td{
  border-bottom: 1px solid #8f8f8f;
  padding: 7px;
}

.sub-text-style{
  font-weight: 100;
  font-size: smaller;
}

.large-text-style{
  font-size:large;
  font-weight: 600;
}

.status-text-style{
  font-size: large;
}

.author-text-style{
  font-size: smaller;
  font-weight: 500;
}

</style>
