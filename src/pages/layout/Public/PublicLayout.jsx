import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import SearchHeader from "components/SearchHeader";

function PublicLayout() {
  return (
    <div className="public-layout">
      <Header />
      {/* <Navbar /> */}
      <SearchHeader />
      <div className="public-layout-content main-container">
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
}

export default PublicLayout;
