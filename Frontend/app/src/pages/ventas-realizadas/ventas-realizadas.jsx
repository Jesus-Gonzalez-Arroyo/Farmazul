import { useState, useEffect } from 'react'
import { Navigation } from "../../layouts/Navigation";
import { keys, modifyMoney } from '../../utils/index'
import { consumServices } from '../../contexts/execute'
import { Loader } from '../../components/Loader';
import { TableComponent } from '../../components/tableComponent/Tables.jsx';
import { FileIcon } from '@primer/octicons-react'
import { ProductsVendidosModel } from '../../models/productsVendidosModel.js';
import { TableFooter } from '../../components/TableFooter.jsx'
import "./ventas-realizadas.css";

export function VentasRealizadas() {
    const [products, setProducts] = useState([])
    const [productsVendidos, setProductsVendidos] = useState([])
    const [loader, setLoader] = useState(true)
    const [user, setUser] = useState("")
    const [open, setOpen] = useState(false)
    const [openFilterPrice, setOpenFilterPrice] = useState(false)
    const [filterPrice, setFilterPrice] = useState("")
    const [userActives, setUserActives] = useState([])
    const filters = ["Mayor a Menor", "Menor a Mayor"]
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPages, setTotalPages] = useState([])

    const handleSelect = (value) => {
        setUser(value)
        setOpen(false)
    };

    const handleSelectFilter = (value) => {
        setFilterPrice(value)
        setOpenFilterPrice(false)
    };

    const nextPage = () => {
        if (paginaActual === totalPages) return
        setPaginaActual(paginaActual + 1)
    }

    const previuosPage = () => {
        if (paginaActual === 1) return
        setPaginaActual(paginaActual - 1)
    }


    useEffect(() => {
        const productsGet = async () => {
            const resVentas = await consumServices(keys.getVentas, 'GET')
            const resUser = await consumServices(keys.getUsers, 'GET')
            if (resVentas.error || resUser.error) return console.error(resUser.error ? resUser.info : resVentas.info);
            setProducts(resVentas.info.reverse())
            setUserActives(resUser.info)

            const totalPaginas = Math.ceil(resVentas.info.length / 10);
            setTotalPages(totalPaginas)

            setTimeout(() => {
                setLoader(false)
            }, 500);
        }

        productsGet()
    }, [paginaActual, setTotalPages])

    return (
        <Navigation>
            {
                loader ? (
                    <Loader />
                ) : (
                    <div className='h-100'>
                        <div className="d-flex w-100 h-15 gap-4">
                            <div className="w-100">
                                <p className="m-0 my-3 h5">Ventas realizadas</p>
                                <div className="shadow p-3 position-relative rounded h-100">
                                    <div className='d-flex align-items-center position-relative gap-3 mb-2'>
                                        <div class="input-group w-25">
                                            <input type="text" className="form-control w-25 p-2" placeholder="Buscar venta" />
                                        </div>
                                        <div>
                                            <div className="position-relative w-100">
                                                <input
                                                    type="text"
                                                    className="form-control w-100 p-2"
                                                    value={filterPrice}
                                                    readOnly
                                                    placeholder="Filtrar de"
                                                    onClick={() => setOpenFilterPrice(!open)}
                                                />
                                                {openFilterPrice && (
                                                    <ul className="list-group position-absolute w-100 mt-1 shadow">
                                                        {filters.map((item) => (
                                                            <li
                                                                key={item}
                                                                className="list-group-item list-group-item-action"
                                                                onClick={() => handleSelectFilter(item)}
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="position-relative w-100">
                                                <input
                                                    type="text"
                                                    className="form-control w-100 p-2"
                                                    value={user.name}
                                                    readOnly
                                                    placeholder="Filtrar por usuario"
                                                    onClick={() => setOpen(!open)}
                                                />
                                                {open && (
                                                    <ul className="list-group position-absolute w-100 mt-1 shadow">
                                                        {userActives.map((item) => (
                                                            <li
                                                                key={item}
                                                                className="list-group-item list-group-item-action"
                                                                onClick={() => handleSelect(item)}
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                {item.name}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <TableComponent
                                            heads={[
                                                { label: "Vendedor", key: "usuario" },
                                                { label: "Fecha", key: "fecha" },
                                                { label: "Valor", key: "valor", render: (val) => `$${modifyMoney(val)}` },
                                                { label: "Recibido", key: "recibido", render: (val) => `$${modifyMoney(val)}` },
                                                { label: "Descuento", key: "descuent", render: (val) => `$${modifyMoney(val)}` },
                                                {
                                                    label: "Metodo de pago", key: "method", render: (val) => (
                                                        <td>
                                                            <div className={`p-2 rounded text-white ${val === 'Efectivo' ? 'bg-success' : 'bg-primary'}`}>
                                                                {val}
                                                            </div>
                                                        </td>
                                                    )
                                                },
                                                {
                                                    label: "Productos vendidos", key: "products", render: (productos) => (
                                                        <div>
                                                            <FileIcon
                                                                onClick={() => setProductsVendidos(productos.map((item)=>(
                                                                    new ProductsVendidosModel(item)
                                                                )))}
                                                                size={24}
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#showProducts"
                                                            />
                                                        </div>
                                                    )
                                                },
                                            ]}
                                            items={products}
                                            actions={false}
                                            elementForPage={10}
                                            pageActual={paginaActual}
                                        />
                                    </div>
                                    <TableFooter nextPage={nextPage} previuosPage={previuosPage} totalPages={totalPages} paginaActual={paginaActual} />
                                    
                                    {/* Vizualizar productos vendidos*/}

                                    <div class="modal fade" id="showProducts" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="staticBackdropLabel">Productos vendidos</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <TableComponent
                                                        heads={[
                                                            {label: 'Producto', key: 'name'},
                                                            {label: 'Cantidad', key: 'cantidad'},
                                                            {label: 'Precio', key: 'price', render: (val) => `$${modifyMoney(val)}`}
                                                        ]}
                                                        items={productsVendidos}
                                                        elementForPage={5}
                                                        pageActual={1}
                                                        actions={false} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </Navigation>
    );
}
