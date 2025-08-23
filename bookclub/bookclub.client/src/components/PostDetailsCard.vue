<template>
  <section class="row my-3">
    <div class="col-12 dark-blue-bg rounded elevation-5 text-light p-3">
      <form @submit.prevent="editPost()">
      <input class="form-control mb-2" v-model="editable.title" minlength="3" maxlength="100" v-if="isEditing" type="text" required>
      <h1 v-else>{{postProp?.title}}</h1>
      <div class="d-flex">
          <div class="pe-4">
          <router-link :to="{name: 'Profile Page', params: {profileId: postProp?.creatorId}}">
            <img class="avatar-img" :src="postProp?.creator?.picture" :alt="postProp?.creator?.name">
          </router-link>
          </div>
          <div class="flex-grow-1">
            <p class="fs-4">{{ postProp?.creator?.name }}</p>
            <p class="fs-5 mb-4">
              <span class="orange-text"><i v-if="postProp?.membership.role == 'creator'" class="mdi mdi-star orange-text"></i><i v-else-if="postProp?.membership.role == 'admin'" class="mdi mdi-star-outline orange-text"></i><i v-else class="mdi mdi-account orange-text"></i></span> {{postProp?.membership?.role?.toUpperCase()}}  Posted {{postProp?.createdAt}}
            </p>
            <textarea class="form-control mb-2" v-model="editable.body" v-if="isEditing"  rows="10" required minlength="3" maxlength="1500"></textarea>
            <p v-else class="fs-5 post-body">{{postProp?.body}}</p>
            <button type="submit" v-if="isEditing" class="btn orange-btn">Save Changes</button>
          </div>
          <div v-if="postProp?.creatorId == account?.id" class="btn-group align-items-start mb-3">
            <button title="More Options" class="btn orange-text text-end btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="mdi mdi-circle"></i><i class="mdi mdi-circle"></i><i class="mdi mdi-circle"></i>
            </button>
            <ul  class="p-1 dropdown-menu">
              <li @click="deletePost(postProp?.id)" class="selectable mb-1 p-1">
              Delete Post <i class="mdi mdi-delete"></i>
              </li>
              <li @click="enableEditing()" class="selectable mb-1 p-1">
              Edit Post <i class="mdi mdi-pencil"></i>
              </li>

            </ul>
        </div>
      </div>
    </form>
    </div>
  </section>
</template>


<script>
import { computed, ref } from "vue";
import { clubPostsService } from "../services/ClubPostsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
import { useRoute } from "vue-router";
import { router } from "../router.js";

export default {
  props: {
    postProp: { type: [Object, null], required: true }
  },
  setup(props){
    const isEditing = ref(false)
    const editable = ref({})
    const route = useRoute()
    return {
      editable,
      isEditing,
      account: computed(() => AppState.account),
      enableEditing(){
        isEditing.value = true
        editable.value = {...props.postProp}
      },
      async editPost(){
        try {
          const postData = editable.value
          await clubPostsService.editPost(postData)
          isEditing.value = false
          editable.value = {}
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async deletePost(postId) {
                try {
                    const wantsToDelete = await Pop.confirm("Once it's gone, it's gone. Are you sure you want to delete?");
                    if (!wantsToDelete) {
                        return;
                    }
                    // logger.log('[DELETING POST...]');
                    await clubPostsService.deletePost(postId);
                    router.push({name: 'Club About Page', params: {clubId: route.params.clubId}})

                }
                catch (error) {
                    Pop.error(error.message);
                }
            },
    }
  }
}
</script>


<style lang="scss" scoped>
textarea{
  width: 100%;
}
.avatar-img{
  border-radius: 50%;
  width: 10vh;
  height: 10vh;
  object-fit: cover;
  object-position: center;
  box-shadow: 2px 2px 6px whitesmoke;
}

.post-body{
  white-space: pre-line;
}

</style>