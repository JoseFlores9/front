const CategoryFilter = (props) => {
  const { categories, selectedIds, onToggle, onClear } = props;
  return (
    <div className="rounded-2xl border-1 border-light-gray bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-principal">Categorías</h2>
        {selectedIds.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs font-semibold text-secondary hover:underline"
          >
            Limpiar
          </button>
        )}
      </div>
      <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 no-scrollbar lg:mx-0 lg:flex-wrap lg:px-0">
        {categories.map((category) => {
          const active = selectedIds.includes(category._id);
          return (
            <li key={category._id} className="shrink-0">
              <button
                onClick={() => onToggle(category._id)}
                aria-pressed={active}
                className={`whitespace-nowrap rounded-full border-1 px-3 py-1 text-xs font-semibold transition-colors ${
                  active
                    ? "border-secondary bg-secondary text-white"
                    : "border-light-gray bg-fifth text-principal hover:border-secondary"
                }`}
              >
                {category.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryFilter;
