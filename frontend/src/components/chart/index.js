import React from "react";
import axios from "axios";

import "./style.css";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

import {
  getUsersAction,
  
} from "../../redux/reducers/users";

import {
  setProductsAction,
  addProductAction,
  updateProductAction,
  deleteProductAction,
} from "../../redux/reducers/products"
import {
  updateOrderAction,
  setNumOfOrderAcion,
  setCompletedOrderAction,
} from "../../redux/reducers/order";

import {
  getBrandsAction,
  
} from "../../redux/reducers/brand";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";



export const Chart = () => {
  

  const dispatch = useDispatch();

  const { token, isLoggedIn, users,products,brands,order } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      users: state.users.users,
      products: state.products.products,
      brands: state.brands.brands,
      order: state.order.order,
    };
  });

  useEffect(() => {
    getAllUsers();
    getAllProduct();
    getBrandAdmin();
    getOrders();
  }, []);

  const getAllUsers = () => {
    axios
      .get(`https://meraki-project-5-backend.herokuapp.com/admin/users`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(getUsersAction(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllProduct = () => {
    axios
      .get(`https://meraki-project-5-backend.herokuapp.com/products`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(setProductsAction(result.data.result));
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getOrders = () => {
    console.log("in getOrders");

    axios
      .get(`https://meraki-project-5-backend.herokuapp.com/order/orders/Admin`, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        dispatch(setCompletedOrderAction([]));
        result.data.order.map((element, index) => {
          console.log(element);
          getOrderById(element.id);
        });
        console.log(result.data.order, "IN GET ORDER");

        dispatch(setNumOfOrderAcion(result.data.order));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getOrderById = (id) => {
    console.log("getOrderById");

    axios
      .get(`https://meraki-project-5-backend.herokuapp.com/order/cart/id/${id}`, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        dispatch(updateOrderAction(result.data.order));

        console.log(result, "IN GET BY ID");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getBrandAdmin = () => {
    axios
      .get(`https://meraki-project-5-backend.herokuapp.com/brand`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        console.log(result.data.result);
        dispatch(getBrandsAction(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const data = [
    { name: "Users", users: users.length },
    { name: "Product", users: products.length},
    { name: "Orders", users: order.length },
    { name: "Brands", users: brands.length },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <div className="Apppp">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="users"
            isAnimationActive={false}
            data={data}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#011126"
            label
          />
          <Tooltip />
        </PieChart>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar
            dataKey="users"
            fill="#025E73"
            background={{ fill: "#eee" }}
          />
        </BarChart>
      </div>
    </div>
  );
};
