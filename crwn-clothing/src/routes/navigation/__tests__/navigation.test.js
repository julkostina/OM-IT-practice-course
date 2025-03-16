import { screen } from "@testing-library/react";

import Navigation from "../navigation.component";
import { renderWithProviders } from "../../../utils/test-utils";
describe("Navigation tests", () => {
  test("It should render a Sign In link if there is no current user", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: null,
        },
      },
    });
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.queryByText(/sign out/i)).toBeNull();
  });
  test("It should render a Sign Out link if there is a current user", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: { id: 1, name: "Test User" },
        },
      },
    });
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
    expect(screen.queryByText(/sign in/i)).toBeNull();
  });
  // test('It should render a Cart Icon with the correct quantity', () => {
  //     const initialCartItems = [
  //         { id: 1, name: 'Item A', imageUrl: 'test', price: 10, quantity: 1 },
  //     ];
  //     renderWithProviders(<Navigation />, {
  //         preloadedState: {
  //             cart: {
  //                 cartItems: initialCartItems,
  //             },
  //         },
  //     });
  //     const CartLogo = screen.getByText('1');
  //     expect(CartLogo).toHaveTextContent('1');
  // });
  test("It should not render a cart dropdown if isCartOpen is false", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          isCartOpen: false,
          cartItems: [],
        },
      },
    });

    const dropDownTestElement = screen.queryByText(/Your cart is empty/i);
    expect(dropDownTestElement).toBeNull();
  });

  test("It should render a cart dropdown if isCartOpen is true", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          isCartOpen: true,
          cartItems: [],
        },
      },
    });

    const dropDownTestElement = screen.getByText(/Your cart is empty/i);
    expect(dropDownTestElement).toBeInTheDocument();
  });
});
