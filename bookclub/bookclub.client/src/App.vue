<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  components: { Navbar },
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Shadows+Into+Light&display=swap');

:root{
  --main-height: calc(100vh - 32px - 64px);
}

.navbar-font{
  font-family: 'Shadows Into Light', cursive;
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: #EBF2FA;
}


.ghost-bg{
  background-color: #EBF2FA;
}

.dark-blue-bg{
  background-color: #1D3354;
}

.orange-bg{
  background-color: #FB5607;
}

.orange-btn{
  background-color: #FB5607;
  color: white;
}

.orange-btn:hover{
  border-color: #FB5607;
  color: #FB5607;
}

.orange-text{
  color: #FB5607;
}

.light-blue-bg{
  background-color: #5084D2;
}

.light-blue-btn{
  background-color: #5084D2;
  color: white;
}

.light-blue-btn:hover{
  border-color: #5084D2;
  color: #5084D2;
}

.soft-blue-btn{
  background-color: #a6e1fa;
  color: black;
}

.soft-blue-btn:hover{
  border-color: #7abcd8;
  color: #183a48;
}

@media screen and (min-width: 768px) {
  header {
    height: 15vh;
  }
  
  main {
    height: 85vh;
  }
}

</style>
