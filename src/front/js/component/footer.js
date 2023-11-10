import React from "react";

export const Footer = () => (
  <footer className="text-white mt-2">
    <div style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="container-fluid pt-2 ">
      <div className="row">
        <p className="text-center">Europe <a href="https://4geeks.com">4 Geeks Academy</a> final Project</p>
      </div>
      <div className="row py-2 mx-2 rounded">
        <p className="text-center">Created by:</p>
        <ul className=" list-group list-group-horizontal text-center flex-wrap border-0 me-4 navbar-collapse">
          <li className="transp list-group-item col-12 col-sm-6 col-md-3 border-0">
            <i className="fab fa-github fa-xl me-2 text-white"></i><a href="https://github.com/bennycarvalho13">Benny Carvalho</a>
          </li>
          <li className="transp list-group-item col-12 col-sm-6 col-md-3 border-0">
            <i className="fab fa-github fa-xl me-2 text-white"></i><a href="https://github.com/ZionSpardas">Daniel Barbosa</a>
          </li>
          <li className="transp list-group-item col-12 col-sm-6 col-md-3 border-0">
            <i className="fab fa-github fa-xl me-2 text-white"></i><a href="https://github.com/eddyrocha78">Eduardo Rocha</a>
          </li>
          <li className="transp list-group-item col-12 col-sm-6 col-md-3 border-0">
            <i className="fab fa-github fa-xl me-2 text-white"></i><a href="https://github.com/drbig30">David Roger</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);
