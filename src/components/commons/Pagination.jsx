import Arrow from "../../assets/icons/Arrow";

// Page numbers to show: first, last and the two around the current one,
// with "…" where pages are skipped. E.g. 1 … 4 5 6 … 12
const getPages = (page, totalPages) => {
  const pages = [];
  for (let current = 1; current <= totalPages; current++) {
    if (
      current === 1 ||
      current === totalPages ||
      Math.abs(current - page) <= 1
    ) {
      pages.push(current);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }
  return pages;
};

const arrowButton =
  "flex h-10 items-center gap-1 rounded-full border-1 border-light-gray bg-white px-3 text-sm font-semibold text-principal hover:border-secondary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-light-gray";

const Pagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;
  return (
    <nav
      aria-label="Paginación"
      className="mt-8 flex items-center justify-center gap-2"
    >
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Página anterior"
        className={arrowButton}
      >
        <Arrow styles="h-4 w-4 -rotate-90" />
        <span className="hidden sm:inline">Anterior</span>
      </button>

      <ol className="hidden items-center gap-1 sm:flex">
        {getPages(page, totalPages).map((item, index) =>
          item === "…" ? (
            <li key={`gap-${index}`} className="px-1 text-gray">
              …
            </li>
          ) : (
            <li key={item}>
              <button
                onClick={() => onChange(item)}
                aria-current={item === page ? "page" : undefined}
                className={`h-10 min-w-[2.5rem] rounded-full px-2 text-sm font-bold transition-colors ${
                  item === page
                    ? "bg-secondary text-white"
                    : "text-principal hover:bg-white"
                }`}
              >
                {item}
              </button>
            </li>
          )
        )}
      </ol>
      <p className="px-2 text-sm text-principal sm:hidden">
        Página <strong>{page}</strong> de {totalPages}
      </p>

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Página siguiente"
        className={arrowButton}
      >
        <span className="hidden sm:inline">Siguiente</span>
        <Arrow styles="h-4 w-4 rotate-90" />
      </button>
    </nav>
  );
};

export default Pagination;
