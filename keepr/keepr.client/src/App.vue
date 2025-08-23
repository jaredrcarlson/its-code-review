<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
    <KeepDetailsModal />
    <VaultKeepDetailsModal />
    <NewKeepModal />
    <NewVaultModal />
  </main>
  <footer>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import KeepDetailsModal from './components/KeepDetailsModal.vue';
import VaultKeepDetailsModal from './components/VaultKeepDetailsModal.vue';
import NewKeepModal from './components/NewKeepModal.vue';
import NewVaultModal from './components/NewVaultModal.vue';

export default {
  components: { Navbar, KeepDetailsModal, VaultKeepDetailsModal, NewVaultModal, NewKeepModal },
  setup() {
    return {
      appState: computed(() => AppState),
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

$color0: #F9F6FA;
$color1: #FEF6F0;
$color2: #E9D8D6;
$color3: #DED6E9;
$color4: #877A8F;
$color5: #2D2D2D;
$clrRed: #ce1c1c;

.tc-white{
  color: $color0;
}

.tc-pale{
  color: $color1;
}

.tc-peach{
  color: $color2;
}

.tc-light-purple{
  color: $color3;
}

.tc-dark-purple{
  color: $color4;
}

.tc-black{
  color: $color5;
}

.bc-white{
  background-color: $color0;
}

.bc-pale{
  background-color: $color1;
}

.bc-peach{
  background-color: $color2;
}

.bc-light-purple{
  background-color: $color3;
}

.bc-dark-purple{
  background-color: $color4;
}

.bc-black{ 
  background-color: $color5;
}

.new-btn {
  background-color: $color3;
  color: $color5;
  
  &:hover {
    background-color: $color4;
    color: $color1;
  }
}

.create-btn {
  background-color: $color1;
  color: $color5;
  
  &:hover {
    cursor: pointer;
    background-color: $color1;
    color: $color5;
  }
}

.save-btn {
  background-color: $color4;
  color: $color1;
  
  &:hover {
    background-color: $color4;
    color: $color5;
  }
}

.delete-btn {
  background-color: $clrRed;
  color: $color1;
  
  &:hover {
    background-color: $clrRed;
    color: $color5;
  }
}

.txt-shadow {
  text-shadow: 1px 1px 3px $color5;
}

.txt-info:hover {
  cursor: default;
  // text-shadow: 0px 0px 2px $color4;
}

:root{
  --main-height: calc(100vh - 32px - 64px);
}

header, body{
  background-color: $color1;
}

.creator-img{
  height: 7vh;
  width: 7vh;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;

  @media only screen and (max-width: 767px){
    height: 3vh;
    width: 3vh;
  }
}


</style>
