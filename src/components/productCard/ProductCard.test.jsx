import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "./ProductCard";

describe("Product Card", () => {
    it("Renders with proper name and price, and an image exists", () => {
        const mockFn = vi.fn(); // Needs to exist as a parm
        render(<ProductCard
            itemId={1}
            itemName={"Test Name"}
            itemImgUrl={""}
            itemPrice={3.45}
            addToCartFunc={mockFn}
        />
        );
        const img = screen.getByRole("presentation"); // the role for an img with empty but extant alt text
        expect(img).toBeVisible()
        const name = screen.getByRole("heading", { level: 3 });
        expect(name).toHaveTextContent("Test Name");
        const price = screen.getByRole("heading", { level: 4 });
        expect(price).toHaveTextContent("$3.45")
    });

    it("If button not pressed, add function not called", () => {
        const mockFn = vi.fn();
        render(<ProductCard
            itemId={1}
            itemName={"Test Name"}
            itemImgUrl={""}
            itemPrice={3.45}
            addToCartFunc={mockFn}
        />
        );

        expect(mockFn).not.toHaveBeenCalled();
    });

    it("Button press calls add function with correct parameters", async () => {
        const mockFn = vi.fn();
        const user = userEvent.setup();

        render(<ProductCard
            itemId={1}
            itemName={"Test Name"}
            itemImgUrl={""}
            itemPrice={3.45}
            addToCartFunc={mockFn}
        />
        );

        const addButton = screen.getByRole("button", { name: /Add Test Name to Cart/i });

        await user.click(addButton);

        expect(mockFn).toHaveBeenCalledWith(1, 1);
    });

    it("Button press calls add function with changed parameters", async () => {
        const mockFn = vi.fn();
        const user = userEvent.setup();

        render(<ProductCard
            itemId={2}
            itemName={"Test Name"}
            itemImgUrl={""}
            itemPrice={3.45}
            addToCartFunc={mockFn}
        />
        );

        const addButton = screen.getByRole("button", { name: /Add Test Name to Cart/i });
        const incrementButton = screen.getByRole("button", { name: /Increment Test Name Quantity/i });

        await user.click(incrementButton);
        await user.click(incrementButton);
        await user.click(addButton);

        expect(mockFn).toHaveBeenCalledWith(2, 3);
    });
});