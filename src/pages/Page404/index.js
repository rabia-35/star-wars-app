import React from "react";
import { Link } from "react-router-dom";
const Page404 = () => {
  return (
    <div className="text-center page404 mt-5">
      <img src="../images/logo.png" className="w-25 mb-3" />
      <p>PAGE NOT FOUND</p>
      <div className="d-flex justify-content-center">
        <Link to="/" className=" text-decoration-none text-muted text-center">
          <button className="btn btn-outline-warning">Go To Home Page</button>
        </Link>
      </div>
    </div>
  );
};

export default Page404;
