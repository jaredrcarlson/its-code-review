<template>
  <div id="newVaultModal" class="modal fade" tabindex="-1" aria-labelledby="newVaultModal" aria-hidden="true">
    <div class="modal-dialog modal modal-dialog-centered">
      <div class="bc-white modal-content container-fluid rounded">
        <div class="modal-header border-0">
          <div class="modal-title fs-2 fw-bold text-muted">Add your vault</div>
          <button @click="close()" type="button" class="btn-close" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="create()" class="form-control border-0 bc-white">
            <div class="mb-2">
              <!-- <label for="name" class="form-label">Name</label> -->
              <input v-model="data.name" class="form-control bc-white"  type="text" minlength="2" maxlength="255" id="vaultname" placeholder="Name..." required >
            </div>
            <div class="mb-2">
              <!-- <label for="img" class="form-label">Image URL</label> -->
              <input v-model="data.img" class="form-control bc-white"  type="url" minlength="2" maxlength="2083" id="vaultimg" placeholder="Image URL..." required >
            </div>
            <div class="mb-2">
              <!-- <label for="description" class="form-label">Description</label> -->
              <textarea v-model="data.description" class="form-control bc-white"  type="text" minlength="2" maxlength="500" id="vaultdescription" placeholder="Description..." rows="10" required></textarea>
            </div>
            <div class="mt-3 mb-2 d-flex justify-content-end">
              <input id="isPrivate" v-model="data.isPrivate" type="checkbox" class="form-check-input bc-white me-2">
              <label for="isPrivate" class="form-check-label">Make Vault Private?</label>
            </div>
            <div class="mb-2 d-flex justify-content-end">
              <button type="submit" class="btn tc-white bc-black">Create Vault</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { vaultsService } from '../services/VaultsService.js';
import { Modal } from 'bootstrap';

export default {
  setup(){
    const data = ref({})

    async function create() {
      try {
        await vaultsService.create(data.value)
        Pop.success(`'${data.value.name}' created successfully`)
        close()
      } catch (error) {
        logger.log(error)
        Pop.error(error.message)
      }
    }

    function close() {
      data.value = {}
      Modal.getOrCreateInstance('#newVaultModal').hide()
    }

    return {
      data,
      create,
      close
    }
  }
}
</script>

<style lang="scss" scoped>
</style>