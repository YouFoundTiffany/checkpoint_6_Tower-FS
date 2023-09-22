<template>
  <!-- FIXME do I need a v-for here? so I can reference the account? -->
  <div v-if="account" class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="container">
    <h3 class="text-center">Tickets you have!</h3>
    {{ myTickets }}
    <!-- <div v-for="ticket in myTickets" :key="ticket.id"  class="row pt-3 justify-content-between"> -->
<!-- <MyTickets :event="ticket.event"/> -->
      <!-- <div class="col-3 p-2 card elevation-3 text-center">
        ${Tickets for events I have purchased.}
      </div>
      <div class="col-3 p-2 card elevation-3 text-center">
        ${Tickets for events I have purchased.}
      </div>
        <div class="col-3 p-2 card elevation-3 text-center">
        ${Tickets for events I have purchased.} -->
      </div>
    <!-- </div> -->
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

       async function getMyTicketsByAcc(){
      try {
        await accountService.getMyTicketsByAcc()

      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      myTickets: computed(() => AppState.myTickets)
      // account: computed(() => AppState.account)
    }
  },
// components: {MyTickets}
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
