<template>
  <div id="vaultKeepDetailsModal" class="modal fade" tabindex="-1" aria-labelledby="vaultKeepDetailsModal" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered">
        <div v-if="keep" class="bc-pale modal-content container-fluid rounded">
            <div class="row bc-pale rounded">
              
              <div class="col-12 col-md-6 ps-0">
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
                    <button v-if="user.isAuthenticated && user.id == vault?.creatorId" @click="removeVaultKeep(vault, keep.id)" class="btn btn-sm delete-btn" title="Remove from vault">Remove</button>
                  </div>
                  <div class="d-flex align-items-center">
                    <img class="creator-img me-2" :src="keep.creator.picture" :alt="keep.creator.name" :title="keep.creator.name">
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
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { vaultKeepsService } from '../services/VaultKeepsService.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { keepsService } from '../services/KeepsService.js';
import { Modal } from 'bootstrap';
import { vaultsService } from '../services/VaultsService.js';

export default {
  setup(){
    async function removeVaultKeep(vault, keepId) {
      try {
        const confirmed = await Pop.confirm()
        if(!confirmed) { return }
        const keep = vault.keeps.find(k => k.id == keepId)
        await vaultKeepsService.remove(keep.vaultKeepId)
        // await keepsService.update(keep.id, {kept: --keep.kept})
        vaultsService.removeKeep(keep)
        Pop.success(`'${keep.name}' removed from '${vault.name}'`)
        close()   
      } catch (error) {
        logger.log(error)
        Pop.error(error.message)
      }
    }

    function close() {
      Modal.getOrCreateInstance('#vaultKeepDetailsModal').hide()
    }

    return {
      user: computed(() => AppState.user),
      keep: computed(() => AppState.keep),
      vault: computed(() => AppState.vault),
      removeVaultKeep,
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