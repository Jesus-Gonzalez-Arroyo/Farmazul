export function TableFooter({previuosPage, nextPage, totalPages, paginaActual}) {
    return (
        <div className="position-absolute bottom-0 end-0 w-100 bg-white rounded">
            <nav aria-label="Page navigation example" className='d-flex me-3 justify-content-end'>
                <ul class="pagination">
                    <li class="page-item pe-auto" onClick={() => previuosPage()}>
                        <div class="page-link" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only user-select-none">Previous</span>
                        </div>
                    </li>
                    {
                        Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <li className={`page-item ${page === paginaActual ? 'bg-primary' : ''}`}><div class="page-link">{page}</div></li>
                        ))
                    }
                    <li class="page-item pe-auto" onClick={() => nextPage()}>
                        <div class="page-link" aria-label="Next">
                            <span class="sr-only user-select-none">Next</span>
                            <span aria-hidden="true">&raquo;</span>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    )
}