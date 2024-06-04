import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const ProductsList = (props) => {
  const { products } = props;
  return (
    <div className="pt-8 flex gap-4">
      <div className=" w-[200px] flex flex-col items-center pt-4 bg-slate-300 rounded-lg h-[calc(100vh-310px)]">
        <h2 className=" text-lg font-semibold text-black">Filtros</h2>
      </div>
      <ul className="grid grid-cols-1 gap-8 h-[calc(100vh-310px)] overflow-y-scroll no-scrollbar sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
        {products.map((product) => (
          <li
            key={product._id}
            className="bg-white rounded-lg flex flex-col items-center justify-center w-[300px] cursor-pointer p-4"
          >
            <img src={product.image} className=" w-[100px] h-[100px]" />
            <p className="text-black text-sm font-normal w-[200px] truncate text-center mt-4">
              {product.name}
            </p>
            <p className="text-black text-sm font-semibold ">{product.brand}</p>
            <NavLink to="product">ir al producto</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
