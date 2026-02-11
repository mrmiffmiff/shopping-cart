import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "./routes";
import useFakeStoreItems from "./hooks/useFakeStoreItems";
import useCartExpandedItems from "./hooks/useCartExpandedItems";
import { sampleData } from "./components/StorePage/sampleData";

vi.mock("./hooks/useFakeStoreItems");
vi.mock("./hooks/useCartExpandedItems");

function renderAtRoute(initialPath) {
    const router = createMemoryRouter(routes, {
        initialEntries: [initialPath],
    });
    return render(<RouterProvider router={router} />);
}

describe("App routing integration", () => {
    beforeEach(() => {
        useFakeStoreItems.mockReturnValue({
            itemData: sampleData,
            loading: false,
            error: null,
        });
        useCartExpandedItems.mockReturnValue({
            itemData: [],
            loading: false,
            error: null,
        });
    });

    it("renders HomePage at /", () => {
        renderAtRoute("/");

        expect(
            screen.getByText("Experience incredible shopping through our platform")
        ).toBeInTheDocument();
    });

    it("renders StorePage at /shop", () => {
        renderAtRoute("/shop");

        const articles = screen.getAllByRole("article");
        expect(articles).toHaveLength(sampleData.length);
    });

    it("renders CartPage at /cart", () => {
        renderAtRoute("/cart");

        expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
    });

    it("renders ErrorPage for unknown route", () => {
        renderAtRoute("/nonexistent");

        expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    });

    it("renders Navbar alongside page content", () => {
        renderAtRoute("/");

        expect(
            screen.getByRole("navigation", { name: "Main navigation" })
        ).toBeInTheDocument();
        expect(
            screen.getByText("Experience incredible shopping through our platform")
        ).toBeInTheDocument();
    });

    it("navigates from HomePage to StorePage via link", async () => {
        const user = userEvent.setup();
        renderAtRoute("/");

        await user.click(screen.getByRole("link", { name: "Start Shopping" }));

        const articles = screen.getAllByRole("article");
        expect(articles).toHaveLength(sampleData.length);
    });

    it("navigates from Navbar to cart", async () => {
        const user = userEvent.setup();
        renderAtRoute("/");

        await user.click(
            screen.getByRole("link", { name: "Shopping cart" })
        );

        expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
    });

    it("cart badge updates when items are added via StorePage", async () => {
        const user = userEvent.setup();
        renderAtRoute("/shop");

        const addButton = screen.getByRole("button", {
            name: "Add Test Item 1 to Cart",
        });
        await user.click(addButton);

        const badge = screen.getByTestId("cart-badge");
        expect(badge).toHaveTextContent("1");
    });
});
