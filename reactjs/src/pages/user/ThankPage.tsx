import React from "react";
import { Link } from "react-router-dom";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const ThankPage = () => {
  return (
    <div className="jumbotron text-center">
      <h1 className="display-3">THANK YOU!</h1>
      <h2>
        <IoMdCheckmarkCircleOutline style={{fontSize: 150}} />
      </h2>
      <p className="lead">
        Thank you very much for trusting and choosing our store, <br /> we will
        contact you as soon as possible
      </p>
      <hr />
      <p className="lead">
        <Link className="btn btn-dark btn-sm" to="/" role="button">
          Back to home
        </Link>
      </p>
    </div>
  );
};

export default ThankPage;
