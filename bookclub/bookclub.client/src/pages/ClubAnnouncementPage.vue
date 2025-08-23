<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12">
        <p class="m-3 fs-1">
          Announcements
          <span class="ps-5" v-if="account.id && (account?.id == clubCreator?.profile.id || account.id == clubAdmin?.profile.id)">
              <button  type="button" data-bs-toggle="collapse" data-bs-target="#formCollapse" class="btn orange-btn">Make Post</button>
            </span>
        </p>
      </div>
      <div class="col-12">
          <div class="collapse" id="formCollapse">
        <p v-if="account.id && (account?.id == clubCreator?.profile.id || account.id == clubAdmin?.profile.id)" class="m-3 fs-1">
          <!-- v-if="selectedClub?.creatorId == member.creatorId" -->
          <PostForm :isAnnouncement="true"/>
        </p>
      </div>
      </div>
    </section>
    <section v-for="announcement in announcements" :key="announcement.id" class="row bg-white elevation-5 rounded py-3 my-3">
      <AnnouncementCard :announcementProp="announcement"/>
    </section>
  </div>
</template>


<script>
import { computed, onMounted, watchEffect } from "vue";
import PostCard from "../components/PostCard.vue";
import PostForm from "../components/PostForm.vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { useRoute } from "vue-router";
import { clubPostsService } from "../services/ClubPostsService.js";
import AnnouncementCard from "../components/AnnouncementCard.vue";
import { membersService } from "../services/MembersService.js";

export default {
    setup() {
      const route = useRoute()
      async function getClubAnnouncements(){
        try {
          const clubId = route.params.clubId
          await clubPostsService.getClubAnnouncements(clubId)
        } catch (error) {
          Pop.error(error.message)
        }
      }
      async function getMembersByClubId(){
        try {
          const clubId = route.params.clubId
    
          await membersService.getMembersByClubId(clubId)
        } catch (error) {
          Pop.error(error.message)
        }
      }
      onMounted(() => {
        getClubAnnouncements();
        getMembersByClubId();
        
      })
        return {
          announcements: computed(() => AppState.clubAnnouncements),
          member: computed(() => AppState.members),
          clubCreator: computed(() => 
            AppState.members.find(m => m.role == 'creator')
          ),
          clubAdmin: computed(() => AppState.members.find(m => m.role == 'admin')),
          account: computed(() => AppState.account),
          selectedClub: computed(() => AppState.selectedClub),
        };
    },
    components: {  PostForm, AnnouncementCard }
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
