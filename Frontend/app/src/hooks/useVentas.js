import { useState } from 'react'

export const useVentas = () => {
    const [products, setProducts] = useState([])
    const [carProducts, setCarProducts] = useState([])
    const [loader, setLoader] = useState(true)
    const [methodPay, setMethodPay] = useState("")
    const [open, setOpen] = useState(false)
    const methodsPay = ["Efectivo", "Transferencia"]

    const handleSelectMethodPay = (value) => {
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

    return {
        products,
        carProducts,
        loader,
        methodPay,
        methodsPay,
        open,
        setOpen,
        handleSelectMethodPay,
        setProducts,
        setLoader,
        setCarProducts,
        handleAddProductCar,
        handleMoreCant,
        handleDeleteProduct
    }
}