import user from '../helpers/users.json';

class User {

    constructor(option){
        this.id = option.id
        this.username = option.username
        this.avatar = option.avatar
        this.date = option.date
        this.likes = option.likes
        this.comments = option.comments
        this.views = option.views
    }

    
}