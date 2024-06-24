import { Route, Routes } from "react-router-dom";
import Listing from "../pages/Listing";
import Products from "../pages/Products";
import PublicRoute from "./PublicRoute";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/" element={<Listing />} />
          <Route path="/product" element={<Products />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
