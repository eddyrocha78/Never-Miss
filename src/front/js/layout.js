import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { UserProfile2 } from "./pages/userProfile2";
import { Home } from "./pages/home";
import { Signup } from "./pages/signup";
import { Login } from "./pages/login";
import { UserSpace } from "./pages/userspace";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Details } from "./pages/movieDetails";
import { Results } from "./pages/resultsPage";
import { ResetPassword } from "./pages/resetPassword"; 
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div style={{ backgroundColor: "rgba(16, 17, 18, 1)", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Demo />} path="/demo" />
            <Route exact element={<Login />} path="/login" />
            <Route exact element={<Signup />} path="/signup" />
            <Route exact element={<UserSpace />} path="/userspace" />
            <Route element={<UserProfile2 />} path="/userprofile" />
            <Route element={<Results />} path="/search/:keyword/:page" />
            <Route element={<Details />} path=":type/details/:theid" />
            <Route element={<ResetPassword />} path="/forgot/:token" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);