import './App.css';
import axios from 'axios';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { setCart } from "./redux/cartSlice";
// import ProtectedRoute from './ProtectedRoute';

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
import Profile from './Pages/Profile';
import AboutUs from './Pages/AboutUs';
import SendEmailForm from "./Pages/SendEmailForm";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [user, setUser] = useState(null);
  const [isLoggin, setIsLoggin] = useState(false);
  const [loading, setLoading] = useState(true);

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
    axios.get("http://localhost:8000/api/auth/me", {
      withCredentials: true
    })

      .then((res) => {
        setUser(res.data.user);
        setIsLoggin(true);
      })
      .catch((err) => {
        setUser(null);
        setIsLoggin(false);
      })
      .finally(() => setLoading(false)); // Stop loading
  }, []);

  const pathname = window.location.pathname;
  const isPublicPage = ["/", "/login", "/signup"].includes(pathname);

  return (
    // <BrowserRouter>
    <div className="App d-flex flex-column min-vh-100">

      <>
        <Navbar isLoggin={isLoggin} setIsLoggin={setIsLoggin} user={user} setUser={setUser} />
        <main className="flex-grow-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={!isLoggin ? <Login /> : <Navigate to="/home" />} />
            <Route path="/signup" element={!isLoggin ? <SignUp /> : <Navigate to="/home" />} />

            {/* Protected Routes */}
            <Route path="/AddProduct" element={isLoggin ? <AddProduct /> : <Navigate to="/login" />} />
            <Route path="/ProductPage" element={isLoggin ? <ProductPage /> : <Navigate to="/login" />} />
            <Route path="/update/:id" element={isLoggin ? <ProductEditWrapper /> : <Navigate to="/login" />} />
            <Route path="/allproduct" element={isLoggin ? <AllProducts /> : <Navigate to="/login" />} />
            <Route path="/ContactUs" element={isLoggin ? <ContactUs /> : <Navigate to="/login" />} />
            <Route path="/product/:id" element={isLoggin ? <ProductDetail /> : <Navigate to="/login" />} />
            <Route path="/cart" element={isLoggin ? <Cart /> : <Navigate to="/login" />} />
            <Route path="/Order" element={isLoggin ? <Order /> : <Navigate to="/login" />} />
            <Route path="/checkout/:id" element={isLoggin ? <CheckoutPage /> : <Navigate to="/login" />} />
            <Route path="/fetchuser" element={isLoggin ? <FetchUser /> : <Navigate to="/login" />} />
            <Route path="/MyOrders" element={isLoggin ? <MyOrders /> : <Navigate to="/login" />} />
            <Route path="/Profile" element={isLoggin ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/AboutUs" element={isLoggin ? <AboutUs /> : <Navigate to="/login" />} />
            <Route path="/send-email" element={<SendEmailForm />} />
          </Routes>
        </main>
        <Footer />
      </>

    </div>
    // </BrowserRouter>
  );
}
export default App;
