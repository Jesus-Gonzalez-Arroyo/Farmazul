import { Dropdown } from "primereact/dropdown";
import { modifyMoney } from "../../utils";

export function FinalizeShop({
    carProducts,
    form,
    methodPay,
    methodsPay,
    open,
    setOpen,
    handleSelectMethodPay,
    handleChange,
    handleRegisterVenta,
}) {
    return (
        <div>
            <div
                class="modal fade modal-xl"
                id="finalizeShop"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Finalizar compra
                            </h5>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">
                            <div className="d-flex w-100 gap-5">
                                <div className="w-50">
                                    <p className="fw-bold">Resumen de compra</p>
                                    <div className="overflow-auto h-350">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Nombre</th>
                                                    <th scope="col">Precio</th>
                                                    <th scope="col">Cantidad</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {carProducts.map((producto) => (
                                                    <tr key={producto.id}>
                                                        <td>{producto.name.toUpperCase()}</td>
                                                        <td>${modifyMoney(producto.price)}</td>
                                                        <td>{producto.cantidad}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="mt-4">
                                        <p className="m-0 fw-bold">Total de la compra</p>
                                        <p>
                                            $
                                            {modifyMoney(
                                                carProducts.reduce(
                                                    (total, item) => total + item.price * item.cantidad,
                                                    0
                                                )
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="w-50">
                                    <p className="fw-bold">Metodo de pago</p>
                                    <form ref={form} action="">
                                        <div className="position-relative w-100 mb-3">
                                            <input
                                                type="text"
                                                className="form-control w-100"
                                                value={methodPay}
                                                readOnly
                                                placeholder="Selecciona"
                                                onClick={() => setOpen(!open)}
                                            />
                                            {open && (
                                                <ul className="list-group position-absolute w-100 mt-1 shadow">
                                                    {methodsPay.map((item) => (
                                                        <li
                                                            key={item}
                                                            className="list-group-item list-group-item-action"
                                                            onClick={() => handleSelectMethodPay(item)}
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                        <div
                                            style={{
                                                display: methodPay === methodsPay[0] ? "block" : "none",
                                            }}
                                        >
                                            <p className="fw-bold">Recibido</p>
                                            <input
                                                type="text"
                                                name="recibido"
                                                onChange={handleChange}
                                                className="form-control mb-3"
                                            />
                                        </div>
                                        <div>
                                            <p className="fw-bold">Descuento</p>
                                            <input
                                                type="text"
                                                name="descuent"
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cerrar
                            </button>
                            <button
                                type="button"
                                onClick={handleRegisterVenta}
                                class="btn btn-success"
                                data-bs-dismiss="modal"
                            >
                                Finalizar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
