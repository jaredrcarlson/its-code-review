<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12">
        <h1 class="m-3">
          Club Discussions 
          <span class="ps-5" v-if="account.id && Array.isArray(myMemberships)">
            <button v-if="inClub" type="button" data-bs-toggle="collapse" data-bs-target="#formCollapse" class="btn orange-btn">Make Post</button>
          </span>
        </h1>

        <!-- Collapse -->
        <div class="collapse" id="formCollapse">

          <PostForm :isAnnouncement="false"/>
        </div>

        <!-- End Modal -->
      </div>
    </section>
<!-- //comments section -->
    <section v-for="clubPost in clubPosts" :key="clubPost?.id" class="row bg-white elevation-5 rounded py-3 my-3">
      <PostCard :postProp="clubPost"/>
    </section>
  </div>
</template>


<script>
import { computed, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { clubPostsService } from "../services/ClubPostsService.js"
import { logger } from "../utils/Logger.js";
import PostCard from "../components/PostCard.vue";
import PostForm from "../components/PostForm.vue";

export default {
    setup() {
        const route = useRoute();
        async function getClubPosts() {
            try {
                const clubId = route.params.clubId;
                await clubPostsService.getClubPosts(clubId);
            }
            catch (error) {
                Pop.error(error.message);
            }
        }
        watchEffect(() => {
            getClubPosts();
        });
        return {
            route,
            selectedClub: computed(() => AppState.selectedClub),
            clubPosts: computed(() => AppState.clubPosts),
            account: computed(() => AppState.account),
            activeClubPost: computed(() => AppState.activeClubPost),
            inClub: computed(() => {
            const foundClub = AppState.myMemberships.find(c => c.clubId == route.params.clubId)
            logger.log(foundClub)
            logger.log(AppState.myMemberships)
            return foundClub
            }),
            myMemberships: computed(() => AppState.myMemberships),
        };
    },
    components: { PostCard, PostForm }
}
</script>


<style lang="scss" scoped>
.avatar-img{
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  height: 10vh;
  width: 10vh;
  box-shadow: 3px 3px 2px black;
}
</style>