import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import StorePage from "./StorePage";
import { sampleData } from "./sampleData";

describe("Store Page", () => {
    it("Renders the correct number of product cards", () => {
        const mockFn = vi.fn();
        render(<StorePage addToCartFunc={mockFn} />);

        const articles = screen.getAllByRole("article");
        expect(articles).toHaveLength(sampleData.length);
    });

    // TODO: Add integration test for cart functionality once addToCartFunc
    // migrates from prop to outlet context
});
