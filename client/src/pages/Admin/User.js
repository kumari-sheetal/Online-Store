import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

const User = () => {
  return (
    <Layout title={"Dashboard-All Users"}>
      <div className="container-fluid m-3 p-3 mt-5">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>User list</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default User;
