import { Button } from "antd";
import Banner from "components/pages/home/Banner/Banner";
import BestSellers from "components/pages/home/BestSellers/BestSellers";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import bannerVideo from "resources/video/banner.mp4";
import { ROUTE_URL } from "routes";

function HomePage() {
  useEffect(() => {}, []);
  return (
    <div className="home-page">
      <Banner />
      <div className="home-page_inner">
        <BestSellers />
        <div className="home-page-banner-video">
          <div class="feature-text-paired align-center media-with-text__text">
            <div class="subheading subheading--over">NEW COLOR DROP✨</div>
            <h2 class="majortitle h1-style">
              GLASTING WATER TINT
              <br />
              #SUNSET
            </h2>
            <div class="rte">
              <p>SUNSET WATER GLOSS ON YOUR LIPS</p>
            </div>
            <Link to={ROUTE_URL.SHOP}>
              <Button type="primary">SHOP NOW</Button>
            </Link>
          </div>

          <video src={bannerVideo} loop controls={false} autoPlay muted></video>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
