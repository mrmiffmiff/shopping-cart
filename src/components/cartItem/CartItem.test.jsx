import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartItem from "./CartItem";

describe("CartItem", () => {
    const mockItem = {
        id: 1,
        name: "Test Product",
        url: "https://example.com/image.jpg",
        price: 19.99,
    };

    const defaultProps = {
        item: mockItem,
        quantity: 3,
        setSpecificAmount: vi.fn(),
        removeItemFromCart: vi.fn(),
    };

    function renderCartItem(overrides = {}) {
        const props = { ...defaultProps, ...overrides };
        return render(<CartItem {...props} />);
    }

    it("renders item name, image, and total price", () => {
        renderCartItem();

        expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Test Product");
        expect(screen.getByRole("presentation")).toBeVisible();
        expect(screen.getByText("$59.97")).toBeInTheDocument();
    });

    it("displays the image from item url", () => {
        renderCartItem();

        const img = screen.getByRole("presentation");
        expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
    });

    it("falls back to placeholder image on load error", () => {
        renderCartItem();

        const img = screen.getByRole("presentation");
        fireEvent.error(img);

        expect(img.getAttribute("src")).toContain("Placeholder");
    });

    it("uses placeholder when item url is empty", () => {
        renderCartItem({ item: { ...mockItem, url: "" } });

        const img = screen.getByRole("presentation");
        expect(img.getAttribute("src")).toContain("Placeholder");
    });

    it("displays the correct quantity in the incrementer", () => {
        renderCartItem();

        const input = screen.getByRole("textbox", { name: /Test Product Quantity/i });
        expect(input.value).toBe("3");
    });

    it("calls setSpecificAmount when increment button is clicked", async () => {
        const mockSetAmount = vi.fn();
        const user = userEvent.setup();
        renderCartItem({ setSpecificAmount: mockSetAmount });

        const incrementButton = screen.getByRole("button", { name: /Increment Test Product Quantity/i });
        await user.click(incrementButton);

        expect(mockSetAmount).toHaveBeenCalledWith(1, 4);
    });

    it("calls setSpecificAmount when decrement button is clicked", async () => {
        const mockSetAmount = vi.fn();
        const user = userEvent.setup();
        renderCartItem({ setSpecificAmount: mockSetAmount });

        const decrementButton = screen.getByRole("button", { name: /Decrement Test Product Quantity/i });
        await user.click(decrementButton);

        expect(mockSetAmount).toHaveBeenCalledWith(1, 2);
    });

    it("calls setSpecificAmount when a value is typed", async () => {
        const mockSetAmount = vi.fn();
        const user = userEvent.setup();
        renderCartItem({ setSpecificAmount: mockSetAmount });

        const input = screen.getByRole("textbox", { name: /Test Product Quantity/i });
        await user.clear(input);
        await user.type(input, "7");

        expect(mockSetAmount).toHaveBeenCalledWith(1, 7);
    });

    it("shows empty field when cleared, resets on blur", async () => {
        const mockSetAmount = vi.fn();
        const user = userEvent.setup();
        renderCartItem({ setSpecificAmount: mockSetAmount });

        const input = screen.getByRole("textbox", { name: /Test Product Quantity/i });
        await user.clear(input);

        expect(input.value).toBe("");

        await user.tab();

        expect(input.value).toBe("3");
    });

    it("calls removeItemFromCart when remove button is clicked", async () => {
        const mockRemove = vi.fn();
        const user = userEvent.setup();
        renderCartItem({ removeItemFromCart: mockRemove });

        const removeButton = screen.getByRole("button", { name: /Remove Test Product from cart/i });
        await user.click(removeButton);

        expect(mockRemove).toHaveBeenCalledWith(1);
    });

    it("has accessible aria-label on item total", () => {
        renderCartItem();

        expect(screen.getByLabelText("Item total: $59.97")).toBeInTheDocument();
    });

    it("formats single-item price correctly", () => {
        renderCartItem({ quantity: 1 });

        expect(screen.getByText("$19.99")).toBeInTheDocument();
    });
});
