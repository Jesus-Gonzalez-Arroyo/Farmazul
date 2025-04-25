import { useState } from 'react'
import { keys } from '../utils'
import {consumServices} from '../contexts/execute'
import { VentaInfo } from '../models'

export const useVentas = () => {
    const [products, setProducts] = useState([])
    const [carProducts, setCarProducts] = useState([])
    const [loader, setLoader] = useState(true)
    const [methodPay, setMethodPay] = useState("")
    const [open, setOpen] = useState(false)
    const [infoVenta, setInfoVenta] = useState(new VentaInfo({}))
    const methodsPay = ["Efectivo", "Transferencia"]

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

    function getDate() {
        const fecha = new Date();
        const yyyy = fecha.getFullYear();
        const mm = String(fecha.getMonth() + 1).padStart(2, '0');
        const dd = String(fecha.getDate()).padStart(2, '0');

        return `${dd}/${mm}/${yyyy}`
    }

    async function handleRegisterVenta() {
        const infoUser = JSON.parse(localStorage.getItem('infoUser'))
        const valorCompra = String(carProducts.reduce((total, item) => total + item.price * item.cantidad, 0))
        
        infoVenta.fecha = getDate()
        infoVenta.products = carProducts
        infoVenta.valor = valorCompra
        infoVenta.name = infoUser.name
        infoVenta.method = methodPay
        infoVenta.recibido = methodPay === methodsPay[0] ? infoVenta.recibido : valorCompra

        const response = await consumServices(keys.registerVenta, 'POST', '', infoVenta)

        if(response.error) return console.error(response)

        console.log(response)
    }

    function handleChange (e) {
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