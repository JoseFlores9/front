import React, { useEffect, useState } from "react";
import TopSection from "../components/Listing/TopSection";
import ProductsList from "../components/Listing/ProductsList";
import axios from "axios";

const Listing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState([]);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:3000/products");
    setProducts(response.data);
    setShowProducts(response.data);
  };

  useEffect(() => {
    let tempProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setShowProducts(tempProducts);
  }, [searchTerm]);
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <TopSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ProductsList products={showProducts} />
    </div>
  );
};

export default Listing;
