export class NewUserUpdate {
    constructor(data) {
        this.id = data._id
        this.name = data.name
        this.user = data.email
        this.password = data.password
        this.rol = data.rol
    }
}
