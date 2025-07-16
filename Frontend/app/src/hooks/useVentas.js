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
    const [open, setOpen] = useState(false)
    const [visible, setVisible] = useState(false)
    const [methodPay, setMethodPay] = useState("")
    const [infoVenta, setInfoVenta] = useState(new VentaInfo({}))
    const [filters] = useState({
        idProduct: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        estancia: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const methodsPay = ["Efectivo", "Transferencia"]
    const form = useRef()

    function handleSelectMethodPay(value) {
        setMethodPay(value)
        setOpen(false)
    };

    function handleAddProductCar(product) {
        setCarProducts((prevCarProducts) => {
            const productExist = prevCarProducts.find((item) => item.id === product.id);

            const stockDisponible = Number(product.cantidad);

            if (stockDisponible === 0) {
                Alerts(
                    'Acción no permitida',
                    `No existen unidades disponibles para el producto ${product.name.toUpperCase()}`,
                    'warning'
                );
                setVisible(false);
                return prevCarProducts;
            }

            if (productExist) {
                const cantidadRegistrada = Number(productExist.cantidad);

                if (cantidadRegistrada + 1 > stockDisponible) {
                    Alerts(
                        'Acción no permitida',
                        `Solo existen ${stockDisponible} unidades disponibles para el producto ${product.name.toUpperCase()}`,
                        'warning'
                    );
                    setVisible(false);
                    return prevCarProducts;
                }

                Alerts(
                    'Producto agregado',
                    `El producto ${product.name.toUpperCase()} ha sido actualizado en el carrito`,
                    'success'
                );

                return prevCarProducts.map((item) =>
                    item.id === product.id
                        ? { ...item, cantidad: cantidadRegistrada + 1 }
                        : item
                );
            }

            Alerts(
                'Producto agregado',
                `El producto ${product.name.toUpperCase()} ha sido agregado al carrito`,
                'success'
            );

            return [...prevCarProducts, { ...product, cantidad: 1 }];
        });

        setVisible(false);
    }

    function handleMoreCant(product, valueInput) {
        const productExist = products.find((item) => item._id === product.id)
        if (Number(valueInput) > Number(productExist.cantidad)) {
            Alerts('Accion no permitida', `Solo existen ${productExist.cantidad} unidades disponibles para el producto ${product.name.toUpperCase()}`, 'warning')
            return setVisible(false)
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
        const valorCompra = String(carProducts.reduce((total, item) => total + Number(item.price) * Number(item.cantidad), 0))
        const validateDescuent = infoVenta.descuent !== '' || infoVenta.descuent !== '0'
        const valueAplyDescuent = validateDescuent ? String(valorCompra - Number(infoVenta.descuent)) : valorCompra

        infoVenta.fecha = getDate()
        infoVenta.products = carProducts
        infoVenta.valor = valueAplyDescuent
        infoVenta.name = infoUser.name
        infoVenta.method = methodPay
        infoVenta.recibido = methodPay === methodsPay[0] ? infoVenta.recibido : valueAplyDescuent

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
        filters,
        visible,
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
        setVisible
    }
}