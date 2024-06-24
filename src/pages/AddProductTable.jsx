import { Modal } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AddProductTable = (props) => {
  const { open, handleClose } = props;
  const [productsList, setProductsList] = useState([]);
  const [showProducts, setShowProducts] = useState([]);
  const getProducts = async () => {
    const response = await axios.get("http://localhost:3000/products");
    setProductsList(response.data);
    setShowProducts(response.data);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white">
        <ul className="grid gap-8  overflow-y-scroll no-scrollbar grid-cols-3">
          {showProducts.map((product) => (
            <li
              key={product._id}
              className="bg-white rounded-lg flex flex-col items-center justify-center w-[300px] cursor-pointer p-4"
            >
              <img src={product.image} className=" w-[100px] h-[100px]" />
              <p className="text-black text-sm font-normal w-[200px] truncate text-center mt-4">
                {product.name}
              </p>
              <p className="text-black text-sm font-semibold ">
                {product.brand}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default AddProductTable;
