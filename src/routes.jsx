import App from "./App";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import HomePage from "./components/HomePage/HomePage";
import StorePage from "./components/StorePage/StorePage";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "shop", element: <StorePage /> },
        ],
    },
];

export default routes;