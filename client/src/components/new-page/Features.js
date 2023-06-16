import React from "react";
import "./Features.css";
const Features = () => {
  return (
    <div>
      <section className="features" id="features">
        <div className="content">
          <h1 className="heading">
            Our <span>Features</span>
          </h1>
          <div className="box-container">
            <div className="row " style={{ gap: "1cm", width: "100%" }}>
              <div className="box" style={{ background: "white" }}>
                <img src="images/feature-img-1.png" alt="" />
                <h3>Fresh and Organic</h3>
                <p>
                  Transforming campus shopping experience, one swift delivery at
                  a time
                </p>{" "}
                {/* <a href="/" className="add btn">
                  S
                </a> */}
              </div>
              <div className="box" style={{ background: "white" }}>
                <img src="images/feature-img-2.png" alt="" />
                <h3>Fast Delivery</h3>
                <p>
                  We bring the speed of online shopping right to your campus
                  doorstep
                </p>
                {/* <a href="/" className="btn">
                  read more
                </a> */}
              </div>
              <div className="box" style={{ background: "white" }}>
                <img src="images/feature-img-3.png" alt="" />
                <h3>Easy Payment</h3>
                <p>
                  From offline to online, we are your trusted partner in digital
                  transformation within our campus walls
                </p>
                {/* <a href="/" className="btn">
                  read more
                </a> */}
              </div>
              <div className="box" style={{ background: "white" }}>
                <img src="images/best-qul.jpg" alt="" />
                <h3>Best Quality</h3>
                <p>
                  Our mission is to bridge the gap between offline and online,
                  creating a campus community empowered by digital convenience
                </p>
                {/* <a href="/" className="btn">
                  read more
                </a> */}
              </div>
            </div>
          </div>
        </div>{" "}
      </section>
    </div>
  );
};

export default Features;
