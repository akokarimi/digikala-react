import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { isAuth } from "./store/actions/users";

import Overview from "./components/overview";
import Product from "./components/product";
import Header from "./components/header";
import Navigation from "./components/navigation";
import Footer from "./components/footer";
import Signin from "./components/users/signin";
import Signup from "./components/users/signup";
import Profile from "./components/users/profile";
import Cart from "./components/users/cart";
import About from "./components/about";

import { Loader } from "./utils/tools";

const Router = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  let [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(isAuth());
  }, []);

  useEffect(() => {
    if (users.auth !== null && users.loading === false) {
      setLoading(false);
    }
  }, [users]);

  return (
    <BrowserRouter>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Navigation></Navigation>
          <Routes>
            <Route path="/" element={<Overview />}></Route>
            <Route path="/:productId" element={<Product />}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Routes>
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
};

export default Router;
