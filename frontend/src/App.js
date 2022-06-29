import "./App.css";
import NavBar from "./components/NavBar";
import Register from "./components/register/index";
import Login from "./components/login/index";
import Product from "./components/product/index";
import Cart from "./components/cart";
import OneProduct from "./components/oneProduct";
import Brand from "./components/brand/beands";
import Category from "./components/Category/category";
import CategoryAdmin from "./components/categoryAdmin";
import { Routes, Route } from "react-router-dom";
import CatByBrand from "./components/CatByBrand";
import ProCB from "./components/ProCB";
import UsersComponent from "./components/users";
import AdminDashbord from "./components/adminDashbord";
import AddProductAdmin from "./components/productAdmin/AddProduct";
import BrandAdmin from "./components/brandAdmin";
import AdminOrder from "./components/orderAdmin";
import ProductAdmin from "./components/productAdmin";
import UpdateProductAdmin from "./components/productAdmin/UpdateProduct";
import { ToastContainer, toast } from 'react-toastify';
import Upload from "./components/upload";
import Sold from "./components/sold";
import Footer from "./components/footer";
import Order from "./components/order";
import About from "./components/footer/about/about";
import Contact from "./components/footer/contact/Contact";
import Privacy from "./components/footer/privacy";
import Getbrand from "./components/getbrand";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
// import { Chart } from "./components/chart";


function App() {
  const location = useLocation();
  useEffect(() => {
    // console.log(location);
  }, [location.pathname]);

  return (
    <div className="App">
      {/* <Chart/> */}
      <NavBar />
      <Getbrand className="side_bar" />
      <Routes className="main">
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product" element={<Product />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/product/:id" element={<OneProduct />}></Route>
        <Route path="/" element={<Brand />}></Route>
        <Route path="/category" element={<Category />}></Route>
        <Route path="/Admin/category" element={<CategoryAdmin />}></Route>
        <Route path="/allCategory/:brand" element={<CatByBrand />}></Route>
        <Route
          path="/allCategory/:brand/PRO/:brand/:category"
          element={<ProCB />}
        ></Route>
        <Route path="/Admin/users" element={<UsersComponent />}></Route>
        <Route path="/Admin/brand" element={<BrandAdmin />}></Route>
        <Route path="/Admin" element={<AdminDashbord />}></Route>
        <Route path="/Admin/product" element={<ProductAdmin />}></Route>
        <Route
          path="/Admin/product/edit/:id"
          element={<UpdateProductAdmin />}
        ></Route>
        <Route
          path="/Admin/product/create"
          element={<AddProductAdmin />}
        ></Route>
        <Route path="/order" element={<Order />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>

        <Route path="/privacy-policy" element={<Privacy />}></Route>
        <Route path="/Admin/Orders" element={<AdminOrder />}></Route>
      </Routes>
      <Footer className="foter" />

      <ToastContainer />

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      ></link>
    </div>
  );
}

export default App;
