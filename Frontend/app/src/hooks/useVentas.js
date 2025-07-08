import { useRef, useState } from 'react'
import { getDate, keys } from '../utils'
import { consumServices } from '../contexts/execute'
import { VentaInfo } from '../models'
import { Alerts } from '../utils/alerts'
import { FilterMatchMode } from 'primereact/api'

export const useVentas = () => {
    const [products, setProducts] = useState([])
    const [carProducts, setCarProducts] = useState([])
    const [loader, setLoader] = useState(true)
    const [methodPay, setMethodPay] = useState("")
    const [open, setOpen] = useState(false)
    const [infoVenta, setInfoVenta] = useState(new VentaInfo({}))
    const methodsPay = ["Efectivo", "Transferencia"]
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPages, setTotalPages] = useState([])
    const [filters] = useState({
        idProduct: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        estancia: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const form = useRef()

    function handleSelectMethodPay(value) {
        setMethodPay(value)
        setOpen(false)
    };

    const nextPage = () => {
        if (paginaActual === totalPages) return
        setPaginaActual(paginaActual + 1)
    }

    const previuosPage = () => {
        if (paginaActual === 1) return
        setPaginaActual(paginaActual - 1)
    }

    function handleAddProductCar(product) {
        console.log('Producto recibido:', product);

        const productExist = carProducts.find((item) => item.id === product.id);

        if (product.cantidad === '0') {
            return Alerts('Acción no permitida', `No existen unidades disponibles para el producto ${product.name.toUpperCase()}`, 'warning');
        }

        if (productExist && Number(productExist.cantidad + 1) > Number(product.cantidad)) {
            return Alerts('Acción no permitida', `Solo existen ${product.cantidad} unidades disponibles para el producto ${product.name.toUpperCase()}`, 'warning');
        }

        if (productExist) {
            console.log('Producto ya existe, actualizando cantidad...');
            setCarProducts(
                carProducts.map((item) =>
                    item.id === product.id
                        ? { ...item, cantidad: Number(item.cantidad) + 1 }
                        : item
                )
            );
        } else {
            console.log('Producto nuevo, agregando al carrito...');
            setCarProducts([...carProducts, { ...product, cantidad: 1 }]);
        }
    }


    function handleMoreCant(product, valueInput) {
        const productExist = products.find((item) => item._id === product.id)
        if (Number(valueInput) > Number(productExist.cantidad)) {
            return Alerts('Accion no permitida', `Solo existen ${productExist.cantidad} unidades disponibles para el producto ${product.name.toUpperCase()}`, 'warning')
        }

        setCarProducts(
            carProducts.map((item) =>
                item.id === product.id ? { ...product, cantidad: Number(valueInput) } : item
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

        Alerts('Completado', 'Compra registrada con exito')
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
        totalPages,
        paginaActual,
        filters,
        setTotalPages,
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
        nextPage,
        previuosPage
    }
}