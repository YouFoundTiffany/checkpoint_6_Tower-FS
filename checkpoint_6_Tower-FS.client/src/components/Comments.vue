<template>
  <p class="m-0"><span> Picture </span><span> Name </span>{{ comment.body }}</p>
</template>

<script>
import { AppState } from '../AppState.js';
import { Account } from '../models/Account.js';
import { Comment } from '../models/Comment.js';

// FIXME add in Delete Comment

export default {

  props: { comment: { type: String || Object, required: true }, user: { typ: String || Object, required: true } },
  setup() {

    return {



    };

  },
};
</script>


<style></style>