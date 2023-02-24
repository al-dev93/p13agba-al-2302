/* eslint-disable prettier/prettier */
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Loging from "../pages/Loging";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "loging", element: <Loging /> },
    ],
  },
]);

export default Router;
