<template>
    <section>
        <div v-if="event">
            <div v-if="!event.isCanceled">


                <div class=" container">
                    <div class="row justify-content-between my-4">
                        <div class="text-end">
                            <button v-if="event.creatorId == account.id" @click="cancelEvent">Cancel</button>
                        </div>
                        <!-- EVENT COVER IMAGE -->
                        <div class="col-6">
                            <img :src="event.coverImg" class="img-fluid rounded" :alt="event.name + ' cover image'">
                        </div>
                        <!-- EVENT DETAILS -->
                        <div class="col-6 fw-bold bg-light p-3 rounded">
                            <h1 class="mb-2 text-dark">{{ event.name }}
                            </h1>
                            <p class="mb-1">Capacity: {{ event.capacity }}</p>
                            <!-- <p v-if="canceled" class="mb-1">THIS EVENT HAS BEEN CANCELED</p> -->
                            <p class="mb-1">Where: {{ event.location }}</p>
                            <p class="mb-1">Date: {{ event.startDate }}</p>
                            <p class="mb-1">Type: {{ event.type }}</p>
                            <p class="mb-1">About: {{ event.description }}</p>
                        </div>
                    </div>
                </div>

                <div class="container">
                    <!-- STUB ticket button -->
                    <div v-if="event" class="fs-4 ps-0 pt-2 pe-2  g-2 text-center row justify-content-between">
                        <div class="col-4 bg-info p-2 rounded">
                            <p class="mb-0">{{ event.ticketCount }} Tickets Sold </p>
                        </div>
                        <div v-if="!isEventFull" class="text-start p-0">

                            <button v-if="!isTicket && user.isAuthenticated" :disabled="inProgress" @click="createTicket"
                                role="button" class="col-4 bg-warning p-2 rounded">Ticket <i
                                    class="mdi mdi-ticket"></i></button>
                            <button v-else-if="user.isAuthenticated" @click="removeTicket" role="button"
                                class="col-4 bg-danger p-2 rounded"> Shred Ticket <i class="mdi mdi-ticket"></i></button>
                            <button v-else disabled role="button" class="col-4 btn btn-danger p-2 rounded"
                                title="log in to ticket">log in to get Ticket<i class="mdi mdi-ticket"></i></button>
                        </div>
                        <div v-else>EVENT IS SOLD OUT.</div>
                    </div>
                </div>
                <!-- STUB ROW 3: Ticket owners -->
                <!-- STUB Ticket images -->
                <div class="container">
                    <div class="row my-3">
                        <div class="col-12">

                            <img v-for="ticket in tickets" :key="ticket.id" data-bs-toggle="tooltip" data-bs-placement="top"
                                :title="ticket.profile.name" class="profile-pic" :src="ticket.profile.picture"
                                alt="Ticket Holder">
                        </div>

                    </div>
                </div>

                <div class="container">
                    <div v-if="user.isAuthenticated">

                        <!-- STUB ROW 4 -->
                        <!-- STUB Create Comment -->
                        <ModalWrapper id="create-comment" btnColor="danger">
                            <template #button>
                                <div>Comment<i class="mdi mdi-plus-box-outline"></i></div>
                            </template>
                            <template #body>
                                <CommentsForm />
                            </template>
                        </ModalWrapper>
                    </div>

                    <!-- STUB Display Comments -->

                    <div class="border-secondary col-12 my-1">
                        <div v-for="  comment   in   comments  " :key="comment.id" class="m-0 card elevation-3 p-3">
                            <!-- {{ comment }} -->
                            <Comments :comment="comment" :account="comment.account" />
                            <span>
                                <!-- event.creatorId == account.id -->
                                <button v-if="user.isAuthenticated && comment.creatorId == account.id"
                                    @click="deleteComment()" class="text-end">Delete</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="text-center">
                <h1>This Event is Canceled.</h1>
                <h1>⛔</h1>
            </div>
        </div>
        <!-- </div> -->
    </section>
</template>




<script>
import { AppState } from '../AppState';
import { computed, ref, watchEffect } from 'vue';
import Pop from '../utils/Pop.js';
import { useRoute } from 'vue-router';
// import ModalWrapper from '../components/ModalWrapper.vue';
import { ticketsService } from '../services/TicketsService.js'
import { eventsService } from '../services/EventsService.js';
import { router } from '../router.js';
import { commentsService } from '../services/CommentsService.js';
import CommentsForm from '../components/CommentsForm.vue';
import Comments from '../components/Comments.vue';
import { logger } from '../utils/Logger.js';
// import VBTooltip from 'bootstrap-vue'


export default {

    setup() {
        const inProgress = ref(false)
        const route = useRoute();
        // NOTE we watcheffect here because a user can create a event from the navbar. and onMounted only runs when a page is initially loaded. If you push from a page to the same page but change params, the onMounted doesn't run. watchEffect Will
        watchEffect(() => {
            getEventById();
            getCommentsByEventId();
            getTicketsByEventId();
            // NOTE this is comment out b/c it crashes the page when live.
            // deleteComment();
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
            // NOTE if other things don't work you can put this back active!
            event: computed(() => AppState.event),
            // FIXME test changing this to activeEvent?
            event: computed(() => AppState.activeEvent),
            user: computed(() => AppState.user),
            //
            comments: computed(() => AppState.activeEventComments),
            tickets: computed(() => AppState.activeEventTickets),
            isTicket: computed(() => AppState.activeEventTickets.find(ticket => ticket.accountId == AppState.account.id)),
            account: computed(() => AppState.account),
            isEventFull: computed(() => AppState.activeEventTickets.length >= AppState.activeEvent.capacity),
            activeEventComments: computed(() => AppState.comment),


            async createTicket() {
                try {
                    // added If statement to manage when event is sold out.
                    if (AppState.activeEventTickets.length >= AppState.activeEvent.capacity) {
                        Pop.error('Tickets are sold out for this event.');
                        return;
                    }


                    inProgress.value = true
                    let ticketData = { eventId: route.params.eventId } // just creating a body with eventId on it equal to the route params
                    await ticketsService.createTicket(ticketData)
                    inProgress.value = false
                    // await getTicketsByEventId();
                    getEventById();

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
                // getTicketsByEventId()
                getEventById()
            },

            async cancelEvent() {
                try {
                    if (await Pop.confirm('Are you sure you want to cancel this event?')) {
                        const eventId = AppState.activeEvent.id
                        await eventsService.cancelEvent(eventId)
                        AppState.activeEvent.isCanceled = true
                        router.push({ name: 'Event Details' })
                        Pop.success('Event Canceled')
                    }
                } catch (error) {
                    Pop.error(error)
                }
                getEventById()
            },
            // FIXME get it to work
            async deleteComment() {
                debugger
                try {
                    if (await Pop.confirm('Are you sure you want to remove your comment?')) {
                        logger.log('line 217', AppState.activeEventComments);
                        logger.log('line 218', AppState.event)

                        let comment = AppState.activeEventComments.find(comment => comment.accountId == AppState.account.id)
                        logger.log('line 221 active event?', comment)
                        await commentsService.deleteComment(comment.id)
                        logger.log('line 223, Comment to delete:', comment);



                        router.push({ name: 'Event Details' })
                        Pop.success('Comment Deleted!')
                    }
                } catch (error) {
                    Pop.error(error)
                }

            }
        };
    },
    components: { CommentsForm, Comments }
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
}
</style>
   <!-- NOTE  -->
                        <!-- <h4>{{ ticket.profile.name }}</h4> -->
                        <!-- When using a v-for you are creating a new instance of that item and it exists only in that element. Note to look at inheritance as you can put it on a parent div-->