export {keys} from './keys'
export {getMounth} from './getDates'
export {getDate} from './getDates'

export function modifyMoney(data) {
    return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}
