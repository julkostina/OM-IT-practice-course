import { Link, Outlet } from "react-router-dom";
import { Fragment, useContext} from "react";
import { UserContext } from "../../contexts/user.context";
import "./navigation.styles.scss";
import {ReactComponent as CrwnLogo} from "../../assets/crown.svg";
const Navigation = () => {
  const {currentUser} = useContext(UserContext);
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo/>
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          <Link className="nav-link" to="/auth">
            Sign in
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
