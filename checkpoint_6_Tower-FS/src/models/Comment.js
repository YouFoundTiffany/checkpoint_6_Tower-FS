import { Schema } from "mongoose"
const ObjectId = Schema.Types.ObjectId


export const CommentSchema = new Schema({
    creatorId: { type: ObjectId },

    eventId: { type: ObjectId },

    body: { type: String, required: true, minlength: 1, maxlength: 150 },

    // NOTE stretch goal to use the is Attending
    isAttending: { type: Boolean, required: true, default: false },


}, { toJSON: { virtuals: true } })


CommentSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Comment',
    justOne: true
})
