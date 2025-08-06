import { DataTable } from "primereact/datatable";
import { Loader } from "../../components/Loader";
import { Navigation } from "../../layouts/Navigation";
import { Column } from "primereact/column";
import { useEffect, useRef, useState } from "react";
import { keys, modifyMoney } from "../../utils";
import { consumServices } from "../../contexts/execute";
import { Alerts } from "../../utils/alerts";

export function Box() {
    const [loader, setLoader] = useState(true)
    const [infoForm, setInfoForm] = useState({
        value: '',
        date: ''
    })
    const [infoDeposits, setInfoDeposits] = useState([])
    const form = useRef()

    useEffect(() => {
        async function getDeposits() {
            const response = await consumServices(keys.getDepositsBox, "GET");
            if (response.error) return console.error(response.info);
            setInfoDeposits(response.info.reverse());
            setTimeout(() => {
                setLoader(false);
            }, 500);
        }

        getDeposits()
    }, [])

    function handleChangeForm(e) {
        const { name, value } = e.target;
        setInfoForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmitForm(e) {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem('infoUser'))
        infoForm.name = user.name

        const response = await consumServices(keys.getDepositsBox, "POST", '', infoForm);
        console.log(response)

        if (response.error) return console.error(response)

        setInfoDeposits((prev) => [response.info, ...prev])
        Alerts('Completado', 'Deposito registrado con exito')
        form.current.reset()
    }

    return (
        <div>
            <Navigation>
                {
                    loader ? (
                        <Loader />
                    ) : (
                        <div className='position-relative'>
                            <div>
                                <p className="m-0 mt-3 h5">Depositos en caja</p>
                                <p className='mb-3 mt-2 m-0'>Registra y revisa los depositos en efectivo de la caja.</p>
                            </div>
                            <div className="d-flex w-100 gap-4">
                                <div className="w-25">
                                    <div className="shadow p-3 position-relative rounded overflow-auto">
                                        <form ref={form} onSubmit={handleSubmitForm}>
                                            <div className="mb-4">
                                                <p className="h5">Regitrar deposito</p>
                                            </div>
                                            <div className="mb-3">
                                                <label className="d-block mb-2" htmlFor="">Valor</label>
                                                <input name="value" placeholder="Ingresa el valor" className="w-100 form-control" onChange={(e) => handleChangeForm(e)} />
                                            </div>
                                            <div>
                                                <label className="d-block mb-2" htmlFor="">Fecha</label>
                                                <input type="date" name="date" onChange={(e) => { handleChangeForm(e) }} className="w-100 form-control" />
                                            </div>
                                            <button className="btn btn-primary mt-4" type="submit">Agregar</button>
                                        </form>
                                    </div>
                                </div>

                                <div className="w-75">
                                    <div className="p-3 shadow rounded">
                                        <p className="h6 mb-3">Ultimos depositos</p>
                                        <DataTable
                                            value={infoDeposits}
                                            paginator
                                            rows={10}
                                            dataKey="id"
                                            filterDisplay="row"
                                            emptyMessage="No customers found."
                                            rowsPerPageOptions={[5, 10, 25]}
                                            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                            currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                        >
                                            <Column
                                                field="name"
                                                header="Nombre"
                                                filter
                                                showFilterMenu={false}
                                                filterPlaceholder="Search by id"
                                                style={{ minWidth: '12rem' }}
                                            />
                                            <Column
                                                field="date"
                                                header="Fecha"
                                                filter
                                                showFilterMenu={false}
                                                filterPlaceholder="Search by id"
                                                style={{ minWidth: '12rem' }}
                                            />
                                            <Column
                                                field="value"
                                                header="Valor"
                                                body={(rowData) => `$${modifyMoney(rowData.value)}`}
                                                filter
                                                showFilterMenu={false}
                                                filterPlaceholder="Search by id"
                                                style={{ minWidth: '12rem' }}
                                            />
                                        </DataTable>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </Navigation>
        </div>
    )
}