import { useRef, useState } from 'react'
import { getDate, keys, modifyMoney } from '../utils'
import { consumServices } from '../contexts/execute'
import { VentaInfo } from '../models'
import { Alerts } from '../utils/alerts'
import { FilterMatchMode } from 'primereact/api'

export const useVentas = () => {
    const [products, setProducts] = useState([])
    const [carProducts, setCarProducts] = useState([])
    const [loader, setLoader] = useState(true)
    const [loaderModal, setLoaderModal] = useState(true)
    const [open, setOpen] = useState(false)
    const [visible, setVisible] = useState(false)
    const [methodPay, setMethodPay] = useState("")
    const [infoDay, setInfoDay] = useState({})
    const [infoVenta, setInfoVenta] = useState(new VentaInfo({}))
    const [filters] = useState({
        idProduct: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        estancia: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const methodsPay = ["Efectivo", "Transferencia"]
    const form = useRef()

    const handleSelectMethodPay = (value) => {
        setMethodPay(value)
        setOpen(false)
    }

    const closeCarComplete = () => setVisible(false)

    const showAlert = (title, message, type = 'info') => {
        Alerts(title, message, type)
        setVisible(false)
    }

    const handleAddProductCar = (product) => {
        const stockDisponible = Number(product.cantidad);

        if (stockDisponible === 0) {
            return showAlert('Acción no permitida', `No existen unidades disponibles para el producto ${product.name.toUpperCase()}`, 'warning')
        }

        setCarProducts((prevCarProducts) => {
            const productExist = prevCarProducts.find((item) => item.id === product.id)

            if (productExist) {
                const cantidadRegistrada = Number(productExist.cantidad)

                if (cantidadRegistrada + 1 > stockDisponible) {
                    return showAlert('Acción no permitida', `Solo existen ${stockDisponible} unidades disponibles para el producto ${product.name.toUpperCase()}`, 'warning')
                }

                showAlert('Producto agregado', `El producto ${product.name.toUpperCase()} ha sido actualizado en el carrito`, 'success')

                return prevCarProducts.map((item) =>
                    item.id === product.id ? { ...item, cantidad: cantidadRegistrada + 1 } : item
                )
            }

            showAlert('Producto agregado', `El producto ${product.name.toUpperCase()} ha sido agregado al carrito`, 'success')

            return [...prevCarProducts, { ...product, cantidad: 1 }]
        })
    }

    const handleMoreCant = (product, valueInput) => {
        const productExist = products.find((item) => item._id === product.id)

        if (Number(valueInput) > Number(productExist?.cantidad)) {
            return showAlert('Acción no permitida', `Solo existen ${productExist?.cantidad} unidades disponibles para el producto ${product.name.toUpperCase()}`, 'warning')
        }

        setCarProducts(
            carProducts.map((item) =>
                item.id === product.id ? { ...product, cantidad: Number(valueInput) } : item
            )
        )
    }

    const handleDeleteProduct = (product) => {
        setCarProducts(carProducts.filter((item) => item.id !== product.id))
    }

    const handleRegisterVenta = async () => {
        const valorCompra = carProducts.reduce((total, item) => total + Number(item.price) * Number(item.cantidad), 0)
        const infoUser = JSON.parse(localStorage.getItem('infoUser'))
        const validateDescuent = infoVenta.descuent !== '' && infoVenta.descuent !== '0'
        const valueAplyDescuent = validateDescuent ? valorCompra - Number(infoVenta.descuent) : valorCompra

        if (Number(infoVenta.descuent) > valorCompra) {
            return Alerts('Advertencia', 'El valor de descuento no puede ser mayor al valor de la compra', 'info')
        }

        const venta = {
            ...infoVenta,
            fecha: getDate(),
            products: carProducts,
            valor: String(valueAplyDescuent),
            name: infoUser.name,
            method: methodPay,
            recibido: methodPay === methodsPay[0] ? infoVenta.recibido : String(valueAplyDescuent)
        }

        const [resVenta, resDescuento] = await Promise.all([
            consumServices(keys.registerVenta, 'POST', '', venta),
            consumServices(keys.modifyUnits, 'POST', '', {'products': venta.products, 'isReturn': false})
        ])

        if (resVenta.error || resDescuento.error) {
            return console.error(resVenta.error || resDescuento.error)
        }

        setProducts((prev) =>
            prev.map((product) => {
                const updated = resDescuento.info.find((p) => p._id === product._id)
                return updated ? updated : product
            })
        )

        setCarProducts([])
        Alerts('Completado', 'Compra registrada con éxito')
        form.current?.reset()
    }

    const getInfoVentasInDay = (info) => {
        const ventasForDay = info.resumVentas.filter((venta) => venta.fecha === getDate())

        const totalGanancias = ventasForDay.reduce((total, venta) =>
            total + venta.products.reduce((sub, product) => sub + (product.ganancia * product.cantidad), 0), 0)

        const totalIngresos = ventasForDay.reduce((total, venta) => total + parseInt(venta.valor), 0)

        setInfoDay({
            ingresosDay: `$${modifyMoney(totalIngresos + totalGanancias)}`,
            salesDay: ventasForDay.length,
        })
    }

    const getInfoDay = async () => {
        const res = await consumServices(keys.getInfoSystem, "GET")
        if (res.error) return console.error(res.info)

        getInfoVentasInDay(res.info)
        setLoaderModal(false)
    }

    const handleChange = ({ target: { name, value } }) => {
        setInfoVenta((prev) => ({ ...prev, [name]: value }))
    }

    return {
        products,
        carProducts,
        loader,
        methodPay,
        methodsPay,
        open,
        form,
        filters,
        visible,
        infoDay,
        loaderModal,
        setInfoDay,
        setOpen,
        setInfoVenta,
        handleSelectMethodPay,
        setProducts,
        setLoader,
        setCarProducts,
        handleAddProductCar,
        handleMoreCant,
        handleDeleteProduct,
        handleRegisterVenta,
        handleChange,
        setVisible,
        closeCarComplete,
        getInfoDay
    }
}