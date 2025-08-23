<template>
    <div class="col-md-2 col-12">
      <router-link :to="{name: 'Profile Page', params: {profileId: announcementProp?.creator.id}}">
      <img class="selectable img-fluid avatar-img" :src="announcementProp.creator?.picture" :alt="announcementProp.creator?.name">
    </router-link>
    </div>
    <div class="col-md-8 col-12">
    <router-link class="text-dark" :to="{name: 'Announcement Details Page', params:{postId: announcementProp.id}}">
    <p class="selectable fw-bold fs-3 text-dark">
      {{ announcementProp.title }}
    </p>
    </router-link>
      <p>
        <span class="pe-4"><i v-if="announcementProp.membership.role == 'creator'" class="mdi mdi-star orange-text"></i><i v-else-if="announcementProp.membership.role == 'admin'" class="mdi mdi-star-outline orange-text"></i><i v-else class="mdi mdi-account orange-text"></i>{{ announcementProp?.membership?.role.toUpperCase() }}   {{announcementProp.creator?.name}}</span><span>posted {{announcementProp.createdAt}}</span>
      </p>
    </div>
    <div class="col-md-2 col-12">


      <p class="fs-5">
        <i class="mdi mdi-message-reply"></i> <span>{{announcementProp.commentCount}}</span>
      </p>
    </div>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { clubPostsService } from "../services/ClubPostsService.js";

export default {
  props: {
    announcementProp: { type: Object, required: true }
  },
  setup(){
    return {
      account: computed(() => AppState.account),
      // async deletePost(postId) {
      //           try {
      //               const wantsToDelete = await Pop.confirm("Once it's gone, it's gone. Are you sure you want to delete?");
      //               if (!wantsToDelete) {
      //                   return;
      //               }
      //               logger.log('[DELETING POST...]');
      //               await clubPostsService.deletePost(postId);
      //           }
      //           catch (error) {
      //               Pop.error(error.message);
      //           }
      //       },
      
    }
  }
}
</script>


<style lang="scss" scoped>
.avatar-img{
  height: 10vh;
  width: 10vh;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}
</style>