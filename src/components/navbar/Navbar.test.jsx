import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Navbar from "./Navbar";

describe("Navbar cart badge", () => {
    it("Badge not visible when numItems is 0", () => {
        render(
            <MemoryRouter>
                <Navbar numItems={0} />
            </MemoryRouter>
        );

        const badge = screen.queryByTestId("cart-badge");
        expect(badge).not.toBeInTheDocument();
    });

    it("Badge not visible when numItems is undefined", () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        const cartLink = screen.getByRole("link", { name: "Shopping cart" });
        expect(cartLink).toBeInTheDocument();

        const badge = screen.queryByTestId("cart-badge");
        expect(badge).not.toBeInTheDocument();
    });

    it("Badge visible with correct count when numItems > 0", () => {
        render(
            <MemoryRouter>
                <Navbar numItems={5} />
            </MemoryRouter>
        );

        const badge = screen.getByTestId("cart-badge");
        expect(badge).toBeVisible();
        expect(badge).toHaveTextContent("5");
    });

    it("Aria-label includes count when items present", () => {
        render(
            <MemoryRouter>
                <Navbar numItems={3} />
            </MemoryRouter>
        );

        const cartLink = screen.getByRole("link", { name: "Shopping cart, 3 items" });
        expect(cartLink).toBeInTheDocument();
    });
});
