import App from "./App";
import StorePage from "./components/StorePage/StorePage";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { path: "shop", element: <StorePage /> },
        ]
    },
];

export default routes;