import './card-dates-dasboard.css'
import { getMounth } from '../../../utils';

export function CardsDates(props) {
  return (
    <div class="childrens rounded p-3 shadow d-flex">
      <div className="d-flex align-items-center justify-content-center card-content-left" style={{width: `${props.changeStyle ? '50%':''}`}}>
        <div>
          <p className="h4">{props.title}</p>
          <p className="h6">En el mes de: {getMounth()}</p>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center card-content-right" style={{width: `${props.changeStyle ? '50%':''}`}}>
        <p className="h2">{props.date}</p>
      </div>
    </div>
  );
}
