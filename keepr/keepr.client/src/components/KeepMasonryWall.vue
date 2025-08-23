<template>
  <masonry-wall v-if="keeps" :items="keeps" :column-width="200" :min-columns="2" :max-columns="4">
    <template #default="{ item }">
      <KeepCard v-if="keepsSource == 'vault.keeps'" :keep="item" :modalId="'vaultKeepDetailsModal'" />
      <KeepCard v-else :keep="item" :modalId="'keepDetailsModal'" />
    </template>
  </masonry-wall>
</template>


<script>
import { computed } from 'vue';
import KeepCard from '../components/KeepCard.vue';
import { AppState } from '../AppState.js';

export default {
  props: {keepsSource: {type: String, required: true}},
  components: { KeepCard },
  setup(props){
    return {
      keeps: computed(() => {
        let keepsSource = null
        switch (props.keepsSource) {
          case 'keeps':
            keepsSource = AppState.keeps
            break;
          case 'profileKeeps':
            keepsSource = AppState.profileKeeps
            break;
          case 'vault.keeps':
            keepsSource = AppState.vault.keeps
            break;
        }
        return keepsSource
      })
    }
  }
}
</script>


<style lang="scss" scoped>

</style>