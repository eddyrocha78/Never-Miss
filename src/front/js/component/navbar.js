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

          <div className="dropdown-center text-center">
            <button
            style={{ backgroundColor: "rgba(217, 217, 217, 1)" }}
              className="btn rounded-circle py-3 "
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-solid fa-circle-user fa-2xl"></i>
            </button>
            <ul style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="dropdown-menu border-white">
              <li>
                <a className="dropdown-item text-white">
                  Movies
                </a>
              </li>
              <li>
                <a className="dropdown-item text-white" >
                  Series
                </a>
              </li>
              <li className="dropdown-divider bg-white"></li>
              <li>
                <a className="dropdown-item text-white">
                  Profile Info
                </a>
              </li>
              <li>
                <a className="dropdown-item text-white">
                  User Space
                </a>
              </li>
              <li>
                <a className="dropdown-item text-danger">
                  Log Out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
