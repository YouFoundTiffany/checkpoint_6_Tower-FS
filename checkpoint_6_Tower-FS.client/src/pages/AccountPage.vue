<template>
  <div class="container">

    <div v-if="account" class="row text-center justify-content-center">
      <div class="col-12">
        <h1>Welcome {{ account.name }}</h1>
      </div>
      <div class="col-12">
        <img class="rounded mx-auto d-block" :src="account.picture" alt="" />
      </div>
      <div class="col-12">
        <p>{{ account.email }}</p>
      </div>
    </div>

    <div class="row">
      <div class="col-12 text-center">
        <h3>Your Tickets!</h3>
      </div>
    </div>

    <div class="row gy-4 justify-content-center">
      <div v-for="ticket in myTickets" :key="ticket.id" class="col-4 text-center">
        <MyTickets :ticket="ticket" />
        <!-- Consider using the below code if you need to display ticket names outside the MyTickets component -->
        <!-- <div>{{ ticket.event.name }}</div> -->
      </div>
    </div>

  </div>
</template>



<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import { accountService } from '../services/AccountService.js';
import Pop from '../utils/Pop.js';
import MyTickets from '../components/MyTickets.vue';




export default {

  setup() {
    onMounted(() => {
      getMyTicketsByAcc()
    })

    async function getMyTicketsByAcc() {
      try {
        await accountService.getMyTicketsByAcc()

      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      myTickets: computed(() => AppState.myTickets),
      account: computed(() => AppState.account)
    }
  },
  components: { MyTickets }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
