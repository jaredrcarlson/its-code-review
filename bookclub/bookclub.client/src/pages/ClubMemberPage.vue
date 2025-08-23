<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12">
        <p class="m-3 fs-1">
          Member List
        </p>
      </div>
    </section>
    <section v-if="inClub.role == 'creator'" class="row justify-content-around">
      <div class="col-12">
        <p class="m-3 fs-4">
          Pending Join Requests
        </p>
      </div>
      <div class="col-md-5 col-12 dark-blue-bg my-2 rounded" v-for="member in pendingMembers" :key="member.id">
        <MemberCard :memberProp="member" />
      </div>
    </section>
    <section class="row justify-content-around">
      <div class="col-12">
        <p class="m-3 fs-4">
          Members
        </p>
      </div>
      <div class="col-md-5 col-12 dark-blue-bg my-2 rounded" v-for="member in joinedMembers" :key="member.id">
        <MemberCard :memberProp="member" />
      </div>
    </section>
    <section v-if="inClub.role == 'creator'" class="row justify-content-around">
      <div class="col-12">
        <p class="m-3 fs-4">
          Blocked Users
        </p>
      </div>
      <div class="col-md-5 col-12 dark-blue-bg my-2 rounded" v-for="member in blockedMembers" :key="member.id">
        <MemberCard :memberProp="member" />
      </div>
    </section>
  </div>
</template>


<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import MemberCard from '../components/MemberCard.vue';
import { useRoute } from 'vue-router';
import { membersService } from '../services/MembersService';
import Pop from '../utils/Pop';

export default {
    setup() {

      const route = useRoute()

      async function getMembersByClubId(){
        try {
          const clubId = route.params.clubId
    
          await membersService.getMembersByClubId(clubId)
        } catch (error) {
          Pop.error(error.message)
        }
      }
      onMounted(() => {
        getMembersByClubId()
      })
      return {
          members: computed(() => AppState.members),
          inClub: computed(() => {
            let foundClub = {}
            if (Array.isArray(AppState.myMemberships)){
              foundClub = AppState.myMemberships.find(c => c.clubId == route.params.clubId)
            }
            return foundClub ? foundClub : {}
          }),
          joinedMembers: computed(() => AppState.members.filter(m => m.status == 'joined').sort((a, b) => {
            if (a.role == 'creator'){
              return -1
            }
            if (b.role == 'creator'){
              return -1
            }
          })),
          blockedMembers: computed(() => AppState.members.filter(m => m.status == 'blocked')),
          pendingMembers: computed(() => AppState.members.filter(m => m.status == 'pending')),
      };
    },
    components: { MemberCard }
}
</script>


<style lang="scss" scoped>

</style>