export class ProductInfoCar {
    constructor(info) {
        this.id = info._id
        this.price = String(info.price_venta)
        this.name = info.name
        this.ganancia = info.ganancia
    }
}