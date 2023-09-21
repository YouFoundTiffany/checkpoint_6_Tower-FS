


export class Picture {
    constructor(data) {
        this.id = data.id
        this.eventId = data.eventId
        this.accountId = data.accountId
        this.profile = data.profile
        this.event = data.event
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
    }
}