import { Navigation } from '../../components/Navigation'
import { useState, useEffect } from 'react'
import './inventary.css'

export function Inventary() {
    const [products, setProducts] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        priceventa: "",
        cant: "",
        cant_actual: "",
        estancia: "",
        ganancia: "",
        prov: "",
        fecha: ""
    });
    const [infoUpdateProduct, setInfoUpdateProduct] = useState({
        name: "",
        price: "",
        priceventa: "",
        cant: "",
        cant_actual: "",
        estancia: "",
        ganancia: "",
        prov: "",
        id: "",
        cant_copy:"",
        fecha: ""
    })

    const newProduct = async (e) => {
        e.preventDefault()

        try {
            formData.ganancia = String(Number(formData.priceventa) - Number(formData.price))
            formData.cant_actual = formData.cant
            const register_product = await fetch('http://127.0.0.1:5000//index/API/v1/register_product', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            const response_register = await register_product.json()
            setProducts((prev) => [...prev, response_register.info[0]])
        } catch (error) {
            console.error(error)
        }
    }

    const updateProductService = async (e) => {
        e.preventDefault()

        try {
            infoUpdateProduct.ganancia = String(Number(infoUpdateProduct.priceventa) - Number(infoUpdateProduct.price))
            infoUpdateProduct.cant_actual = String(Number(infoUpdateProduct.cant_actual) + Number(infoUpdateProduct.cant === "" ? 0 : infoUpdateProduct.cant))
            infoUpdateProduct.cant = infoUpdateProduct.cant === "" ? infoUpdateProduct.cant_copy : infoUpdateProduct.cant
            const update_product = await fetch('http://127.0.0.1:5000//index/API/v1/update_product', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(infoUpdateProduct)
            })
            const response_update = await update_product.json()
            if(!response_update.error) {
                setProducts((prev) =>
                    prev.map((producto) =>
                      producto._id === infoUpdateProduct.id ? response_update.info[0] : producto
                    )
                );
            }
            console.log(response_update)
        } catch (error) {
            console.error(error)
        }
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
        setInfoUpdateProduct({
            name: product.name,
            price: product.price,
            priceventa: product.price_venta,
            cant: "",
            cant_copy: product.cantidad,
            cant_actual: String(product.cantidad_actual),
            estancia: product.estancia,
            ganancia: product.ganancia,
            prov: product.proveedor,
            id: product._id,
            fecha: product.fecha
        })
    }

    const handleSearchProduct = (e) => {
        const search = [...products].filter((product) => product.name.toLowerCase().includes(e.target.value.toLowerCase()))

        if (e.target.value === "") {
            setProducts(allProducts)
            return;
        }

        setProducts(search)
    }

    useEffect(() => {
        const productsGet = async () => {
            const products = await fetch('http://127.0.0.1:5000//index/API/v1/get_products_all', {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            })
            const responseProducts = await products.json()
            if (responseProducts.error) return console.error(responseProducts.info);
            console.table(responseProducts.info)
            setProducts(responseProducts.info)
            setAllProducts(responseProducts.info)
        }

        productsGet()
    }, [])

    return (
        <div>
            <Navigation>
                <div className='d-flex justify-content-between align-items-center'>
                    <div>
                        <button className='btn btn-success my-3' type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Agregar nuevo producto</button>
                    </div>
                </div>
                <div className='h-90'>
                    <div className="shadow-sm p-3 rounded overflow-auto h-100">
                        <div class="input-group mb-4 w-50">
                            <input type="text" className="form-control w-100" placeholder="Nombre del producto" aria-label="Nombre del producto" aria-describedby="button-addon2" onChange={handleSearchProduct} />
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Precio compra</th>
                                    <th scope="col">Precio venta</th>
                                    <th scope="col">Cantidad comprada</th>
                                    <th scope="col">Fecha ultima compra</th>
                                    <th scope="col">Cantidad Actual</th>
                                    <th scope="col">Ganancia x unidad</th>
                                    <th scope="col">Proveedor</th>
                                    <th scope="col">Estancia</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((producto, index) => (
                                    <tr key={producto._id}>
                                        <td>{index + 1}</td>
                                        <td>{producto.name}</td>
                                        <td>$
                                            {producto.price
                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                        </td>
                                        <td>$
                                            {producto.price_venta
                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                        </td>
                                        <td>{producto.cantidad}</td>
                                        <td>{producto.fecha}</td>
                                        <td>{producto.cantidad_actual}</td>
                                        <td>${String(Number(producto.price_venta) - Number(producto.price)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                                        <td>{producto.proveedor}</td>
                                        <td>{producto.estancia}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                type="button"
                                                data-bs-toggle="modal"
                                                data-bs-target="#editProduct"
                                                onClick={() => updateProduct(producto)}
                                            >
                                                Editar
                                            </button>
                                            <button className='btn btn-danger mx-2'>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="modal fade modal-lg" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Registrar producto</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form action="" onSubmit={newProduct}>
                                <div class="modal-body">
                                    <div className='mb-3'>
                                        <label className='h6 required'>Nombre</label>
                                        <input name='name' type="text" className="form-control mb-3 mt-1" onChange={handleChange} />
                                        <label className='h6 required'>Precio de compra</label>
                                        <input name='price' type="text" className="form-control mb-3 mt-1" onChange={handleChange} />
                                        <label className='h6 required'>Precio de venta</label>
                                        <input name='priceventa' type="text" className="form-control mb-3 mt-1" onChange={handleChange} />
                                        <label className='h6 required'>Cantidad</label>
                                        <input name='cant' type="text" className="form-control mb-3 mt-1" onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label className='h6 required'>Fecha</label>
                                        <input name='fecha' type="date" className="form-control mb-3 mt-1" onChange={handleChange} />
                                        <label className='h6'>Proveedor</label>
                                        <input name='prov' type="text" className="form-control mb-3 mt-1" onChange={handleChange} />
                                        <label className='h6'>Lugar de estancia</label>
                                        <input name='estancia' type="text" className="form-control mb-3 mt-1" onChange={handleChange} />
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary">Escanear</button>
                                    <button type="submit" data-bs-dismiss="modal" class="btn btn-success">Guardar</button>
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Actualizar product */}

                <div class="modal fade modal-lg" id="editProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Actualizar producto</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form onSubmit={updateProductService}>
                                <div class="modal-body">
                                    <div className='mb-3'>
                                        <label className='h6 required'>Nombre</label>
                                        <input name='name' type="text" value={infoUpdateProduct.name} className="form-control mb-3 mt-1" onChange={handleChangeUpdate} />
                                        <label className='h6 required'>Precio de compra</label>
                                        <input name='price' type="text" value={infoUpdateProduct.price} className="form-control mb-3 mt-1" onChange={handleChangeUpdate} />
                                        <label className='h6 required'>Precio de venta</label>
                                        <input name='priceventa' value={infoUpdateProduct.priceventa} type="text" className="form-control mb-3 mt-1" onChange={handleChangeUpdate} />
                                        <label className='h6'>Cantidad</label>
                                        <input name='cant' type="text" className="form-control mb-3 mt-1" onChange={handleChangeUpdate} />
                                    </div>
                                    <div>
                                        <label className='h6 required'>Fecha</label>
                                        <input name='fecha' type="date" value={infoUpdateProduct.fecha} className="form-control mb-3 mt-1" onChange={handleChangeUpdate} />
                                        <label className='h6'>Proveedor</label>
                                        <input name='prov' type="text" value={infoUpdateProduct.prov} className="form-control mb-3 mt-1" onChange={handleChangeUpdate} />
                                        <label className='h6'>Lugar de estancia</label>
                                        <input name='estancia' type="text" value={infoUpdateProduct.estancia} className="form-control mb-3 mt-1" onChange={handleChangeUpdate} />
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-success" data-bs-dismiss="modal">Actualizar</button>
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Navigation>
        </div>
    )
}