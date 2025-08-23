<template>
    <div class="container-fluid">
        <PostDetailsCard v-if="activeClubPost" :postProp="activeClubPost"/>
        <p class="fs-3"><i class="mdi mdi-comment"></i> {{postComments.length  }} Comments</p>
            <!-- //form to make comments -->
            <CommentsForm/>
            <!-- end comments form -->
        <div class="row py-3">
            <!-- //v-for over comments below -->
            <div v-for="comment in postComments" :key="comment?.id" class="col-12 dark-blue-bg rounded elevation-5 text-light p-3 mb-3">
            <CommentCard :commentProp="comment"/>
            </div>
        </div>
    </div>
</template>


<script>
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { clubPostsService } from "../services/ClubPostsService.js";
import { computed, onMounted, ref } from "vue";
import { AppState } from "../AppState.js";
import CommentsForm from "../components/CommentsForm.vue";
import CommentCard from "../components/CommentCard.vue";
import PostDetailsCard from "../components/PostDetailsCard.vue";

export default {
    setup() {
        const editable = ref({});
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
        async function getPostComments() {
            try {
                const postId = route.params.postId;
                await clubPostsService.getPostComments(postId);
            }
            catch (error) {
                Pop.error(error.message);
            }
        }
        onMounted(() => {
            getPostById(route.params.postId);
            getPostComments(route.params.postId);
        });
        return {
            route,
            editable,
            activeClubPost: computed(() => AppState.activeClubPost),
            postComments: computed(() => AppState.postComments),
            account: computed(() => AppState.account),
        };
    },
    components: { CommentsForm, CommentCard, PostDetailsCard }
}
</script>


<style lang="scss" scoped>
.avatar-img{
  border-radius: 50%;
  width: 10vh;
  height: 10vh;
  object-fit: cover;
  object-position: center;
  box-shadow: 2px 2px 6px whitesmoke;
}
</style>