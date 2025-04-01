import { useEffect } from "react";
import { Navigation } from "../../components/Navigation";
import { CardsDates } from "../../components/Cards/CardsDates/card-dates-dashboard";
import "./home.css";

export function Home() {
  useEffect(() => {}, []);

  return (
    <div>
      <Navigation>
        <div class="d-flex justify-content-around my-4">
          <CardsDates title="Ventas realizadas" date="20" />
          <CardsDates title="Productos comprados" date="5" />
          <CardsDates
            title="Total ingresos"
            date="$1.367.201"
            changeStyle={true}
          />
        </div>
        <div className="d-flex justify-content-around my-5 gap-5 mx-4" style={{height: "calc(100% - 30%)"}}>
          <div className="shadow-sm p-3 rounded overflow-auto" style={{width: '40%'}}>
            <p className="h6 mb-4">Usuarios activos</p>
            <table className="table" style={{maxHeight: '50px'}}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">Rol</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Jesus</td>
                  <td>jesusgonzales1102@gmail.com</td>
                  <td>Admin</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Valery</td>
                  <td>valerymaurys1102@gmail.com</td>
                  <td>Admin</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="shadow-sm p-3 rounded overflow-auto" style={{width: '30%'}}>
            <p className="h6 mb-4">Productos mas vendidos</p>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Acetaminofen</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Aspirina</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Dolex</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="shadow-sm p-3 rounded overflow-auto" style={{width: '30%'}}>
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
                <tr>
                  <th scope="row">1</th>
                  <td>Desodorante</td>
                  <td>4</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jarabe</td>
                  <td>2</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Antibiotico</td>
                  <td>1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Navigation>
    </div>
  );
}
