import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";


export const Navbar = () => {
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();

  const handlesignout = () => {
    actions.logout()
    navigate("/")
  }


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

          <h1 className="ms-4 text-white puff">Never</h1>
          <h1 className=" text-white tittle puff">Miss</h1>
        </div>

        <div className="me-5">
          {store.token && store.token != "" && store.token != null ? (
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
              <ul style={{ backgroundColor: "rgba(37, 53, 37, 1)", maxWidth: "20px" }} className="dropdown-menu position-absolute start-50 translate-middle-x op border-white">
                <li>
                  <a className="dropdown-item text-white" onClick={() => navigate("/userprofile")}>
                    Profile Info
                  </a>
                </li>
                <li>
                  <a className="dropdown-item text-white" onClick={() => navigate("/userspace")}>
                    User Space
                  </a>
                </li>
                <li>

                  <a className="dropdown-item text-danger" onClick={() => handlesignout()}>

                    Log Out
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <button
                style={{ backgroundColor: "rgba(217, 217, 217, 1)" }}
                className="btn btn-primary rounded-pill border-0 text-dark text-bold fw-bold"
              >
                <i className="fa-solid fa-circle-user fa-xl me-2"></i>Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
