<template>
  <form class="form-control" action="" @submit.prevent="handleSubmit()">
          <div class="mb-2 ">
            <label for="title" class="form-label">Title</label>
            <input v-model="editable.title" class="form-control"  type="text" minlength="3" maxlength="100" id="title" placeholder="Post Title..." required >
          </div>
          <div class="mb-2 ">
            <label for="body" class="form-label">Post Content</label>
            <textarea v-model="editable.body" class="form-control"  type="text" minlength="3" maxlength="1500" id="body" placeholder="Post Content..." required rows="10"></textarea>
          </div>
          <div class="my-2">
            <button type="submit" class="btn orange-btn">Submit</button>
          </div>
        </form>
</template>


<script>
import { ref, watchEffect } from "vue";
import Pop from "../utils/Pop.js";
import { clubPostsService } from "../services/ClubPostsService.js";
import { Collapse, Modal } from "bootstrap";
import { router } from "../router.js";
import { logger } from "../utils/Logger.js";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";

export default {
  props: { 
    isAnnouncement: { type: Boolean, required: true }
  },
  setup(props){
    const editable = ref({})
    const route = useRoute()


    // watchEffect(() => {
    //   editable.value = {...AppState.activeClubPost}
    // })
    return {
      editable,
      handleSubmit(){
        if(editable.value.id) {
          this.editPost()
        }
        else {
          this.createPost()
        }
      },
      async createPost(){
        try {
          const postData = editable.value
          if(props.isAnnouncement){
            postData.isAnnouncement = true
          }
          postData.clubId = route.params.clubId
          // logger.log('I clicked submit')
          await clubPostsService.createPost(postData)
          editable.value = {}
          Collapse.getOrCreateInstance('#formCollapse').hide()
          // router.push({EVENTUALLY THIS WILL BRING UP POST W/DETAILS})
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async editPost(){
        try {
          const postData = editable.value
          postData.clubId = route.params.clubId
          await clubPostsService.editPost(postData)
          editable.value = {}
          Collapse.getOrCreateInstance('#formCollapse').hide()
        } catch (error) {
          Pop.error(error.message)
        }
      },
    }
  }
}
</script>


<style lang="scss" scoped>

</style>