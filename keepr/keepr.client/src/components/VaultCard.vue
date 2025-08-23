<template>
    <div class="vault-card elevation-4">
      <img class="vault-img img-fluid" :src="vault.img" :alt="vault.name"/>
      <div class="vault-content d-flex justify-content-between align-items-center">
        <div class="tc-white txt-shadow m-0 p-2 fs-4">{{ vault.name }}</div>
        <div v-if="vault.isPrivate" class="tc-black bc-white lock d-flex align-items-center justify-content-center">
          <i class="mdi mdi-lock fs-5"></i>
        </div>
      </div>
    </div>
</template>


<script>
import { Vault } from '../models/Vault.js';

export default {
  props: {
    vault: {type: Vault, required: true}
  },

  setup(){
    return {}
  }
  
}
</script>


<style lang="scss" scoped>
.vault-card {
  position: relative;
  border-radius: 8px;
}

.vault-img {
  border-radius: 8px;
}

.vault-content {
  position: absolute;
  bottom: 8px;
}

.lock{
  height: 4vh;
  width: 4vh;
  border-radius: 50%;
}
</style>