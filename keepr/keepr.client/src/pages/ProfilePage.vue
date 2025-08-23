<template>
  <div class="container">
    <div v-if="profile" class="row mt-3">
      <div class="col-12" align="center">
        <div class="cover-img d-flex flex-column align-items-center">
          <img class="cover-img img-fluid" :src="profile.coverImg" :alt="profile.name" :title="profile.name"/>
          <img class="profile-img" :src="profile.picture" :alt="profile.name" :title="profile.name">
        </div>
      </div>
    </div>
        
    <div v-if="profile && vaults && keeps" class="row mt-4">
      <div class="col-12 d-flex flex-column align-items-center">
        <div class="mt-4 fs-4 fw-bold">
          {{ profile.name }}
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
import { computed, onMounted, watchEffect, onUnmounted } from 'vue';
import { AppState } from '../AppState';
import VaultCard from '../components/VaultCard.vue';
import KeepCard from '../components/KeepCard.vue';
import { profilesService } from '../services/ProfilesService.js';
import { useRoute } from 'vue-router';

export default {
  components: { VaultCard },
  setup() {
    const route = useRoute()

    function init() {
      profilesService.getProfileById(route.params.profileId)
      profilesService.getVaultsByProfileId(route.params.profileId)
      profilesService.getKeepsByProfileId(route.params.profileId)
    }

    onMounted(() => {
      init()
    })

    watchEffect(() => {
      route
      init()
    })

    onUnmounted(() => {
      // profilesService.clear()
    })

    return {
      profile: computed(() => AppState.profile),
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

.profile-img {
  position: absolute;
  bottom: -6vh;
  height: 12vh;
  width: 12vh;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

</style>
