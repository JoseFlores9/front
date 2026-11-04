import { NavLink } from "react-router-dom";
import Plus from "../../assets/icons/Plus";
import { MAX_COMPARED_PRODUCTS } from "../../constants/nutrients";
import ProductImage from "../commons/ProductImage";

const CompareTray = (props) => {
  const { selected, onRemove, onClear } = props;
  if (selected.length === 0) return null;

  const compareUrl = `/product?${selected
    .map((product) => `id=${product._id}`)
    .join("&")}`;
  const emptySlots = MAX_COMPARED_PRODUCTS - selected.length;

  return (
    <div className="fixed inset-x-0 bottom-4 z-20 px-4">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-3 rounded-2xl bg-principal p-3 text-white shadow-2xl sm:flex-nowrap">
        <ul className="flex gap-2">
          {selected.map((product) => (
            <li key={product._id} className="relative">
              <ProductImage
                src={product.image}
                alt={product.name}
                title={product.name}
                className="h-10 w-10 rounded-xl bg-white object-contain p-1 sm:h-12 sm:w-12"
              />
              <button
                onClick={() => onRemove(product)}
                aria-label={`Quitar ${product.name}`}
                className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-principal shadow hover:bg-red-alert hover:text-white"
              >
                <Plus styles="h-2.5 w-2.5 rotate-45" />
              </button>
            </li>
          ))}
          {Array.from({ length: emptySlots }, (_, index) => (
            <li
              key={index}
              className="h-10 w-10 rounded-xl border-2 border-dashed border-white/25 sm:h-12 sm:w-12"
            />
          ))}
        </ul>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold">
            {selected.length} de {MAX_COMPARED_PRODUCTS} seleccionados
          </p>
          <p className="text-xs text-white/70">
            {selected.length === 1
              ? "Elige otro producto para comparar"
              : "Listo para comparar"}
          </p>
        </div>
        <div className="flex w-full items-center justify-end gap-3 sm:w-auto">
          <button
            onClick={onClear}
            className="text-sm font-semibold text-white/70 hover:text-white"
          >
            Limpiar
          </button>
          <NavLink
            to={compareUrl}
            className="flex-1 rounded-full bg-accent px-5 py-2.5 text-center text-sm font-bold text-principal hover:bg-accent-dark sm:flex-none"
          >
            Comparar ({selected.length})
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CompareTray;
