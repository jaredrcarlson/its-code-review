<template>
  <router-link :to="{name: 'EventDetails', params: {eventId: event.id}}">
    <div class="event-card">
      <img class="img-fluid event-img" :src="event.coverImg" alt="Event Photo" :title="event.name">
      <div class="p-2 text-tw-light bg-tw-secondary">
        <div class="fw-bold">{{ event.name }}</div>
        <div class=""><small>{{ event.location }}</small></div>
        <div class=""><small>{{ event.day }}</small></div>
        <div v-if="event.isCanceled" class="mt-2 canceled bg-tw-yellow fw-bold text-dark">Canceled</div>
        <div v-else-if="!event.capacity" class="mt-2 canceled bg-tw-yellow fw-bold text-dark">Sold Out</div>
        <div v-else class=""><small>Capacity: <span class="text-tw-light-blue">{{ event.capacity }}</span></small></div>
      </div>
    </div>
  </router-link>
</template>


<script>
import { TEvent } from '../models/TEvent.js';

export default {
  props: {
    event: {type: TEvent, required: true}
  },
  
  setup(){
    return {}
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
  object-fit: contain;
  object-position: center;
}

.canceled {
  text-align: center;
  color: black;
}
</style>