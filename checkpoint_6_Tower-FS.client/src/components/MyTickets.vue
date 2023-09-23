<template>
  <div class="col-3 pb-3 m-0 card elevation-3 text-center ticket-style align-items-center">
    <i class="m-0 mdi mdi-ticket ticket-icon me-3"></i>
    <span class="fs-5 m-0 ">{{ ticket.event.name }}</span>
  </div>
</template>





<!-- <template>
  <div class="col-3 p-2 card elevation-3 text-center ticket-style">
    <i class="fs-6" mdi mdi-ticket></i>{{ ticket.event.name }}
  </div>
</template> -->

<script>
// import { AppState } from '../AppState.js'
// import { Ticket } from '../models/Ticket.js'

export default {
  props: { ticket: { type: Object, required: true } },
  setup() {
    return {};
  },
};
</script>


<style>
.tiffs-style {
  max-height: 15em;
  width: 100%
}

.ticket-icon {
  font-size: 3rem;
  /* Adjust as needed */
}


.ticket-style {
  max-height: 15em;
  width: 100%;
  border-radius: 10px;
  background: linear-gradient(to bottom, #f7f7f7, #eaeaea);
  border: 1px solid #d1d1d1;
  position: relative;

}


.ticket-style::before,
.ticket-style::after {
  content: '';
  position: absolute;
  top: 10%;
  left: 0;
  right: 0;
  height: 1px;
  border-top: 2px dashed #d1d1d1;
}

.ticket-style::after {
  top: auto;
  bottom: 10%;
}
</style>