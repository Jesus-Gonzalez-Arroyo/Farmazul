import {useEffect, useState} from 'react'
import './card-dates-dasboard.css'

export function CardsDates(props) {
  const [mounth, setMounth] = useState("");

  useEffect(() => {
    const fecha = new Date();
    let mes = fecha.toLocaleString("es-ES", { month: "long" });
    mes = mes.charAt(0).toUpperCase() + mes.slice(1);
    setMounth(mes);
  }, []);

  return (
    <div class="childrens rounded p-3 shadow-sm d-flex">
      <div className="d-flex align-items-center justify-content-center card-content-left" style={{width: `${props.changeStyle ? '50%':''}`}}>
        <div>
          <p className="h4">{props.title}</p>
          <p className="h6">En el mes de: {mounth}</p>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center card-content-right" style={{width: `${props.changeStyle ? '50%':''}`}}>
        <p className="h2">{props.date}</p>
      </div>
    </div>
  );
}
