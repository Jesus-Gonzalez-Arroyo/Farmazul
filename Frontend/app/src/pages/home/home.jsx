import { useEffect } from "react";
import { Navigation } from "../../layouts/Navigation";
import { CardsDates } from "../../components/Cards/CardsDates/card-dates-dashboard";
import { Loader } from "../../components/Loader";
import { UseHome } from "../../hooks/useHome";
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import "./home.css";

export function Home() {
  const {
    info,
    cantProduct,
    totalIngresos,
    totalGanancias,
    productMasVendidos,
    mes,
    loader,
    infoDay,
    getInfoSystem,
  } = UseHome();

  useEffect(() => {
    getInfoSystem();
  }, [getInfoSystem]);

  return (
    <div>
      <Navigation>
        {loader ? (
          <Loader />
        ) : (
          <div>
            <div className="d-flex flex-wrap justify-content-around my-4 resum gap-4">
              <CardsDates
                title="Ventas realizadas"
                date={info.resumVentas.length}
              />
              <CardsDates title="Productos vendidos" date={cantProduct} />
              <CardsDates
                title="Ingresos"
                date={totalIngresos}
                changeStyle={true}
              />
              <CardsDates
                title="Ganancias"
                date={totalGanancias}
                changeStyle={true}
              />
              <CardsDates
                title="Ganancias"
                date={infoDay.gananciaDay}
                changeStyle={true}
                isDay={true}
              />
              <CardsDates
                title="Ventas"
                date={infoDay.productDay}
                changeStyle={true}
                isDay={true}
              />
            </div>
            <div
              className="d-flex flex-wrap justify-content-around my-5 gap-5 mx-4"
              style={{ height: "550px" }}
            >
              <div
                className="shadow p-3 rounded overflow-auto table-responsive"
              >
                <p className="h6 mb-4">Productos mas vendidos ({mes})</p>
                <DataTable
                  value={productMasVendidos}
                  paginator
                  rows={5}
                  dataKey="id"
                  filterDisplay="row"
                  emptyMessage="No customers found."
                >
                  <Column
                    field="name"
                    header="Nombre"
                    body={(rowData) => rowData.name.toUpperCase()}
                    style={{ minWidth: '12rem' }}
                  />
                </DataTable>
              </div>
              <div
                className="shadow p-3 rounded overflow-auto table-responsive"
              >
                <p className="h6 mb-4">Productos en agotamiento</p>
                <DataTable
                  value={info.resumLowUnits}
                  paginator
                  rows={5}
                  dataKey="id"
                  filterDisplay="row"
                  emptyMessage="No customers found."
                >
                  <Column
                    field="name"
                    header="Nombre"
                     body={(rowData) => rowData.name.toUpperCase()}
                    style={{ minWidth: '12rem' }}
                  />
                  <Column
                    field="cantidad"
                    header="Cantidad"
                    style={{ minWidth: '12rem' }}
                  />
                </DataTable>
              </div>
              <div
                className="shadow p-3 rounded overflow-auto table-responsive-1"
              >
                <p className="h6 mb-4">Usuarios activos</p>
                <DataTable
                  value={info.users}
                  paginator
                  rows={6}
                  dataKey="id"
                  filterDisplay="row"
                  emptyMessage="No customers found."
                >
                  <Column
                    field="name"
                    header="Nombre"
                    style={{ minWidth: '12rem' }}
                  />
                  <Column
                    field="email"
                    header="Usuario"
                    style={{ minWidth: '12rem' }}
                  />
                  <Column
                    field="rol"
                    header="Rol"
                    style={{ minWidth: '12rem' }}
                  />
                </DataTable>
              </div>
            </div>
          </div>
        )}
      </Navigation>
    </div>
  );
}
