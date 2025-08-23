<template>
  <div class="container">
    <div v-if="account.id" class="row mt-3">
      <div class="col-12" align="center">
        <div class="cover-img d-flex flex-column align-items-center">
          <img class="cover-img img-fluid" :src="account.coverImg" :alt="account.name" :title="account.name"/>
          <img class="account-img" :src="account.picture" :alt="account.name" :title="account.name">
        </div>
      </div>
    </div>
        
    <div v-if="account.id && vaults && keeps" class="row mt-4">
      <div class="col-12 d-flex flex-column align-items-center">
        <div class="mt-4 fs-4 fw-bold">
          {{ account.name }}
        </div>
        <div class="text-muted">
          {{ vaults.length }} Vaults | {{ keeps.length }} Keeps
        </div>
      </div>
    </div>

    <div v-if="vaults" class="row">
      <div class="col-12">
        <div class="fs-3 fw-bold mb-2">Vaults</div>
        <div class="row mx-1">
          <div v-for="vault in vaults" :key="vault.id" class="col-6 col-md-3 mb-3 px-2">
            <router-link :to="{name: 'Vault', params: {vaultId: vault.id}}">
              <VaultCard :vault="vault" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="keeps" class="row">
      <div class="col-12">
        <div class="fs-3 fw-bold mb-2">Keeps</div>
        <!-- <div class="row">
          <div v-for="keep in keeps" :key="keep.id" class="col-6 col-md-3 mb-3">
            <KeepCard :keep="keep" :modalId="'keepDetailsModal'" />
          </div>
        </div> -->
        <KeepMasonryWall :keepsSource="'profileKeeps'" />
      </div>
    </div>
        
  </div>
</template>

<script>
import { computed, watchEffect } from 'vue';
import { AppState } from '../AppState';
import VaultCard from '../components/VaultCard.vue';
import KeepCard from '../components/KeepCard.vue';
import { profilesService } from '../services/ProfilesService.js';
import { useRoute } from 'vue-router';
import { onBeforeMount } from 'vue';

export default {
  components: { VaultCard },
  setup() {

    function init(account) {
      if(account.id) {
        profilesService.getVaultsByProfileId(account.id)
        profilesService.getKeepsByProfileId(account.id)
      }
    }

    onBeforeMount(() => {
      init(AppState.account)
    })

    watchEffect(() => {
      init(AppState.account)
    })

    return {
      account: computed(() => AppState.account),
      vaults: computed(() => AppState.profileVaults),
      keeps: computed(() => AppState.profileKeeps)
    }
  }
}
</script>

<style scoped>
.cover-img {
  position: relative;
  max-width: 45vw;
  border-radius: 8px;
}

.account-img {
  position: absolute;
  bottom: -6vh;
  height: 12vh;
  width: 12vh;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

</style>
