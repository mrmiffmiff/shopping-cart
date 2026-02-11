import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Incrementer from "./Incrementer";

describe("Incrementer", () => {
    it("renders with the current value", () => {
        const mockUpdateFn = vi.fn();
        render(<Incrementer currentValue={5} updateFn={mockUpdateFn} />);

        const input = screen.getByRole("textbox", { name: /Quantity/i });
        expect(input.value).toBe("5");
    });

    it("calls updateFn when typing a valid number", async () => {
        const user = userEvent.setup();
        const mockUpdateFn = vi.fn();
        render(<Incrementer currentValue={""} updateFn={mockUpdateFn} />);

        const input = screen.getByRole("textbox", { name: /Quantity/i });
        await user.type(input, "5");

        expect(mockUpdateFn).toHaveBeenCalledWith(5);
    });

    it("does not call updateFn when typing a negative number", async () => {
        const user = userEvent.setup();
        const mockUpdateFn = vi.fn();
        render(<Incrementer currentValue={""} updateFn={mockUpdateFn} />);

        const input = screen.getByRole("textbox", { name: /Quantity/i });
        await user.type(input, "-");

        expect(mockUpdateFn).not.toHaveBeenCalled();
    });

    it("does not call updateFn when typing zero", async () => {
        const user = userEvent.setup();
        const mockUpdateFn = vi.fn();
        render(<Incrementer currentValue={""} updateFn={mockUpdateFn} />);

        const input = screen.getByRole("textbox", { name: /Quantity/i });
        await user.type(input, "0");

        expect(mockUpdateFn).not.toHaveBeenCalled();
    });

    it("calls updateFn when input is empty", async () => {
        const user = userEvent.setup();
        const mockUpdateFn = vi.fn();
        render(<Incrementer currentValue={5} updateFn={mockUpdateFn} />);

        const input = screen.getByRole("textbox", { name: /Quantity/i });
        await user.clear(input);

        expect(mockUpdateFn).toHaveBeenCalledWith("");
    });

    it("increments the value when clicking the increment button", async () => {
        const user = userEvent.setup();
        const mockUpdateFn = vi.fn();
        render(<Incrementer currentValue={5} updateFn={mockUpdateFn} />);

        const incrementButton = screen.getByRole("button", { name: /Increment Quantity/i });
        await user.click(incrementButton);

        expect(mockUpdateFn).toHaveBeenCalledWith(6);
    });

    it("decrements the value when clicking the decrement button", async () => {
        const user = userEvent.setup();
        const mockUpdateFn = vi.fn();
        render(<Incrementer currentValue={5} updateFn={mockUpdateFn} />);

        const decrementButton = screen.getByRole("button", { name: /Decrement Quantity/i });
        await user.click(decrementButton);

        expect(mockUpdateFn).toHaveBeenCalledWith(4);
    });

    it("does not decrement below 1", async () => {
        const user = userEvent.setup();
        const mockUpdateFn = vi.fn();
        render(<Incrementer currentValue={1} updateFn={mockUpdateFn} />);

        const decrementButton = screen.getByRole("button", { name: /Decrement Quantity/i });
        await user.click(decrementButton);

        expect(mockUpdateFn).not.toHaveBeenCalled();
    });

    it("increments the value when pressing ArrowUp", async () => {
        const user = userEvent.setup();
        const mockUpdateFn = vi.fn();
        render(<Incrementer currentValue={5} updateFn={mockUpdateFn} />);

        const input = screen.getByRole("textbox", { name: /Quantity/i });
        await user.click(input);
        await user.keyboard("{ArrowUp}");

        expect(mockUpdateFn).toHaveBeenCalledWith(6);
    });

    it("decrements the value when pressing ArrowDown", async () => {
        const user = userEvent.setup();
        const mockUpdateFn = vi.fn();
        render(<Incrementer currentValue={5} updateFn={mockUpdateFn} />);

        const input = screen.getByRole("textbox", { name: /Quantity/i });
        await user.click(input);
        await user.keyboard("{ArrowDown}");

        expect(mockUpdateFn).toHaveBeenCalledWith(4);
    });

    it("does not decrement below 1 when pressing ArrowDown", async () => {
        const user = userEvent.setup();
        const mockUpdateFn = vi.fn();
        render(<Incrementer currentValue={1} updateFn={mockUpdateFn} />);

        const input = screen.getByRole("textbox", { name: /Quantity/i });
        await user.click(input);
        await user.keyboard("{ArrowDown}");

        expect(mockUpdateFn).not.toHaveBeenCalled();
    });

    it("sets value to 1 when pressing ArrowUp on empty input", async () => {
        const user = userEvent.setup();
        const mockUpdateFn = vi.fn();
        render(<Incrementer currentValue="" updateFn={mockUpdateFn} />);

        const input = screen.getByRole("textbox", { name: /Quantity/i });
        await user.click(input);
        await user.keyboard("{ArrowUp}");

        expect(mockUpdateFn).toHaveBeenCalledWith(1);
    });

    it("does not call updateFn when pressing ArrowDown on empty input", async () => {
        const user = userEvent.setup();
        const mockUpdateFn = vi.fn();
        render(<Incrementer currentValue="" updateFn={mockUpdateFn} />);

        const input = screen.getByRole("textbox", { name: /Quantity/i });
        await user.click(input);
        await user.keyboard("{ArrowDown}");

        expect(mockUpdateFn).not.toHaveBeenCalled();
    });

    it("disables the decrement button when value is 1", () => {
        const mockUpdateFn = vi.fn();
        render(<Incrementer currentValue={1} updateFn={mockUpdateFn} />);

        const decrementButton = screen.getByRole("button", { name: /Decrement Quantity/i });
        expect(decrementButton).toBeDisabled();
    });

    it("disables the decrement button when value is empty", () => {
        const mockUpdateFn = vi.fn();
        render(<Incrementer currentValue="" updateFn={mockUpdateFn} />);

        const decrementButton = screen.getByRole("button", { name: /Decrement Quantity/i });
        expect(decrementButton).toBeDisabled();
    });

    it("enables the decrement button when value is greater than 1", () => {
        const mockUpdateFn = vi.fn();
        render(<Incrementer currentValue={5} updateFn={mockUpdateFn} />);

        const decrementButton = screen.getByRole("button", { name: /Decrement Quantity/i });
        expect(decrementButton).toBeEnabled();
    });

    it("uses product-specific aria-labels when itemName is provided", () => {
        const mockUpdateFn = vi.fn();
        render(<Incrementer currentValue={5} updateFn={mockUpdateFn} itemName="Widget" />);

        expect(screen.getByRole("button", { name: "Decrement Widget Quantity" })).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: "Widget Quantity" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Increment Widget Quantity" })).toBeInTheDocument();
    });

    it("uses generic aria-labels when itemName is not provided", () => {
        const mockUpdateFn = vi.fn();
        render(<Incrementer currentValue={5} updateFn={mockUpdateFn} />);

        expect(screen.getByRole("button", { name: "Decrement Quantity" })).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: "Quantity" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Increment Quantity" })).toBeInTheDocument();
    });

    it("calls onBlur callback when input loses focus", async () => {
        const user = userEvent.setup();
        const mockUpdateFn = vi.fn();
        const mockOnBlur = vi.fn();
        render(<Incrementer currentValue={5} updateFn={mockUpdateFn} onBlur={mockOnBlur} />);

        const input = screen.getByRole("textbox", { name: /Quantity/i });
        await user.click(input);
        await user.tab();

        expect(mockOnBlur).toHaveBeenCalledTimes(1);
    });

    it("does not error when onBlur is not provided", async () => {
        const user = userEvent.setup();
        const mockUpdateFn = vi.fn();
        render(<Incrementer currentValue={5} updateFn={mockUpdateFn} />);

        const input = screen.getByRole("textbox", { name: /Quantity/i });
        await user.click(input);
        await user.tab();
    });
});
