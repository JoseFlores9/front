import { Fragment, useMemo } from "react";
import { Tooltip } from "@mui/material";
import InformationFilledIcon from "../../assets/icons/InformationFilledIcon";
import Plus from "../../assets/icons/Plus";
import { MAX_COMPARED_PRODUCTS } from "../../constants/nutrients";
import { compareProducts, formatAmount } from "../../utils/compareProducts";
import ProductImage from "../commons/ProductImage";

const cellStyles = {
  best: "bg-light-green border-green-principal",
  worst: "bg-baby-pink border-red-alert",
  neutral: "bg-white border-light-gray",
  missing: "bg-white border-light-gray border-dashed",
};

const barStyles = {
  best: "bg-green-principal",
  worst: "bg-red-alert",
  neutral: "bg-fourth",
  missing: "",
};

const ProductCard = ({ product, wins, isLeader, showWins, onRemove }) => (
  <div
    className={`relative h-full bg-white rounded-xl border-1 p-2 pt-3 sm:p-3 sm:pt-4 flex flex-col items-center text-center shadow-sm ${
      isLeader
        ? "border-green-principal ring-2 ring-green-principal"
        : "border-light-gray"
    }`}
  >
    <button
      onClick={() => onRemove(product._id)}
      aria-label={`Quitar ${product.name}`}
      title="Quitar de la comparación"
      className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-7 h-7 p-0 border-0 rounded-full bg-fifth text-gray flex items-center justify-center hover:bg-red-alert hover:text-white transition-colors"
    >
      <Plus styles="w-3 h-3 rotate-45" />
    </button>
    <ProductImage
      src={product.image}
      alt={product.name}
      className="h-14 w-14 sm:h-20 sm:w-20 object-contain"
    />
    <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-third">
      {product.brand}
    </p>
    <p className="text-xs sm:text-sm font-semibold text-principal leading-snug line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
      {product.name}
    </p>
    {product.category?.name && (
      <span className="mt-1 rounded-full bg-fifth px-2 py-0.5 text-[11px] text-third">
        {product.category.name}
      </span>
    )}
    {showWins && (
      <span
        className={`mt-2 rounded-full px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold whitespace-nowrap ${
          isLeader ? "bg-green-principal text-white" : "bg-fifth text-principal"
        }`}
      >
        {isLeader ? "★ " : ""}Mejor en {wins}
      </span>
    )}
  </div>
);

const AddProductCard = ({ remaining, onAdd }) => (
  <button
    onClick={onAdd}
    className="group h-full min-h-[160px] sm:min-h-[200px] w-full rounded-xl border-2 border-dashed border-fourth bg-transparent p-3 flex flex-col items-center justify-center gap-3 text-third hover:border-third hover:bg-white transition-colors"
  >
    <span className="w-12 h-12 rounded-full bg-accent text-principal flex items-center justify-center group-hover:scale-110 transition-transform">
      <Plus styles="w-5 h-5" />
    </span>
    <span className="text-sm font-semibold text-principal text-center">
      Añadir producto
    </span>
    <span className="text-xs">
      {remaining === 1 ? "Queda 1 hueco" : `Quedan ${remaining} huecos`}
    </span>
  </button>
);

const NutrientCell = ({ cell, unit, showBar }) => {
  if (cell.status === "missing") {
    return (
      <div
        className={`h-full rounded-lg border-1 px-2 sm:px-3 py-2 flex items-center justify-center text-xs text-gray ${cellStyles.missing}`}
      >
        Sin dato
      </div>
    );
  }
  return (
    <div
      className={`h-full rounded-lg border-1 px-2 sm:px-3 py-2 ${cellStyles[cell.status]}`}
    >
      <div className="flex items-baseline gap-1">
        <span className="text-base sm:text-lg font-bold text-principal">
          {formatAmount(cell.value)}
        </span>
        <span className="hidden sm:inline text-xs text-gray">{unit}</span>
        {cell.status === "best" && (
          <span className="ml-auto rounded-full bg-green-principal px-2 text-[10px] font-semibold uppercase text-white">
            Mejor
          </span>
        )}
        {cell.status === "worst" && (
          <span className="ml-auto rounded-full bg-red-alert px-2 text-[10px] font-semibold uppercase text-white">
            Peor
          </span>
        )}
      </div>
      {showBar && (
        <div className="mt-1 h-1.5 rounded-full bg-light-gray/50 overflow-hidden">
          <div
            className={`h-full rounded-full ${barStyles[cell.status]} transition-all duration-500`}
            style={{ width: `${Math.max(cell.ratio * 100, 2)}%` }}
          />
        </div>
      )}
    </div>
  );
};

const ProductsTable = (props) => {
  const { products, basis, onAdd, onRemove } = props;
  const { rows, wins } = useMemo(
    () => compareProducts(products, basis),
    [products, basis]
  );
  const canAdd = products.length < MAX_COMPARED_PRODUCTS;
  const columns = products.length + (canAdd ? 1 : 0);
  const comparing = products.length >= 2;
  const topWins = Math.max(0, ...wins);

  let lastGroup = null;
  return (
    <div className="w-full overflow-x-auto pb-4">
      <div
        className="grid gap-2 grid-cols-[80px_repeat(var(--columns),minmax(120px,1fr))] min-w-[calc(80px_+_var(--columns)*128px)] sm:grid-cols-[180px_repeat(var(--columns),minmax(160px,230px))] sm:min-w-[calc(180px_+_var(--columns)*168px)]"
        style={{ "--columns": columns }}
      >
        <div />
        {products.map((product, index) => (
          <ProductCard
            key={product._id}
            product={product}
            wins={wins[index]}
            showWins={comparing}
            isLeader={comparing && topWins > 0 && wins[index] === topWins}
            onRemove={onRemove}
          />
        ))}
        {canAdd && (
          <AddProductCard
            remaining={MAX_COMPARED_PRODUCTS - products.length}
            onAdd={onAdd}
          />
        )}

        {rows.map(({ nutrient, cells }) => {
          const showGroup = nutrient.group !== lastGroup;
          lastGroup = nutrient.group;
          return (
            <Fragment key={nutrient.key}>
              {showGroup && (
                <h3
                  className="mt-4 text-xs font-bold uppercase tracking-wider text-third"
                  style={{ gridColumn: "1 / -1" }}
                >
                  {nutrient.group}
                </h3>
              )}
              <div className="sticky left-0 z-[1] flex items-center bg-fifth pr-1 sm:pr-2">
                <div className="min-w-0 break-words leading-tight">
                  <p className="text-xs font-medium text-principal sm:text-sm">
                    <span className="sm:hidden">{nutrient.shortName}</span>
                    <span className="hidden sm:inline">{nutrient.name}</span>
                    <Tooltip
                      title={nutrient.description}
                      placement="right"
                      arrow
                      enterTouchDelay={0}
                    >
                      <span className="ml-1 inline-block cursor-help align-[-2px] text-third">
                        <InformationFilledIcon styles="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </span>
                    </Tooltip>
                  </p>
                  <p className="text-[11px] text-gray sm:hidden">
                    {nutrient.unit}
                  </p>
                </div>
              </div>
              {cells.map((cell, index) => (
                <NutrientCell
                  key={products[index]._id}
                  cell={cell}
                  unit={nutrient.unit}
                  showBar={comparing}
                />
              ))}
              {canAdd && <div />}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsTable;
