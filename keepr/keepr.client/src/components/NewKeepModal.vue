<template>
  <div id="newKeepModal" class="modal fade" tabindex="-1" aria-labelledby="newKeepModal" aria-hidden="true">
    <div class="modal-dialog modal modal-dialog-centered">
      <div class="bc-white modal-content container-fluid rounded">
        <div class="modal-header border-0">
          <div class="modal-title fs-2 fw-bold text-muted">Add your keep</div>
          <button @click="close()" type="button" class="btn-close" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="create()" class="form-control border-0 bc-white">
            <div class="mb-2">
              <!-- <label for="name" class="form-label">Name</label> -->
              <input v-model="data.name" class="bc-white form-control"  type="text" minlength="2" maxlength="255" id="keepname" placeholder="Name..." required >
            </div>
            <div class="mb-2">
              <!-- <label for="img" class="form-label">Image URL</label> -->
              <input v-model="data.img" class="bc-white form-control"  type="url" minlength="2" maxlength="2083" id="keepimg" placeholder="Image URL..." required >
            </div>
            <div class="mb-2">
              <!-- <label for="description" class="form-label">Description</label> -->
              <textarea v-model="data.description" class="bc-white form-control"  type="text" minlength="2" maxlength="500" id="keepdescription" placeholder="Description..." rows="4" required></textarea>
            </div>
            <div class="mb-2 d-flex justify-content-end">
              <button type="submit" class="btn tc-white bc-black">Create</button>
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
import { keepsService } from '../services/KeepsService.js';
import { Modal } from 'bootstrap';

export default {
  setup(){
    const data = ref({})

    async function create() {
      try {
        await keepsService.create(data.value)
        Pop.success(`'${data.value.name}' created successfully`)
        close()
      } catch (error) {
        logger.log(error)
        Pop.error(error.message)
      }
    }
    
    function close() {
      data.value = {}
      Modal.getOrCreateInstance('#newKeepModal').hide()
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