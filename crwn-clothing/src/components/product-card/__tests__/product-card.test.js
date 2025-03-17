import { render, screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test-utils";
import ProductCard from "../product-card";

describe("ProductCard tests", () => {
  test("It should add the product item when Product Card button is clicked", async () => {
    const mockProduct = {
      id: 1,
      name: "Test Product",
      price: 10,
    };
    const { store } = renderWithProviders(
      <ProductCard product={mockProduct} />,
      {
        preloadedState: {
          cart: {
            cartItems: [],
          },
        },
      }
    );
    const addButtonElement = screen.getByText(/Add to cart/i);
    await fireEvent.click(addButtonElement);
    expect(store.getState().cart.cartItems).toHaveLength(1); 
  });
});
