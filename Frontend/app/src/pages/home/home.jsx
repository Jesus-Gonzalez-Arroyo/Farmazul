import { useEffect } from "react";
import { Navigation } from "../../layouts/Navigation";
import { CardsDates } from "../../components/Cards/CardsDates/card-dates-dashboard";
import { TableComponent } from "../../components/Tables";
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
            <div className="d-flex justify-content-around my-4">
              <CardsDates
                title="Ventas realizadas"
                date={info.resumVentas.length}
              />
              <CardsDates title="Productos vendidos" date={cantProduct} />
              <CardsDates
                title="Total ingresos"
                date={totalIngresos}
                changeStyle={true}
              />
            </div>
            <div className="d-flex justify-content-around my-4">
              <CardsDates
                title="Total ganancias"
                date={totalGanancias}
                changeStyle={true}
              />
            </div>
            <div
              className="d-flex justify-content-around my-5 gap-5 mx-4"
              style={{ height: "550px" }}
            >
              <div
                className="shadow p-3 rounded overflow-auto"
                style={{ width: "30%", height: "550px", maxHeight: "550px" }}
              >
                <p className="h6 mb-4">Productos mas vendidos ({mes})</p>
                <TableComponent
                  heads={[{ label: "Nombre", key: "name" }]}
                  actions={false}
                  items={productMasVendidos}
                />
              </div>
              <div
                className="shadow p-3 rounded overflow-auto"
                style={{ width: "30%", height: "550px", maxHeight: "550px" }}
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
                className="shadow p-3 rounded overflow-auto"
                style={{ width: "40%" }}
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
