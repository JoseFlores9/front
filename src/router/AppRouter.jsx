import React from "react";
import { Route, Routes } from "react-router-dom";
import Listing from "../pages/Listing";
import Products from "../pages/Products";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Listing />} />
        <Route path="/product" element={<Products />} />
      </Routes>
    </>
  );
};

export default AppRouter;
