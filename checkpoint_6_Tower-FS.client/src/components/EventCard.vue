<template>
  <router-link :to="{ path: `events/${event.id}` }">
    <div class="card event-card">

      <img :src="event.coverImg" alt="event image">
      <div>
        <p class="text-center fw-bold">{{ event.name }}</p>
        <p class="text-center">{{ event.ticketCount }} <i class="mdi mdi-ticket"></i></p>
      </div>
    </div>
  </router-link>
</template>


<script>
// import { AppState } from '../AppState';
// import { computed, reactive, onMounted } from 'vue';
import { TEvent } from '../models/Event.js';
export default {

  props: { event: { type: TEvent || Object, required: true } },
  setup() {
    return {}
  }
};
</script>


<style lang="scss" scoped>
.event-card {
  img {
    height: 30vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>