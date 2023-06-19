import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        "http://localhost:8081/api/v1/auth/user-auth"
      );
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}

// // import { Outlet } from "react-router-dom";

// import { useState, useEffect } from "react";
// import { useAuth } from "../../context/auth";
// import axios from "axios";
// import Spinner from "../Spinner";
// import Dashboard from '../../pages/user/Dashboard';

// export default function PrivateRoute() {
//   const [ok, setOk] = useState(false);
//   const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
//   const [auth, setAuth] = useAuth();

//   useEffect(() => {
//     const authCheck = async () => {
//       const res = await axios.get("http://localhost:8081/api/v1/auth/user-auth");
//       console.log(res,"response...")
//       if (res.data.ok) {
//         console.log(res.data.ok,"ok...")
//         setOk(true);
//       } else {
//         setOk(false);
//       }
//     };
//     if(auth?.token) authCheck();
//   }, [auth?.token]);

//   // useEffect(()=> {
//   //   console.log("inside useEffect...");
//   //   if(ok){
//   //     setIsUserAuthenticated(true)
//   //   }
//   // },[ok]);

//   // console.log(ok,"ok123")
//   console.log(ok,"okState...")

//   if(ok){
//     console.log("inside if...")
//     return <Dashboard />
//   } else {
//     console.log("inside else...")
//     return <Spinner/>
//   }
// }
