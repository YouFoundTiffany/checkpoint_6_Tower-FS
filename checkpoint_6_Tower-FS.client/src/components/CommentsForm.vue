<template>
    <div class="container-fluid">
        <form @submit.prevent="createComment" class="row justify-content-center">
            <div class="mb-1 col-12">
                <label for="comment-body">Comments</label>
                <input v-model="commentData.body" id="comment-body" type="text" class="form-control" maxlength="500"
                    minlength="6" required>
            </div>
            <button class="btn btn-sm btn-success">Add Comments<i class="mdi mdi-image-plus"></i></button>
        </form>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { useRoute } from 'vue-router';
import { commentsService } from '../services/CommentsService.js'
import { accountService } from '../services/AccountService.js'
import { Modal } from 'bootstrap';


export default {
    setup() {
        const commentData = ref({})
        const route = useRoute()
        return {
            commentData,
            async createComment() {
                try {
                    // debugger
                    logger.log(commentData.value, AppState.activeEvent.id, route.params.eventId)

                    commentData.value.eventId = route.params.eventId

                    const comment = await commentsService.createComment(commentData.value)

                    const account = await accountService.getAccount(comment.accountId)

                    comment.account = account

                    Pop.toast('Added comment', 'success', 'center-end')

                    commentData.value = {}

                    Modal.getOrCreateInstance('#create-comment').hide()
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped></style>