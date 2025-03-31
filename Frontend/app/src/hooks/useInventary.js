import {useState} from 'react'
import {ProductInfo, ProductInfoUpdate} from '../models/index'
import {consumServices, keys} from '../utils/index'


export const useInventary = () => {
    const [productID, setProductID] = useState({})
    const [products, setProducts] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [formData, setFormData] = useState(new ProductInfo());
    const [infoUpdateProduct, setInfoUpdateProduct] = useState(new ProductInfoUpdate({}))

    const deleteProduct = async () => {
        
        const res = await consumServices(productID, keys.deleteProduct, 'DELETE')

        if(res.error) return console.error(res)
            
        setProducts((prev) => prev.filter((producto) => producto._id !== res.info.product._id))
    }

    const newProduct = async (e) => {
        e.preventDefault()

        formData.ganancia = String(Number(formData.priceventa) - Number(formData.price))
        formData.cant_actual = formData.cant

        const res = await consumServices(formData, keys.registerProduct, 'POST')

        if(res.error) return console.error(res)

        setProducts((prev) => [...prev, res.info[0]])
    }

    const updateProductService = async (e) => {
        e.preventDefault()

        infoUpdateProduct.ganancia = String(Number(infoUpdateProduct.priceventa) - Number(infoUpdateProduct.price))
        infoUpdateProduct.cant_actual = String(Number(infoUpdateProduct.cant_actual) + Number(infoUpdateProduct.cant === "" ? 0 : infoUpdateProduct.cant))
        infoUpdateProduct.cant = infoUpdateProduct.cant === "" ? infoUpdateProduct.cant_copy : infoUpdateProduct.cant
        
        const res = await consumServices(infoUpdateProduct, keys.updateProduct, 'POST')

        if(res.error) return console.error(res)

        setProducts((prev) =>
            prev.map((producto) =>
              producto._id === infoUpdateProduct.id ? res.info[0] : producto
            )
        );
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

    return {
        productID,
        products,
        allProducts,
        formData,
        infoUpdateProduct,
        deleteProduct,
        newProduct,
        updateProductService,
        handleIdProductDelete,
        handleChangeUpdate,
        updateProduct,
        handleSearchProduct,
        handleChange,
        setProducts, 
        setAllProducts
    }
}