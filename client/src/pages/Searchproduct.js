import { useCart } from "../context/Cart";
import { useSearch } from "../context/Search";
import Layout from "./../components/Layout/Layout";
import React from "react";
import { useNavigate } from "react-router-dom";
// import { Badge } from "antd";
import toast from "react-hot-toast";

const Searchproduct = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [values, setValues] = useSearch();

  //cart onclick func

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
    <Layout title={"Search Results"}>
      <div className=" mt-5">
        <div className="" style={{ marginTop: "100px" }}>
          <div className="text ">
            <div className="filter ">
              <h1>Search results</h1>
            </div>
            <h4>
              {values?.results.length < 1
                ? "No Products found"
                : `Found ${values?.results.length}`}
            </h4>
          </div>
          <div className="d-flex flex-wrap">
            {values?.results.map((p) => (
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
                  <p className="card-text">
                    {p.description.substring(0, 30)}.....
                  </p>
                  <p className="card-text">₹{p.price}</p>

                  <button
                    className="more btn  ms-2"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>

                  <button
                    className=" add btn ms-2"
                    onClick={() => onClick(p)}

                    // {
                    //   setCart([...cart, p]);
                    //   localStorage.setItem(
                    //     "cart",
                    //     JSON.stringify([...cart, p])
                    //   );
                    //   toast.success("Item Added to Cart");
                    // }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Searchproduct;
