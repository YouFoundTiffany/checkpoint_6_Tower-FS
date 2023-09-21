import { Schema } from "mongoose"
const ObjectId = Schema.Types.ObjectId
Schema

export const TicketSchema = new Schema({
    eventId: { type: ObjectId, required: true, ref: 'Event' },
    accountId: { type: ObjectId, required: true, ref: 'Account' },
}, { toJSON: { virtuals: true } })

TicketSchema.virtual('profile', {
    localField: 'accountId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

TicketSchema.virtual('event', {
    localField: 'eventId',
    foreignField: 'event',
    ref: 'Event',
    justOne: true
})
