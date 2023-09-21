<template>
    <div class="container-fluid">
        <form class="row" @submit.prevent="createEvent">
                        <!-- NAME -->
            <div class="mb-1 col-6">
                <label for="event-name">Name</label>
                <input v-model="eventData.name" id="event-name" class="form-control" type="text" minlength="5"
                    maxlength="50" placeholder="Name of Event" required>
            </div>
                  <!-- DESCRIPTION -->
            <div class="mb-1 col-6">
                    <label for="event-description">Describe your Event</label>
                    <input v-model="eventData.description" id="event-description" class="form-control" type="text" minlength="5"
                        maxlength="1000" placeholder="Description" required>
                </div>
                  <!-- COVER IMAGE -->
                    <div class="mb-1 col-12">
                        <label for="event-cover">Event Image</label>
                        <input v-model="eventData.coverImg" id="event-cover" class="form-control" type="url" minlength="5"
                            maxlength="500" placeholder="url of cover image" required>
                    </div>
                        <!-- LOCATION -->
                <div class="mb-1 col-6">
                    <label for="event-location">Location</label>
                    <input v-model="eventData.location" id="event-location" class="form-control" type="text" minlength="5"
                        maxlength="50" placeholder="Location of Event" required>
                </div>
                             <!-- CAPACITY -->
                        <div class="mb-1 col-6">
                        <label for="event-capacity">Capacity</label>
                        <input v-model="eventData.capacity" id="event-capacity" class="form-control" type="number" min="5"
                            max="1000" placeholder="Capacity of Event" required>
                    </div>
                            <!-- START DATE -->
                    <div class="mb-1 col-6">
                            <label for="event-startDate">Date</label>
                            <input v-model="eventData.startDate" id="event-startDate" class="form-control" type="date" minlenth=""
                                max="20" placeholder="startDate of Event" required>
                        </div>

                           <!-- TYPE -->
            <div class="mb-1 col-6">
                <label for="event-type">Type</label>
                <select v-model="eventData.type" class="form-control" id="event-type" required>
                    <option disabled selected value="">please select a Type</option>
                    <option value="concert">concert</option>
                    <option value="convention">convention</option>
                    <option value="sport">sport</option>
                    <option value="digital">digital</option>
                    <!-- <option value="misc">misc</option> -->
                </select>
            </div>


            <div class="mb-1 col-12">
                <img class="img-fluid preview-image" :src="eventData.coverImg" alt="">
            </div>
            <div class="col-12 text-end">
                <button class="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
</template>


<script>
    import { AppState } from '../AppState';
    import { computed, reactive, onMounted, ref } from 'vue';
    import Pop from '../utils/Pop.js';
    import { eventsService } from '../services/EventsService.js';
    import { Modal } from 'bootstrap';
    import { useRouter } from 'vue-router';
    export default {
        setup() {
            const eventData = ref({})
            const router = useRouter()
            function resetForm() {
                eventData.value = { type: '' }
            }
            onMounted(() => {
                resetForm()
            })
            return {
                eventData,
                async createEvent() {
                    try {

                        let newEvent = await eventsService.createEvent(eventData.value) /
                            Pop.toast('Event Created', 'success')
                        resetForm()
                        Modal.getOrCreateInstance('#create-event').hide()
                        router.push({ name: 'Event Details', params: { eventId: newEvent.id } })
                    } catch (error) {
                        Pop.error(error)
                    }
                }
            }
        }
    };
</script>


<style lang="scss" scoped>
    .preview-image {
        max-height: 15vh;
        object-fit: contain;
    }
</style>