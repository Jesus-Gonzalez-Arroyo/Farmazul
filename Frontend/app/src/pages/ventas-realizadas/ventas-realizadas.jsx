import { useState, useEffect } from 'react'
import { Navigation } from "../../layouts/Navigation";
import { keys } from '../../utils/index'
import {consumServices} from '../../contexts/execute'
import "./ventas-realizadas.css";
import { Loader } from '../../components/Loader';

export function VentasRealizadas() {
    const [products, setProducts] = useState([])
    const [loader, setLoader] = useState(true)
    const [user, setUser] = useState("")
    const [open, setOpen] = useState(false)
    const [openFilterPrice, setOpenFilterPrice] = useState(false)
    const [filterPrice, setFilterPrice] = useState("")
    const userActives = ["Jesus", "Valery", "Yoniris"]
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
            if (resVentas.error) return console.error(resVentas.info);
            setProducts(resVentas.info)
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
                                <div className="shadow-sm p-3 rounded overflow-auto h-100">
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
                                                        value={user}
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
                                                                    {item}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Vendedor</th>
                                                <th scope="col">Fecha</th>
                                                <th scope="col">Valor</th>
                                                <th scope="col">Recibido</th>
                                                <th scope="col">Descuento</th>
                                                <th scope="col">Metodo de pago</th>
                                                <th scope="col">Productos vendidos</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((producto, index) => (
                                                <tr key={producto._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{producto.usuario}</td>
                                                    <td>{producto.fecha}</td>
                                                    <td>$
                                                        {producto.valor
                                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                                    </td>
                                                    <td>
                                                        ${producto.recibido.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                                    </td>
                                                    <td>
                                                        ${producto.descuent.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                                    </td>
                                                    <td>
                                                        {producto.method}
                                                    </td>
                                                    <td>
                                                        {producto.products.map((item, index) => (
                                                            <div key={index}>
                                                                <strong>{item.name}</strong> - ${item.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} - {item.cantidad} unidades
                                                            </div>
                                                        ))}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </Navigation>
    );
}
