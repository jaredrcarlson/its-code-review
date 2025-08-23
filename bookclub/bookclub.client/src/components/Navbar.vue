<template>
  <nav class="navbar navbar-expand-md navbar-dark dark-blue-bg">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <h1>
          <i class="mdi mdi-book-open-page-variant-outline"></i>
          <span class="navbar-font ms-3">Jabb</span>
        </h1>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav ms-auto align-items-md-center">
        <li>
          <router-link :to="{ name: 'About Us' }" class="text-light selectable py-1 px-2">
            About Us
          </router-link>
        </li>
        <li class="nav-item dropdown mx-md-2 p-2">
            <a href="#" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
              Books
            </a>
            <ul class="dropdown-menu dropdown-menu-dark text-center py-3">
              <router-link :to="{ name: 'Book Search' }">
                <li class="dropdown-item px-4 mb-2">
                  Search Books
                </li>
              </router-link>
              <router-link :to="{ name: 'NYT Best Sellers'}">
                <li class="dropdown-item px-4 mb-2">
                  NYT Best Sellers
                </li>
              </router-link>
            </ul>
        </li>
        <li class="nav-item dropdown me-md-2 px-2">
          <a href="#" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
            Book Clubs
          </a>
          <ul class="dropdown-menu dropdown-menu-dark text-center py-3">
            <router-link :to="{ name: 'Book Clubs' }">
              <li class="dropdown-item px-4 mb-2">
                Search Book Clubs
              </li>
            </router-link>
            <router-link :to="{ name: 'Create Book Club' }" v-if="account.id">
              <li class="dropdown-item px-4 mb-2">
                Create Book Club
              </li>
            </router-link>
          </ul>
        </li>
        <!-- LOGIN COMPONENT HERE -->
        <Login class="px-2" />
      </ul>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue';
import Login from './Login.vue';
import { AppState } from '../AppState.js';
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}


.navbar li, .navbar a{
  font-size: 1.25rem;
}

nav {
  padding: 1rem 3rem
}

h1 i, h1 span {
  font-size: 3.5rem;
}

@media screen and (min-width: 768px) {
  nav {
    height: 100%;
  }
}
</style>
