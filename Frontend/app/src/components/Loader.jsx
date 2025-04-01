export function Loader() {
    return (
        <div class="text-center w-100 h-100 d-flex justify-content-center align-items-center">
            <div>
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Cargando datos...</p>
            </div>
        </div>
    )
}