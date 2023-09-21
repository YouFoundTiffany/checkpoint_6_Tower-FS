<template>
  <section class="container-flex">
    <div class="row pb-4">
  <img class="banner-img" src="https://images.unsplash.com/photo-1561489396-888724a1543d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Tower Events ltd">
</div>
</section>
 <section class="container-flex">
   {{ e.name }} {{ e.name }}
   Hello

  <!-- <div  v-for="e in events" :key="e.id" class="row pb-2 gap-3 justify-content-around"> -->

    <!--STUB Event Card Here -->

       <!-- <AlbumCard :event="e"/> -->
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
 </section>
</template>

<script>
import { onMounted, ref, computed } from 'vue';

import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js'
import { AppState } from '../AppState.js'
// import EventCard from '../components/EventCard.vue';
// import { accountService } from '../services/AccountService.js';

export default {
  setup() {
    onMounted(() => {
      getEvents();
      // FIXME DO NOT GET THE ACCOUNTS INFO ON LOAD OF A PAGE
      // getMyCollaborations()
    });
    const filterBy = ref('')
    async function getEvents() {
      try {
        await eventsService.getEvents();
      }
      catch (error) {
        Pop.error(error);
      }
    }
    // async function getMyCollaborations(){
    //   try {
    //     await accountService.getMyCollaborations()

    //   } catch (error) {
    //     Pop.error(error)
    //   }
    // }



    return {
      filterBy,
      events: computed(() => {
        // NOTE computeds can be multi-line but then need explicit returns
        if (!filterBy.value) {
          return AppState.events
        } else {
          return AppState.events.filter(event => event.category == filterBy.value)
        }
      }),
      myCollaborations: computed(() => AppState.myCollaborations)
    };
  },
  // components: { EventCard }
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
