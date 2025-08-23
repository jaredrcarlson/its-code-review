<template>
  
    <div class="d-flex align-items-center text-light p-2 row">
        <div class="pe-3 col-4">
          <router-link :to="{name: 'Profile Page', params: {profileId: memberProp.profile.id}}">
            <img class="img-fluid avatar-img" :src=memberProp.profile.picture :alt=memberProp.profile.name>
          </router-link>
        </div>
        <div class="col-6">
          <p class="m-0">
            {{ memberProp.profile.name }}
          </p>
          <span v-if="memberProp.role == 'creator'"><i class="mdi mdi-star orange-text"></i>{{ memberProp.role.toUpperCase() }}</span>
          <span v-if="memberProp.role == 'admin'"><i class="mdi mdi-star-outline orange-text"></i>{{ memberProp.role.toUpperCase() }}</span>
        </div>
        <div class="col-2 text-end">
          <div  class="m-0 fs-3 dropdown">
            <i class="mdi mdi-dots-vertical" type="button" data-bs-toggle="dropdown" v-if="account.id == selectedClub.creatorId"></i>
            <div v-if="memberProp.status == 'pending'" class="dropdown-menu">
              <button @click="alterStatus('joined')" class="dropdown-item">
                <i class="mdi mdi-check"></i> Approve Request
              </button>
              <button @click="removeMembership" class="dropdown-item">
                <i class="mdi mdi-close-thick"></i> Deny Request
              </button>
              <button @click="alterStatus('blocked')" class="dropdown-item">
                <i class="mdi mdi-cancel"></i> Block User
              </button>
            </div>  
            <div v-if="memberProp.status == 'joined'" class="dropdown-menu">
              <button @click="removeMembership" class="dropdown-item">
                <i class="mdi mdi-close-thick"></i> Kick Member
              </button>
            </div>  
            <div v-if="memberProp.status == 'blocked'" class="dropdown-menu">
              <button @click="removeMembership" class="dropdown-item">
                <i class="mdi mdi-lock-open-variant"></i> Unblock User
              </button>
            </div>  
          </div>
        </div>
      </div>
</template>


<script>
import { computed } from 'vue';
import { Member } from '../models/Member.js';
import { AppState } from '../AppState';
import { membersService } from '../services/MembersService';
import Pop from '../utils/Pop';

export default {
  props:{
    memberProp: {type: Member, required:true}
  },

  setup(props){
    return {
      account: computed(() => AppState.account),
      selectedClub: computed(() => AppState.selectedClub),
      async removeMembership() {
        try { 
          await membersService.deleteMember(props.memberProp.id)
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async alterStatus(status) {
        try {
          await membersService.alterStatus(props.memberProp.id, status)
        } catch (error) {
          Pop.error(error.message)
        }
      },
    }
  }
}
</script>


<style lang="scss" scoped>
.avatar-img{
  height: 7vh;
  width: 7vh;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}
</style>