export {keys} from './keys'
export {getMounth} from './getDates'
export {getDate} from './getDates'

export function modifyMoney(data) {
    const number = Number(data) || 0
    return number.toLocaleString('es-CO')
}
