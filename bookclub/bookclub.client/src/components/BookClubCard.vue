<template>
  <router-link class="h-100" :to="`/bookclubdetails/${clubProp.id}/clubabout`">
    <div class="mx-3 h-100">
      <img class="img-fluid card-img" :src=clubProp.coverImg alt="card img">
      <div class="card-content dark-blue-bg p-3 text-light">
        <p class="fs-4">
          {{ clubProp.name }} 
          <span v-if="clubProp.private" class="badge orange-bg">Private Club</span>
          <span v-else class="badge light-blue-bg">Public Club</span>
        </p>
        <p v-if="width > 1350">
          {{ computedDescription(clubProp.description, 125) }}
        </p>
        <p v-else>
          {{ computedDescription(clubProp.description, 25) }}
        </p>
        <div class="d-flex justify-content-between">
          <span>
            <span>{{ clubProp.memberCount }}</span> club members
          </span>
        </div>
      </div>
    </div>
  </router-link>
</template>


<script>
import { onMounted, onUnmounted, ref } from 'vue';
import { Club } from '../models/Club.js';

export default {
  props:{
    clubProp: {type: Club, required: true}
  },
  setup(){

    const width = ref(null);
    function resize() {
      width.value = window.innerWidth;
    }

    onMounted(() => {
      resize()
      window.addEventListener("resize", resize);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", resize);
    });

    return {
      computedDescription(str, length) {
        if (str.length > 100) {
          return str.substring(0,length) + "..."
        }
        return str
      },
      width
    }
  }
}
</script>


<style lang="scss" scoped>
.card-img{
  height:40%;
  object-fit: cover;
  object-position: center;
}

.card-content {
  height: 60%;
}

</style>
