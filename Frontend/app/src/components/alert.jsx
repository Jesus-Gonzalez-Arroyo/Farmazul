import {CheckCircleIcon} from '@primer/octicons-react'
import { useEffect, useState } from 'react';

export function Alert(props) {
    const [show, setShow] = useState(false)

    useEffect(()=>{
        if(props.show) {
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000);
        }
    }, [props])

    return (
        <div className={`position-absolute m-2 w-25 top-0 end-0 d-${show ? 'block' : 'none'}`}>
            <div className={`alert alert-${props.type} d-flex align-items-center gap-3`} role="alert">
                <div>
                    <CheckCircleIcon size={24}/>  
                </div>
                <div>{props.text}</div>
            </div>
        </div>
    );
}
