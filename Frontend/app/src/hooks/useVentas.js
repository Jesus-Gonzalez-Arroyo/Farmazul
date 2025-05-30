import { useRef, useState } from 'react'
import { getDate, keys } from '../utils'
import { consumServices } from '../contexts/execute'
import { VentaInfo } from '../models'
import Swal from 'sweetalert2'
import { Alerts } from '../utils/alerts'

export const useVentas = () => {
    const [products, setProducts] = useState([])
    const [carProducts, setCarProducts] = useState([])
    const [loader, setLoader] = useState(true)
    const [methodPay, setMethodPay] = useState("")
    const [open, setOpen] = useState(false)
    const [infoVenta, setInfoVenta] = useState(new VentaInfo({}))
    const methodsPay = ["Efectivo", "Transferencia"]
    const form = useRef()

    function handleSelectMethodPay(value) {
        setMethodPay(value)
        setOpen(false)
    };

    function handleAddProductCar(product) {
        if(product.cantidad === '0') {
            return Swal.fire({
                title: 'Accion no permitida',
                text: `No existen unidades disponibles para el producto ${product.name.toUpperCase()}`,
                icon: 'warning',
                timer: 5000
            })
        }
        const productExist = carProducts.find((item) => item.id === product.id)

        if (productExist) {
            setCarProducts(
                carProducts.map((item) =>
                    item.id === product.id ? { ...product, cantidad: Number(item.cantidad) + 1 } : item
                )
            )
        } else {
            setCarProducts([...carProducts, { ...product, cantidad: 1 }])
        }
    }

    function handleMoreCant(product, valueInput) {
        setCarProducts(
            carProducts.map((item) =>
                item.id === product.id ? { ...product, cantidad: valueInput } : item
            )

        )
    }

    function handleDeleteProduct(product) {
        setCarProducts(carProducts.filter((item) => item.id !== product.id))
    }

    async function handleRegisterVenta() {
        const infoUser = JSON.parse(localStorage.getItem('infoUser'))
        const valorCompra = String(carProducts.reduce((total, item) => total + item.price * item.cantidad, 0))
        const validateDescuent = infoVenta.descuent !== '' || infoVenta.descuent !== '0'

        infoVenta.fecha = getDate()
        infoVenta.products = carProducts
        infoVenta.valor = validateDescuent ? String(valorCompra - Number(infoVenta.descuent)) : valorCompra
        infoVenta.name = infoUser.name
        infoVenta.method = methodPay
        infoVenta.recibido = methodPay === methodsPay[0] ? infoVenta.recibido : valorCompra

        const responseRegisterVenta = await consumServices(keys.registerVenta, 'POST', '', infoVenta)
        const responseDescuentUnits = await consumServices(keys.descuentUnits, 'POST', '', infoVenta.products)

        if (responseRegisterVenta.error || responseDescuentUnits.error) return console.error(responseRegisterVenta.error ? responseRegisterVenta : responseDescuentUnits)

        setProducts((prevProducts) =>
            prevProducts.map((product) => {
                const updated = responseDescuentUnits.info.find(
                    (p) => p._id === product._id
                );
                return updated ? updated : product;
            })
        );

        setCarProducts([])

        Alerts('Completado','Compra registrada con exito')
        form.current.reset()
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setInfoVenta((prev) => ({ ...prev, [name]: value }));
    };

    return {
        products,
        carProducts,
        loader,
        methodPay,
        methodsPay,
        open,
        form,
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
        handleChange
    }
}