import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import StorePage from "./StorePage";
import { sampleData } from "./sampleData";
import useFakeStoreItems from "../../hooks/useFakeStoreItems";

vi.mock("../../hooks/useFakeStoreItems");

describe("Store Page", () => {
    it("Renders the correct number of product cards", () => {
        useFakeStoreItems.mockReturnValue({
            itemData: sampleData,
            loading: false,
            error: null,
        });
        const mockFn = vi.fn();
        render(<StorePage addToCartFunc={mockFn} />);

        const articles = screen.getAllByRole("article");
        expect(articles).toHaveLength(sampleData.length);
    });

    it("Renders loading text when loading is true", () => {
        useFakeStoreItems.mockReturnValue({
            itemData: [],
            loading: true,
            error: null,
        });
        const mockFn = vi.fn();
        render(<StorePage addToCartFunc={mockFn} />);

        expect(screen.getByText("Loading...")).toBeInTheDocument();
        expect(screen.queryAllByRole("article")).toHaveLength(0);
    });

    it("Renders error text when error is present", () => {
        useFakeStoreItems.mockReturnValue({
            itemData: [],
            loading: false,
            error: new Error("fail"),
        });
        const mockFn = vi.fn();
        render(<StorePage addToCartFunc={mockFn} />);

        expect(screen.getByText("Error loading store items.")).toBeInTheDocument();
        expect(screen.queryAllByRole("article")).toHaveLength(0);
    });

    // TODO: Add integration test for cart functionality once addToCartFunc
    // migrates from prop to outlet context
});
