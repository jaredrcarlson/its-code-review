<template>
<div  class="container-fluid h-100" v-if="selectedClub">
    <section  class="row h-100">
      <div class="col-md-4 col-12 d-flex flex-column">
        <div>
          <img class="img-fluid card-img" :src=selectedClub.coverImg alt="card img">
        </div>
        <div class="dark-blue-bg rounded-bottom text-light fw-bold fs-4 text-center p-1">
          <p class="m-0">
            {{ selectedClub.name }}
          </p>
        </div>
        <div class="flex-grow-1 dark-blue-bg mt-3 rounded-top p-3 fs-4">
          <router-link :to="{name:'Club About Page'}">
            <p class="route-text" type="button" :class="route.name == 'Club About Page' ? 'selected' : ''">
              <i class="mdi mdi-bookmark"></i> About us
            </p>
          </router-link>

          <router-link v-if="!selectedClub.private || (selectedClub.private && clubMembership.status == 'joined')" :to="{name: 'Club Announcement Page'}">
            <p class="route-text" type="button" :class="route.name == 'Club Announcement Page' ? 'selected' : ''">
              <i class="mdi mdi-flag-variant"></i> Announcements
            </p>
          </router-link>

          <router-link :to="{name:'Club List Page'}">
            <p class="route-text" type="button" :class="route.name == 'Club List Page' ? 'selected' : ''">
              <i class="mdi mdi-format-list-bulleted"></i> Book List
            </p>
          </router-link>

          <router-link v-if="!selectedClub.private || (selectedClub.private && clubMembership.status == 'joined')" :to="{name: 'Club Discussion Page'}">
            <p class="route-text" type="button" :class="route.name == 'Club Discussion Page' ? 'selected' : ''">
              <i class="mdi mdi-forum"></i> Discussion Board
            </p>
          </router-link>

          <router-link :to="{name: 'Club Member Page'}">
            <p class="route-text" type="button" :class="route.name == 'Club Member Page' ? 'selected' : ''">
              <i class="mdi mdi-account-multiple"></i> Member List
            </p>
          </router-link>
        </div>
      </div>
      <div class="col-md-8 col-12 h-100 router-view">
        <router-view>

        </router-view>
      </div>
    </section>
  </div>
  <div class="container-fluid" v-else>
    <section class="row">
      <div class="col-12">
        <h2 class="text-light m-4">
          Loading... <i class="mdi mdi-loading mdi-spin"></i>
        </h2>
      </div>
    </section>
  </div>
</template>


<script>
import { useRoute } from 'vue-router';
import { clubsService } from '../services/ClubsService.js';
import { computed, onMounted, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { accountService } from "../services/AccountService.js";


export default {
  setup(){
    const route = useRoute()
    const myMemberships = computed(() => AppState.myMemberships)

    async function getClubById(){
      try {
        const clubId = route.params.clubId
  
        await clubsService.getClubById(clubId)
      } catch (error) {
        Pop.error(error.message)
      }
    }

    onMounted(()=> {
      getClubById(route.params.clubId)
    })



    return {
      route,
      selectedClub: computed(() => AppState.selectedClub),
      account: computed(() => AppState.account),
      clubMembership: computed(() => {
        if (Array.isArray(myMemberships.value)){
          const membership = myMemberships.value.find(m => m.clubId == AppState.selectedClub.id)
          return membership ? membership : {} 
        }
        return {}
      }),
      
    }
  }
}
</script>


<style lang="scss" scoped>
.card-img{
  height: 30vh;
  object-fit: cover;
  object-position: center;
}

.route-text{
  color: #e9ecef;
}

.route-text:hover{
  color: #FB5607;
}

.selected {
  color: #FB5607;
}

.router-view {
  overflow-y: scroll;
}

</style>
