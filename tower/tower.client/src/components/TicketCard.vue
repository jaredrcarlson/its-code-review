<template>
  <div class="col-2"></div>
  <div class="col-8">
    <div class="row g-0">
      <div class="col-5 col-md-4">
        <img class="img-fluid event-img rounded-start" :src="ticket.event.coverImg" alt="Event Photo" :title="ticket.event.name">
      </div>
      <div class="col-7 col-md-8 p-2 bg-tw-secondary d-flex flex-column rounded-end">
        <div>
          <div class="fw-bold">{{ ticket.event.name }} <span v-if="ticket.event.isCanceled" class="px-2 text-center fw-bold bg-tw-yellow text-dark">Canceled</span></div>
          <div class=""><small>{{ ticket.event.location }}</small></div>
          <div class=""><small>{{ ticket.event.day }}</small></div>
        </div>
        <div class="d-flex justify-content-end">
          <button class="mt-2 btn btn-sm btn-red" @click="deleteTicket()">Delete</button>
        </div>
      </div>
    </div>
  </div>
  <div class="col-2"></div>
</template>


<script>
import { Ticket } from '../models/Ticket.js';
import Pop from '../utils/Pop.js';
import { ticketsService } from '../services/TicketsService.js';

export default {
  props: {
    ticket: {type: Ticket, required: true}
  },
  
  setup(props){
    async function deleteTicket() {
      const confirmed = await Pop.confirm()
      if(!confirmed) {
        return
      }
      try {
        await ticketsService.deleteTicket(props.ticket.id)
      } catch (error) {
        Pop.error(error.message)
      }
    }

    return {
      deleteTicket
    }
  }
}
</script>


<style lang="scss" scoped>
.event-card {
  border-radius: 0.2rem;
  border: 3px solid var(--tw-secondary);
  // height: 25vh;
  // width: 22vw;
  
}

.event-img {
  object-fit: cover;
  object-position: center;
}

.canceled {
  text-align: center;
  color: black;
}
</style>