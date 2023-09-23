


export class Comment {
    constructor(data){
    // NOTE did not work Testing name
    // this.name = data.name
        this.eventId = data.eventId
        this.accountId = data.accountId
        this.profile = data.profile
        this.body = data.body
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
    }
}