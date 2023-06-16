import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import Layout from "../../components/Layout/Layout";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const Admindashboard = () => {
  const [auth] = useAuth("");
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/v1/product/get-products")
      .then((res) => setProductCount(res.data.totalcount))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8081/api/v1/category/get-category")
      .then((res) => setCategoryCount(res.data.category.length))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8081/api/v1/auth/all-orders")
      .then((res) => setOrderCount(res.data.length))
      .catch((err) => console.log(err));
  }, []);

  const data = [
    { name: "Total Products", value: productCount },
    { name: "Total Categories", value: categoryCount },
    { name: "Total Orders", value: orderCount },
  ];

  const previousOrderData = [
    { month: "Jan", orders: 10 },
    { month: "Feb", orders: 15 },
    { month: "Mar", orders: 12 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <Layout title={"Dashboard"}>
      <div
        className="container-fluid  mt-5"
        style={{ backgroundColor: "gray" }}
      >
        <div className="row">
          <div className="col-md-3 mt-5">
            <AdminMenu />
          </div>

          <div className=" col-md-8 mt-5">
            <div className="admin-dashboard">
              <div className="dashboard-card">
                <CircularProgressbar
                  value={productCount}
                  text={`${productCount}%`}
                  maxValue={100}
                  styles={{
                    root: { width: "100px", height: "90px" },
                    path: { stroke: "#0088FE" },
                    text: { fill: "#0088FE", fontSize: "25px" },
                  }}
                />
                <div
                  className="name"
                  style={{ fontSize: "40px", marginLeft: "20px" }}
                >
                  Products
                </div>
              </div>{" "}
              <div className="dashboard-card">
                <CircularProgressbar
                  value={categoryCount}
                  text={`${categoryCount}%`}
                  maxValue={100}
                  styles={{
                    root: { width: "100px", height: "90px" },
                    path: { stroke: "#00C49F" },
                    text: { fill: "#00C49F", fontSize: "22px" },
                  }}
                />
                <div
                  className="name"
                  style={{ fontSize: "40px", marginLeft: "20px" }}
                >
                  Category
                </div>
              </div>{" "}
              <div className="dashboard-card">
                <CircularProgressbar
                  value={orderCount}
                  text={`${orderCount}%`}
                  maxValue={100}
                  styles={{
                    root: { width: "100px", height: "90px" },
                    path: { stroke: "#FFBB28" },
                    text: { fill: "#FFBB28", fontSize: "22px" },
                  }}
                />
                <div
                  className="name"
                  style={{ fontSize: "40px", marginLeft: "20px" }}
                >
                  Orders
                </div>{" "}
              </div>
            </div>
          </div>

          <div className="row mt-3 ">
            <div className="col-md-7 mt-2">
              <div
                className="border shadow"
                style={{
                  backgroundColor: "rgb(58, 54, 48)",
                  color: "white",
                  borderRadius: "10px",
                }}
              >
                {" "}
                <h3 style={{ marginTop: "10px" }}></h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 4" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="rgb(254, 186, 48)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>{" "}
            <div className="col-md-5 mt-2">
              <div
                className="border shadow"
                style={{
                  backgroundColor: "rgb(58, 54, 48)",
                  color: "white",
                  borderRadius: "10px",
                }}
              >
                {" "}
                <h3 style={{ marginTop: "10px" }}></h3>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={data}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#8884d8"
                      label
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-6 mt-3">
              <div
                className="border shadow"
                style={{
                  backgroundColor: "rgb(58, 54, 48)",
                  borderRadius: "10px",
                  color: "white",
                }}
              >
                {" "}
                <h3 style={{ marginTop: "10px" }}></h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={previousOrderData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="days" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke="#00C49F"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div
                className="border shadow-sm p-3"
                style={{
                  height: "11cm",
                  backgroundColor: "rgb(58, 54, 48)",
                  color: "white",
                  borderRadius: "10px",
                }}
              >
                <div className="card-body">
                  <div className="text-center">
                    {auth?.user?.gender === "female" ? (
                      <>
                        <img
                          src="/images/female.jpeg"
                          alt="Profile"
                          className="profile-image"
                        />
                        <h4 className="mt-3">Admin Name: {auth?.user?.name}</h4>
                      </>
                    ) : (
                      <>
                        <img
                          src="/images/men.png"
                          alt="Profile"
                          className="profile-image"
                        />
                        <h4 className="mt-3">Admin Name: {auth?.user?.name}</h4>
                      </>
                    )}
                    <h4>Admin Email: {auth?.user?.email}</h4>
                    <h4>Admin Contact: {auth?.user?.phone}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admindashboard;

// //------------------------charts==========
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AdminMenu from "../../components/Layout/AdminMenu";
// import { useAuth } from "../../context/auth";
// import Layout from "../../components/Layout/Layout";
// import { CircularProgressbar } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   PieChart,
//   Pie,
//   Cell,
//   LineChart,
//   Line,
// } from "recharts";

// const Admindashboard = () => {
//   const [auth] = useAuth("");
//   const [productCount, setProductCount] = useState(0);
//   const [categoryCount, setCategoryCount] = useState(0);
//   const [orderCount, setOrderCount] = useState(0);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8081/api/v1/product/get-products")
//       .then((res) => setProductCount(res.data.totalcount))
//       .catch((err) => console.log(err));

//     axios
//       .get("http://localhost:8081/api/v1/category/get-category")
//       .then((res) => setCategoryCount(res.data.category.length))
//       .catch((err) => console.log(err));

//     axios
//       .get("http://localhost:8081/api/v1/auth/all-orders")
//       .then((res) => setOrderCount(res.data.length))
//       .catch((err) => console.log(err));
//   }, []);

//   const data = [
//     { name: "Total Products", value: productCount },
//     { name: "Total Categories", value: categoryCount },
//     { name: "Total Orders", value: orderCount },
//   ];

//   const previousOrderData = [
//     // Replace this with the actual data of previous orders
//     { month: "Jan", orders: 10 },
//     { month: "Feb", orders: 15 },
//     { month: "Mar", orders: 12 },
//     // Add more data points as needed
//   ];
//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

//   return (
//     <Layout title={"Dashboard"}>
//       <div className="card-dashboard">
//         <div className=" col m-3 p-3 mt-5">
//           <div className="row">
//             <div className="col-md-3 mt-5">
//               <AdminMenu />
//             </div>

//             <div className=" col-md-8 mt-5">
//               <div className="filter">
//                 <h1>Admin Dashboard</h1>
//               </div>
//               <div className="admin-dashboard ">
//                 <div className="dashboard-card">
//                   <CircularProgressbar
//                     value={productCount}
//                     text={`${productCount}%`}
//                     maxValue={100}
//                     styles={{
//                       root: { width: "100px", height: "90px" },
//                       path: { stroke: "#0088FE" },
//                       text: { fill: "#0088FE", fontSize: "25px" },
//                     }}
//                   />
//                   <div
//                     className="name"
//                     style={{ fontSize: "40px", marginLeft: "20px" }}
//                   >
//                     Products
//                   </div>
//                 </div>
//                 <div className="dashboard-card">
//                   <CircularProgressbar
//                     value={categoryCount}
//                     text={`${categoryCount}%`}
//                     maxValue={100}
//                     styles={{
//                       root: { width: "100px", height: "90px" },
//                       path: { stroke: "#00C49F" },
//                       text: { fill: "#00C49F", fontSize: "22px" },
//                     }}
//                   />{" "}
//                   <div
//                     className="name"
//                     style={{ fontSize: "40px", marginLeft: "20px" }}
//                   >
//                     Category
//                   </div>
//                 </div>
//                 <div className="dashboard-card">
//                   <CircularProgressbar
//                     value={orderCount}
//                     text={`${orderCount}%`}
//                     maxValue={100}
//                     styles={{
//                       root: { width: "100px", height: "90px" },
//                       path: { stroke: "#FFBB28" },
//                       text: { fill: "#FFBB28", fontSize: "22px" },
//                     }}
//                   />
//                   <div
//                     className="name"
//                     style={{ fontSize: "40px", marginLeft: "20px" }}
//                   >
//                     Orders
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-12 mt-2">
//               <div
//                 className="card  shadow-sm p-2"
//                 style={{ backgroundColor: "rgb(58, 54, 48)" }}
//               >
//                 <div className="card-body">
//                   <div className="text-center">
//                     {auth?.user?.gender === "female" ? (
//                       <img
//                         src="/images/female.jpeg"
//                         alt="Profile"
//                         style={{
//                           width: "250px",
//                           height: "250px",
//                           borderRadius: "50%",
//                         }}
//                       />
//                     ) : (
//                       <img
//                         src="/images/men.png"
//                         alt="Profile"
//                         style={{
//                           width: "150px",
//                           height: "150px",
//                           borderRadius: "50%",
//                         }}
//                       />
//                     )}
//                     <h4 className="mt-3">Admin Name: {auth?.user?.name}</h4>
//                     <h4>Admin Email: {auth?.user?.email}</h4>
//                     <h4>Admin Contact: {auth?.user?.phone}</h4>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="row">
//               <div className="row mt-3">
//                 <div className="col">
//                   {/* <div className="box"> */}
//                   <h4 className="mb-3"></h4>
//                   <div className="box mb-3">
//                     {" "}
//                     <BarChart width={600} height={400} data={data}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip />
//                       <Legend />
//                       <Bar dataKey="value" fill="#8884d8" />
//                     </BarChart>
//                     {/* </div> */}
//                   </div>
//                 </div>

//                 <div className="col-md-6">
//                   {/* <div className="card bg-light shadow-sm p-3"> */}
//                   <h4 className="mb-3"></h4>
//                   <div className="box mb-3">
//                     <PieChart width={600} height={400}>
//                       <Pie
//                         data={data}
//                         dataKey="value"
//                         nameKey="name"
//                         cx="50%"
//                         cy="50%"
//                         outerRadius={120}
//                         fill="#8884d8"
//                         label
//                       >
//                         {data.map((entry, index) => (
//                           <Cell
//                             key={`cell-${index}`}
//                             fill={COLORS[index % COLORS.length]}
//                           />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                       <Legend />
//                     </PieChart>
//                     {/* </div> */}
//                   </div>
//                 </div>
//                 <div className="col-md-6 ">
//                   {/* <div className="card bg-light shadow-sm p-3"> */}
//                   <h4 className="mb-3">Orders Status</h4>
//                   <div className="box mb-3">
//                     <LineChart
//                       width={600}
//                       height={300}
//                       data={previousOrderData}
//                       margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                     >
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="month" />
//                       <YAxis />
//                       <Tooltip />
//                       <Legend />
//                       <Line
//                         type="monotone"
//                         dataKey="orders"
//                         stroke="#8884d8"
//                         activeDot={{ r: 8 }}
//                       />
//                     </LineChart>
//                   </div>
//                 </div>
//               </div>

//               <div className="col-md-6">{/* Additional content */}</div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* </div> */}
//     </Layout>
//   );
// };

// export default Admindashboard;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AdminMenu from "../../components/Layout/AdminMenu";
// import { useAuth } from "../../context/auth";
// import Layout from "../../components/Layout/Layout";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

// const Admindashboard = () => {
//   const [productCount, setProductCount] = useState(0);
//   const [categoryCount, setCategoryCount] = useState(0);
//   const [orderCount, setOrderCount] = useState(0);
//   const [orderData, setOrderData] = useState([]);

//   const { authTokens } = useAuth();

//   useEffect(() => {
//     axios
//       .get("http://localhost:8081/api/v1/product/get-product")
//       .then((res) => setProductCount(res.data.totalcount))
//       .catch((err) => console.log(err));

//     axios
//       .get("http://localhost:8081/api/v1/category/get-category")
//       .then((res) => setCategoryCount(res.data.category.length))
//       .catch((err) => console.log(err));

//     axios
//       .get("http://localhost:8081/api/v1/auth/all-orders")
//       .then((res) => setOrderCount(res.data.length))
//       .catch((err) => console.log(err));

//     axios
//       .get("http://localhost:8081/api/v1/auth/orders", {
//         headers: { Authorization: `Bearer ${authTokens}` },
//       })
//       .then((res) => setOrderData(res.data))
//       .catch((err) => console.log(err));
//   }, []);

//   const data = [
//     { name: "Total Products", value: productCount },
//     { name: "Total Categories", value: categoryCount },
//     { name: "Total Orders", value: orderCount },
//   ];

//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

//   const orderStatusData = [
//     {
//       name: "Pending",
//       value: orderData.filter((o) => o.paymentStatus === "pending").length,
//     },
//     {
//       name: "Paid",
//       value: orderData.filter((o) => o.paymentStatus === "paid").length,
//     },
//   ];

//   const orderStatusColors = ["#FFBB28", "#0088FE"];

//   return (
//     <Layout title={"Dashboard"}>
//       <div className="container-fluid m-3 p-3 mt-5">
//         <div className="row">
//           <div className="col-md-3 mt-5">
//             <AdminMenu />
//           </div>
//           <div className="col-md-9 mt-5">
//             <h1>Admin Dashboard</h1>
//             <div className="row">
//               <div className="col-md-6">
//                 <BarChart width={600} height={300} data={data}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="value" fill="#8884d8" />
//                 </BarChart>
//               </div>
//               <div className="col-md-6">
//                 <PieChart width={600} height={300}>
//                   <Pie
//                     data={data}
//                     dataKey="value"
//                     nameKey="name"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={80}
//                     fill="#8884d8"
//                     label
//                   >
//                     {data.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[index % COLORS.length]}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Admindashboard;
