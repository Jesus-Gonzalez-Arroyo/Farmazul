import { useState, useRef } from 'react'
import { ProductInfo, ProductInfoUpdate } from '../models/index'
import { keys } from '../utils/index'
import { consumServices } from '../contexts/execute'
import { Alerts } from '../utils/alerts'
import { FilterMatchMode } from 'primereact/api'

export const useInventary = () => {
    const [productID, setProductID] = useState({})
    const [products, setProducts] = useState([])
    const [formData, setFormData] = useState(new ProductInfo());
    const [infoUpdateProduct, setInfoUpdateProduct] = useState(new ProductInfoUpdate({}))
    const [loader, setLoader] = useState(true)
    const [filters] = useState({
        idProduct: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        estancia: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const form = useRef()

    const deleteProduct = async () => {
        const res = await consumServices(keys.deleteProduct, 'DELETE', '', productID)

        if (res.error) return console.error(res)

        setProducts((prev) => prev.filter((producto) => producto._id !== res.info.product._id))

        Alerts('Completado', 'Producto eliminado con exito')
    }

    const newProduct = async (e) => {
        e.preventDefault()

        formData.ganancia = String(Number(formData.priceventa) - Number(formData.price))

        const res = await consumServices(keys.registerProduct, 'POST', '', formData)

        if (res.error) return console.error(res)

        setProducts((prev) => [...prev, res.info[0]])

        Alerts('Completado', 'Producto agregado con exito')
        form.current.reset()
    }

    const updateProductService = async (e) => {
        e.preventDefault()

        infoUpdateProduct.ganancia = String(Number(infoUpdateProduct.priceventa) - Number(infoUpdateProduct.price))

        const res = await consumServices(keys.updateProduct, 'POST', '', infoUpdateProduct)

        if (res.error) return console.error(res)

        setProducts((prev) =>
            prev.map((producto) =>
                producto._id === infoUpdateProduct.id ? res.info[0] : producto
            )
        );

        Alerts('Completado', 'Producto actualizado con exito')
    }

    const handleIdProductDelete = (product) => {
        setProductID({
            id: product._id
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleChangeUpdate = (e) => {
        const { name, value } = e.target;
        setInfoUpdateProduct((prev) => ({ ...prev, [name]: value }));
    };

    const updateProduct = (product) => {
        setInfoUpdateProduct(new ProductInfoUpdate(product))
    }

    const getUnitProducts = (units) => {
        if(units <= 10) {
            return 'danger'
        } 

        if(units <= 15) {
            return 'info'
        } 

        if(units >= 20) {
            return 'success'
        } 
    };

    return {
        productID,
        products,
        formData,
        infoUpdateProduct,
        loader,
        form,
        filters,
        newProduct,
        updateProductService,
        handleIdProductDelete,
        handleChangeUpdate,
        updateProduct,
        handleChange,
        setProducts,
        setLoader,
        deleteProduct,
        getUnitProducts
    }
}