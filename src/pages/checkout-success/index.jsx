import { BsBagCheckFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import logo from "resources/images/logo-text.avif";
import Footer from "../layout/Public/components/Footer/Footer";

function CheckoutSuccess() {
  const { id } = useParams();

  return (
    <div className="success-wrapper">
      <Link to="/" className="logo">
        <img src={logo} alt="" />
      </Link>
      <div className="success">
        <p className="icon">
          <BsBagCheckFill size={80} />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Your order ID is: {id}</p>

        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">If you have any questions, please email</p>
        <a className="email" href="mailto:order@example.com">
          romand@gmail.com
        </a>
        <Link to="/">
          <button width="300px" className="app-button">
            Coninue Shopping
          </button>
        </Link>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default CheckoutSuccess;
