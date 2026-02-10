import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useCartExpandedItems from "./useCartExpandedItems";

describe("useCartExpandedItems", () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn());
    });

    it("starts with loading true and empty item data", () => {
        fetch.mockImplementation(() => new Promise(() => {}));
        const cart = new Map([[1, 2]]);

        const { result } = renderHook(() => useCartExpandedItems(cart));

        expect(result.current.loading).toBe(true);
        expect(result.current.itemData).toEqual([]);
        expect(result.current.error).toBeNull();
    });

    it("fetches and formats cart item data", async () => {
        fetch.mockImplementation((url) => {
            const id = url.split("/").pop();
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    id: Number(id),
                    title: `Product ${id}`,
                    image: `https://example.com/${id}.jpg`,
                    price: 9.99,
                }),
            });
        });

        const cart = new Map([[1, 2], [3, 4]]);
        const { result } = renderHook(() => useCartExpandedItems(cart));

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.itemData).toEqual([
            { id: 1, name: "Product 1", url: "https://example.com/1.jpg", price: 9.99, amount: 2 },
            { id: 3, name: "Product 3", url: "https://example.com/3.jpg", price: 9.99, amount: 4 },
        ]);
        expect(result.current.error).toBeNull();
    });

    it("sets error on HTTP error response", async () => {
        fetch.mockResolvedValue({ ok: false, status: 404 });

        const cart = new Map([[1, 2]]);
        const { result } = renderHook(() => useCartExpandedItems(cart));

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.error).toBeInstanceOf(Error);
        expect(result.current.error.message).toMatch(/404/);
        expect(result.current.itemData).toBeNull();
    });

    it("sets error on network failure", async () => {
        fetch.mockRejectedValue(new TypeError("Failed to fetch"));

        const cart = new Map([[1, 2]]);
        const { result } = renderHook(() => useCartExpandedItems(cart));

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.error).toBeInstanceOf(TypeError);
        expect(result.current.itemData).toBeNull();
    });

    it("makes no fetches for an empty cart", async () => {
        const cart = new Map();
        const { result } = renderHook(() => useCartExpandedItems(cart));

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.itemData).toEqual([]);
        expect(fetch).not.toHaveBeenCalled();
    });

    it("does not set error when fetch is aborted on unmount", async () => {
        let rejectFetch;
        fetch.mockImplementation(() => new Promise((_, reject) => {
            rejectFetch = reject;
        }));

        const cart = new Map([[1, 2]]);
        const { result, unmount } = renderHook(() => useCartExpandedItems(cart));

        unmount();

        const abortError = new DOMException("The operation was aborted.", "AbortError");
        rejectFetch(abortError);

        expect(result.current.error).toBeNull();
    });
});
