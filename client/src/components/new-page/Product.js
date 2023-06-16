import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/swiper.min.css";
const Product = () => {
  SwiperCore.use([Autoplay]);
  return (
    <div className="product">
      <div className="row ">
        <h1 className="heading">
          Our <span>Products</span>
        </h1>

        <div className="card m-3 " style={{ width: "8cm", height: "8cm" }}>
          <div className="card" style={{ width: "8cm", height: "8cm" }}>
            <img
              src="/images/s.jpeg"
              alt="Our Story"
              className="card-img-top"
              style={{
                height: "100cm",
                maxHeight: "100%",
                maxWidth: "100%",
                borderRadius: "10px",
              }}
            />
          </div>{" "}
        </div>
        <div className="card m-3 " style={{ width: "8cm", height: "8cm" }}>
          <div className="card" style={{ width: "8cm", height: "8cm" }}>
            <img
              src="/images/moon.webp"
              alt="Our Story"
              className="card-img-top"
              style={{
                height: "100cm",
                maxHeight: "100%",
                maxWidth: "100%",
                borderRadius: "10px",
              }}
            />
          </div>{" "}
        </div>
        <div className="card m-3 " style={{ width: "8cm", height: "8cm" }}>
          <div className="card" style={{ width: "8cm", height: "8cm" }}>
            <img
              src="/images/d.webp"
              alt="Our Story"
              className="card-img-top"
              style={{
                height: "100cm",
                maxHeight: "100%",
                maxWidth: "100%",
                borderRadius: "10px",
              }}
            />
          </div>{" "}
        </div>
        <div className="card m-3 " style={{ width: "8cm", height: "8cm" }}>
          <div className="card" style={{ width: "8cm", height: "8cm" }}>
            <img
              src="/images/bottle.webp"
              alt="Our Story"
              className="card-img-top"
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                borderRadius: "10px",
              }}
            />
          </div>{" "}
        </div>
        <div className="card m-3 " style={{ width: "8cm", height: "8cm" }}>
          <div className="card" style={{ width: "8cm", height: "8cm" }}>
            <img
              src="/images/clothe.jpeg"
              alt="Our Story"
              className="card-img-top"
              style={{
                height: "100cm",
                maxHeight: "100%",
                maxWidth: "100%",
                borderRadius: "10px",
              }}
            />
          </div>{" "}
        </div>
        <div className="card m-3 " style={{ width: "8cm", height: "8cm" }}>
          <div className="card" style={{ width: "8cm", height: "8cm" }}>
            <img
              src="/images/food.jpeg"
              alt="Our Story"
              className="card-img-top"
              style={{
                height: "100cm",
                maxHeight: "350px",
                maxWidth: "100%",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>
        <div className="card m-3 " style={{ width: "8cm", height: "8cm" }}>
          <div className="card" style={{ width: "8cm", height: "8cm" }}>
            <img
              src="/images/img.jpeg"
              alt="Our Story"
              className="card-img-top"
              style={{
                height: "100cm",
                maxHeight: "350px",
                maxWidth: "100%",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>
        <div className="card m-3 " style={{ width: "8cm", height: "8cm" }}>
          <div className="card" style={{ width: "8cm", height: "8cm" }}>
            <img
              src="/images/t1.jpeg"
              alt="Our Story"
              className="card-img-top"
              style={{
                height: "100cm",
                maxHeight: "100%",
                maxWidth: "100%",
                borderRadius: "10px",
              }}
            />
          </div>{" "}
        </div>
        <div className="card m-3 " style={{ width: "8cm", height: "8cm" }}>
          <div className="card">
            <img
              src="/images/b.jpeg"
              alt="Our Story"
              className="card-img-top"
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                borderRadius: "10px",
              }}
            />
          </div>{" "}
        </div>
        <div className="card m-3 " style={{ width: "8cm", height: "8cm" }}>
          <div className="card" style={{ width: "8cm", height: "8cm" }}>
            <img
              src="/images/pot.webp"
              alt="Our Story"
              className="card-img-top"
              style={{
                height: "100cm",
                maxHeight: "100%",
                maxWidth: "100%",
                borderRadius: "10px",
              }}
            />
          </div>{" "}
        </div>
        <div className="card m-3 " style={{ width: "8cm", height: "8cm" }}>
          <div className="card" style={{ width: "8cm", height: "8cm" }}>
            <img
              src="/images/camera.jpeg"
              alt="Our Story"
              className="card-img-top"
              style={{
                height: "100cm",
                maxHeight: "100%",
                maxWidth: "100%",
                borderRadius: "10px",
              }}
            />
          </div>{" "}
        </div>
        <div className="card m-3 " style={{ width: "8cm", height: "8cm" }}>
          <div className="card" style={{ width: "8cm", height: "8cm" }}>
            <img
              src="/images/kitchen.jpeg"
              alt="Our Story"
              className="card-img-top"
              style={{
                height: "100cm",
                maxHeight: "100%",
                maxWidth: "100%",
                borderRadius: "10px",
              }}
            />
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Product;
