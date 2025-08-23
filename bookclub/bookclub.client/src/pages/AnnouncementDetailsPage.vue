<template>
  <div class="container-fluid">
    <PostDetailsCard v-if="activeClubPost" :postProp="activeClubPost" />
    <p class="fs-3"><i class="mdi mdi-comment"></i> {{comments.length}} Comments</p>
<!-- //form to make comments -->
<CommentsForm/>

<!-- end comments form -->
    <div class="row py-3">
      <!-- //v-for over comments below -->
      <div v-for="comment in comments" :key="comment?.id" class="col-12 dark-blue-bg rounded elevation-5 text-light p-3 mb-3">
      <CommentCard :commentProp="comment"/>
    </div>
          
  </div>
  </div>
</template>


<script>
import { computed, onMounted, watchEffect } from "vue";
import { AppState } from "../AppState.js"
import CommentCard from "../components/CommentCard.vue";
import Pop from "../utils/Pop.js";
import { clubPostsService } from "../services/ClubPostsService.js";
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger.js";

export default {
    setup() {
      const route = useRoute();
      async function getPostById() {
            try {
                const postId = route.params.postId;
                // logger.log(postId)
                await clubPostsService.getPostById(postId);
            }
            catch (error) {
                Pop.error(error.message);
            }
        }
      async function getAnnouncementComments(){
        try {
          const postId = route.params.postId
          logger.log('[announcement comments...]', postId)
          await clubPostsService.getPostComments(postId)
        } catch (error) {
          Pop.error(error.message)
        }
      }
      //onMounted not grabbing logger..... unless router link is commented out in post details card
      onMounted(() => {
        getPostById(route.params.postId)
        getAnnouncementComments()
        // logger.log('mounted...')
      })
        return {
            comments: computed(() => AppState.postComments),
            activeClubPost: computed(() => AppState.activeClubPost)
        };
    },
    components: { CommentCard }
}
</script>


<style lang="scss" scoped>

</style>