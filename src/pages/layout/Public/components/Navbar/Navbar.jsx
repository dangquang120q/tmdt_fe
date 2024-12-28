import { NavLink } from "react-router-dom";
import { ROUTE_URL } from "routes";

function Navbar() {
  return (
    <div className="public-layout_navbar">
      <div className="navbar-inner">
        <NavLink
          to={ROUTE_URL.HOME}
          className={({ isActive }) =>
            `navbar-item ${isActive ? "active" : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to={ROUTE_URL.SHOP}
          className={({ isActive }) =>
            `navbar-item ${isActive ? "active" : ""}`
          }
        >
          Shop
        </NavLink>
        <NavLink
          to={ROUTE_URL.ABOUT}
          className={({ isActive }) =>
            `navbar-item ${isActive ? "active" : ""}`
          }
        >
          About us
        </NavLink>
        <NavLink
          to={ROUTE_URL.CONTACT}
          className={({ isActive }) =>
            `navbar-item ${isActive ? "active" : ""}`
          }
        >
          Contact
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
