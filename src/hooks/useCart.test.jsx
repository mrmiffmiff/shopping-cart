import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useCart from "./useCart";

describe("useCart", () => {
    it("starts with an empty cart", () => {
        const { result } = renderHook(() => useCart());

        expect(result.current.cartObj.size).toBe(0);
    });

    it("adds a new item to the cart", () => {
        const { result } = renderHook(() => useCart());

        act(() => result.current.addItemToCart(1, 3));

        expect(result.current.cartObj.get(1)).toBe(3);
    });

    it("increments an existing item's amount when adding", () => {
        const { result } = renderHook(() => useCart());

        act(() => result.current.addItemToCart(1, 3));
        act(() => result.current.addItemToCart(1, 2));

        expect(result.current.cartObj.get(1)).toBe(5);
    });

    it("sets a specific amount for an item", () => {
        const { result } = renderHook(() => useCart());

        act(() => result.current.addItemToCart(1, 3));
        act(() => result.current.setSpecificAmount(1, 7));

        expect(result.current.cartObj.get(1)).toBe(7);
    });

    it("does not set an amount less than 1", () => {
        const { result } = renderHook(() => useCart());

        act(() => result.current.addItemToCart(1, 3));
        act(() => result.current.setSpecificAmount(1, 0));

        expect(result.current.cartObj.get(1)).toBe(3);
    });

    it("increments an item by 1", () => {
        const { result } = renderHook(() => useCart());

        act(() => result.current.addItemToCart(1, 3));
        act(() => result.current.incrementItem(1));

        expect(result.current.cartObj.get(1)).toBe(4);
    });

    it("decrements an item by 1", () => {
        const { result } = renderHook(() => useCart());

        act(() => result.current.addItemToCart(1, 3));
        act(() => result.current.decrementItem(1));

        expect(result.current.cartObj.get(1)).toBe(2);
    });

    it("does not decrement below 1", () => {
        const { result } = renderHook(() => useCart());

        act(() => result.current.addItemToCart(1, 1));
        act(() => result.current.decrementItem(1));

        expect(result.current.cartObj.get(1)).toBe(1);
    });

    it("removes an item from the cart", () => {
        const { result } = renderHook(() => useCart());

        act(() => result.current.addItemToCart(1, 3));
        act(() => result.current.removeItemFromCart(1));

        expect(result.current.cartObj.has(1)).toBe(false);
        expect(result.current.cartObj.size).toBe(0);
    });

    it("does nothing when removing a non-existent item", () => {
        const { result } = renderHook(() => useCart());

        act(() => result.current.addItemToCart(1, 3));
        act(() => result.current.removeItemFromCart(99));

        expect(result.current.cartObj.size).toBe(1);
        expect(result.current.cartObj.get(1)).toBe(3);
    });
});
