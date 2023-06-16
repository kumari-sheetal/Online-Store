import React from "react";
import "./Category.css";
const Category = () => {
  return (
    <div>
      <section className="categories" id="categories">
        <h1 className="heading">
          Products <span>Categories</span>
        </h1>
        <div className="box-container">
          <div className="row " style={{ gap: "1cm", width: "100%" }}>
            <div className="box" style={{ background: "white" }}>
              <img src="images/cat-1.png" alt="" />
              <h3>Vegetables</h3>
              <p>upto 45% off</p>
              {/* <button type="button" className=" add btn">
                shop now
              </button> */}
              <a href="/home" className=" add btn">
                Shop now
              </a>
            </div>

            <div className="box" style={{ background: "white" }}>
              <img src="images/cat-2.png" alt="" />
              <h3>Fresh Fruits</h3>
              <p>upto 45% off</p>
              <a href="/home" className=" add btn">
                Shop now
              </a>
            </div>

            <div className="box" style={{ background: "white" }}>
              <img src="images/c1.jpeg" alt="" />
              <h3>Clothes</h3>
              <p>upto 45% off</p>
              <a href="/home" className=" add btn">
                Shop now
              </a>
            </div>

            <div className="box" style={{ background: "white" }}>
              <img src="images/s1.jpg" alt="" />
              <h3>Stationery </h3>
              <p>upto 45% off</p>
              <a href="/home" className=" add btn">
                Shop now
              </a>
            </div>
          </div>{" "}
        </div>
      </section>
    </div>
  );
};

export default Category;
