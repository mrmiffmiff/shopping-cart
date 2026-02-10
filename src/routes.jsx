import App from "./App";
import HomePage from "./components/HomePage/HomePage";
import StorePage from "./components/StorePage/StorePage";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "shop", element: <StorePage /> },
        ]
    },
];

export default routes;