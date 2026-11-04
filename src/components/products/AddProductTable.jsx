import { Modal } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Search from "../../assets/icons/Search";
import Check from "../../assets/icons/Check";
import Plus from "../../assets/icons/Plus";
import axios from "../../api/axios";
import { MAX_COMPARED_PRODUCTS } from "../../constants/nutrients";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import ProductImage from "../commons/ProductImage";

const PAGE_SIZE = 24;

const AddProductTable = (props) => {
  const { open, handleClose, products, onAdd, onRemove } = props;
  const [result, setResult] = useState({ items: [], page: 0, totalPages: 0 });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const debouncedSearch = useDebouncedValue(searchTerm);
  // Identifies the current search, so a "load more" that finishes after the
  // search changed is dropped.
  const requestKey = useRef("");

  const selectedIds = products.map((product) => product._id);
  const remaining = MAX_COMPARED_PRODUCTS - products.length;
  const showProducts = result.items;

  const fetchPage = (page) =>
    axios
      .get("/products", {
        params: {
          search: debouncedSearch.trim() || undefined,
          categoryId: categoryId || undefined,
          sortBy: "name",
          page,
          limit: PAGE_SIZE,
        },
      })
      .then((response) => response.data);

  useEffect(() => {
    if (!open || categories.length > 0) return;
    axios
      .get("/products/filters/categories")
      .then((response) => setCategories(response.data));
  }, [open, categories.length]);

  useEffect(() => {
    if (!open) return;
    const key = `${debouncedSearch}|${categoryId}`;
    requestKey.current = key;
    setLoading(true);
    fetchPage(1)
      .then((data) => {
        if (requestKey.current === key) setResult(data);
      })
      .finally(() => {
        if (requestKey.current === key) setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, debouncedSearch, categoryId]);

  const handleLoadMore = () => {
    const key = requestKey.current;
    setLoading(true);
    fetchPage(result.page + 1)
      .then((data) => {
        if (requestKey.current !== key) return;
        setResult((prev) => ({
          ...data,
          items: [...prev.items, ...data.items],
        }));
      })
      .finally(() => {
        if (requestKey.current === key) setLoading(false);
      });
  };

  const onClose = () => {
    handleClose();
    setSearchTerm("");
    setCategoryId("");
  };

  const toggleProduct = (product) => {
    if (selectedIds.includes(product._id)) {
      onRemove(product._id);
    } else if (remaining > 0) {
      onAdd(product);
    }
  };

  const chipStyles = (active) =>
    `shrink-0 rounded-full border-1 px-3 py-1 text-xs font-medium transition-colors ${
      active
        ? "bg-secondary border-secondary text-white"
        : "bg-white border-light-gray text-principal hover:border-third"
    }`;

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="add-products-title">
      <div className="fixed inset-x-2 top-2 mx-auto flex max-h-[calc(100dvh-1rem)] sm:inset-x-4 sm:top-[5vh] sm:max-h-[90vh] max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl focus:outline-none">
        <div className="flex items-start justify-between gap-4 border-b-1 border-light-gray px-4 pt-4 pb-3 sm:px-6 sm:pt-5 sm:pb-4">
          <div>
            <h2
              id="add-products-title"
              className="text-xl font-bold text-principal"
            >
              Añadir productos
            </h2>
            <p className="text-sm text-gray">
              {remaining > 0
                ? `Puedes añadir ${remaining} más (máximo ${MAX_COMPARED_PRODUCTS}).`
                : `Has llegado al máximo de ${MAX_COMPARED_PRODUCTS}. Quita uno para añadir otro.`}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="w-8 h-8 p-0 border-0 rounded-full bg-fifth text-principal flex items-center justify-center hover:bg-light-gray"
          >
            <Plus styles="w-3 h-3 rotate-45" />
          </button>
        </div>

        <div className="flex flex-col gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <label className="flex items-center gap-2 rounded-xl border-1 border-light-gray bg-fifth px-3 py-2 focus-within:border-third">
            <Search styles="w-4 h-4 text-gray" />
            <input
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Busca por nombre o marca"
              className="w-full bg-transparent text-sm text-principal placeholder:text-gray focus:outline-none"
            />
          </label>
          {categories.length > 0 && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setCategoryId("")}
                className={chipStyles(categoryId === "")}
              >
                Todas
              </button>
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => setCategoryId(category._id)}
                  className={chipStyles(categoryId === category._id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4 sm:px-6">
          {loading && showProducts.length === 0 && (
            <p className="py-12 text-center text-sm text-gray">
              Cargando productos…
            </p>
          )}
          {!loading && showProducts.length === 0 && (
            <p className="py-12 text-center text-sm text-gray">
              No hay productos que coincidan con la búsqueda.
            </p>
          )}
          <ul
            aria-busy={loading}
            className={`grid grid-cols-2 gap-3 transition-opacity sm:grid-cols-3 md:grid-cols-4 ${
              loading && result.page <= 1 && showProducts.length > 0
                ? "opacity-50"
                : ""
            }`}
          >
            {showProducts.map((product) => {
              const selected = selectedIds.includes(product._id);
              const disabled = !selected && remaining === 0;
              return (
                <li key={product._id}>
                  <button
                    onClick={() => toggleProduct(product)}
                    disabled={disabled}
                    aria-pressed={selected}
                    className={`relative flex h-full w-full flex-col items-center rounded-xl border-1 p-3 text-center transition-all ${
                      selected
                        ? "border-accent bg-accent/10 ring-2 ring-accent"
                        : "border-light-gray bg-white hover:border-third hover:shadow-md"
                    } ${disabled ? "cursor-not-allowed opacity-40 hover:shadow-none" : ""}`}
                  >
                    <span
                      className={`absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full ${
                        selected
                          ? "bg-accent text-principal"
                          : "bg-fifth text-principal"
                      }`}
                    >
                      {selected ? (
                        <Check styles="w-3 h-3 fill-current" />
                      ) : (
                        <Plus styles="w-3 h-3" />
                      )}
                    </span>
                    <ProductImage
                      src={product.image}
                      alt=""
                      className="h-20 w-20 object-contain"
                    />
                    <span className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-third">
                      {product.brand}
                    </span>
                    <span className="text-sm font-medium leading-snug text-principal line-clamp-2">
                      {product.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          {result.page < result.totalPages && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="rounded-full border-1 border-light-gray bg-white px-5 py-2 text-sm font-semibold text-principal hover:border-secondary disabled:opacity-50"
              >
                {loading
                  ? "Cargando…"
                  : `Cargar más (${result.total - showProducts.length} restantes)`}
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 border-t-1 border-light-gray px-4 py-3 sm:px-6 sm:py-4">
          <span className="text-sm text-principal">
            <strong>{products.length}</strong> de {MAX_COMPARED_PRODUCTS} en la
            comparación
          </span>
          <button
            onClick={onClose}
            className="rounded-full border-0 bg-accent px-6 py-2 text-sm font-bold text-principal hover:bg-accent-dark"
          >
            Listo
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddProductTable;
