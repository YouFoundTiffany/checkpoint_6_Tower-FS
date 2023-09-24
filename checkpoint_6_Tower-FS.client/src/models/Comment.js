


export class Comment {
    constructor(data){
    // NOTE did not work Testing name
        // this.name = data.name
        this.id = data.id
        this.eventId = data.eventId
        this.creator = data.creator
        this.creatorId = data.creatorId
        this.body = data.body
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
        this.isAttending = data.isAttending

    }
}
