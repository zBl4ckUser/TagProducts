import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFoundPage from "./pages/NotFoundPage";
import ProductListPage from "./pages/ProductListPage";
import ProductRegisterPage from "./pages/ProductRegisterPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            // {
            //     index: true,
            //     element: <ProductListPage />
            // },
            {
                path: "produtos/exibir",
                element: <ProductListPage />
            },
            {
                path: "produtos/cadastro",
                element: <ProductRegisterPage />
            },
        ]
    },
    {
        path: "*",
        element: <NotFoundPage />
    }
]);

export default router;