<template>
  <!-- <span class="navbar-text">
    <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>
    <div v-else>
      <div class="dropdown my-2 my-lg-0">
        <div type="button" class="bg-dark border-0 selectable no-select" data-bs-toggle="dropdown" aria-expanded="false">
          <div v-if="account.picture || user.picture">
            <img :src="account.picture || user.picture" alt="account photo" height="40" class="rounded" />
          </div>
        </div>
        <div class="dropdown-menu dropdown-menu-lg-end dropdown-menu-start p-0" aria-labelledby="authDropdown">
          <div class="list-group">
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item dropdown-item list-group-item-action">
                Manage Account
              </div>
            </router-link>
            <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </div>
    </div>
  </span> -->
  <div class="fs-6">
    <div v-if="!user.isAuthenticated" class="d-flex flex-column align-items-center">
      <div class="mt-3">
        <button class="btn btn-sm btn-green" @click="login">Login</button>
      </div>
      <router-link :to="{ name: 'Home' }">
        <div class="mt-3 btn btn-sm selectable text-light">home</div>
      </router-link>
    </div>
    <div v-else class="d-flex flex-column align-items-center">
      <div class="mt-4 px-2">
        <img :src="account.picture" alt="account photo" class="img-fluid rounded border border-2 border-secondary" />
      </div>
      <router-link :to="{ name: 'Home' }">
        <div class="mt-3 btn btn-sm selectable text-light">home</div>
      </router-link>
      <router-link :to="{ name: 'Account' }">
        <div class="mt-3 btn btn-sm selectable text-light">Account</div>
      </router-link>
      <div class="mt-3">
        <button class="btn btn-sm btn-green" data-bs-toggle="modal" data-bs-target="#createEventModal">new event</button>
      </div>
      <div class="mt-4">
        <button class="btn btn-sm selectable text-light border border-1 border-light" @click="logout">logout</button>
      </div>      
    </div>
  </div>
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
.btn-new {
  background-color: #79E7AB;
}

.btn-new:hover {
  background-color: #55a077;
}


</style>
