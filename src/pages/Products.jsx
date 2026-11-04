import { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import ProductsTable from "../components/products/ProductsTable";
import AddProductTable from "../components/products/AddProductTable";
import Plus from "../assets/icons/Plus";
import axios from "../api/axios";
import { MAX_COMPARED_PRODUCTS } from "../constants/nutrients";

const BASES = [
  { value: "per100g", label: "Por 100 g" },
  { value: "perPortion", label: "Por porción" },
];

const Products = () => {
  // The compared products live in the URL (?id=a&id=b) so the comparison
  // survives a reload and can be shared.
  const [searchParams, setSearchParams] = useSearchParams();
  const ids = searchParams.getAll("id").slice(0, MAX_COMPARED_PRODUCTS);
  const [productsById, setProductsById] = useState({});
  const [basis, setBasis] = useState("per100g");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const products = ids.map((id) => productsById[id]).filter(Boolean);
  const loading = products.length < ids.length;

  const setIds = (newIds) =>
    setSearchParams(
      newIds.map((id) => ["id", id]),
      { replace: true }
    );

  useEffect(() => {
    const missingIds = ids.filter((id) => !productsById[id]);
    if (missingIds.length === 0) return;
    const getProducts = async () => {
      const responses = await Promise.allSettled(
        missingIds.map((id) => axios.get(`/products/${id}`))
      );
      const found = {};
      const notFound = [];
      responses.forEach((response, index) => {
        if (response.status === "fulfilled") {
          found[missingIds[index]] = response.value.data;
        } else {
          notFound.push(missingIds[index]);
        }
      });
      setProductsById((prev) => ({ ...prev, ...found }));
      if (notFound.length > 0) {
        setIds(ids.filter((id) => !notFound.includes(id)));
      }
    };
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(",")]);

  const handleAddProduct = (product) => {
    if (ids.length >= MAX_COMPARED_PRODUCTS || ids.includes(product._id)) {
      return;
    }
    setProductsById((prev) => ({ ...prev, [product._id]: product }));
    setIds([...ids, product._id]);
  };

  const handleRemoveProduct = (productId) =>
    setIds(ids.filter((id) => id !== productId));

  return (
    <div className="min-h-screen bg-fifth pb-12">
      <div className="bg-secondary px-4 pt-6 pb-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <NavLink
            to="/"
            className="text-sm font-medium text-white/80 hover:text-white"
          >
            ← Volver al catálogo
          </NavLink>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-fifth sm:text-3xl">
                Comparador nutricional
              </h1>
              <p className="mt-1 text-sm text-white/80">
                Comparando {products.length} de {MAX_COMPARED_PRODUCTS}{" "}
                productos. Verde es el mejor valor de cada fila y rojo el peor.
              </p>
            </div>
            <div
              role="radiogroup"
              aria-label="Base de los valores"
              className="flex rounded-full bg-black/15 p-1"
            >
              {BASES.map((option) => (
                <button
                  key={option.value}
                  role="radio"
                  aria-checked={basis === option.value}
                  onClick={() => setBasis(option.value)}
                  className={`rounded-full border-0 px-4 py-1.5 text-sm font-semibold transition-colors ${
                    basis === option.value
                      ? "bg-white text-secondary shadow"
                      : "bg-transparent text-white hover:bg-white/15"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto -mt-10 max-w-6xl px-4 sm:px-6">
        {products.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            {loading ? (
              <p className="text-sm text-gray">Cargando productos…</p>
            ) : (
              <>
                <p className="text-lg font-semibold text-principal">
                  Aún no hay productos para comparar
                </p>
                <p className="mt-1 text-sm text-gray">
                  Añade hasta {MAX_COMPARED_PRODUCTS} productos y compara sus
                  nutrientes lado a lado.
                </p>
                <button
                  onClick={handleOpen}
                  className="mt-6 flex items-center gap-2 rounded-full border-0 bg-accent px-6 py-2 font-bold text-principal hover:bg-accent-dark"
                >
                  <Plus styles="w-4 h-4" /> Añadir productos
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="rounded-2xl bg-fifth">
            <ProductsTable
              products={products}
              basis={basis}
              onAdd={handleOpen}
              onRemove={handleRemoveProduct}
            />
            <p className="mt-2 text-xs text-gray">
              Las grasas mono y poliinsaturadas no se marcan como mejores o
              peores: son grasas saludables, pero en exceso también suman
              calorías.
            </p>
          </div>
        )}
      </div>

      <AddProductTable
        open={open}
        handleClose={handleClose}
        products={products}
        onAdd={handleAddProduct}
        onRemove={handleRemoveProduct}
      />
    </div>
  );
};

export default Products;
