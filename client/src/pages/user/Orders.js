import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8081/api/v1/auth/orders"
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  //delete order

  // const handleDeleteOrder = async (_id) => {
  //   try {
  //     await axios.delete(`http://localhost:8081/api/v1/auth/orders/${_id}`);
  //     setOrders(orders.filter((order) => order._id !== _id));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <Layout title={"Dashboard-My orders"}>
      <div className="container-fluid m-3 p-3 mt-5">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-6">
            <h1 className="text"> All Orders</h1>
            <div className="conatiner">
              <div className="text-center">
                {orders?.map((o, i) => {
                  return (
                    <div className="border shadow">
                      <table className="table-responsive">
                        <thead>
                          <tr className="table-h">
                            <th scope="col">#</th>
                            <th
                              // style={{
                              //   backgroundColor: "black",
                              //   color: "white",
                              // }}
                              scope="col"
                            >
                              Status
                            </th>
                            <th
                              // style={{
                              //   backgroundColor: "black",
                              //   color: "white",
                              // }}
                              scope="col"
                            >
                              Buyer
                            </th>

                            <th
                              // style={{
                              //   backgroundColor: "black",
                              //   color: "white",
                              // }}
                              scope="col"
                            >
                              Date
                            </th>
                            <th
                              // style={{
                              //   backgroundColor: "black",
                              //   color: "white",
                              // }}
                              scope="col"
                            >
                              Payment
                            </th>
                            <th
                              // style={{
                              //   backgroundColor: "black",
                              //   color: "white",
                              // }}
                              scope="col"
                            >
                              Quantity
                            </th>
                            <th
                              // style={{
                              //   backgroundColor: "black",
                              //   color: "white",
                              // }}
                              scope="col"
                            >
                              Payment Status
                            </th>
                            {/* <th scope="col">Delete </th> */}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{i + 1}</td>
                            <td>{o?.status}</td>
                            <td>{o?.buyer?.name}</td>
                            <td>{new Date(o?.createdAt).toLocaleString()}</td>

                            <td>
                              {o?.paymentStatus === "COD"
                                ? "Pending"
                                : "Success"}
                            </td>

                            <td>{o?.products?.length}</td>
                            <td>{o?.paymentStatus}</td>
                            {/* <td>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => handleDeleteOrder(o._id)}
                              >
                                Delete
                              </button>
                            </td> */}
                          </tr>
                        </tbody>
                      </table>
                      <div
                        className="table-bod  conatiner"
                        style={{ backgroundColor: "white" }}
                      >
                        {o?.products?.map((p, i) => (
                          <div
                            className="row mb-2  cards flex-row"
                            style={{
                              marginLeft: "0px",
                              marginRight: "0px",
                              backgroundColor: "white",
                            }}
                          >
                            <div className="col-md-4 ">
                              <div
                                // className="card m-1 "
                                className="cards "
                                style={{ width: "14rem" }}
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
                                {/* {o?.payment?.Success && (
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
                                )} */}
                              </div>
                            </div>
                            <div className="col-md-8">
                              <p>Name:{p.name}</p>
                              <p>
                                Description:{p.description.substring(0, 30)}
                              </p>
                              <p>Price: {p.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
