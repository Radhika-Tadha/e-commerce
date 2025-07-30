import './App.css';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { setCart } from "./redux/cartSlice";


import Navbar from './component/navbar';
import Footer from './component/footer';

import AddProduct from './Admin/Pages/AddProduct';
import ProductPage from './Admin/Pages/ProductPage';
import Order from './Admin/Pages/Order';
import FetchUser from './Admin/Pages/FetchUser';

import Home from './Pages/Home';
import SignUp from './Pages/Signup';
import Login from './Pages/Login';
import ProductEditWrapper from './Pages/ProductEditWrapper';
import AllProducts from './Pages/AllProduct';
import ContactUs from './Pages/ContactUs';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart';
import CheckoutPage from './Pages/CheckoutPage';
import MyOrders from './Pages/MyOrder';
import Profile from './Pages/profile';
import AboutUs from './Pages/AboutUs';

function App() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Load cart from localStorage on first load
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      dispatch(setCart(JSON.parse(storedCart)));
    }
  }, []); // Only once on page load

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/user/getUser", {
      withCredentials: true,
    })
      .then(res => {
        setUser(res.data.user);
        setUser(res.data.user)
      })
      .catch(err => {
        console.log("User not logged in", err.response?.data?.message)
      });
  }, []);
  return (
    // <BrowserRouter>
    <div className="App d-flex flex-column min-vh-100">
      <Navbar user={user} setUser={setUser} />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/ProductPage" element={<ProductPage />} />
          <Route path="/update/:id" element={<ProductEditWrapper />} />
          <Route path="/allproduct" element={<AllProducts />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Order" element={<Order />} />
          <Route path="/checkout/:id" element={<CheckoutPage />} />
          <Route path="/fetchuser" element={<FetchUser />} />
          <Route path="/MyOrders" element={<MyOrders />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/AboutUs" element={<AboutUs />} />
        </Routes>
      </main>
      <Footer />
    </div>
    // </BrowserRouter>
  );
}

export default App;
{/* <Route path="/about" element={<About />} /> */ }