import {useState, useRef} from 'react'
import {ProductInfo, ProductInfoUpdate} from '../models/index'
import { keys } from '../utils/index'
import {consumServices} from '../contexts/execute'

export const useInventary = () => {
    const [productID, setProductID] = useState({})
    const [products, setProducts] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [formData, setFormData] = useState(new ProductInfo());
    const [infoUpdateProduct, setInfoUpdateProduct] = useState(new ProductInfoUpdate({}))
    const [loader, setLoader] = useState(true)
    const form = useRef()
    const [infoAlert, setInfoAlert] = useState({
        show: false,
        message: '',
        type: 'success',
        error: false
    });
    
    const deleteProduct = async () => {
        
        const res = await consumServices(keys.deleteProduct, 'DELETE', '', productID)

        if(res.error) return updateInfoAlert('Ha ocurrido un error', 'danger', true)
            
        setProducts((prev) => prev.filter((producto) => producto._id !== res.info.product._id))
        updateInfoAlert('Se ha eliminado un producto con exito', 'danger')
    }

    const newProduct = async (e) => {
        e.preventDefault()

        formData.ganancia = String(Number(formData.priceventa) - Number(formData.price))

        const res = await consumServices(keys.registerProduct, 'POST', '', formData)

        if(res.error) return updateInfoAlert('Ha ocurrido un error', 'danger', true)   

        setProducts((prev) => [...prev, res.info[0]])
        updateInfoAlert('Nuevo producto agregado con exito.')
        form.current.reset()
    }

    const updateProductService = async (e) => {
        e.preventDefault()

        infoUpdateProduct.ganancia = String(Number(infoUpdateProduct.priceventa) - Number(infoUpdateProduct.price))
        
        const res = await consumServices(keys.updateProduct, 'POST', '', infoUpdateProduct)

        if(res.error) return updateInfoAlert('Ha ocurrido un error', 'danger', true)

        setProducts((prev) =>
            prev.map((producto) =>
              producto._id === infoUpdateProduct.id ? res.info[0] : producto
            )
        );

        updateInfoAlert('Producto actualizado con exito.')
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

    const handleSearchProduct = (e) => {
        const search = [...products].filter((product) => product.name.toLowerCase().includes(e.target.value.toLowerCase()))

        if (e.target.value === "") {
            setProducts(allProducts)
            return;
        }

        setProducts(search)
    }

    const updateInfoAlert = (message, type='success', error=false) => {
        setInfoAlert({show: true, message, type, error})
         setTimeout(() => {
            setInfoAlert({...infoAlert, show: false})
        }, 5000);
    }

    return {
        productID,
        products,
        allProducts,
        formData,
        infoUpdateProduct,
        loader,
        form,
        infoAlert,
        deleteProduct,
        newProduct,
        updateProductService,
        handleIdProductDelete,
        handleChangeUpdate,
        updateProduct,
        handleSearchProduct,
        handleChange,
        setProducts, 
        setAllProducts,
        setLoader,
    }
}