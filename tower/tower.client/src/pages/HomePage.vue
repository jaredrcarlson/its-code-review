<template>
  <!-- <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="home-card p-5 bg-white rounded elevation-3">
      <img src="https://bcw.blob.core.windows.net/public/img/8600856373152463" alt="CodeWorks Logo"
        class="rounded-circle">
      <h1 class="my-5 bg-dark text-white p-3 rounded text-center">
        Vue 3 Starter
      </h1>
    </div>
  </div> -->
  <div class="row">
    <div class="col-12">
      <div class="d-flex justify-content-center">
        <img src="../assets/img/concert.png" class="hero img-fluid">
      </div>
    </div>
  </div>
  <div class="row mt-3">
    <div class="col-12">
      <div class="category d-flex justify-content-around">
          <div v-for="category in eventTypes" :key="category" @click="filterByCategory(category)"
          class="py-2 text-center btn-category" v-bind:class="{'text-category-select': category == filter}">
            {{ category }}
          </div>
      </div>
    </div>
  </div>
  <!-- <div class="row">
    <div class="col-12">
      <div class="d-flex justify-content-between">
        <div v-for="category in categories" :key="category"
        class="py-2 text-center" v-bind:class="{'category-select': category == selected, 'category-unselect': category != selected}">x
        </div>
      </div>
    </div>
  </div> -->
  <div class="row mt-3">
    <div v-for="event in filteredEvents" :key="event.id" class="col-12 col-md-3 mb-3">
      <EventCard :event="event" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import EventCard from '../components/EventCard.vue';

  const filter = ref('All')
  
  function filterByCategory(category) {
    filter.value = category
    eventsService.filterByCategory(category)
  }

  async function getEvents() {
    await eventsService.getEvents()
  }

  export default {
    setup() {     
      onMounted(async() => {
        await getEvents()
      })

      onUnmounted(async() => {
        // await ticketsService.getMyTickets()
      })
      
      return {
        events: computed(() => AppState.events),
        filteredEvents: computed(() => AppState.filteredEvents),
        eventTypes: computed(() => AppState.eventTypes),
        filter,
        filterByCategory
      }
    },
    components: { EventCard }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";

.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.hero {
  border-radius: 0.2rem;
  border: 1px solid var(--tw-light-blue);
  width: 88dvw;
  height: 18dvh;
  object-fit: cover;
}

.category {
  border-radius: 0.2rem;
  background-color: var(--tw-secondary);
}

.btn-category:hover {
  cursor: pointer;
}

.text-category-select {
  color: var(--tw-green);
}

.category-select {
  height: 5px;
  color: var(--tw-dark);
  background-color: var(--tw-green);
  width: 15vw;
}

.category-unselect {
  color: var(--tw-dark);
}

</style>
