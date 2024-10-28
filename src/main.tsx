import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import Catalog from "./pages/Catalog/Catalog.tsx";
import Detail from "./pages/Detail/Detail.tsx";

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
        <RouterProvider router={router} />
    </StrictMode>
);
