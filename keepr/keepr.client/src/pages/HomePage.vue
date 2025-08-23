<!-- <template>
  <div class="container-fluid">
    <div class="row mt-4 gx-3 mx-4">
      <div v-for="keep in keeps" :key="keep.id" class="col-6 col-md-3 mb-3">
        <KeepCard :keep="keep" :modalId="'keepDetailsModal'" />
      </div>
    </div>
  </div>
</template> -->
<template>
  <div class="containter">
    <div class="row mt-3 mx-1">
      <div class="col-12">
        <KeepMasonryWall :keepsSource="'keeps'" />
      </div>
    </div>
  </div>
  <!-- <div class="container-fluid">
    <div class="row mt-4 gx-3 mx-4">
      <div v-for="keep in keeps" :key="keep.id" class="col-6 col-md-3 mb-3">
        <KeepCard :keep="keep" :modalId="'keepDetailsModal'" />
      </div>
    </div>
  </div> -->
</template>


<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { keepsService } from '../services/KeepsService.js';
import KeepCard from '../components/KeepCard.vue';
import KeepMasonryWall from '../components/KeepMasonryWall.vue';

export default {
  // components: { KeepCard },
  components: { KeepMasonryWall },
  setup() {

    onMounted(() => {
      keepsService.get()
    })

    return {
      // keeps: computed(() => AppState.keeps)
    }
  }
}
</script>

<style scoped lang="scss">
// .home {
//   display: grid;
//   height: 80vh;
//   place-content: center;
//   text-align: center;
//   user-select: none;

//   .home-card {
//     width: 50vw;

//     >img {
//       height: 200px;
//       max-width: 200px;
//       width: 100%;
//       object-fit: contain;
//       object-position: center;
//     }
//   }
// }
</style>
