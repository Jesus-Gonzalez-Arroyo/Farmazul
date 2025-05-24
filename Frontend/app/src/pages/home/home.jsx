import { useEffect } from "react";
import { Navigation } from "../../layouts/Navigation";
import { CardsDates } from "../../components/Cards/CardsDates/card-dates-dashboard";
import { TableComponent } from "../../components/tableComponent/Tables.jsx";
import { Loader } from "../../components/Loader";
import "./home.css";
import { UseHome } from "../../hooks/useHome";

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
            <div className="d-flex flex-wrap justify-content-around my-4 resum">
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
                <TableComponent
                  heads={[{ label: "Nombre", key: "name" }]}
                  actions={false}
                  items={productMasVendidos}
                />
              </div>
              <div
                className="shadow p-3 rounded overflow-auto table-responsive"
              >
                <p className="h6 mb-4">Productos en agotamiento</p>
                <TableComponent
                  heads={[
                    { label: "Nombre", key: "name" },
                    { label: "Cantidad", key: "cantidad" },
                  ]}
                  actions={false}
                  items={info.resumLowUnits}
                />
              </div>
              <div
                className="shadow p-3 rounded overflow-auto table-responsive-1"
              >
                <p className="h6 mb-4">Usuarios activos</p>
                <TableComponent
                  heads={[
                    { label: "Nombre", key: "name" },
                    { label: "Usuario", key: "email" },
                    { label: "Rol", key: "rol" },
                  ]}
                  actions={false}
                  items={info.users}
                />
              </div>
            </div>
          </div>
        )}
      </Navigation>
    </div>
  );
}
