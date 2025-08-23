<template>
  <!-- <div class="keep-card elevation-4" :style="{ backgroundImage: `url(${keep.img})` }"> -->
  <div @click="openKeepModal(keep, modalId)" class="keep-card elevation-4 selectable m-2">
    <img class="keep-img img-fluid" :src="keep.img" :alt="keep.name" :title="keep.name"/>
    <img class="creator-img m-2" :src="keep.creator.picture" :alt="keep.creator.name" :title="keep.creator.name">
    <div class="keep-content tc-white txt-shadow px-3 fs-4">{{ keep.name }}</div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import { Keep } from '../models/Keep.js';
import { keepsService } from '../services/KeepsService.js';
import { accountService } from '../services/AccountService.js';
import { AppState } from '../AppState.js';

export default {
  props: {
    keep: {type: Keep, required: true},
    modalId: {type: String, required: true}
  },

  setup(){
    return {
      openKeepModal(keep, modalId) {
        keepsService.getById(keep.id)
        if(AppState.account.id) {
          accountService.getAccountVaults()
        }
        // keepsService.update(keep.id, {views: ++keep.views})
        Modal.getOrCreateInstance(`#${modalId}`).show()
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.keep-card {
  position: relative;
  border-radius: 8px;
}

.keep-img {
  border-radius: 8px;
}

.keep-content {
  position: absolute;
  bottom: 10px;
}

.creator-img {
  position: absolute;
  bottom: 1px;
  right: 10px;
}
</style>