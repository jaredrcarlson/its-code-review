
<template>
  <div v-if="myEvents" class="row">
    <div class="fs-4 mb-2 text-tw-green">My Events</div>
    <div v-for="event in myEvents" :key="event.id" class="col-12 col-md-3 mb-3">
      <EventCard :event="event" />
    </div>
  </div>
  
  <div v-if="myTickets" class="row mt-4">
    <div class="fs-4 mb-2 text-tw-green">My Tickets</div>
  </div>
  <div v-for="ticket in myTickets" :key="ticket.id" class="row mb-3">
    <TicketCard :ticket="ticket" />
  </div>
</template>

<script>
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { AppState } from '../AppState';
import EventCard from '../components/EventCard.vue';
import TicketCard from '../components/TicketCard.vue';
import { ticketsService } from '../services/TicketsService.js';
import { eventsService } from '../services/EventsService.js';

export default {
  setup() {
    onBeforeMount(async() => {
      await eventsService.getEvents()
      await ticketsService.getMyTickets()
    })
    
    onMounted(async() => {
      // await eventsService.getMyEvents()
    })

    return {
      account: computed(() => AppState.account),
      events: computed(() => AppState.events),
      myEvents: computed(() => AppState.events.filter((event) => { return event.creatorId == AppState.account.id })),
      myTickets: computed(() => AppState.myTickets)
    }
  },
  components: { EventCard, TicketCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
