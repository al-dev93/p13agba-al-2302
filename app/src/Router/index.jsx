/* eslint-disable prettier/prettier */
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
  },
]);

export default Router;
