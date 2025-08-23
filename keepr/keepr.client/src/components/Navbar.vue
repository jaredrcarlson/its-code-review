<template>
  <!-- NOTE needs cleaned up -->
  <nav class="navbar navbar-expand-lg px-3">
    <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarText">
      <div class="order-md-1 order-2">
        <div class="d-flex">
          <div class="home-nav-btn">
            <router-link :to="{ name: 'Home' }" class="btn">
              <div class="bc-peach rounded selectable">
                <div class="px-3 py-1">Home</div>
              </div>
            </router-link>
          </div>  
          <div v-if="user.isAuthenticated" class="dropdown my-2 my-lg-0">
            <div class="create-btn border-0" data-bs-toggle="dropdown">
              <div class="ms-1 mt-2 pt-1">Create<i class="mdi mdi-menu-down"></i></div>
            </div>
            <div class="dropdown-menu dropdown-menu-center p-0">
              <div class="list-group">
                <div @click="openModal('newKeepModal')" class="new-btn dropdown-item list-group-item-action selectable">
                  New Keep
                </div>
                <div @click="openModal('newVaultModal')" class="new-btn dropdown-item list-group-item-action selectable">
                  New Vault
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="keepr-logo ms-3 ms-md-0 me-md-5 order-md-2 order-1">
        <router-link :to="{ name: 'Home' }" class="">
          <img alt="logo" src="../assets/img/keeper-logo.png" height="45" />
        </router-link>
      </div>
      <div class="pe-5 order-3 bc-pale">
        <Login />
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue';
import Login from './Login.vue';
import { Modal } from 'bootstrap';
import { computed } from 'vue';
import { AppState } from '../AppState.js';
export default {
  setup() {
    const modalId = ref("none")
    return {
      user: computed(() => AppState.user),
      modalId,
      openModal(name) {
        if(name != 'none') {
          Modal.getOrCreateInstance(`#${name}`).show()
        }
      }
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

nav {
  border-bottom: 3px solid lightgray;
}

.nav-link {
  text-transform: uppercase;
}

.keepr-logo:hover {
  color: rgba(255, 255, 255, 1);
  box-shadow: 0 0 10px rgba(135, 122, 143, .8);
}

/* .navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
} */

.home-nav-btn {
  display: none;
}

@media screen and (min-width: 768px) {
  /* nav {
    height: 64px;
  } */

  .home-nav-btn {
    display: block;
  }
}
</style>
