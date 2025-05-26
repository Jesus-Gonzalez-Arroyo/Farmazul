export const AlertComponent = ({ show, message, type = 'success' }) => {
  if (!show) return null

  return (
    <div className={`alert alert-${type} alert-dismissible fade show mt-2 me-2 position-absolute top-0 end-0 w-25 shadow`} role="alert">
      {message}
    </div>
  )
}
