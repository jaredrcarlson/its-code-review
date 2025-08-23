<template>
  <span class="navbar-text">
    <button class="btn text-uppercase my-2 my-lg-0" @click="login"
      v-if="!user.isAuthenticated">
      <div class="tc-white bc-black rounded selectable">
        <div class="px-3 py-1">Login</div>
      </div>
    </button>
    <div v-else>
      <div class="dropdown my-2 my-lg-0">
        <div type="button" class="border-0 selectable no-select" data-bs-toggle="dropdown">
          <div v-if="account.picture || user.picture">
            <img :src="account.picture || user.picture" alt="account photo" height="40" class="account-img" />
          </div>
        </div>
        <div class="dropdown-menu dropdown-menu-lg-end dropdown-menu-start p-0" aria-labelledby="authDropdown">
          <div class="list-group">
            <router-link :to="{name: 'Profile', params: {profileId: user.id}}">
              <div class="new-btn dropdown-item list-group-item-action selectable">
                <i class="mdi mdi-account-circle-outline me-1"></i>Profile
              </div>
            </router-link>
            <router-link :to="{name: 'Account'}">
              <div class="new-btn dropdown-item list-group-item-action selectable">
                <i class="mdi mdi-account-outline me-1"></i>Account
              </div>
            </router-link>
            <router-link :to="{ name: 'Account Update' }">
              <div class="new-btn dropdown-item list-group-item-action selectable">
                <i class="mdi mdi-account-edit-outline me-1"></i>Edit
              </div>
            </router-link>
            <div class="new-btn dropdown-item list-group-item-action selectable" @click="logout">
              <i class="mdi mdi-logout"></i>
              Logout
            </div>
          </div>

        </div>

      </div>
    </div>
  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { servePath } from '../env.js'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin + servePath })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.account-img{
  height: 5vh;
  width: 5vh;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

@media(min-width: 768px){
  .account-img{
    height: 5vh;
    width: 5vh;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
