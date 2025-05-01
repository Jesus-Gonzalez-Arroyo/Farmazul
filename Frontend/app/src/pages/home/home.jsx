import { useEffect, useState } from "react";
import { Navigation } from "../../layouts/Navigation";
import { CardsDates } from "../../components/Cards/CardsDates/card-dates-dashboard";
import { consumServices } from "../../contexts/execute";
import { getMounth, keys } from "../../utils";
import { TableComponent } from "../../components/Tables";
import { Loader } from "../../components/Loader";
import "./home.css";

export function Home() {
  const [info, setInfo] = useState({
    resumLowUnits: [],
    users: [],
    resumVentas: [],
  });
  const [cantProduct, setCantProduct] = useState("");
  const [totalIngresos, setTotalIngresos] = useState("");
  const [productMasVendidos, setProductMasVendidos] = useState([]);
  const [mes, setMes] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const infoGet = async () => {
      try {
        const conteo = {};
        const resInfo = await consumServices(keys.getInfoSystem, "GET");
        if (resInfo.error) return console.error(resInfo.info);
        setInfo(resInfo.info);

        const productosPorVenta = resInfo.info.resumVentas.map((venta) => {
          return venta.products.reduce(
            (acc, producto) => acc + Number(producto.cantidad),
            0
          );
        });

        const totalProductos = productosPorVenta.reduce(
          (acc, cantidad) => acc + cantidad,
          0
        );

        const totalValor = resInfo.info.resumVentas.reduce((acc, venta) => {
          return acc + Number(venta.valor);
        }, 0);

        resInfo.info.resumVentas.forEach((venta) => {
          venta.products.forEach((producto) => {
            const id = producto.id;
            const cantidad = parseInt(producto.cantidad, 10);
            const name = producto.name;

            if (!conteo[id]) {
              conteo[id] = {
                id,
                name,
                cantidad_total: 0,
              };
            }

            conteo[id].cantidad_total += cantidad;
          });
        });

        const ordenados = Object.values(conteo).sort(
          (a, b) => b.cantidad_total - a.cantidad_total
        );

        setMes(getMounth());
        setProductMasVendidos(ordenados);
        setTotalIngresos(`$${totalValor.toLocaleString()}`);
        setCantProduct(totalProductos);
      } catch (error) {
        console.error(error);
      } finally {
        setLoader(false);
      }
    };

    infoGet();
  }, []);

  return (
    <div>
      <Navigation>
        {loader ? (
          <Loader />
        ) : (
          <div>
            <div class="d-flex justify-content-around my-4">
              <CardsDates
                title="Ventas realizadas"
                date={info.resumVentas.length}
              />
              <CardsDates 
                title="Productos vendidos" 
                date={cantProduct} 
              />
              <CardsDates
                title="Total ingresos"
                date={totalIngresos}
                changeStyle={true}
              />
            </div>
            <div
              className="d-flex justify-content-around my-5 gap-5 mx-4"
              style={{ height: "550px" }}
            >
              <div
                className="shadow p-3 rounded overflow-auto"
                style={{ width: "40%" }}
              >
                <p className="h6 mb-4">Usuarios activos</p>
                <TableComponent
                  heads={[
                    { label: "Nombre", key: "name" },
                    { label: "Usuario", key: "email", },
                    { label: "Rol", key: "rol" }
                  ]}
                  actions={false}
                  items={info.users}
                />
              </div>
              <div
                className="shadow p-3 rounded overflow-auto"
                style={{ width: "30%", height: '550px', maxHeight: '550px' }}
              >
                <p className="h6 mb-4">Productos mas vendidos ({mes})</p>
                <TableComponent
                  heads={[
                    { label: "Nombre", key: "name" },
                  ]}
                  actions={false}
                  items={productMasVendidos}
                />
              </div>
              <div
                className="shadow p-3 rounded overflow-auto"
                style={{ width: "30%", height: '550px', maxHeight: '550px' }}
              >
                <p className="h6 mb-4">Productos en agotamiento</p>
                <TableComponent
                  heads={[
                    { label: "Nombre", key: "name" },
                    { label: "Cantidad actual", key: "cantidad_actual" }
                  ]}
                  actions={false}
                  items={info.resumLowUnits}
                />
              </div>
            </div>
          </div>
        )}
      </Navigation>
    </div>
  );
}
