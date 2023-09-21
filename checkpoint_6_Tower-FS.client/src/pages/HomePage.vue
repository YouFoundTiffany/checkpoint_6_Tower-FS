<template>
  <section class="container-flex">
    <div class="row pb-4">
  <img class="banner-img" src="https://images.unsplash.com/photo-1561489396-888724a1543d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Tower Events ltd">
</div>
      </section>
  <div class="container">

      <section class="row">
        <!-- {{ myComments }} -->
        <!-- <div v-for="comments in myComments" :key="comment.id" class="col-6 col-md-2">
          <EventCard :event="comments.event"/>
        </div> -->
      </section>

      <!-- STUB filter bar -->
      <section class="row bg-info gap-2 p-2 rounded my-2">
        <!-- NOTE changing the ref value here recomputes the album computed -->
        <!-- <div class="col-12 bg-info d-flex p-2 rounded justify-content-between"> -->
          <button class="btn col btn-outline-light" @click="filterBy = ''">All</button>
          <button class="btn col btn-outline-light" @click="filterBy = 'concert'">Concerts</button>
          <button class="btn col btn-outline-light" @click="filterBy = 'convention'">Conventions</button>
          <button class="btn col btn-outline-light" @click="filterBy = 'sport'">Sports</button>
          <button class="btn col btn-outline-light" @click="filterBy = 'digital'">Digital</button>
          <button class="btn col btn-outline-light" @click="filterBy = 'misc'">Misc</button>
        <!-- </div> -->
      </section>

      <!-- STUB album cards -->
      <section class="row g-4 pt-4">
Hello
        <div v-for="event in events" :key="event.id" class="col-6 col-md-3">
          <!-- {{ event.name }} -->
          <EventCard :event="event"/>
        </div>

      </section>
    </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue';

import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js'
import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js';
import {EventCard} from '../components/EventCard.vue'
// import { accountService } from '../services/AccountService.js';

export default {
  setup() {
    onMounted(() => {
      getEvents();
    });
    const filterBy = ref('')
    logger.log('?')
    async function getEvents() {
      try {
        await eventsService.getEvents();

      }
      catch (error) {
        Pop.error(error);
      }
    }




    return {
      filterBy,
      events: computed(() => {
        if (!filterBy.value) {
          return AppState.events
        } else {
          return AppState.events.filter(event => event.type == filterBy.value)
        }
      }),

    };
  },
components: {EventCard}
}
</script>

<style scoped lang="scss">

.banner-img{
  max-height: 200px;
  width: 100%;
  object-fit: cover;
  object-position: center center;
}

.event-tile{
  height: 100%;
  max-width: 320px;
}
.eventImage-tile{
width: 100%;
max-height: 200px;
object-fit: cover;
  object-position: center center;
}
.profile-pic {
  height: 30px;
  width: 30px;
  object-fit: contain;
  object-position: center center;
  border-radius: 50em;
  }
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;


}
</style>


<!-- OLD HTML HARD CODED -->
  <!-- <div  class="row pb-2 gap-3 justify-content-around"> -->
     <!-- <div class="col-2 pb-1 card event-tile">
       <img class="eventImage-tile" src="https://images.unsplash.com/photo-1576438977080-b015e72145d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29taWMlMjBjb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1000&q=60" alt="">
<h3 class="text-center">Event Title</h3>
    </div> -->
   <!-- <div class="col-2 pb-1 card event-tile">
    <img class="eventImage-tile" src="https://images.unsplash.com/photo-1564048171305-0dce5c555dbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29taWMlMjBjb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1000&q=60" alt="">
    <h3 class="text-center">Event Title</h3>
   </div> -->
    <!-- <div class="col-2 pb-1 card event-tile">
    <img class="eventImage-tile" src="https://images.unsplash.com/photo-1550305080-4e029753abcf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29uZmVyZW5jZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=60" alt="">
    <h3 class="text-center">Event Title</h3>
   </div> -->
    <!-- <div class="col-2 pb-1 card event-tile">
    <img class="eventImage-tile" src="https://images.unsplash.com/photo-1600320844678-43cebba1cdfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbmZlcmVuY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1000&q=60" alt="">
    <h3 class="text-center">Event Title</h3>
  </div> -->
  <!-- </div> -->