export class GastosInfoUpdateModel {
    constructor(info) {
        this.id = info._id
        this.name = info.name
        this.fecha = info.fecha
        this.price = info.price
        this.type = info.type
        this.estado = info.estado
        this.valordeuda = info.estado === 'Pagado' ? '0' : info.valordeuda
        this.descripcion = info.descripcion
    }
}
