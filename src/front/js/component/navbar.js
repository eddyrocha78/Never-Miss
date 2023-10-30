import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="navbar">
      <div className="container-fluid">
        <div className="navbar-brand d-flex align-items-center-start mx-5">
          <Link to="/">
            <img
              className="image-fluid align-center rounded-circle"
              src="https://i.ibb.co/PTZ1JYW/Sem-Titulo-1-png-819420c8fbc3bcac3b5fb3276950c600.png"
              alt="Logo"
              width="50"
              height="50"
            />
          </Link>
          <h1 className="ms-4 text-white">Never</h1>
          <h1 className=" text-white tittle">Miss</h1>
        </div>

        <div className="me-5">
          <Link to="/">
            <button
              style={{ backgroundColor: "rgba(217, 217, 217, 1)" }}
              className="btn btn-primary rounded-pill border-0 text-dark text-bold fw-bold"
            >
              <i className="fa-solid fa-circle-user fa-xl me-2"></i>Sign In
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
