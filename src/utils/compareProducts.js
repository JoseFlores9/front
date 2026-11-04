import { NUTRIENTS } from "../constants/nutrients";

// Status of each product's value for one nutrient:
// "best" / "worst" only when at least two products have data, the values
// differ and the nutrient is rated (higherIsBetter !== null).
const compareNutrient = (products, nutrient, basis) => {
  const values = products.map(
    (product) => product.nutritionalFacts?.[nutrient.key]?.[basis] ?? null
  );
  const present = values.filter((value) => value !== null);
  const max = present.length > 0 ? Math.max(...present) : null;
  const min = present.length > 0 ? Math.min(...present) : null;
  const rated =
    nutrient.higherIsBetter !== null && present.length >= 2 && min !== max;
  const best = nutrient.higherIsBetter ? max : min;
  const worst = nutrient.higherIsBetter ? min : max;

  return values.map((value) => {
    let status = "neutral";
    if (value === null) status = "missing";
    else if (rated && value === best) status = "best";
    else if (rated && value === worst) status = "worst";
    return { value, status, ratio: value && max ? value / max : 0 };
  });
};

export const compareProducts = (products, basis) => {
  const rows = NUTRIENTS.map((nutrient) => ({
    nutrient,
    cells: compareNutrient(products, nutrient, basis),
  }));
  const wins = products.map((_, index) =>
    rows.reduce(
      (count, row) => count + (row.cells[index].status === "best" ? 1 : 0),
      0
    )
  );
  return { rows, wins };
};

export const formatAmount = (value) =>
  value.toLocaleString("es-CL", { maximumFractionDigits: 2 });
