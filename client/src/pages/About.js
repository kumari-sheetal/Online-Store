import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../components/About.css";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { BsLaptop } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { RxLapTimer } from "react-icons/rx";
import { FaRegHandshake } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../components/new-page/Footer";
// import "./footer.css";
import "swiper/swiper.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import SwiperCore, { Autoplay } from "swiper";
import Reviews from "../components/new-page/Reviews";
import { faUser, faCalendar } from "@fortawesome/free-solid-svg-icons";
import Category from "../components/new-page/Category";
import Product from "../components/new-page/Product";
import Features from "../components/new-page/Features";

const About = () => {
  // const facebookUrl = "https://www.facebook.com/your-profile";
  // const twitterUrl = "https://www.twitter.com/your-profile";
  // const linkedinUrl = "https://www.linkedin.com/in/your-profile";
  // const youtubeUrl = "https://www.youtube.com/";
  // const navigate = useNavigate();
  SwiperCore.use([Autoplay]);
  return (
    <Layout title={"About us - Ary Store"}>
      <div className="row contactus mt-5 about-background">
        <div className="col-md-12">
          <div className="slider">
            <div className="slide"></div>
            <div className="slide"></div>
            <div className="slide"></div>
            <div className="slide"></div>
            <div className="slide"></div>
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <Features />
      <Product />
      <Category />
      <div className="">
        <Reviews />
      </div>
      <Footer />
    </Layout>
  );
};

export default About;
