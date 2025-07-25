import './App.css';
import Navbar from './component/navbar';
import Footer from './component/footer';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SignUp from './Pages/Signup';
import Login from './Pages/Login';
import AddProduct from './Admin/Pages/AddProduct';
import ProductPage from './Admin/Pages/ProductPage';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductEditWrapper from './Pages/ProductEditWrapper';
import AllProducts from './Pages/AllProduct';
import ContactUs from './Pages/ContactUs';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart';
// import SignUp from './Pages/Signup.jsx';
// import About from './pages/About';

function App() {
  const [user, setUser] = useState(null);


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
          <Route path="/ContactUs" element={<ContactUs/>}/>
          <Route path="/product/:id" element={<ProductDetail/>}/>
          <Route path="/cart" element={<Cart/>}/>



          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
    // </BrowserRouter>
  );
}

export default App;
