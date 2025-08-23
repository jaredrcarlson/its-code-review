<template>
  <div id="keepDetailsModal" class="modal fade" tabindex="-1" aria-labelledby="keepDetailsModal" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered">
        <div v-if="keep" class="bc-pale modal-content container-fluid rounded">
            <div class="row bc-pale rounded">
              
              <div class="col-12 col-md-6 px-0 rounded">
                <img class="keep-img rounded-start" :src="keep.img" :alt="keep.name" :title="keep.name">  
              </div>
              
              <div class="col-12 col-md-6 py-3 d-flex flex-column justify-content-between">
                
                <div class="d-flex justify-content-center text-muted">
                  <div class="txt-info d-flex align-items-center pe-4" title="view count">
                    <i class="mdi mdi-eye-outline me-2 fs-4"></i>
                    <div class="fw-bold">{{ keep.views }}</div>
                  </div>
                  
                  <div class="txt-info d-flex align-items-center" title="kept count">
                    <i class="mdi mdi-alpha-k-box-outline me-2 fs-4"></i>
                    <div class="fw-bold">{{ keep.kept }}</div>
                  </div>
                </div>

                <div class="px-3"> 
                  <div class="text-center fw-bold fs-5">{{ keep.name }}</div>
                  <div>{{ keep.description }}</div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <select v-if="user.isAuthenticated" v-model="selectedVault" class="bc-pale border-0 selectable me-2" aria-label="Create Keep or Vault" required>
                      <option selected :value="{name: 'selectVault'}">Select Vault</option>
                      <option v-for="vault in vaults" :key="vault.id" :value="vault">{{ vault.name }}</option>
                    </select>
                  </div>
                  <div v-if="selectedVault.name != 'selectVault'">
                    <button @click="createVaultKeep(keep)" class="btn btn-sm save-btn me-1" title="Save to vault">Save</button>
                  </div>
                  <div v-if="user.isAuthenticated && user.id == keep.creatorId">
                    <button @click="deleteKeep(keep)" class="btn btn-sm delete-btn me-1" title="Delete keep">Delete</button>
                  </div>
                  <div class="d-flex align-items-center">
                    <router-link :to="{name: 'Profile', params: {profileId: keep.creatorId}}">
                      <img @click="close()" class="creator-img me-2" :src="keep.creator.picture" :alt="keep.creator.name" :title="keep.creator.name">
                    </router-link>
                      <div class="pe-1">{{ keep.creator.name }}</div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { AppState } from '../AppState.js';
import { vaultKeepsService } from '../services/VaultKeepsService.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { keepsService } from '../services/KeepsService.js';
import { Modal } from 'bootstrap';

export default {
  setup(){
    const selectedVault = ref({name: 'selectVault'})

    async function createVaultKeep(keep) {
      try {
        await vaultKeepsService.create({vaultId: selectedVault.value.id, keepId: keep.id})
        // await keepsService.update(keep.id, {kept: ++keep.kept})
        Pop.success(`'${keep.name}' kept in '${selectedVault.value.name}'`)
        close()
      } catch (error) {
        if(error.response.data.includes('Duplicate')) {
          Pop.error(`'${keep.name}' already exists in '${selectedVault.value.name}'`)
        } else {
          Pop.error(error.message)
        }
        logger.error(error)
      }
    }

    async function deleteKeep(keep) {
      try {
        const confirmed = await Pop.confirm()
        if(!confirmed) { return }
        await keepsService.remove(keep.id)
        Pop.success(`'${keep.name}' deleted successfully`)
        close()
      } catch (error) {
        Pop.error(error.message)
        logger.error(error)
      }
    }

    function close() {
      Modal.getOrCreateInstance('#keepDetailsModal').hide()
    }

    return {
      selectedVault,
      user: computed(() => AppState.user),
      keep: computed(() => AppState.keep),
      vaults: computed(() => AppState.accountVaults),
      createVaultKeep,
      deleteKeep,
      close
    }
  }
}
</script>

<style lang="scss" scoped>
.keep-img {
  width: 100%;
  height: auto;
  object-position: center;
}
</style>