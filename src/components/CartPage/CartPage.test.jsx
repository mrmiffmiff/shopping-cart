import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CartPage from "./CartPage";
import useCartExpandedItems from "../../hooks/useCartExpandedItems";
import { useOutletContext } from "react-router";

vi.mock("react-router", async () => {
    const actual = await vi.importActual("react-router");
    return {
        ...actual,
        useOutletContext: vi.fn(),
    };
});

vi.mock("../../hooks/useCartExpandedItems");

const sampleItems = [
    { id: 1, name: "Widget", url: "https://example.com/widget.jpg", price: 10.00 },
    { id: 2, name: "Gadget", url: "https://example.com/gadget.jpg", price: 25.50 },
];

const mockCart = {
    cartObj: new Map([[1, 2], [2, 3]]),
    setSpecificAmount: vi.fn(),
    removeItemFromCart: vi.fn(),
};

describe("CartPage", () => {
    it("displays loading message while fetching", () => {
        useOutletContext.mockReturnValue(mockCart);
        useCartExpandedItems.mockReturnValue({
            itemData: [],
            loading: true,
            error: null,
        });

        render(<CartPage />);

        expect(screen.getByText("Loading cart...")).toBeInTheDocument();
    });

    it("displays error message on fetch failure", () => {
        useOutletContext.mockReturnValue(mockCart);
        useCartExpandedItems.mockReturnValue({
            itemData: [],
            loading: false,
            error: new Error("fetch failed"),
        });

        render(<CartPage />);

        expect(screen.getByText("Error loading cart items.")).toBeInTheDocument();
    });

    it("displays empty cart message when cart has no items", () => {
        useOutletContext.mockReturnValue({
            ...mockCart,
            cartObj: new Map(),
        });
        useCartExpandedItems.mockReturnValue({
            itemData: [],
            loading: false,
            error: null,
        });

        render(<CartPage />);

        expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
    });

    it("renders a CartItem for each item in the cart", () => {
        useOutletContext.mockReturnValue(mockCart);
        useCartExpandedItems.mockReturnValue({
            itemData: sampleItems,
            loading: false,
            error: null,
        });

        render(<CartPage />);

        const articles = screen.getAllByRole("article");
        expect(articles).toHaveLength(2);
        expect(screen.getByText("Widget")).toBeInTheDocument();
        expect(screen.getByText("Gadget")).toBeInTheDocument();
    });

    it("calculates and displays the correct total price", () => {
        useOutletContext.mockReturnValue(mockCart);
        useCartExpandedItems.mockReturnValue({
            itemData: sampleItems,
            loading: false,
            error: null,
        });

        render(<CartPage />);

        // Total: (10.00 * 2) + (25.50 * 3) = 20.00 + 76.50 = 96.50
        expect(screen.getByText("$96.50")).toBeInTheDocument();
        expect(screen.getByText("Total:")).toBeInTheDocument();
    });

    it("displays the Shopping Cart heading", () => {
        useOutletContext.mockReturnValue(mockCart);
        useCartExpandedItems.mockReturnValue({
            itemData: sampleItems,
            loading: false,
            error: null,
        });

        render(<CartPage />);

        expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Shopping Cart");
    });

    it("passes cartObj to useCartExpandedItems", () => {
        useOutletContext.mockReturnValue(mockCart);
        useCartExpandedItems.mockReturnValue({
            itemData: [],
            loading: false,
            error: null,
        });

        render(<CartPage />);

        expect(useCartExpandedItems).toHaveBeenCalledWith(mockCart.cartObj);
    });
});
