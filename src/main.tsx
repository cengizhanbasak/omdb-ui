import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";

import store from "./data/store";
import App from "./App";
import Catalog from "./pages/Catalog";
import Detail from "./pages/Detail";

import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Catalog />,
            },
            {
                path: "/:id",
                element: <Detail />,
            }
        ]
    }
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <StoreProvider store={store}>
            <RouterProvider router={router} />
        </StoreProvider>
    </StrictMode>
);
