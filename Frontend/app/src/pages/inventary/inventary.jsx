import { keys, modifyMoney } from "../../utils/index";
import { useEffect } from "react";
import { Navigation } from "../../layouts/Navigation";
import { Loader } from "../../components/Loader";
import { consumServices } from '../../contexts/execute'
import { useInventary } from "../../hooks/index";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ActionsTemplate from '../../templates/Actions'
import { unitBodyTemplate } from '../../templates/Inventary'
import "./inventary.css";

export function Inventary() {
    const {
        products,
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
    } = useInventary();

    useEffect(() => {
        const productsGet = async () => {
            const responseProducts = await consumServices(keys.getProducts, "GET");
            if (responseProducts.error) return console.error(responseProducts.info);
            setProducts(responseProducts.info.reverse());
            setTimeout(() => {
                setLoader(false);
            }, 500);
        };

        productsGet();
    }, [setLoader, setProducts]);

    return (
        <div>
            <Navigation>
                {loader ? (
                    <Loader />
                ) : (
                    <div className="position-relative">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <p className="m-0 h5 mt-3">Inventario de productos</p>
                                <p className="mt-2 mb-3 m-0">Lleva un control sobre tus productos a la venta, teniendo una vision general de cada uno.</p>
                            </div>
                            <div>
                                <button
                                    className="btn btn-success my-3"
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#addProduct"
                                >
                                    Agregar producto
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className="shadow p-3 rounded overflow-auto position-relative h-100">
                                <DataTable
                                    value={products}
                                    filters={filters}
                                    paginator
                                    rows={10}
                                    dataKey="id"
                                    filterDisplay="row"
                                    emptyMessage="No customers found."
                                >
                                    <Column
                                        field="idProduct"
                                        header="Id producto"
                                        filter
                                        showFilterMenu={false}
                                        filterPlaceholder="Search by id"
                                        style={{ minWidth: '12rem' }}
                                    />
                                    <Column
                                        field="name"
                                        header="Nombre"
                                        sortable
                                        body={(rowData) => rowData.name.toUpperCase()}
                                        filter
                                        showFilterMenu={false}
                                        filterPlaceholder="Search by name"
                                        style={{ minWidth: '17rem' }}
                                    />
                                    <Column
                                        field="price"
                                        header="Precio de compra"
                                        sortable
                                        body={(rowData) => `$${modifyMoney(rowData.price)}`}
                                        style={{ minWidth: '11rem' }}
                                    />
                                    <Column
                                        field="price_venta"
                                        header="Precio de venta"
                                        sortable
                                        body={(rowData) => `$${modifyMoney(rowData.price_venta)}`}
                                        style={{ minWidth: '11rem' }}
                                    />
                                    <Column
                                        field="cantidad"
                                        header="Cantidad"
                                        body={(rowData)=>unitBodyTemplate(rowData, getUnitProducts)}
                                        sortable
                                        style={{ minWidth: '11rem' }}
                                    />
                                    <Column
                                        field="ganancia"
                                        header="Ganancias"
                                        sortable
                                        body={(rowData) => `$${modifyMoney(rowData.ganancia)}`}
                                        style={{ minWidth: '12rem' }}
                                    />
                                    <Column
                                        field="proveedor"
                                        header="Proveedor"
                                        body={(rowData) => rowData.proveedor.toUpperCase()}
                                        filter
                                        showFilterMenu={false}
                                        filterPlaceholder="Search by proveedor"
                                        style={{ minWidth: '12rem' }}
                                    />
                                    <Column
                                        field="estancia"
                                        header="Estancia"
                                        filter
                                        showFilterMenu={false}
                                        filterPlaceholder="Search by estante"
                                        body={(rowData) => rowData.estancia.toUpperCase()}
                                        style={{ minWidth: '12rem' }}
                                    />
                                    <Column
                                        header="Acciones"
                                        body={(rowData) => ActionsTemplate(updateProduct, handleIdProductDelete, rowData)}
                                        style={{ minWidth: '5rem' }}
                                    />
                                </DataTable>
                            </div>
                        </div>

                        {/* Agregar producto */}

                        <div class="modal fade modal-lg" id="addProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Registrar producto</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form ref={form} onSubmit={newProduct}>
                                        <div class="modal-body">
                                            <div className='mb-3'>
                                                <label className='h6 required'>Id producto</label>
                                                <input name='idProduct' type="text" className="form-control mb-3 mt-1" onChange={handleChange} />
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

                        {/* Actualizar producto */}

                        <div class="modal fade modal-lg" id="edit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Actualizar producto</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form onSubmit={updateProductService}>
                                        <div class="modal-body">
                                            <div className='mb-3'>
                                                <label className='h6 required'>Id producto</label>
                                                <input name='idProduct' type="text" value={infoUpdateProduct.idProduct} className="form-control mb-3 mt-1" onChange={handleChangeUpdate} />
                                                <label className='h6 required'>Nombre</label>
                                                <input name='name' type="text" value={infoUpdateProduct.name} className="form-control mb-3 mt-1" onChange={handleChangeUpdate} />
                                                <label className='h6 required'>Precio de compra</label>
                                                <input name='price' type="text" value={infoUpdateProduct.price} className="form-control mb-3 mt-1" onChange={handleChangeUpdate} />
                                                <label className='h6 required'>Precio de venta</label>
                                                <input name='priceventa' value={infoUpdateProduct.priceventa} type="text" className="form-control mb-3 mt-1" onChange={handleChangeUpdate} />
                                                <label className='h6'>Cantidad</label>
                                                <input name='cant' value={infoUpdateProduct.cant} type="text" className="form-control mb-3 mt-1" onChange={handleChangeUpdate} />
                                            </div>
                                            <div>
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

                        {/* Eliminar producto */}

                        <div class="modal fade" id="delete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Eliminar producto</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <p>¿Estas seguro de eliminar este producto?</p>
                                        <div className='d-flex gap-2'>
                                            <button type="button" onClick={deleteProduct} class="btn btn-danger" data-bs-dismiss="modal">Eliminar</button>
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Navigation>
        </div>
    );
}
