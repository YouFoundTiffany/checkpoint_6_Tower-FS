<template>
  <img class="profile-pic" :src="comment.creator.picture" :alt="account.name" />
  <p>{{ comment.creator.name }}</p>
  <p class="m-0">{{ comment.body }}</p>
</template>

<script>
import { onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import { Account } from '../models/Account.js';
import { Comment } from '../models/Comment.js';
import { commentsService } from '../services/CommentsService.js';



export default {

  props: { comment: { type: String || Object, required: true }, user: { type: String || Object, required: true }, account: { type: Object, default: () => ({}), required: true } },
  setup() {



    return {

    };
  },
};
</script>


<style></style>