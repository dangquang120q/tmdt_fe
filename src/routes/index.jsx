import { createBrowserRouter, Navigate } from "react-router-dom";
import ShopPage from "pages/shop";
import HomePage from "pages/home";
import PrivateLayout from "pages/layout/Private/PrivateLayout";
import PublicLayout from "pages/layout/Public/PublicLayout";
import ContactPage from "pages/contact";
import AboutPage from "pages/about";
import Account from "pages/layout/Account";
import Profile from "pages/account/profile";
import MyPurchase from "pages/account/my-purchase";
import Canceled from "pages/account/canceled";
import AdminLayout from "pages/layout/Admin";
import AllBook from "pages/admin/books";
import ViewBook from "pages/admin/book";
import Cart from "pages/account/cart";
import CheckoutSuccess from "pages/checkout-success";
import Pending from "pages/account/pending";
import ProductDetail from "pages/product";
import Address from "pages/account/address";
import Checkout from "pages/checkout";
import Order from "pages/account/order";

export const ROUTE_URL = {
  HOME: "/",
  ADMIN: "/admin",
  ACCOUNT: "/account",
  SHOP: "/shop",
  CATEGORY: "/shop/:category",
  ABOUT: "/about",
  CONTACT: "/contact",
  PRODUCT: "/product/:slug/:id",
  PROFILE: "/account/profile",
  PURCHASE: "/account/purchase",
  CANCEL: "/account/cancel",
  PENDING: "/account/pending",
  CART: "/account/cart",
  ADMIN_BOOKS: "/admin/books",
  ADMIN_VIEW_BOOK: "/admin/book/:id",
  CHECKOUT_SUCCESS: "/checkout-success/:id",
  ADDRESS: "/account/address",
  CHECKOUT: "/checkout",
  ORDER: "/account/purchase/order/:id",
};
export const DEFAULT_PAGE = ROUTE_URL.HOME;

export const routes = [
  {
    path: "",
    element: <PublicLayout />,
    children: [
      { path: ROUTE_URL.HOME, element: <HomePage /> },
      { path: ROUTE_URL.SHOP, element: <ShopPage /> },
      { path: ROUTE_URL.CATEGORY, element: <ShopPage /> },
      { path: ROUTE_URL.CONTACT, element: <ContactPage /> },
      { path: ROUTE_URL.ABOUT, element: <AboutPage /> },
      { path: ROUTE_URL.PRODUCT, element: <ProductDetail /> },
      {
        path: ROUTE_URL.ACCOUNT,
        element: <Navigate to={ROUTE_URL.PROFILE} />,
      },
      {
        path: ROUTE_URL.PROFILE,
        element: (
          <Account>
            <Profile />
          </Account>
        ),
      },
      {
        path: ROUTE_URL.ADDRESS,
        element: (
          <Account>
            <Address />
          </Account>
        ),
      },
      {
        path: ROUTE_URL.PURCHASE,
        element: (
          <Account>
            <MyPurchase />
          </Account>
        ),
      },
      {
        path: ROUTE_URL.CANCEL,
        element: (
          <Account>
            <Canceled />
          </Account>
        ),
      },
      {
        path: ROUTE_URL.PENDING,
        element: (
          <Account>
            <Pending />
          </Account>
        ),
      },
      {
        path: ROUTE_URL.CART,
        element: (
          <Account>
            <Cart />
          </Account>
        ),
      },
      {
        path: ROUTE_URL.ORDER,
        element: (
          <Account>
            <Order />
          </Account>
        ),
      },
      {
        path: ROUTE_URL.CHECKOUT,
        element: <Checkout />,
      },
      { path: "*", element: <Navigate to={DEFAULT_PAGE} /> },
    ],
  },
  {
    path: ROUTE_URL.ADMIN,
    element: <PrivateLayout />,
    children: [
      {
        path: ROUTE_URL.ADMIN_BOOKS,
        element: (
          <AdminLayout>
            <AllBook />
          </AdminLayout>
        ),
      },
      {
        path: ROUTE_URL.ADMIN_VIEW_BOOK,
        element: (
          <AdminLayout>
            <ViewBook />
          </AdminLayout>
        ),
      },
    ],
  },
  { path: ROUTE_URL.CHECKOUT_SUCCESS, element: <CheckoutSuccess /> },
];

export const router = createBrowserRouter(routes);
