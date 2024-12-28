import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "components/pages/account/components/Sidebar";
import { useEffect } from "react";
import { ROUTE_URL } from "routes";
import { useAuthentication } from "store/useAuthentication";

function Account({ children }) {
  const navigate = useNavigate();
  const { isLogin, logout } = useAuthentication();
  useEffect(() => {
    if (!isLogin) {
      logout();
      navigate(ROUTE_URL.HOME);
    }
  }, [isLogin]);
  return (
    <div className="account-page">
      <div className="account-page-container">
        <Sidebar />
        <div className="account-page-children">{children}</div>
      </div>
    </div>
  );
}

export default Account;
