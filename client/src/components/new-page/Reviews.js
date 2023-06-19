import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/swiper.min.css";
import "./Reviews.css";

const Reviews = () => {
  SwiperCore.use([Autoplay]);

  return (
    <div>
      <section className="reviews" id="reviews">
        <h1 className="heading">
          Our <span>Ambition</span>
        </h1>
        <div className="reviews-slider">
          <Swiper
            loop
            autoplay={{ delay: 7500, disableOnInteraction: false }}
            slidesPerView={3}
            centeredSlides
            spaceBetween={20}
            pagination={{ clickable: true }}
            style={{ padding: "1rem" }}
            breakpoints={{
              // Small devices (landscape phones)
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              // Medium devices (tablets)
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              // Large devices (desktops)
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            <SwiperSlide>
              <div className="box-container">
                <div className="row">
                  <div className="box" style={{ background: "white" }}>
                    <img src="images/r1.jpeg" alt="" />
                    <p>
                      Welcome to Ary-store, the exclusive online platform
                      designed to revolutionize the way you experience shopping
                      within our college campus. We specialize in converting
                      offline systems into seamless online solutions, ensuring
                      quick and efficient deliveries right to your
                      doorstep.Whether you need textbooks, course materials,
                      electronics, or any other essential items, we bring them
                      to you with unparalleled speed and efficiency.
                    </p>
                    {/* <h3>john deo</h3> */}
                  </div>{" "}
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="box-container">
                <div className="row">
                  <div className="box " style={{ background: "white" }}>
                    <img src="images/r2.jpeg" alt="" />
                    <p>
                      With our emphasis on swift deliveries, you can say goodbye
                      to long wait times. We understand the importance of
                      efficiency in a busy academic environmimport Reviews from
                      logistics team works tirelessly to ensure your orders are
                      processed and dispatched in the shortest possible time
                      frame. Trust us to deliver your purchases promptly,
                      allowing you to focus on your studies and campus life.
                    </p>
                    {/* <h3>john deo</h3> */}
                  </div>{" "}
                </div>{" "}
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="row">
                <div className="box " style={{ background: "white" }}>
                  <img src="images/r3.avif" alt="" />
                  <p>
                    Our website provides an intuitive and user-friendly
                    interface, making it easy for you to navigate and explore
                    our vast product catalog. Browse through a diverse range of
                    items, read detailed descriptions, and benefit from valuable
                    customer reviews to make informed purchasing decisions. Our
                    support team is always ready to assist you, providing prompt
                    responses to any queries or concerns you may have.
                  </p>
                  {/* <h3>john deo</h3> */}
                </div>{" "}
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="row">
                <div className="box " style={{ background: "white" }}>
                  <img src="images/r4.jpg" alt="" />
                  <p>
                    Join our growing community of campus shoppers and embrace
                    the future of convenient and efficient shopping with
                    Ary-Store. We are here to make your life easier by
                    converting offline systems into online solutions, delivering
                    your desired products in record time.Thank you for choosing
                    ary-Store as your trusted partner in online shopping and
                    digital transformation. Together, let's embrace the future
                    of convenience.
                  </p>
                  {/* <h3>john deo</h3> */}
                </div>{" "}
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="row">
                <div className="box " style={{ background: "white" }}>
                  <img src="images/r5.jpeg" alt="" />
                  <p>
                    Our website is designed with your convenience in mind. With
                    just a few clicks, you can browse through our extensive
                    collection, compare prices, and find the perfect item that
                    suits your taste and budget.we value your trust and
                    prioritize the security of your personal information. Visit
                    our website today and discover a world of endless
                    possibilities. Enjoy the convenience, quality, and value
                    that Ary Store brings to your doorstep.{" "}
                  </p>
                  {/* <h3>Happy Shopping</h3> */}
                </div>{" "}
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
