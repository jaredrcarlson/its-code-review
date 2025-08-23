<template>
  <section class="row">
      <form @submit.prevent="handleSubmit()" action="">
        <label for="body"><p class="fs-4">Join The Conversation</p></label>
        <textarea v-model="editable.body" class="form-control border-0 elevation-3 mb-3" name="body" id="body" minlength="3" maxlength="200" required cols="130" rows="10"></textarea>
        <div class="text-end">

          <button class="btn light-blue-btn elevation-3 fs-4 px-4">Post</button>
        </div>
      </form>
    </section> 
</template>


<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { postCommentsService } from "../services/PostCommentsService.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";

export default {
  setup(){
    const editable = ref({})
    const route = useRoute()
    return {
      editable,
      handleSubmit(){
        if(editable.value.id) {
          this.editComment()
        }
        else {
          this.createComment()
        }
      },
      async createComment(){
        try {
          const commentData = editable.value
          commentData.postId = route.params.postId
          commentData.clubId = route.params.clubId
          // logger.log('[Creating comment..?]')
          await postCommentsService.createComment(commentData)
          editable.value = {}
        } catch (error) {
          Pop.error(error.message)
        }
      },
            async editComment(){
              try {
                const commentData = editable.value
                commentData.clubId = route.params.clubId
                logger('editing a comment?')
                await postCommentsService.editComment(commentData)
              } catch (error) {
                Pop.error(error.message)
              }
            }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>