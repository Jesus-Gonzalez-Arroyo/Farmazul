export class VentaInfo {
    constructor(venta) {
        this.name = venta.user
        this.valor = venta.valor
        this.products = venta.products
        this.fecha = venta.fecha
        this.method = venta.method
        this.descuent = venta.descuent === undefined ? "0" : venta.descuent
        this.recibido = venta.recibido 
    }
}