// // ----------------1st code
// import Layout from "./../components/Layout/Layout";
// import React, { useState, useEffect } from "react";
// import { useCart } from "../context/Cart";
// import { useAuth } from "../context/auth";
// import { useNavigate } from "react-router-dom";
// import DropIn from "braintree-web-drop-in-react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { IoMdAdd } from "react-icons/io";
// import { AiOutlineMinus } from "react-icons/ai";

// // import "./Cart.css";

// const CartPage = () => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useCart();
//   console.log(cart, "cart");
//   const [auth, setAuth] = useAuth();
//   const [clientToken, setClientToken] = useState("");
//   const [instance, setInstance] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const [minusquantity, setMinusQuantity] = useState("");
//   const [selectedItem, setSelecteditem] = useState(null);

//   //total price
//   const totalPrice = () => {
//     try {
//       let total = 0;
//       cart?.map((item) => {
//         // total = total + quantity * item.price;
//         total = total + item.price * item.quantity;
//       });
//       return total.toLocaleString("en-US", {
//         style: "currency",
//         currency: "INR",
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //delete items
//   const removeCartItem = (pid) => {
//     try {
//       let myCart = [...cart];
//       let index = myCart.findIndex((item) => item._id === pid);
//       myCart.splice(index, 1);
//       setCart(myCart);
//       localStorage.setItem("cart", JSON.stringify(myCart));
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   ///handleShopping
//   const handleShopping = () => {
//     navigate("/paymment");
//   };

//   //get payment gateway token
//   const getToken = async () => {
//     try {
//       const { data } = await axios.get(
//         "http://localhost:8081/api/v1/product/braintree/token"
//       );
//       setClientToken(data?.clientToken);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getToken();
//   }, [auth?.token]);

//   //handlePayment
//   const handlePayment = async () => {
//     try {
//       setLoading(true);
//       const { nonce } = await instance.requestPaymentMethod();
//       const { data } = await axios.post(
//         "http://localhost:8081/api/v1/product/braintree/payment",
//         {
//           nonce,
//           cart,
//         }
//       );
//       console.log(nonce, "nonnnn");
//       console.log(cart, "caertrt");
//       setLoading(false);
//       localStorage.removeItem("cart");
//       setCart([]);
//       navigate("/dashboard/user/orders");
//       toast.success("Payment Completed Successfully ");
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   const handleAdd = (pid) => {
//     console.log(pid, "pid...");
//     const myCart = [...cart];
//     const cartItem = myCart.findIndex((item) => item._id === pid);
//     if (cartItem !== -1) {
//       const updateCartItem = myCart[cartItem];
//       updateCartItem.quantity += 1;
//       myCart.splice(cartItem, 1, updateCartItem);
//     } else {
//       myCart.push({ _id: pid, quantity: 1 });
//     }
//     setCart(myCart);
//   };

//   // //handleAdd
//   // const handleAdd = (pid) => {
//   //   console.log(pid, "pid...");
//   //   const myCart = [...cart];
//   //   const cartItem = myCart.find((item) => item._id === pid);
//   //   if (cartItem) {
//   //     cartItem.quantity = cartItem.quantity + 1;
//   //     console.log(cartItem, "cartItem...");
//   //     const updatedCartItems = myCart.filter((item) => item._id !== pid);
//   //     const ref = [...updatedCartItems, { ...cartItem }];
//   //     console.log(ref, "reference...");
//   //     setCart([...updatedCartItems, { ...cartItem }]);
//   //   }
//   //   // setQuantity(myCart);
//   // };

//   // {
//   //   if (cart.some((cartItems) => cartItems.pid === pid)) {
//   //     setCart((cart) =>
//   //       cart.map((cartItems) =>
//   //         cartItems.pid === pid
//   //           ? {
//   //               ...cartItems,
//   //               amount: cartItems.quantity + 1,
//   //             }
//   //           : cartItems
//   //       )
//   //     );
//   //     return;
//   //   }
//   //   setCart(...pid);
//   // };

//   const handleMinus = (pid) => {
//     console.log(pid, "pid...");
//     const myCart = [...cart];
//     const cartItem = myCart.findIndex((item) => item._id === pid);
//     if (cartItem !== -1) {
//       var updateCartItem = myCart[cartItem];
//       updateCartItem.quantity -= 1;
//       myCart.splice(cartItem, 1, updateCartItem);
//     } else {
//       myCart.push({ _id: pid, quantity: 1 });
//     }
//     setCart(myCart);
//     const updatedQuantity = updateCartItem.quantity;

//     if (updatedQuantity >= 1) {
//       setQuantity(updatedQuantity);
//     } else {
//       removeCartItem(pid);
//     }
//   };

//   // //handleMinus--------new
//   // const handleMinus = (pid) => {
//   //   console.log(pid, "pid...");
//   //   const myCart = [...cart];
//   //   const cartItem = myCart.findIndex((item) => item._id === pid);
//   //   if (cartItem !== -1) {
//   //     const updateCartItem = myCart[cartItem];
//   //     updateCartItem.quantity -= 1;

//   //     myCart.splice(cartItem, 1, updateCartItem);
//   //   } else {
//   //     myCart.push({ _id: pid, quantity: 1 });
//   //   }
//   //   setCart(myCart);
//   // };

//   // //handleMinus
//   // const handleMinus = (pid) => {
//   //   console.log(pid, "pid...");
//   //   const myCart = [...cart];
//   //   const cartItem = myCart.find((item) => item._id === pid);

//   //   if (cartItem) {
//   //     if (cartItem.quantity >= 1) {
//   //       cartItem.quantity = cartItem.quantity - 1;
//   //     }
//   //     if (cartItem.quantity === 0) {
//   //       removeCartItem(pid);
//   //       return;
//   //     }
//   //     console.log(cartItem, "cartItem...");
//   //     const updatedCartItems = myCart.filter((item) => item._id !== pid);
//   //     const ref = [...updatedCartItems, { ...cartItem }];
//   //     console.log(ref, "reference...");
//   //     setCart([...updatedCartItems, { ...cartItem }]);
//   //   }
//   // };

//   // const handleMinus = (pid) => {
//   //   console.log(pid, "pid...");
//   //   const myCart = [...cart];
//   //   const cartItem = myCart.find((item) => item._id === pid);

//   //   if (cartItem) {
//   //     cartItem.quantity = cartItem.quantity + 1;

//   //     console.log(cartItem, "cartItem...");
//   //     const updatedCartItems = myCart.filter((item) => item._id !== pid);
//   //     const ref = [...updatedCartItems, { ...cartItem }];
//   //     console.log(ref, "reference...");
//   //     setCart([...updatedCartItems, { ...cartItem }]);
//   //   }
//   // };

//   // {
//   //   console.log(pid, "pid...");
//   //   if (quantity >= 1) {
//   //     setQuantity(quantity - 1);
//   //   }
//   //   if (quantity === 0) {
//   //     removeCartItem(pid);
//   //   }
//   // };
//   return (
//     <Layout>
//       <div className="mt-5">
//         <div className="row">
//           <div className="col-md-12 mt-5">
//             {/* <h1 className="text">{`Hello${auth?.token && auth?.user?.name}`}</h1> */}
//             <h4 className="filter text">
//               {cart?.length > 0
//                 ? `You have ${cart.length} items in your Cart ${
//                     auth?.token ? "" : "Please Login to Checkout"
//                   }`
//                 : "Your Cart is Empty"}
//             </h4>
//             {/* <h1>Your cart</h1> */}
//             <div className="row">
//               <div className="col-md-7">
//                 {cart?.map((p) => (
//                   <div className="row mb-4 p-2 card flex-row m-1">
//                     <div className="col-md-4">
//                       <div
//                         className="cards m-1"
//                         // style={{ width: "18rem" }}
//                         key={p._id}
//                       >
//                         <img
//                           src={`http://localhost:8081/api/v1/product/product-photo/${p._id}`}
//                           className="card-img-top"
//                           // style={{
//                           //   maxHeight: "250px",
//                           //   maxWidth: "250px",
//                           //   minWidth: "200px",
//                           //   minHeight: "250px",
//                           // }}
//                           alt={p.name}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-md-8 card-details">
//                       <p>
//                         <b>Name: </b> {p.name}
//                       </p>
//                       <p>
//                         <b>Description: </b> {p.description.substring(0, 30)}
//                       </p>
//                       <p>
//                         <b>Price: </b> {p.price}
//                       </p>
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "10px",
//                         }}
//                       >
//                         <AiOutlineMinus onClick={() => handleMinus(p._id)} />

//                         {p.quantity}

//                         <IoMdAdd onClick={() => handleAdd(p._id)} />
//                       </div>

//                       <button
//                         className="add btn"
//                         onClick={() => removeCartItem(p._id)}
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className=" col-md-4">
//                 <div className="filter">
//                   <h2>Card Summary</h2>
//                 </div>
//                 <p>Total | Checkout | Payment</p>
//                 <hr />

//                 <h4>Total: {totalPrice()}</h4>
//                 {auth?.user?.address ? (
//                   <>
//                     <div className="mb-3">
//                       <h4>Current Address -{auth?.user?.address} </h4>
//                       {/* <h5>{auth?.user?.address}</h5> */}
//                       <button
//                         className="shoppi btn mt-2"
//                         onClick={handleShopping}
//                       >
//                         Continue Shopping
//                       </button>
//                     </div>
//                   </>
//                 ) : (
//                   <div className="mb-3">
//                     {auth?.token ? (
//                       <button
//                         className="shoppi btn mt-2"
//                         onClick={handleShopping}
//                       >
//                         Continue Shopping
//                       </button>
//                     ) : (
//                       <button
//                         className="shoppi btn"
//                         onClick={() =>
//                           navigate("/login", {
//                             state: "/cart",
//                           })
//                         }
//                       >
//                         Please login to Checkout
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CartPage;

// =============================2nd============================

import Layout from "./../components/Layout/Layout";
import React, { useState, useEffect } from "react";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineMinus } from "react-icons/ai";

// import "./Cart.css";

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  console.log(cart, "cart");
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [minusquantity, setMinusQuantity] = useState("");
  const [selectedItem, setSelecteditem] = useState(null);

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        // total = total + quantity * item.price;
        total = total + item.price * item.quantity;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //delete items
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  ///handleShopping
  const handleShopping = () => {
    navigate("/paymment");
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8081/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handlePayment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "http://localhost:8081/api/v1/product/braintree/payment",
        {
          nonce,
          cart,
        }
      );
      console.log(nonce, "nonnnn");
      console.log(cart, "caertrt");
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleAdd = (pid) => {
    console.log(pid, "pid...");
    const myCart = [...cart];
    const cartItem = myCart.findIndex((item) => item._id === pid);
    if (cartItem !== -1) {
      const updateCartItem = myCart[cartItem];
      updateCartItem.quantity += 1;
      myCart.splice(cartItem, 1, updateCartItem);
    } else {
      myCart.push({ _id: pid, quantity: 1 });
    }
    setCart(myCart);
  };

  const handleMinus = (pid) => {
    console.log(pid, "pid...");
    const myCart = [...cart];
    const cartItem = myCart.findIndex((item) => item._id === pid);
    if (cartItem !== -1) {
      var updateCartItem = myCart[cartItem];
      updateCartItem.quantity -= 1;
      myCart.splice(cartItem, 1, updateCartItem);
    } else {
      myCart.push({ _id: pid, quantity: 1 });
    }
    setCart(myCart);
    const updatedQuantity = updateCartItem.quantity;

    if (updatedQuantity >= 1) {
      setQuantity(updatedQuantity);
    } else {
      removeCartItem(pid);
    }
  };

  return (
    <Layout>
      <div className="mt-5">
        <div className="row">
          <div className="col-md-12 mt-5">
            {/* <h1 className="text">{`Hello${auth?.token && auth?.user?.name}`}</h1> */}

            <h4 className="filter text">
              {cart?.length > 0
                ? `You have ${cart.length} items in your Cart ${
                    auth?.token ? "" : "Please Login to Checkout"
                  }`
                : "Your Cart is Empty"}
            </h4>
            {/* <h1>Your cart</h1> */}
            {cart?.length > 0 && ( // Add this condition to show the table only when the cart is not empty
              <div className="row">
                <div className="col-md-7" style={{ marginLeft: "1cm" }}>
                  <table className="table-responsive">
                    {/* className="table table-bordered" */}
                    <thead>
                      <tr>
                        <th scope="col">Product</th> <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart?.map((item) => (
                        <tr key={item._id}>
                          <td>
                            <img
                              src={`http://localhost:8081/api/v1/product/product-photo/${item._id}`}
                              className="card-img-top"
                              style={{
                                maxHeight: "250px",
                                maxWidth: "250px",
                                minWidth: "200px",
                                minHeight: "250px",
                              }}
                              alt={item.name}
                            />{" "}
                            <span></span>
                            <p>
                              <b>Name: </b> {item.name}
                            </p>
                          </td>

                          <td>
                            {item.price.toLocaleString("en-US", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </td>
                          <td>
                            {" "}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <button
                                className="add btn"
                                // style={{ margin: "20px" }}
                                onClick={() => handleMinus(item._id)}
                              >
                                <AiOutlineMinus />
                              </button>
                              {item.quantity}
                              <button
                                className="add btn"
                                // style={{ margin: "20px" }}
                                onClick={() => handleAdd(item._id)}
                              >
                                <IoMdAdd />
                              </button>
                            </div>
                          </td>
                          <td>
                            {(item.price * item.quantity).toLocaleString(
                              "en-US",
                              { style: "currency", currency: "INR" }
                            )}
                          </td>
                          <td>
                            <button
                              className="more btn"
                              onClick={() => removeCartItem(item._id)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>{" "}
                  </table>
                </div>

                <div className="col-md-4">
                  <div className="filter">
                    <h2>Card Summary</h2>
                  </div>
                  <p>Total | Checkout | Payment</p>
                  <hr />

                  <h4>Total: {totalPrice()}</h4>
                  {auth?.user?.address ? (
                    <>
                      <div className="mb-3">
                        <h4>Current Address -{auth?.user?.address} </h4>
                        <h5>{auth?.user?.address}</h5>
                        <button
                          className="shoppi btn mt-2"
                          onClick={handleShopping}
                        >
                          Continue Shopping
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="mb-3">
                      {auth?.token ? (
                        <button
                          className="shoppi btn"
                          onClick={() =>
                            navigate("/login", {
                              state: "/cart",
                            })
                          }
                        >
                          Please login to Checkout
                        </button>
                      ) : (
                        <button
                          className="shoppi btn"
                          onClick={() =>
                            navigate("/login", {
                              state: "/cart",
                            })
                          }
                        >
                          Please login to Checkout
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
