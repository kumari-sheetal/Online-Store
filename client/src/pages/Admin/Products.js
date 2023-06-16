import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8081/api/v1/product/get-product-admin"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Somethong went wrong");
    }
  };
  //use-effect
  useEffect(() => {
    getAllProducts();
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
        `http://localhost:8081/api/v1/product/product-list/$ {page}`
      );
      setProducts([...products, ...data?.products]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Layout title={"All products"}>
      <div className="container-fluid m-3 p-3 ">
        <div className="row ">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <h1 className="filter">All Product list</h1>
          <div className="col-md-12">
            <div className="d-flex flex-wrap flex-row ">
              {products?.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="product-box col"
                >
                  <div
                    className="card m-2 p-3"
                    style={{ width: "12rem" }}
                    key={p._id}
                  >
                    <img
                      src={`http://localhost:8081/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      style={{ width: "158px", height: "158px" }}
                      alt={p.name}
                    />
                    <div className="card-body " style={{ height: 150 }}>
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className=" more btn "
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
