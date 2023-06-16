import React from "react";
import { NavLink } from "react-router-dom";
import { FcViewDetails } from "react-icons/fc";
import { MdProductionQuantityLimits } from "react-icons/md";
import Chat from "../ChatBot";
const UserMenu = () => {
  return (
    <>
      <a
        className="more btn  mt-5 "
        data-bs-toggle="offcanvas"
        href="#offcanvasExample"
        role="button"
        aria-controls="offcanvasExample"
      >
        &#9776;Open Sidebar
      </a>
      <div
        className=" panel offcanvas offcanvas-start"
        tabIndex={-1}
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className=" filter offcanvas-title" id="offcanvasExampleLabel">
            User Panel
          </h5>
          <button
            type="button"
            className="more btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            overflow
          />
        </div>
        <div className=" offcanvas-body">
          <div
            className="list-group"
            style={{ gap: "50px" }}
            data-bs-dismiss="offcanvas"
          >
            <NavLink
              to="/dashboard/user/profile"
              className="more btn"
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "15px",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <FcViewDetails size="3em" />
              <span>User Profile</span>
            </NavLink>

            <NavLink
              to="/dashboard/user/orders"
              className="more btn"
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "15px",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <MdProductionQuantityLimits size="3em" />
              <span>Orders</span>
            </NavLink>

            <NavLink
              to="/dashboard/user/chat"
              className="more btn"
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "15px",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <MdProductionQuantityLimits size="3em" />
              <span>user Chat</span>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
