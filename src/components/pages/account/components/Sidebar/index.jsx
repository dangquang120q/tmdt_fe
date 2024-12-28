import { Avatar } from "antd";
import { BiUser } from "react-icons/bi";
import {
  IoCartOutline,
  IoChatbubbleEllipsesOutline,
  IoExitOutline,
  IoReaderOutline,
  IoTrashBinOutline,
} from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { useAuthentication } from "store/useAuthentication";

function Sidebar() {
  const { logout } = useAuthentication();
  const user = useAuthentication();
  const navigate = useNavigate();

  return (
    <div className="account-sidebar">
      <div className="user-info">
        <Avatar src={user.avatar} size={50} className="avatar" />
        <div className="user-name">
          <p className="name">{user.fullName}</p>
          <p className="email">@{user.username}</p>
        </div>
      </div>
      <div className="account-menu">
        <div
          className={`account-menu-item ${
            location.pathname.includes(ROUTE_URL.PROFILE) ||
            location.pathname.includes(ROUTE_URL.ADDRESS)
              ? "active"
              : ""
          }`}
        >
          <BiUser fontSize={20} className="icon" />
          <p>My account</p>
        </div>
        <NavLink
          to={ROUTE_URL.PROFILE}
          className={({ isActive }) =>
            `account-menu-item ${isActive ? "active" : ""}`
          }
          style={{ marginLeft: 25 }}
        >
          <p>Profile</p>
        </NavLink>
        <NavLink
          to={ROUTE_URL.ADDRESS}
          className={({ isActive }) =>
            `account-menu-item ${isActive ? "active" : ""}`
          }
          style={{ marginLeft: 25 }}
        >
          <p>Addresses</p>
        </NavLink>
        <NavLink
          to={ROUTE_URL.CART}
          className={({ isActive }) =>
            `account-menu-item ${isActive ? "active" : ""}`
          }
        >
          <IoCartOutline fontSize={20} className="icon" />
          <p>Cart</p>
        </NavLink>

        <NavLink
          to={ROUTE_URL.PURCHASE}
          className={({ isActive }) =>
            `account-menu-item ${isActive ? "active" : ""}`
          }
        >
          <IoReaderOutline fontSize={20} className="icon" />
          <p>My Purchase</p>
        </NavLink>

        <div
          className="account-menu-item"
          onClick={() => {
            logout();
            navigate(ROUTE_URL.HOME);
          }}
        >
          <IoExitOutline fontSize={20} className="icon" />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
