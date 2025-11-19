interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onNextPage,
  onPreviousPage,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="flex gap-2 items-center">
        <button
          onClick={onPreviousPage}
          className={`btn btn-circle btn-outline ${currentPage === 1 ? 'btn-disabled opacity-40' : 'hover:btn-primary'}`}
          disabled={currentPage === 1}
          aria-label="Página anterior"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={`p${page}`}
              onClick={() => onPageChange(page)}
              className={`btn btn-square min-w-12 ${
                page === currentPage 
                  ? 'btn-primary' 
                  : 'btn-outline hover:btn-primary'
              }`}
              aria-label={`Página ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={onNextPage}
          className={`btn btn-circle btn-outline ${currentPage === totalPages ? 'btn-disabled opacity-40' : 'hover:btn-primary'}`}
          disabled={currentPage === totalPages}
          aria-label="Próxima página"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

