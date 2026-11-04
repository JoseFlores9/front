import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TopSection from "../components/Listing/TopSection";
import ProductsList from "../components/Listing/ProductsList";
import CompareTray from "../components/Listing/CompareTray";
import axios from "../api/axios";
import { MAX_COMPARED_PRODUCTS } from "../constants/nutrients";
import useDebouncedValue from "../hooks/useDebouncedValue";

const PAGE_SIZE = 24;

// The selection survives going to the comparator and coming back.
const SELECTION_KEY = "healthyrat:selection";

const loadSelection = () => {
  try {
    return JSON.parse(sessionStorage.getItem(SELECTION_KEY)) ?? [];
  } catch {
    return [];
  }
};

const EMPTY_RESULT = {
  items: [],
  total: 0,
  page: 1,
  limit: PAGE_SIZE,
  totalPages: 0,
};

const Listing = () => {
  // Search, categories, sort and page live in the URL (?q=…&categoryId=…&
  // sortBy=…&page=…), so going back from the comparator or reloading keeps
  // the same results, and the browser's back button moves between pages.
  const [searchParams, setSearchParams] = useSearchParams();
  const query = {
    search: searchParams.get("q") ?? "",
    categoryId: searchParams.getAll("categoryId"),
    sortBy: searchParams.get("sortBy") ?? undefined,
    order: searchParams.get("order") ?? undefined,
    basis: searchParams.get("basis") ?? undefined,
    page: Math.max(1, Number(searchParams.get("page")) || 1),
  };

  const [searchInput, setSearchInput] = useState(query.search);
  const debouncedSearch = useDebouncedValue(searchInput);
  const [result, setResult] = useState(EMPTY_RESULT);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(loadSelection);
  const resultsRef = useRef(null);

  // Any change other than the page goes back to page 1. Typing replaces the
  // history entry instead of adding one per keystroke.
  const updateQuery = (changes, { replace = false } = {}) => {
    const next = { ...query, page: 1, ...changes };
    const params = new URLSearchParams();
    if (next.search) params.set("q", next.search);
    next.categoryId.forEach((id) => params.append("categoryId", id));
    if (next.sortBy) {
      params.set("sortBy", next.sortBy);
      if (next.order) params.set("order", next.order);
      if (next.basis && next.sortBy !== "name") params.set("basis", next.basis);
    }
    if (next.page > 1) params.set("page", next.page);
    setSearchParams(params, { replace });
  };

  const handleToggleCategory = (categoryId) =>
    updateQuery({
      categoryId: query.categoryId.includes(categoryId)
        ? query.categoryId.filter((id) => id !== categoryId)
        : [...query.categoryId, categoryId],
    });

  const handleSort = ({ sortBy, order, basis }) =>
    updateQuery({ sortBy, order, basis });

  const handlePageChange = (page) => {
    updateQuery({ page });
    resultsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClearAll = () => {
    setSearchInput("");
    updateQuery({ search: "", categoryId: [] });
  };

  const handleToggleSelected = (product) =>
    setSelected((prev) => {
      if (prev.some((item) => item._id === product._id)) {
        return prev.filter((item) => item._id !== product._id);
      }
      return prev.length < MAX_COMPARED_PRODUCTS ? [...prev, product] : prev;
    });

  useEffect(() => {
    if (debouncedSearch.trim() !== query.search) {
      updateQuery({ search: debouncedSearch.trim() }, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // Keeps the input in sync when the URL changes from outside (back button).
  useEffect(() => {
    if (query.search !== debouncedSearch.trim()) setSearchInput(query.search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.search]);

  useEffect(() => {
    // Ignores responses that arrive after a newer request was made.
    let active = true;
    const getProducts = async () => {
      setLoading(true);
      const { page, ...filters } = query;
      let data;
      try {
        const response = await axios.get("/products", {
          params: { ...filters, page, limit: PAGE_SIZE },
        });
        data = response.data;
      } catch (error) {
        console.error(error);
        if (active) {
          setResult(EMPTY_RESULT);
          setLoading(false);
        }
        return;
      }
      if (!active) return;
      if (data.totalPages > 0 && page > data.totalPages) {
        updateQuery({ page: data.totalPages }, { replace: true });
        return;
      }
      setResult(data);
      setLoading(false);
    };
    getProducts();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  useEffect(() => {
    try {
      sessionStorage.setItem(SELECTION_KEY, JSON.stringify(selected));
    } catch {
      // Without storage the selection just doesn't persist.
    }
  }, [selected]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get("/products/filters/categories");
      setCategories(response.data);
    };
    getCategories();
  }, []);

  return (
    <div className={selected.length > 0 ? "pb-40 sm:pb-28" : ""}>
      <TopSection searchTerm={searchInput} setSearchTerm={setSearchInput} />
      <ProductsList
        ref={resultsRef}
        result={result}
        categories={categories}
        selectedCategoryIds={query.categoryId}
        onToggleCategory={handleToggleCategory}
        onClearCategories={() => updateQuery({ categoryId: [] })}
        onClearAll={handleClearAll}
        sort={{ sortBy: query.sortBy, order: query.order, basis: query.basis }}
        setSort={handleSort}
        onPageChange={handlePageChange}
        loading={loading}
        selected={selected}
        onToggleSelected={handleToggleSelected}
      />
      <CompareTray
        selected={selected}
        onRemove={handleToggleSelected}
        onClear={() => setSelected([])}
      />
    </div>
  );
};

export default Listing;
