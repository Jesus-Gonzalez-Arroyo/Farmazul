export class ProductsVendidosModel {
    constructor(products) {
        this.name = products.name
        this.price = String(products.price)
        this.cantidad = String(products.cantidad)
    }
}
