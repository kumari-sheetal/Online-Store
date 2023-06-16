import React from "react";
import { NavLink, Link } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import Search from "../form/Search";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";
import { IoMdCart } from "react-icons/io";
import { Badge } from "antd";
import DarkMode from "../../pages/Darkmode/DarkMode";
import { BsCart4 } from "react-icons/bs";

const Header = () => {
  const [cart] = useCart();
  const categories = useCategory();
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <Link to="/home" className="navbar-brand ml-auto">
            <BiShoppingBag size={"2rem"} />
            <span className="brand"> Ary-</span>
            <span className="brandname"> Store</span>
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <Search />
              <NavLink to="/home" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/" className="nav-link">
                About
              </NavLink>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul
                  className="dropdown-menu"
                  style={{ backgroundColor: "rgb(245, 240, 234)" }}
                >
                  <li>
                    <Link className="filter dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c.slug}>
                      <Link
                        className=" filter dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                {auth?.user?.role !== 1 && (
                  <NavLink to="/cart" className="nav-link">
                    <Badge count={cart?.length} showZero>
                      <BsCart4 size="2em" className="cartb" />
                    </Badge>
                  </NavLink>
                )}
              </li>
              <DarkMode />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
