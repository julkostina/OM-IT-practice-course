import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import {NavLink, NavLinksContainer, NavigationContainer, LogoContainer} from "./navigation.styles";
import { useSelector, useDispatch } from "react-redux";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import {selectCurrentUser} from '../../store/user/user.selector';
import {selectIsCartOpen} from '../../store/cart/cart.selector';
import { signOutStart } from "../../store/user/use.action";
const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const signOutUser =()=> dispatch(signOutStart());
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
