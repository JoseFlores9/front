import { NavLink } from "react-router-dom";
import Plus from "../../assets/icons/Plus";
import Check from "../../assets/icons/Check";
import { NUTRIENTS } from "../../constants/nutrients";
import { formatAmount } from "../../utils/compareProducts";
import ProductImage from "../commons/ProductImage";

const HIGHLIGHTED_NUTRIENTS = ["energy", "protein", "sugars"];

// Shows three key nutrients; when the list is sorted by a nutrient, that one
// goes first and is highlighted.
const getStats = (sortKey) => {
  const keys = [sortKey, ...HIGHLIGHTED_NUTRIENTS].filter(
    (key, index, all) => key && all.indexOf(key) === index
  );
  return keys
    .slice(0, 3)
    .map((key) => NUTRIENTS.find((nutrient) => nutrient.key === key));
};

const ProductCard = (props) => {
  const { product, selected, canSelect, onToggle, sortKey, basis } = props;
  const stats = getStats(sortKey);
  const detailUrl = `/product?id=${product._id}`;

  return (
    <li
      className={`group flex flex-col rounded-2xl border-1 bg-white p-3 transition-all hover:-translate-y-0.5 hover:shadow-lg ${
        selected ? "border-accent ring-2 ring-accent" : "border-light-gray"
      }`}
    >
      <NavLink
        to={detailUrl}
        className="flex flex-col items-center text-center"
      >
        <div className="flex h-28 w-full items-center justify-center rounded-xl bg-fifth">
          <ProductImage
            src={product.image}
            alt=""
            loading="lazy"
            className="h-24 w-24 object-contain transition-transform group-hover:scale-105"
          />
        </div>
        <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-third">
          {product.brand}
        </p>
        <p className="min-h-[2.5rem] text-sm font-semibold leading-snug text-principal line-clamp-2">
          {product.name}
        </p>
      </NavLink>

      <dl className="mt-3 grid grid-cols-1 gap-0.5 sm:grid-cols-3 sm:gap-1">
        {stats.map((nutrient) => {
          const value = product.nutritionalFacts?.[nutrient.key]?.[basis];
          const highlighted = nutrient.key === sortKey;
          return (
            <div
              key={nutrient.key}
              className={`flex flex-row-reverse items-baseline justify-between rounded-lg px-2 py-1 sm:block sm:px-1 sm:py-1.5 sm:text-center ${
                highlighted ? "bg-apple/25 ring-1 ring-apple" : "bg-fifth"
              }`}
            >
              <dd className="text-sm font-bold text-principal">
                {value == null ? "–" : formatAmount(value)}
                <span className="ml-0.5 text-[10px] font-medium text-gray">
                  {nutrient.unit}
                </span>
              </dd>
              <dt className="truncate text-[11px] text-gray sm:text-[10px]">
                {nutrient.shortName}
              </dt>
            </div>
          );
        })}
      </dl>

      <button
        onClick={() => onToggle(product)}
        disabled={!selected && !canSelect}
        title={
          !selected && !canSelect
            ? "Puedes comparar hasta 4 productos"
            : undefined
        }
        className={`group/toggle mt-3 flex items-center justify-center gap-2 rounded-full py-2 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
          selected
            ? "bg-light-green text-green-principal hover:bg-baby-pink hover:text-red-alert"
            : "bg-accent text-principal hover:bg-accent-dark"
        }`}
      >
        {selected ? (
          <>
            <span className="flex items-center gap-2 group-hover/toggle:hidden">
              <Check styles="h-3 w-3" />
              <span className="sm:hidden">Añadido</span>
              <span className="hidden sm:inline">En la comparación</span>
            </span>
            <span className="hidden items-center gap-2 group-hover/toggle:flex">
              <Plus styles="h-3 w-3 rotate-45" /> Quitar
            </span>
          </>
        ) : (
          <>
            <Plus styles="h-3 w-3" /> Comparar
          </>
        )}
      </button>
    </li>
  );
};

export const ProductCardSkeleton = () => (
  <li className="flex animate-pulse flex-col rounded-2xl border-1 border-light-gray bg-white p-3">
    <div className="h-28 rounded-xl bg-fifth" />
    <div className="mx-auto mt-3 h-3 w-16 rounded bg-fifth" />
    <div className="mx-auto mt-2 h-4 w-3/4 rounded bg-fifth" />
    <div className="mt-3 grid grid-cols-3 gap-1">
      <div className="h-10 rounded-lg bg-fifth" />
      <div className="h-10 rounded-lg bg-fifth" />
      <div className="h-10 rounded-lg bg-fifth" />
    </div>
    <div className="mt-3 h-9 rounded-full bg-fifth" />
  </li>
);

export default ProductCard;
