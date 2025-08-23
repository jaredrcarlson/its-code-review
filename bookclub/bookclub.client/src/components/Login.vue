<template>
  <span class="navbar-text">
    <button class="btn orange-btn text-uppercase my-2 my-lg-0" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>
    <div v-else>
      <div class="dropdown my-2 my-lg-0" data-bs-theme="dark">
        <li class="nav-item dropdown me-md-2 px-2" aria-labelledby="authDropdown">
          <a href="#" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" v-if="account.picture || user.picture">
            <img :src="account.picture || user.picture" alt="account photo" class="account-img" />
          </a>
          <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-lg-end text-center py-3">
            <router-link :to="{ name: 'Account' }">
              <li class="dropdown-item px-4 mb-2">
                My Profile
              </li>
            </router-link>
            <router-link :to="{ name: 'Edit Account Page' }" v-if="account.id">
              <li class="dropdown-item px-4 mb-2">
                Edit Account
              </li>
            </router-link>
            <div @click="resetTour()" v-if="account.id">
              <li class="selectable dropdown-item px-4 mb-2">
                Tour JABB Site
              </li>
            </div>
            <li class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
              <i class="mdi mdi-logout"></i>
              Logout
            </li>
          </ul>
        </li>
      </div>
    </div>
  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { accountService } from "../services/AccountService.js"
import { useRouter } from "vue-router"
import { servePath } from '../env.js'
export default {
  setup() {
    const router = useRouter()
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin + servePath })
      },
      resetTour(){
        accountService.editAccount({needsTour: true}),
        router.push({name: 'Home'})
      }
    }
  }
}
</script>

<style lang="scss" scoped>

button {
  font-size: 1.35rem;
}
.account-img{
  height: 7vh;
  width: 7vh;
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
