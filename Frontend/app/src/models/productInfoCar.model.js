export class ProductInfoCar {
    constructor(info) {
        this.id = info._id
        this.price = info.price_venta
        this.name = info.name
    }
}