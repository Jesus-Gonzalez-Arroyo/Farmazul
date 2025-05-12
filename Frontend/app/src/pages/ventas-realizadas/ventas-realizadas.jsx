import { useState, useEffect } from 'react'
import { Navigation } from "../../layouts/Navigation";
import { keys, modifyMoney } from '../../utils/index'
import { consumServices } from '../../contexts/execute'
import { Loader } from '../../components/Loader';
import { TableComponent } from '../../components/Tables';
import "./ventas-realizadas.css";

export function VentasRealizadas() {
    const [products, setProducts] = useState([])
    const [loader, setLoader] = useState(true)
    const [user, setUser] = useState("")
    const [open, setOpen] = useState(false)
    const [openFilterPrice, setOpenFilterPrice] = useState(false)
    const [filterPrice, setFilterPrice] = useState("")
    const [userActives, setUserActives] = useState([])
    const filters = ["Mayor a Menor", "Menor a Mayor"]

    const handleSelect = (value) => {
        setUser(value)
        setOpen(false)
    };

    const handleSelectFilter = (value) => {
        setFilterPrice(value)
        setOpenFilterPrice(false)
    };

    useEffect(() => {
        const productsGet = async () => {
            const resVentas = await consumServices(keys.getVentas, 'GET')
            const resUser = await consumServices(keys.getUsers, 'GET')
            if (resVentas.error || resUser.error) return console.error(resUser.error ? resUser.info : resVentas.info);
            setProducts(resVentas.info)
            setUserActives(resUser.info)
            setTimeout(() => {
                setLoader(false)
            }, 500);
        }

        productsGet()
    }, [])

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
                                <div className="shadow p-3 rounded overflow-auto h-100">
                                    <div className='d-flex align-items-center gap-3 mb-4'>
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
                                    <TableComponent
                                        heads={[
                                            { label: "Vendedor", key: "usuario" },
                                            { label: "Fecha", key: "fecha" },
                                            { label: "Valor", key: "valor", render: (val) => `$${modifyMoney(val)}` },
                                            { label: "Recibido", key: "recibido", render: (val) => `$${modifyMoney(val)}` },
                                            { label: "Descuento", key: "descuent", render: (val) => `$${modifyMoney(val)}` },
                                            { label: "Metodo de pago", key: "method", render: (val) => (
                                                <td>
                                                    <div className={`p-2 rounded text-white ${val === 'Efectivo' ? 'bg-success' : 'bg-primary'}`}>
                                                        {val}
                                                    </div>
                                                </td>
                                            )},
                                            {
                                                label: "Productos vendidos", key: "products", render: (producto) => producto.map((item, index) => (
                                                    <div key={index}>
                                                        <strong>{String(item.name).toUpperCase()}</strong> - ${item.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} - <strong>{String(item.cantidad).toUpperCase()}</strong> UNIDADES
                                                    </div>
                                                ))
                                            },
                                        ]}
                                        items={products}
                                        actions={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </Navigation>
    );
}
