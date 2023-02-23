/* eslint-disable prettier/prettier */
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // {index: true, element: }
    ],
  },
]);

export default Router;
