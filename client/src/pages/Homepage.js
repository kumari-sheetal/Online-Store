import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import DarkMode from "./Darkmode/DarkMode";
import ChatBot from "../components/ChatBot";
import Chat from "../components/ChatBot";
import { HiRefresh } from "react-icons/hi";

const Homepage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  console.log(products, "products...");

  useEffect(() => console.log(products, "mount"), []);
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8081/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get Total Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8081/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
    console.log(total, "data");
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more function
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8081/api/v1/product/product-list/${page}`
      );
      setProducts([...products, ...data?.products]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8081/api/v1/product/get-product`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  //useeffect
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filter product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8081/api/v1/product/product-filters",
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const onClick = (product) => {
    const productExist = cart.some((item) => item._id === product._id);

    if (!productExist) {
      toast.success("item already in the cart");
    }
    if (productExist) {
      toast.error("item already in the cart");
    } else {
      setCart([...cart, product]);
      localStorage.setItem("cart", JSON.stringify([...cart, product]));
    }
  };
  return (
    <Layout title={"AllProducts - Best offers "}>
      <div className="row mt-5">
        <div className="col-md-2">
          <h4 className="filter text-center mt-5">Filter by Category</h4>
          <div className="d-flex flex-column ">
            {categories?.map((c) => (
              <Checkbox
                className="abc"
                style={{ margin: 0, marginLeft: "1cm" }}
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/*--------  Price filter---------*/}
          <div className="row mt-3">
            <div className="col-md-7">
              <h4
                className=" filter text-center "
                style={{ marginLeft: "33px" }}
              >
                Price Filter
              </h4>
              <div className="d-flex flex-column">
                <Radio.Group
                  style={{ margin: 0, marginLeft: "1cm" }}
                  onChange={(e) => setRadio(e.target.value)}
                  className="abc"
                >
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio className="abc" value={p.array}>
                        {p.name}
                      </Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              {/* <div className="col-md-70"> */}
              {/* <div className="row mt-3 "> */}
              <button
                className="reset btn  ms-5 mt-3 "
                onClick={() => window.location.reload()}
              >
                <HiRefresh size={"2rem"} />
              </button>
              {/* </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>

        <div className="col-md-10  ">
          <h1 className="filter product mt-5 ">All Products</h1>

          <div className="d-flex flex-wrap flex-row ">
            {/* <div
            className="d-flex "
            // style={{
            //   flexDirection: "row",
            //   flexWrap: "wrap",
            //   justifyContent: "space-evenly",
            // }}
          > */}
            {products?.map((p) => (
              <div className="card m-3 " style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`http://localhost:8081/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  style={{
                    maxHeight: "250px",
                    maxWidth: "350px",
                    minWidth: "200px",
                    minHeight: "250px",
                  }}
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <p className="card-text">₹{p.price}</p>

                  <button
                    className="more btn  ms-2"
                    // style={{ backgroundColor: "rgb(58, 54, 48)" }}
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="add btn btn ms-2 "
                    onClick={() => onClick(p)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && products.length > 5 && (
              <button
                className="reset btn"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
{
  /* <div className="col-md-4 mt-5 mb-3">
<div
  className="d-flex flex-wrap flex-row justify-content-center align-items-center"
  style={{ height: "10cm" }}
>
  <div className="img m-3">
    <img
      src="/images/ary1.jpg"
      alt="Our Story"
      style={{
        maxHeight: "350px",
        maxWidth: "100%",
        borderRadius: "10px",
      }}
    />
  </div>
</div>
</div>
<div className="col-md-4 mt-5 mb-3">
<div
  className="d-flex flex-wrap flex-row justify-content-center align-items-center"
  style={{ height: "10cm" }}
>
  <div className="img m-3">
    <img
      src="/images/ary1.jpg"
      alt="Our Story"
      style={{
        maxHeight: "350px",
        maxWidth: "100%",
        borderRadius: "10px",
      }}
    />
  </div>
</div>
</div>
<div className="col-md-4 mt-5 mb-3">
<div
  className="d-flex flex-wrap flex-row justify-content-center align-items-center"
  style={{ height: "10cm" }}
>
  <div className="img m-3">
    <img
      src="/images/ary1.jpg"
      alt="Our Story"
      style={{
        maxHeight: "350px",
        maxWidth: "100%",
        borderRadius: "10px",
      }}
    />
  </div>
</div>
</div>
<div className="col-md-4 mt-5 mb-3">
<div className="category-card" style={{ height: "10cm" }}>
  <div className="img m-3">
    <img
      src="/images/ary4.jpg"
      alt="Our Story"
      style={{
        maxHeight: "350px",
        maxWidth: "100%",
        borderRadius: "10px",
      }}
    />
  </div>
</div>
</div>

<div className="col-md-3 mt-5 mb-3">
<div
  className="category-card "
  style={{ height: "10cm", width: "11.5cm" }}
>
  <div className="img">
    <img
      src="/images/ary5.jpg"
      alt="Our Story"
      style={{
        maxHeight: "350px",
        maxWidth: "550px",
        minWidth: "400px",
        minHeight: "350px",
        borderRadius: "10px",
      }}
    />
  </div>
</div>
</div>
<div className="row">
<div className="col-md-12 mt-5">
  <div className="row">
    <div className="col-md-3">
      <div className="card">
        <p className="text-justify mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Ducimus officiis obcaecati esse tempore unde ratione,
          eveniet mollitia, perferendis eius temporibus dicta
          blanditiis doloremque explicabo quasi sunt vero optio
          cum aperiam vel consectetur! Laborum enim accusantium
          atque, excepturi sapiente amet! Tenetur ducimus aut
          commodi illum quidem neque tempora nam.
        </p>
      </div>{" "}
    </div>
    <div className="col-md-3">
      <div className="card">
        <p className="text-justify mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Ducimus officiis obcaecati esse tempore unde ratione,
          eveniet mollitia, perferendis eius temporibus dicta
          blanditiis doloremque explicabo quasi sunt vero optio
          cum aperiam vel consectetur! Laborum enim accusantium
          atque, excepturi sapiente amet! Tenetur ducimus aut
          commodi illum quidem neque tempora nam.
        </p>
      </div>{" "}
    </div>
    <div className="col-md-3">
      <div className="card">
        <p className="text-justify mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Ducimus officiis obcaecati esse tempore unde ratione,
          eveniet mollitia, perferendis eius temporibus dicta
          blanditiis doloremque explicabo quasi sunt vero optio
          cum aperiam vel consectetur! Laborum enim accusantium
          atque, excepturi sapiente amet! Tenetur ducimus aut
          commodi illum quidem neque tempora nam.
        </p>
      </div>{" "}
    </div>
    <div className="col-md-3">
      <div className="card">
        <p className="text-justify mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Ducimus officiis obcaecati esse tempore unde ratione,
          eveniet mollitia, perferendis eius temporibus dicta
          blanditiis doloremque explicabo quasi sunt vero optio
          cum aperiam vel consectetur! Laborum enim accusantium
          atque, excepturi sapiente amet! Tenetur ducimus aut
          commodi illum quidem neque tempora nam.
        </p>
      </div>{" "}
    </div>
  </div>{" "}
</div>
</div>
{/* <div className="col-md-2">
<div
  className="box  "
  style={{ height: "10cm", width: "11.5cm" }}
>
  <div className="img">
    <img
      src="/images/ary7.jpg"
      alt="Our Story"
      style={{
        maxHeight: "350px",
        maxWidth: "550px",
        minWidth: "400px",
        minHeight: "350px",
      }}
    />
  </div>
</div>
</div>
<div className="col-md-4">
<div className="box">
  <img
    src="/images/ary1.jpg"
    alt="Second Card"
    style={{ width: "100%", height: "10cm" }}
  />
</div>
</div> */
}
// </div>
// </div>
// <div className="row mt-5">
// <div className="col-md-3">
// <div className="card  " style={{ height: "10cm", width: "11.5cm" }}>
// <div className="card">
//   <img
//     src="/images/ary4.jpg"
//     alt="Our Story"
//     style={{
//       maxHeight: "350px",
//       maxWidth: "550px",
//       minWidth: "400px",
//       minHeight: "350px",
//     }}
//   />
// </div>
// </div>
// </div>
// <div className="col-md-3">
// <div className="card " style={{ height: "10cm", width: "11.5cm" }}>
// <div className="card">
//   <img
//     src="/images/ary6.jpg"
//     alt="Our Story"
//     style={{
//       maxHeight: "350px",
//       maxWidth: "550px",
//       minWidth: "400px",
//       minHeight: "350px",
//     }}
//   />
// </div>
// </div>
// </div>
// <div className="col-md-3">
// <div className="card " style={{ height: "10cm", width: "11.5cm" }}>
// <div className="card">
//   <img
//     src="/images/ary3.jpg"
//     alt="Our Story"
//     style={{
//       maxHeight: "350px",
//       maxWidth: "550px",
//       minWidth: "400px",
//       minHeight: "350px",
//     }}
//   />
// </div>
// </div>
// </div>
// <div className="col-md-3">
// <div className="card " style={{ height: "10cm", width: "11.5cm" }}>
// <div className="card">
//   <img
//     src="/images/ary6.jpg"
//     alt="Our Story"
//     style={{
//       maxHeight: "350px",
//       maxWidth: "550px",
//       minWidth: "400px",
//       minHeight: "350px",
//     }}
//   />
// </div>
// </div>
// </div>
// </div>
// <div className="row">
// <div className="col-md-12 mt-5">
// <div className="row">
// <div className="col-md-3">
//   <div className="card">
//     <p className="text-justify mt-2">
//       Lorem ipsum dolor sit amet consectetur adipisicing elit.
//       Ducimus officiis obcaecati esse tempore unde ratione,
//       eveniet mollitia, perferendis eius temporibus dicta
//       blanditiis doloremque explicabo quasi sunt vero optio cum
//       aperiam vel consectetur! Laborum enim accusantium atque,
//       excepturi sapiente amet! Tenetur ducimus aut commodi illum
//       quidem neque tempora nam.
//     </p>
//   </div>{" "}
// </div>
// <div className="col-md-3">
//   <div className="card">
//     <p className="text-justify mt-2">
//       Lorem ipsum dolor sit amet consectetur adipisicing elit.
//       Ducimus officiis obcaecati esse tempore unde ratione,
//       eveniet mollitia, perferendis eius temporibus dicta
//       blanditiis doloremque explicabo quasi sunt vero optio cum
//       aperiam vel consectetur! Laborum enim accusantium atque,
//       excepturi sapiente amet! Tenetur ducimus aut commodi illum
//       quidem neque tempora nam.
//     </p>
//   </div>{" "}
// </div>
// <div className="col-md-3">
//   <div className="card">
//     <p className="text-justify mt-2">
//       Lorem ipsum dolor sit amet consectetur adipisicing elit.
//       Ducimus officiis obcaecati esse tempore unde ratione,
//       eveniet mollitia, perferendis eius temporibus dicta
//       blanditiis doloremque explicabo quasi sunt vero optio cum
//       aperiam vel consectetur! Laborum enim accusantium atque,
//       excepturi sapiente amet! Tenetur ducimus aut commodi illum
//       quidem neque tempora nam.
//     </p>
//   </div>{" "}
// </div>
// <div className="col-md-3">
//   <div className="card">
//     <p className="text-justify mt-2">
//       Lorem ipsum dolor sit amet consectetur adipisicing elit.
//       Ducimus officiis obcaecati esse tempore unde ratione,
//       eveniet mollitia, perferendis eius temporibus dicta
//       blanditiis doloremque explicabo quasi sunt vero optio cum
//       aperiam vel consectetur! Laborum enim accusantium atque,
//       excepturi sapiente amet! Tenetur ducimus aut commodi illum
//       quidem neque tempora nam.
//     </p>
//   </div>{" "}
// </div>
// </div>
// <p className="text-justify mt-4">
// Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
// officiis obcaecati esse tempore unde ratione, eveniet mollitia,
// perferendis eius temporibus dicta blanditiis doloremque explicabo
// quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
// accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
// commodi illum quidem neque tempora nam.
// </p>
// <h1
// className="bod p-2 mt-5"
// style={{
//   textAlign: "center",
//   backgroundColor: "rgb(95, 93, 91)",
//   color: "rgb(254, 186, 48)",
// }}
// >
// CONTACT US
// </h1>
// <p className="text-center mt-2">
// Any queries or information about our products, feel free to call
// anytime. We are available 24/7.
// </p>
// <div className="text-center">
// <p className="mt-3">
//   <BiMailSend className="contact-icon" /> : www.help@arystore.com
// </p>
// <p className="call mt-3">
//   <BiPhoneCall className="contact-icon" /> : 012-3456789
// </p>
// <p className="mt-3">
//   <BiSupport className="contact-icon" /> : 1800-0000-0000 (toll
//   free)
// </p>
// </div>
// </div>
// </div> */}
