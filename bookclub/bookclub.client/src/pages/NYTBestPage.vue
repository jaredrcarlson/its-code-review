<template>
  <div class="container-fluid ghost-bg">
    <section class="row">
      <div class="col-12 mt-3 text-center">
          <h1>
            The New York Times Best Sellers
          </h1>
          <p>
            Find your new favorite book from The New York Times!
          </p>
      </div>
    </section>
    <section class="row" v-if="Array.isArray(nytLists)">
      <NYTListCard />
    </section>
    <section class="row" v-else>
      <div class="col-12">
        <h1 class="text-dark">
          Loading... <i class="mdi mdi-loading mdi-spin"></i>
        </h1>
      </div>
    </section>
  </div>
</template>


<script>
import { computed, onMounted } from 'vue'
import { newYorkTimesService } from '../services/NewYorkTimesService.js'
import Pop from '../utils/Pop.js'
import NYTListCard from '../components/NYTListCard.vue'
import { AppState } from '../AppState.js'

export default {
    setup() {
        async function getTopBooks() {
            try {
                await newYorkTimesService.getTopBooks();
            }
            catch (error) {
                Pop.error(error.message);
            }
        }
        onMounted(() => {
            getTopBooks();
        });
        return {
          nytLists: computed(() => AppState.nytLists)
        };
    },
    components: { NYTListCard }
}
</script>


<style lang="scss" scoped>

</style>