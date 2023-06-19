import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";

const CategoryProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getProductbycate();
  }, [params?.slug]);
  const getProductbycate = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8081/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  // add to cart func

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
    <Layout title={"Category page "}>
      <div className=" mt-5">
        <div className="" style={{ marginTop: "100px" }}>
          <h3 className=" filter text">Category-{category?.name}</h3>
          <h4 className="text ">{products?.length} Total Result</h4>

          {/* <div className="row"> */}
          <div className="col-md-16">
            <div className="d-flex flex-wrap flex-row ">
              {products?.map((p) => (
                <div
                  className="card m-3 "
                  style={{ width: "18rem" }}
                  key={p._id}
                >
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
                    <p className="card-text">
                      {p.description.substring(0, 30)}.....
                    </p>
                    <p className="card-text">₹{p.price}</p>

                    <button
                      className="more btn ms-2"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className=" add btn  ms-2"
                      onClick={() => onClick(p)}
                      //  {
                      // setCart([...cart, p]);
                      // localStorage.setItem(
                      //   "cart",
                      //   JSON.stringify([...cart, p])
                      // );
                      // toast.success("Item Added to Cart");
                      // }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-dark"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
          </div>
        </div>
      </div>{" "}
      {/* </div> */}
    </Layout>
  );
};

export default CategoryProduct;
