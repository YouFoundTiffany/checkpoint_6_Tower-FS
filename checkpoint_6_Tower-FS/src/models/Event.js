import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId


export const EventSchema = new Schema({
    creatorId: { type: ObjectId, required: true },

    name: { type: String, required: true, minlength: 1, maxlength: 50 },

    description: { type: String, required: true, minlength: 1, maxlength: 1000 },

    imgUrl: { type: String, maxlength: 1000 },

    location: { type: String, required: true, minlength: 1, maxlength: 50 },

    capacity: { type: Number, required: true, max: 1000 },

    startDate: { type: String, required: true, minlength: 1, maxlength: 50 },

    isCanceled: { type: Boolean, required: true, default: false },

    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], lowercase: true },
}, { toJSON: { virtuals: true } })

EventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})
EventSchema.virtual('ticketCount', {
    localField: '_id',
    foreignField: 'eventId',
    ref: 'Ticket',
    count: true
})