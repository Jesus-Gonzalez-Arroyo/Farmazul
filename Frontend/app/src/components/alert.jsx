import {AlertFillIcon, CheckCircleIcon, XCircleIcon, TrashIcon} from '@primer/octicons-react'

export const AlertComponent = ({ show, message, type = 'success', error = false }) => {
  if (!show) return null

  return (
    <div className={`alert alert-${type} alert-dismissible fade show position-absolute top-0 end-0 w-25 shadow d-flex align-items-center`} role="alert">
      <div className="w-100">
        {message}
      </div>
      <div className="d-flex justify-content-end">
          <AlertFillIcon className={`${type === 'warning' ? 'd-block': 'd-none'}`} size={24} />
          <CheckCircleIcon className={`${type === 'success' ? 'd-block': 'd-none'}`} size={24} />
          <TrashIcon className={`${type === 'danger' && !error ? 'd-block': 'd-none'}`} size={24} />
          <XCircleIcon className={`${type === 'danger' && error ? 'd-block': 'd-none'}`} size={24} />
      </div>
    </div>
  )
}
