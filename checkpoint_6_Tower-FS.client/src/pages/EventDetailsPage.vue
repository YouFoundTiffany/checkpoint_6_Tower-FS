<template>
    <section class="container">
        <div class="row justify-content-between my-4">
            <!-- Left Column -->
            <div class="col-6">
                <img :src="event.coverImg" class="img-fluid rounded" :alt="event.name + ' cover image'">
                </div>
            <div class="col-6 fw-bold bg-light p-3 rounded">
                <p class="mb-2 text-dark">{{ event.name }}
                </p>
                <!-- FIXME  GET NAME TO DISPLAY CORRECTLY -->
                <p class="mb-1">by: {{ event.creator }}</p>
            </div>
        </div>
    </section>


<section class="container">
      <!-- STUB ticket button -->
      <div class="fs-4 text-center row justify-content-between">
            <div class="col-4 bg-info p-2 rounded">
                <p class="mb-0">{{ event.ticketCount }} Tickets Sold </p>
            </div>
                <button v-if="!isTicket && user.isAuthenticated" :disabled="inProgress" @click="createTicket"
                    role="button" class="col-4 bg-warning p-2 rounded">Ticket <i class="mdi mdi-ticket"></i></button>
                <button v-else-if="user.isAuthenticated" @click="removeTicket" role="button"
                            class="col-4 bg-danger p-2 rounded"> Shred Ticket <i class="mdi mdi-ticket"></i></button>
                <button v-else disabled role="button" class="col-4 btn btn-danger p-2 rounded"
                        title="log in to ticket">log in to get Ticket<i class="mdi mdi-ticket"></i></button>
        </div>
</section>
                    <!-- Row 3: Ticket owners -->
                    <!-- STUB Ticket images -->
<section class="container">
    <div class="row my-3">
        <div class="col-12">
            <img class="profile-pic" v-for="ticket in tickets" :src="ticket.profile.picture" :key="ticket.id" alt="Ticket Holder">
        </div>
    </div>
</section>

<section class="container">


    <!-- STUB button to create comment -->
    <ModalWrapper id="create-comment" btnColor="danger">
        <template #button>
            <div>Comment<i class="mdi mdi-plus-box-outline"></i></div>
        </template>
        <template #body>
            <CommentsForm />
        </template>
    </ModalWrapper>
    <!-- STUB comments -->
    <!-- Row 4: Comments (full width) -->
    <div class="border-secondary col-12 my-1">
        <div v-for="comment in comments" :key="comment.id" class="card elevation-3 border-bottom pb-3 mb-3">
            <Comments/>
        </div>
    </div>
</section>


</template>




<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref, onUpdated, watchEffect } from 'vue';
import Pop from '../utils/Pop.js';
import { useRoute } from 'vue-router';
import ModalWrapper from '../components/ModalWrapper.vue';
import { ticketsService } from '../services/TicketsService.js'
import { eventsService } from '../services/EventsService.js';
import CommentsForm from '../components/CommentsForm.vue';
export default {
    setup() {
        const inProgress = ref(false)
        const route = useRoute();
        // NOTE we watcheffect here because a user can create a event from the navbar. and onMounted only runs when a page is initially loaded. If you push from a page to the same page but change params, the onMounted doesn't run. watchEffect Will
        watchEffect(() => {
            getEventById();
            getCommentsByEventId();
            getTicketsByEventId()
        });
        async function getEventById() {
            try {
                await eventsService.getEventById(route.params.eventId);
            }
            catch (error) {
                Pop.error(error);
            }
        }
        async function getCommentsByEventId() {
            try {
                await eventsService.getCommentsByEventId(route.params.eventId);
            }
            catch (error) {
                Pop.error(error);
            }
        }
        async function getTicketsByEventId() {
            try {
                await eventsService.getTicketsByEventId(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }
        return {
            inProgress,
            // TODO ? IS THIS CORRECT?
            user: computed(() => AppState.user),
            event: computed(() => AppState.activeEvent),
            comments: computed(() => AppState.activeEventComments),
            tickets: computed(() => AppState.activeEventTickets),
            isTicket: computed(() => AppState.activeEventTickets.find(ticket => ticket.accountId == AppState.account.id)),
            async createTicket() {
                try {
                    inProgress.value = true
                    let ticketData = { eventId: route.params.eventId } // just creating a body with eventId on it equal to the route params
                    await ticketsService.createTicket(ticketData)
                    inProgress.value = false
                } catch (error) {
                    Pop.error(error)
                }
            },
            async removeTicket() {
                try {
                    // NOTE need to find the ticket in the appstate that is ours, and delete it by it's id
                    let ticket = AppState.activeEventTickets.find(ticket => ticket.accountId == AppState.account.id)
                    await ticketsService.removeTicket(ticket.id)
                } catch (error) {
                    Pop.error(error)
                }
            }
        };
    },
    components: { ModalWrapper, CommentsForm }
};
</script>


<style lang="scss" scoped>
.event-cover {
    width: 100%;
    aspect-ratio: 1/1;
    object-position: center;
    object-fit: cover;
    border-radius: 25px;
}

.masonry-container {
    $gap: 1.25em;
    columns: 200px;
    column-gap: $gap;

    img {
        border-radius: 10px;
        width: 100%;
        margin-bottom: $gap;
    }
}

.ticket-image {
    width: 33%;
    aspect-ratio: 1/1;
    border-radius: 10px;
    object-fit: cover;
}</style>
