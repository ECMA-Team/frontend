import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./style.css";

const SidebarAdmin = () => {
  return (
    <div className="sidebar_admin">
    
      <ul class="menu">
        
        <li class="item" id="mn1">
          <a class="btn" href="#mn1">
            Users
          </a>
          <div class="submenu">
            <a href="/Admin/users">User List</a>
            <a href="/Admin/users">Edit User Role</a>
          </div>
        </li>

        <li class="item" id="mn2">
          <a class="btn" href="#mn2">
            Brands
          </a>
          <div class="submenu">
            <a href="/Admin/brand">Brands List</a>
            <a href="/Admin/brand">Add Brand </a>
          </div>
        </li>
        

        

        <li class="item" id="mn6">
          <a class="btn" href="#mn6">
            Category
          </a>
          <div class="submenu">
            <a href="/Admin/category">Category List</a>
            <a href="/Admin/category">Add Category </a>
          </div>
        </li>





        <li class="item" id="mn3">
          <a class="btn" href="#mn3">
            Orders
          </a>
          <div class="submenu">
            <a href="/Admin/Orders">Orders List</a>
          </div>
        </li>

        <li class="item" id="mn4">
          <a class="btn" href="#mn4">
            Products
          </a>
          <div class="submenu">
            <a href="/Admin/product">Products List</a>
            <a href="/Admin/product/create">Add Product</a>
            <a href="/Admin/product">Edit Product</a>
          </div>
        </li>
      </ul>

      {/* <ul class="menu">
        <li class="item" id="mn1">
          <a class="btn" href="/Admin">
            Dashboard
          </a>
        </li>
        <li class="item" id="mn2">
          <a class="btn" href="/Admin/users">
            Users
          </a>
        </li>
        <li class="item" id="mn2">
          <a class="btn" href="/Admin/brand">
            Brands
          </a>
        </li>
        <li class="item" id="mn2">
          <a class="btn" href="/Admin/Orders">
            ORDERS
          </a>
        </li>

        <li class="item" id="mn1">
          <a class="btn" href="#mn1">
            Products
          </a>
          <div class="submenu">
            <a href="/Admin/product">Show All Products</a>
            <a href="/Admin/product/create">Add Product</a>
          </div>
        </li>
      </ul> */}
    </div>
  );
};

export default SidebarAdmin;
