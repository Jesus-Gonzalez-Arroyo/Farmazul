import { useEffect, useState } from "react";
import { Navigation } from "../../layouts/Navigation";
import { CardsDates } from "../../components/Cards/CardsDates/card-dates-dashboard";
import "./home.css";
import { consumServices } from "../../contexts/execute";
import { getMounth, keys } from "../../utils";

export function Home() {
  const [info, setInfo] = useState({
    resumLowUnits: [],
    users: [],
    resumVentas: []
  });
  const [cantProduct, setCantProduct] = useState("");
  const [totalIngresos, setTotalIngresos] = useState("")
  const [productMasVendidos, setProductMasVendidos] = useState([])
  const [mes, setMes] = useState("")

  useEffect(() => {
    const infoGet = async () => {
     try {
      const conteo = {}
      const resInfo = await consumServices(keys.get_info, "GET");
      if (resInfo.error) return console.error(resInfo.info);
      setInfo(resInfo.info)

      const productosPorVenta = resInfo.info.resumVentas.map((venta) => {
        return venta.products.reduce((acc, producto) => acc + Number(producto.cantidad), 0);
      });
    
      const totalProductos = productosPorVenta.reduce((acc, cantidad) => acc + cantidad, 0);

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

      setMes(getMounth())
      setProductMasVendidos(ordenados)
      setTotalIngresos(`$${totalValor.toLocaleString()}`)
      setCantProduct(totalProductos)
     } catch (error) {
      console.error(error)
     }
    };

    infoGet();
  }, []);

  return (
    <div>
      <Navigation>
        <div class="d-flex justify-content-around my-4">
          <CardsDates
            title="Ventas realizadas"
            date={info.resumVentas.length}
          />
          <CardsDates title="Productos comprados" date={cantProduct} />
          <CardsDates
            title="Total ingresos"
            date={totalIngresos}
            changeStyle={true}
          />
        </div>
        <div
          className="d-flex justify-content-around my-5 gap-5 mx-4"
          style={{ height: "calc(100% - 30%)" }}
        >
          <div
            className="shadow p-3 rounded overflow-auto"
            style={{ width: "40%" }}
          >
            <p className="h6 mb-4">Usuarios activos</p>
            <table className="table" style={{ maxHeight: "50px" }}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">Rol</th>
                </tr>
              </thead>
              <tbody>
                {info.users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.rol}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className="shadow p-3 rounded overflow-auto"
            style={{ width: "30%" }}
          >
            <p className="h6 mb-4">Productos mas vendidos ({mes})</p>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                </tr>
              </thead>
              <tbody>
                {
                  productMasVendidos.map((product, index)=>(
                    <tr key={product._id}>
                      <th>{index + 1}</th>
                      <td>{product.name}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <div
            className="shadow p-3 rounded overflow-auto"
            style={{ width: "30%" }}
          >
            <p className="h6 mb-4">Productos en agotamiento</p>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col position-sticky">#</th>
                  <th scope="col position-sticky">Nombre</th>
                  <th scope="col position-sticky">Cantidad actual</th>
                </tr>
              </thead>
              <tbody>
                {
                  info.resumLowUnits.map((product, index)=>(
                    <tr key={product._id}>
                      <th>{index + 1}</th>
                      <td>{product.name}</td>
                      <td>{product.cantidad_actual}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </Navigation>
    </div>
  );
}
