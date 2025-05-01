export {keys} from './keys'
export {getMounth} from './getMes'

export function modifyMoney(data) {
    return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}
