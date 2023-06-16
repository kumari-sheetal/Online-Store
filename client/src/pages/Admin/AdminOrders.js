import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

import { Select, Button } from "antd";

const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8081/api/v1/auth/all-orders"
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  //delete orders
  // const deleteOrders = async () => {
  //   try {
  //     await axios.delete("http://localhost:8081/api/v1/auth/all-orders");
  //     setOrders([]);
  //     toast.success("All orders deleted successfully");
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Error deleting all orders");
  //   }
  // };

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8081/api/v1/auth/order-status/${orderId}`,
        {
          status: value,
        }
      );
      getOrders();
      console.log(data, "data");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Dashboard-All Orders"}>
      <div className="container-fluid m-3 p-3 mt-5">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-6">
            <div className="filter d-flex justify-content-between align-items-center mb-4">
              <h1>All Orders list</h1>

              {/* 
              <Button type="primary" onClick={deleteOrders}>
                Delete All Orders
              </Button> */}
            </div>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table
                    className="table-responsive"
                    style={{
                      borderCollapse: "collapse",
                      width: "100%",
                      marginBottom: "1rem",
                      backgroundColor: "#fff",
                      color: "black",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <thead>
                      <tr className="table-h">
                        <th
                          // style={{ backgroundColor: "black", color: "white" }}
                          scope="col"
                        >
                          #
                        </th>
                        <th
                          // style={{ backgroundColor: "black", color: "white" }}
                          scope="col"
                        >
                          Status
                        </th>
                        <th
                          // style={{ backgroundColor: "black", color: "white" }}
                          scope="col"
                        >
                          Buyer
                        </th>
                        <th
                          // style={{ backgroundColor: "black", color: "white" }}
                          scope="col"
                        >
                          Date
                        </th>
                        <th
                          // style={{ backgroundColor: "black", color: "white" }}
                          scope="col"
                        >
                          Payment
                        </th>
                        <th
                          // style={{ backgroundColor: "black", color: "white" }}
                          scope="col"
                        >
                          Quantity
                        </th>
                        <th
                          // style={{ backgroundColor: "black", color: "white" }}
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
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        <td>{new Date(o?.createdAt).toLocaleString()}</td>

                        <td>
                          {o?.paymentStatus === "COD" ? "Pending" : "Success"}
                        </td>
                        {/* <td>{o?.products?.length}</td> */}
                        <td>
                          {o?.products?.reduce(
                            (acc, curr) => acc + curr.quantity,
                            0
                          )}
                        </td>
                        {/* <td>
                          {o?.cart?.map((c, i) => (
                            <p key={i}>
                              {c.product?.name} x {c.quantity}
                            </p>
                          ))}
                        </td> */}
                        <td>{o?.paymentStatus}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div
                    className="table-bod  conatiner"
                    style={{ backgroundColor: "white" }}
                  >
                    {o?.products?.map((p, i) => (
                      <div
                        className="row  mb-2  cards flex-row"
                        style={{
                          marginLeft: "0px",
                          marginRight: "0px",
                          backgroundColor: "white",
                        }}
                      >
                        <div className="col-md-4 ">
                          <div
                            // className="card m-1 "
                            className="c "
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
                            {/* {o?.payment?.Pending && (
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
                          <p>Description:{p.description.substring(0, 30)}</p>
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
    </Layout>
  );
};

export default AdminOrders;
