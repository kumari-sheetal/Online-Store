import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FcViewDetails } from "react-icons/fc";
import { MdProductionQuantityLimits } from "react-icons/md";
import { TbUsers } from "react-icons/tb";
import { HiOutlineClipboardDocumentList } from "react-icons/hi";
import { AiOutlineInsertRowLeft } from "react-icons/ai";
import Layout from "./Layout";
import "../Layout/Admin.css";
const AdminMenu = () => {
  return (
    <div>
      <div>
        <a
          className="more btn  mt-5"
          data-bs-toggle="offcanvas"
          href="#offcanvasExample"
          role="button"
          aria-controls="offcanvasExample"
          style={{ marginLeft: "2cm" }}

          // -------
        >
          &#9776; Open Sidebar
        </a>

        <div
          className="panel offcanvas offcanvas-start"
          tabIndex={-1}
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="offcanvas-header">
            <h5 className=" filter offcanvas-title" id="offcanvasExampleLabel">
              Admin Panel
            </h5>
            <button
              type="button"
              className="more btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              overflow
            />
          </div>
          <div className="offcanvas-body">
            <div
              className="list-group"
              style={{ gap: "50px" }}
              data-bs-dismiss="offcanvas"
            >
              <NavLink
                to="/dashboard/admin/create-category"
                className="more btn"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "15px",
                  alignItems: "center",
                }}
              >
                <FcViewDetails size="3em" />
                <span>Create Category</span>
              </NavLink>

              <NavLink
                to="/dashboard/admin/create-product"
                className="more btn"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "15px",
                  alignItems: "center",
                }}
              >
                <MdProductionQuantityLimits size="3em" />
                <span>Create Products</span>
              </NavLink>
              <NavLink
                to="/dashboard/admin/products"
                className="more btn"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "15px",
                  alignItems: "center",
                }}
              >
                <AiOutlineInsertRowLeft size="3em" />
                <span> Products</span>
              </NavLink>

              {/* <NavLink
                to="/dashboard/admin/users"
                className="list-group-item list-group-item-action"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "15px",
                  alignItems: "center",
                }}
              >
                <TbUsers size="3em" />
                <span>Users</span>
              </NavLink> */}

              <NavLink
                to="/dashboard/admin/orders"
                className="more btn"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "15px",
                  alignItems: "center",
                }}
              >
                <TbUsers size="3em" />
                <span>All Orders</span>
              </NavLink>
              <NavLink
                to="/dashboard/admin/chat"
                className="more btn"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "15px",
                  alignItems: "center",
                }}
              >
                <TbUsers size="3em" />
                <span>Admin chat</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;

// <div className="list-group">
//              <NavLink to ="/dashboard/admin/create-category" className="list-group-item list-group-item-action list-group-item-success"><FcViewDetails size="50px" />Create Category</NavLink>
//              <NavLink to ="/dashboard/admin/create-product" className="list-group-item list-group-item-action list-group-item-info"><MdProductionQuantityLimits/>Create Products</NavLink>
//              <NavLink to ="/dashboard/admin/users" className="list-group-item list-group-item-action list-group-item-warning"><TbUsers/>Users</NavLink>
//              <NavLink to ="/dashboard/admin/order-list" className="list-group-item list-group-item-action list-group-item-danger"><HiOutlineClipboardDocumentList/>Orders List</NavLink>
//            </div>

// <div className="text-center">
// <div className="list-group">
// <h4>Admin Panel</h4>

//   <NavLink to ="/dashboard/admin/create-category" className="list-group-item list-group-item-action list-group-item-success">Create Category</NavLink>
//   <NavLink to ="/dashboard/admin/create-product" className="list-group-item list-group-item-action list-group-item-info">Create Products</NavLink>
//   <NavLink to ="/dashboard/admin/users" className="list-group-item list-group-item-action list-group-item-warning">Users</NavLink>
//   <NavLink to ="/dashboard/admin/order-list" className="list-group-item list-group-item-action list-group-item-danger">Orders List</NavLink>

//   </div>
// </div>
