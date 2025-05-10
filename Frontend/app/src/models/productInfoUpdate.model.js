export class ProductInfoUpdate {
    constructor(product) {
        this.idProduct = product.idProduct
        this.name = product.name
        this.price = product.price
        this.priceventa = product.price_venta
        this.cant = product.cantidad
        this.estancia = product.estancia
        this.ganancia = product.ganancia
        this.prov = product.proveedor
        this.id = product._id
    }
}