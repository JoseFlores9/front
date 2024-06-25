import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import Search from "../../assets/icons/Search";
import axios from "../../api/axios";

const AddProductTable = (props) => {
  const { open, handleClose, setProducts, products } = props;
  const [productsList, setProductsList] = useState([]);
  const [showProducts, setShowProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let productsIds = products.map((product) => product._id);

  const getProducts = async () => {
    const response = await axios.get("/products");
    setProductsList(response.data);
    setShowProducts(response.data);
  };
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddProduct = (product) => {
    if (products.length < 4) {
      let aux = [...products];
      aux.push(product);
      setProducts(aux);
    }
  };

  useEffect(() => {
    let tempProducts = productsList.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setShowProducts(tempProducts);
  }, [searchTerm, productsList]);

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        setSearchTerm("");
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white">
        <div className="bg-white mt-6 w-full flex justify-center border-b-2 pb-4">
          <div className=" border-2 border-gray-300 flex gap-2 w-max items-center rounded-lg px-2">
            <input
              onChange={(e) => handleChange(e)}
              value={searchTerm}
              className="bg-white border-0 rounded-lg focus:outline-none text-black"
            />
            <Search styles="w-4 h-4 " />
          </div>
        </div>
        <ul className="grid gap-8 overflow-y-scroll no-scrollbar grid-cols-3 w-[1000px] h-[500px]">
          {showProducts.map(
            (product) =>
              !productsIds.includes(product._id) && (
                <li
                  key={product._id}
                  onClick={() => {
                    handleAddProduct(product);
                  }}
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
              )
          )}
        </ul>
      </div>
    </Modal>
  );
};

export default AddProductTable;
