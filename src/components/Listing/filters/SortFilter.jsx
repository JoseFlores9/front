import { NUTRIENTS } from "../../../constants/nutrients";

const selectStyles =
  "min-w-0 max-w-full flex-1 rounded-full border-1 border-light-gray bg-white py-1.5 pl-3 pr-8 text-sm font-medium text-principal hover:border-secondary focus:outline-none sm:max-w-xs sm:flex-none";

const SortFilter = (props) => {
  const { sort, setSort } = props;
  const value = sort.sortBy ? `${sort.sortBy}:${sort.order}` : "";

  const handleChange = (e) => {
    if (!e.target.value) {
      setSort({});
      return;
    }
    const [sortBy, order] = e.target.value.split(":");
    setSort({ ...sort, sortBy, order });
  };

  return (
    <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
      <label htmlFor="sort-by" className="text-sm text-gray">
        Ordenar por
      </label>
      <select
        id="sort-by"
        value={value}
        onChange={handleChange}
        className={selectStyles}
      >
        <option value="">Relevancia</option>
        <option value="name:asc">Nombre (A-Z)</option>
        {NUTRIENTS.map((nutrient) => [
          <option key={`${nutrient.key}:desc`} value={`${nutrient.key}:desc`}>
            {nutrient.name}: mayor a menor
          </option>,
          <option key={`${nutrient.key}:asc`} value={`${nutrient.key}:asc`}>
            {nutrient.name}: menor a mayor
          </option>,
        ])}
      </select>
      {sort.sortBy && sort.sortBy !== "name" && (
        <select
          aria-label="Base de los valores"
          value={sort.basis ?? "per100g"}
          onChange={(e) => setSort({ ...sort, basis: e.target.value })}
          className={selectStyles}
        >
          <option value="per100g">por 100 g</option>
          <option value="perPortion">por porción</option>
        </select>
      )}
    </div>
  );
};

export default SortFilter;
