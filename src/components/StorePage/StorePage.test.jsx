import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import StorePage from "./StorePage";
import { sampleData } from "./sampleData";
import useFakeStoreItems from "../../hooks/useFakeStoreItems";
import { useOutletContext } from "react-router";

vi.mock("react-router", async () => {
    const actual = await vi.importActual("react-router");
    return {
        ...actual,
        useOutletContext: vi.fn(),
    };
});

vi.mock("../../hooks/useFakeStoreItems");

describe("Store Page", () => {
    it("Renders the correct number of product cards", () => {
        useOutletContext.mockReturnValue({ addItemToCart: vi.fn() });
        useFakeStoreItems.mockReturnValue({
            itemData: sampleData,
            loading: false,
            error: null,
        });
        render(<StorePage />);

        const articles = screen.getAllByRole("article");
        expect(articles).toHaveLength(sampleData.length);
    });

    it("Renders loading text when loading is true", () => {
        useOutletContext.mockReturnValue({ addItemToCart: vi.fn() });
        useFakeStoreItems.mockReturnValue({
            itemData: [],
            loading: true,
            error: null,
        });
        render(<StorePage />);

        expect(screen.getByText("Loading...")).toBeInTheDocument();
        expect(screen.queryAllByRole("article")).toHaveLength(0);
    });

    it("Renders error text when error is present", () => {
        useOutletContext.mockReturnValue({ addItemToCart: vi.fn() });
        useFakeStoreItems.mockReturnValue({
            itemData: [],
            loading: false,
            error: new Error("fail"),
        });
        render(<StorePage />);

        expect(screen.getByText("Error loading store items.")).toBeInTheDocument();
        expect(screen.queryAllByRole("article")).toHaveLength(0);
    });
});
