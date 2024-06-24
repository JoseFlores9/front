import Layout from "../components/layout/Layout";
import { Outlet } from "react-router-dom";

const PublicRoute = () => {
  return (
    <>
      <Layout />
      <Outlet />
    </>
  );
};

export default PublicRoute;
