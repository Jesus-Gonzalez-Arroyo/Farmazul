import { useRef, useState } from 'react'
import { getDate, keys } from '../utils'
import { consumServices } from '../contexts/execute'
import { VentaInfo } from '../models'

export const useVentas = () => {
    const [products, setProducts] = useState([])
    const [carProducts, setCarProducts] = useState([])
    const [loader, setLoader] = useState(true)
    const [methodPay, setMethodPay] = useState("")
    const [open, setOpen] = useState(false)
    const [infoVenta, setInfoVenta] = useState(new VentaInfo({}))
    const methodsPay = ["Efectivo", "Transferencia"]
    const [infoAlert, setInfoAlert] = useState({
        show: false,
        message: '',
        type: 'success',
    });
    const form = useRef()

    function handleSelectMethodPay(value) {
        setMethodPay(value)
        setOpen(false)
    };

    function handleAddProductCar(product) {
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

        const response = await consumServices(keys.registerVenta, 'POST', '', infoVenta)

        if (response.error) return updateInfoAlert('Ha ocurrido un error', 'danger')

        const descuentUnitsProducts = await consumServices(keys.descuentUnits, 'POST', '', infoVenta.products)

        if (descuentUnitsProducts.error) return updateInfoAlert('Ha ocurrido un error', 'danger')

        setProducts((prevProducts) =>
            prevProducts.map((product) => {
                const updated = descuentUnitsProducts.info.find(
                    (p) => p._id === product._id
                );
                return updated ? updated : product;
            })
        );

        setCarProducts([])
        updateInfoAlert('Compra registrada con exito')
        form.current.reset()
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setInfoVenta((prev) => ({ ...prev, [name]: value }));
    };

    
    const updateInfoAlert = (message, type='success') => {
        setInfoAlert({show: true, message, type})
         setTimeout(() => {
            setInfoAlert({...infoAlert, show: false})
        }, 5000);
    }

    return {
        products,
        carProducts,
        loader,
        methodPay,
        methodsPay,
        open,
        form,
        infoAlert,
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