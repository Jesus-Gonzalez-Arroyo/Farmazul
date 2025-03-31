export class ProductInfoUpdate {
    constructor(product) {
        this.name = product.name
        this.price = product.price
        this.priceventa = product.price_venta
        this.cant = ""
        this.cant_copy = product.cantidad
        this.cant_actual = String(product.cantidad_actual)
        this.estancia = product.estancia
        this.ganancia = product.ganancia
        this.prov = product.proveedor
        this.id = product._id
        this.fecha = product.fecha
    }
}