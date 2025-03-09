import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import {NavLink, NavLinksContainer, NavigationContainer, LogoContainer} from "./navigation.styles";
import { useSelector } from "react-redux";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import {selectCurrentUser} from '../../store/user/user.selector';
import {selectIsCartOpen} from '../../store/cart/cart.selector';
const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to="/shop">
            Shop
          </NavLink>
          {currentUser ? (
            <NavLink as="span"  onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">
              Sign in
            </NavLink>
          )}
          <CartIcon />
        </NavLinksContainer>
        {isCartOpen  &&<CartDropdown/>}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
