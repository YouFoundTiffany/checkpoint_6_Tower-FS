import { Schema } from "mongoose"


export const CommentSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    // NOTE did not work Testing name
    // userName: { type: Schema.Types.ObjectId, ref: 'Account', required: true },

    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },

    body: { type: String, required: true, minlength: 1, maxlength: 500 },

    // NOTE stretch goal to use the is Attending
    isAttending: { type: Boolean, required: true, default: false },


}, { toJSON: { virtuals: true } })


CommentSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})
// CommentSchema.virtual('name', {
//     localField: 'userName',
//     foreignField: 'name',
//     ref: 'Account',
//     justOne: true
// })
