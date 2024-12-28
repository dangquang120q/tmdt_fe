import { Badge, Button, Dropdown } from "antd";
import { CartContext } from "context/CartContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { IoLogoInstagram, IoLogoYoutube } from "react-icons/io5";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "resources/images/logo-text.avif";
import CartIcon from "resources/svg/Cart";
import SearchIcon from "resources/svg/Search";
import UserIcon from "resources/svg/UserIcon";
import { ROUTE_URL } from "routes";
import { useAuthentication } from "store/useAuthentication";
import LoginModal from "./components/LoginModal/LoginModal";
import { productService } from "services/product";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id, logout } = useAuthentication();
  const { cartItems } = useContext(CartContext);
  const [category, setCategory] = useState([]);
  const { pathname } = useLocation();
  // Sticky Menu Area
  const totalCartItem = useMemo(() => {
    const sumQty = cartItems.reduce((res, item) => {
      return res + item.qty;
    }, 0);
    return sumQty;
  }, [cartItems]);
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    productService.getCategory().then((res) => {
      const data = res.map((item) => ({ ...item, key: item.id }));
      setCategory(data);
    });
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  /* Method that will fix header after a specific scrollable */
  const isSticky = (e) => {
    const header = document.querySelector(".page-header_wrapper");
    const scrollTop = window.scrollY;

    scrollTop >= 44
      ? header.classList.add("is-sticky")
      : header.classList.remove("is-sticky");
  };

  const userMenu = [
    {
      key: 1,
      label: <Link to={ROUTE_URL.PROFILE}>My Account</Link>,
    },
    {
      key: 2,
      label: <Link to={ROUTE_URL.PURCHASE}>My Purchase</Link>,
    },
    {
      key: 3,
      label: (
        <p
          onClick={() => {
            logout();
          }}
        >
          Logout
        </p>
      ),
    },
  ];

  const handleToggleSearch = () => {
    const search = document.querySelector(".header-search-container");
    const main = document.querySelector(".public-layout-content");

    if (search.style.display == "none") {
      search.style.display = "block";
      main.style.display = "none";
    } else {
      search.style.display = "none";
      main.style.display = "block";
    }
  };
  return (
    <div className="public-layout_header main-container">
      <div className="announcement-bar">
        <div className="announcement-bar_left">
          <IoLogoYoutube />
          <IoLogoInstagram />
        </div>
        <div className="announcement-bar_midle">
          <b>Free shipping</b> on orders +$30 & <b>Free gift</b> on orders
          +$50🎁
        </div>
        <div className="announcement-bar_right"></div>
      </div>
      <div className="page-header_wrapper">
        <div className="page-header">
          <div className="page-header_inner">
            <Link to={ROUTE_URL.HOME} className="logo">
              <img src={Logo} alt="logo" />
            </Link>
            <div className="category">
              <NavLink
                to={ROUTE_URL.SHOP}
                className={`category-item all ${
                  pathname == "/shop" ? "all-active" : ""
                }`}
              >
                <p>All products</p>
              </NavLink>
              {category.map((item) => (
                <NavLink
                  to={ROUTE_URL.SHOP + "/" + item.key}
                  className="category-item"
                  key={item.id}
                >
                  <p>{item.name}</p>
                </NavLink>
              ))}
            </div>
            <div className="page-header_right">
              {id && (
                <Dropdown
                  menu={{ items: userMenu }}
                  placement="bottomRight"
                  arrow={{ pointAtCenter: true }}
                >
                  <div className="navbar-item">
                    <UserIcon />
                  </div>
                </Dropdown>
              )}
              <div className="navbar-item" onClick={handleToggleSearch}>
                <SearchIcon />
              </div>
              {id ? (
                <Link
                  to={ROUTE_URL.CART}
                  className="navbar-item navbar-item-cart"
                >
                  <Badge count={totalCartItem}>
                    <CartIcon />
                  </Badge>
                </Link>
              ) : (
                <Button
                  type="primary"
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <LoginModal open={isModalOpen} setOpen={setIsModalOpen} />
    </div>
  );
}

export default Header;
