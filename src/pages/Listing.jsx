import { useEffect, useState } from "react";
import TopSection from "../components/Listing/TopSection";
import ProductsList from "../components/Listing/ProductsList";
import axios from "../api/axios";

const Listing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    const response = await axios.get("/products", {
      params: filters,
    });
    setProducts(response.data);
    setShowProducts(response.data);
    setLoading(false);
  };
  const getCategories = async () => {
    const response = await axios.get("/products/filters/categories");
    setCategories(response.data);
    setShowProducts(response.data);
  };

  const handleAddFilter = (filter, value) => {
    const tempFilters = { ...filters };

    if (filter === "startDate" || filter === "endDate") {
      let tempFilter = tempFilters[filter] ? tempFilters[filter] : "";
      tempFilter = value;
      tempFilters[filter] = tempFilter;
    } else if (
      filter === "discarded" ||
      filter === "deleted" ||
      filter === "delayed"
    ) {
      let tempFilter = tempFilters[filter] ? tempFilters[filter] : "";
      if (tempFilter) {
        delete tempFilters[filter];
      } else {
        tempFilter = value;
        tempFilters[filter] = tempFilter;
      }
    } else {
      let tempFilter = tempFilters[filter] ? [...tempFilters[filter]] : [];
      if (!tempFilter.includes(value)) {
        tempFilter.push(value);
      } else {
        tempFilter.splice(tempFilter.indexOf(value), 1);
        if (tempFilter.length === 0) {
          delete tempFilters[filter];
          setFilters(tempFilters);
          return;
        }
      }
      tempFilters[filter] = tempFilter;
    }
    setFilters(tempFilters);
  };

  useEffect(() => {
    let tempProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setShowProducts(tempProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="">
      <TopSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ProductsList
        products={showProducts}
        categories={categories}
        filters={filters}
        setFilters={setFilters}
        handleAddFilter={handleAddFilter}
        loading={loading}
      />
    </div>
  );
};

export default Listing;
