import * as reactRedux from 'react-redux';
import { screen, fireEvent } from '@testing-library/react';
import Navigation from '../navigation.component';
import { renderWithProviders } from '../../../utils/test-utils';

import * as userAction from '../../../store/user/use.action';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('Navigation tests', () => {
  const useDispatchMock = reactRedux.useDispatch;
  beforeEach(() => {
      useDispatchMock.mockImplementation(() => () => {});
  })
  afterEach(() => {
      useDispatchMock.mockClear();
  });
  test('It should render a Sign In link if there is no currentUser', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: null,
        },
      },
    });

    expect(screen.getByText(/SIGN IN/i)).toBeInTheDocument();
  });

  test('It should not render Sign In if there is a currentUser', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {},
        },
      },
    });

    expect(screen.queryByText('SIGN IN')).toBeNull();
  });

  test('It should render Sign Out if there is a currentUser', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {},
        },
      },
    });

    expect(screen.getByText('SIGN OUT')).toBeInTheDocument();
  });

  test('It should render cart dropdown if isCartOpen is true', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          isCartOpen: true,
          cartItems: [],
        },
      },
    });

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  test('It should not render a cart dropdown if isCartOpen is false', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          isCartOpen: false,
          cartItems: [],
        },
      },
    });

    expect(screen.queryByText('Your cart is empty')).toBeNull();
  });
  
  test('It should dispatch signOutStart action when clicking on the Sign Out link', async () => {
  
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {},
        },
      },
    });

    const signOutLinkElement=screen.getByText(/sign out/i);
    const signOutStartAction = jest.spyOn(userAction, 'signOutStart');
    expect(signOutLinkElement).toBeInTheDocument();
    await fireEvent.click(signOutLinkElement);
    expect(useDispatchMock).toHaveBeenCalled();
    expect(signOutStartAction).toHaveBeenCalled();
  });
});