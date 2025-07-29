import { modifyMoney } from "../../utils";

export default function SuportPayGastos({ref, info}) {
    console.log("info", info);
    return (
        <div ref={ref} style={{ padding: '30px', fontFamily: 'Arial' }}>
            <h2 style={{marginBottom: '40px'}}>Soporte de Pago</h2>
            <p><strong>Fecha:</strong> {info.fecha}</p>
            <p><strong>Concepto:</strong> {info.name}</p>
            <p><strong>Total Pagado:</strong> {modifyMoney(info.price)}</p>

            <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'space-around' }}>
                <div>
                    <p>__________________________</p>
                    <p><strong>Firma quien entrega</strong></p>
                </div>
                <div>
                    <p>__________________________</p>
                    <p><strong>Firma quien recibe</strong></p>
                </div>
            </div>
        </div>
    )
}