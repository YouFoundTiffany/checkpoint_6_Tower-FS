<template>
    <div class="container-fluid">
        <section class="row ">
            <!-- STUB Event details -->
            <div class="col-12 col-md-5 col-lg-3">
                <section v-if="event" class="row">
                    <div class="col-6">
                        <img :src="event.coverImg" class="event-cover" :alt="event.name + ' cover image'">
                    </div>
                    <div class="col-6 fw-bold">
                        <div class="bg-warning p-2 rounded">
                            <p class="mb-1 text-white">
                                {{ event.name }}
                            </p>
                            <p class="mb-1">
                                <!-- FIXME CHECK THIS  -->
                                by: {{ event.creator }}
                            </p>
                        </div>
                        <!-- STUB button to create comment -->
                        <ModalWrapper id="create-comment" btnColor="danger">
                            <template #button>
                                <div>Comment<i class="mdi mdi-plus-box-outline"></i></div>
                            </template>
                            <template #body>
                                <CommentsForm />
                            </template>
                        </ModalWrapper>
                    </div>
                    <!-- STUB ticket button -->
                    <div class="col-6 bg-info p-2 rounded">
                        <p class="mb-0">{{ event.ticketCount }}</p>
                        <p class="mb-0">Tickets</p>
                    </div>
                    <button v-if="!isTicket && user.isAuthenticated" :disabled="inProgress" @click="createTicket"
                        role="button" class="col-6 bg-warning p-2 rounded">Ticket<i class="mdi mdi-heart"></i></button>
                    <button v-else-if="user.isAuthenticated" @click="removeTicket" role="button"
                        class="col-6 bg-danger p-2 rounded"> Shred Ticket<i class="mdi mdi-heart"></i></button>
                    <button v-else disabled role="button" class="col-6 btn btn-danger p-2 rounded"
                        title="log in to ticket">log in to get Ticket<i class="mdi mdi-heart"></i></button>


                    <!-- STUB Ticket images -->
                    <div class="col-12">

                        Where buyer images go here.
                        <!-- <img class="ticket-image" v-for="ticket in tickets" :src="ticket.profile.picture"
                            :key="ticket.id" alt=""> -->
                    </div>

                </section>
            </div>
            <!-- STUB comments -->
            <div class="col-12 col-md-7 col-lg-9">
                <div class="">
                    <div v-for="comment in comments" :key="comment.id" >
Comments Go Here :D
                    </div>
                </div>
            </div>

        </section>
    </div>
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
