import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { BiShoppingBag } from "react-icons/bi";
import "./Footer.css";
const Footer = () => {
  return (
    <div>
      <footer className="footer mt-5" id="footer">
        <div className="box-container">
          <div className="bod">
            <FontAwesomeIcon icon={["fas", "faUser"]} />
            <h3>
              <BiShoppingBag size={"3rem"} />
              <b>
                <span className="brand">Ary-</span>
                <span className="brandname">Store</span>
              </b>
            </h3>
            {/* <p>
              Lorem, Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Natus,
              Laudantium?
            </p> */}
            <div className="share">
              <a href="https://www.facebook.com/your-profile">
                <i>
                  <FontAwesomeIcon className="fa-icon" icon={faFacebookF} />
                </i>
              </a>
              <a href="https://www.twitter.com/your-profile">
                <i>
                  <FontAwesomeIcon className="fa-icon" icon={faTwitter} />
                </i>
              </a>
              <a href="https://www.linkedin.com/in/your-profile">
                <i>
                  <FontAwesomeIcon className="fa-icon" icon={faInstagram} />
                </i>
              </a>
              <a href="https://www.youtube.com/">
                <i>
                  <FontAwesomeIcon className="fa-icon" icon={faYoutube} />
                </i>
              </a>
            </div>
          </div>
          <div className="bod">
            <h3>
              <b>
                <span className="brand">Contact</span>
                <span className="brandname">-Info</span>
              </b>
            </h3>
            <a href="/" className="links">
              <i>
                <FontAwesomeIcon icon={faPhone} />
              </i>
              +123 456 7890
            </a>
            <a href="/" className="links">
              <i>
                <FontAwesomeIcon icon={faPhone} />
              </i>
              +111 222 3333
            </a>
            <a href="/" className="links" id="emailLink">
              <i>
                <FontAwesomeIcon icon={faEnvelope} />
              </i>
              www.help@arystore.com
            </a>
            <a href="/" className="links">
              <i>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </i>
              Baru Sahib , Himachal Pradesh
            </a>
          </div>
          <div className="bod">
            <h3>
              <b>
                <span className="brand">Quick</span>
                <span className="brandname">-Info</span>
              </b>
            </h3>
            <a href="/home" className="links">
              <i>
                <FontAwesomeIcon icon={faArrowRight} />
              </i>
              Home
            </a>
            <a href="/" className="links">
              <i>
                <FontAwesomeIcon icon={faArrowRight} />
              </i>
              Features
            </a>
            <a href="/home" className="links">
              <i>
                <FontAwesomeIcon icon={faArrowRight} />
              </i>
              Products
            </a>
            <a href="/categories" className="links">
              <i>
                <FontAwesomeIcon icon={faArrowRight} />
              </i>
              Categories
            </a>
            {/* <a href="#reviews" className="links">
              <i>
                <FontAwesomeIcon icon={faArrowRight} />
              </i>
              Reviews
            </a>
            <a href="#blogs" className="links">
              <i>
                <FontAwesomeIcon icon={faArrowRight} />
              </i>
              Blogs
            </a> */}
          </div>
        </div>
        <div className="credits">
          <p>
            Created By <span>Sheetal Rana</span> | All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
