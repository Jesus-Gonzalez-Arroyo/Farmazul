export class ProductsVendidosModel {
    constructor(products) {
        this.id = String(products.idProduct)
        this.name = products.name
        this.price = String(products.price)
        this.cantidad = String(products.cantidad)
    }
}
