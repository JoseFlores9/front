import { forwardRef } from "react";
import CategoryFilter from "./filters/CategoryFilter";
import SortFilter from "./filters/SortFilter";
import ProductCard, { ProductCardSkeleton } from "./ProductCard";
import Pagination from "../commons/Pagination";
import { MAX_COMPARED_PRODUCTS } from "../../constants/nutrients";

const ProductsList = forwardRef((props, resultsRef) => {
  const {
    result,
    categories,
    selectedCategoryIds,
    onToggleCategory,
    onClearCategories,
    onClearAll,
    sort,
    setSort,
    onPageChange,
    loading,
    selected,
    onToggleSelected,
  } = props;
  const { items, total, page, limit, totalPages } = result;
  const selectedIds = selected.map((product) => product._id);
  const canSelect = selected.length < MAX_COMPARED_PRODUCTS;
  const sortKey = sort.sortBy && sort.sortBy !== "name" ? sort.sortBy : null;
  const basis = sortKey ? sort.basis ?? "per100g" : "per100g";
  const firstLoad = loading && items.length === 0;
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:py-8 lg:flex-row lg:gap-6">
      <aside className="min-w-0 shrink-0 lg:sticky lg:top-4 lg:w-64 lg:self-start">
        <CategoryFilter
          categories={categories}
          selectedIds={selectedCategoryIds}
          onToggle={onToggleCategory}
          onClear={onClearCategories}
        />
      </aside>

      <section ref={resultsRef} className="min-w-0 flex-1 scroll-mt-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray" aria-live="polite">
            {firstLoad ? (
              "Cargando productos…"
            ) : total === 0 ? (
              "Sin resultados"
            ) : (
              <>
                <strong className="text-principal">
                  {from}–{to}
                </strong>{" "}
                de <strong className="text-principal">{total}</strong>{" "}
                {total === 1 ? "producto" : "productos"}
                {sortKey &&
                  ` · valores ${basis === "per100g" ? "por 100 g" : "por porción"}`}
              </>
            )}
          </p>
          <SortFilter sort={sort} setSort={setSort} />
        </div>

        {!loading && total === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border-1 border-dashed border-light-gray bg-white px-6 py-16 text-center">
            <p className="text-lg font-bold text-principal">
              No encontramos productos
            </p>
            <p className="mt-1 text-sm text-gray">
              Prueba con otra búsqueda o quita algunos filtros.
            </p>
            <button
              onClick={onClearAll}
              className="mt-6 rounded-full bg-secondary px-5 py-2 text-sm font-bold text-white hover:bg-principal"
            >
              Quitar filtros
            </button>
          </div>
        ) : (
          <>
            <ul
              aria-busy={loading}
              className={`grid grid-cols-2 gap-3 transition-opacity sm:grid-cols-3 sm:gap-4 xl:grid-cols-4 ${
                loading && !firstLoad ? "pointer-events-none opacity-50" : ""
              }`}
            >
              {firstLoad
                ? Array.from({ length: 8 }, (_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))
                : items.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      selected={selectedIds.includes(product._id)}
                      canSelect={canSelect}
                      onToggle={onToggleSelected}
                      sortKey={sortKey}
                      basis={basis}
                    />
                  ))}
            </ul>
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={onPageChange}
            />
          </>
        )}
      </section>
    </div>
  );
});

ProductsList.displayName = "ProductsList";

export default ProductsList;
