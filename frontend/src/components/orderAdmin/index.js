import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateOrderAction,
  setNumOfOrderAcion,
  setCompletedOrderAction,
} from "../../redux/reducers/order";
import "./style.css";

const AdminOrder = () => {
  const dispatch = useDispatch();

  //! redux =========
  const { token, totalPrice, order, numOfOrder } = useSelector((state) => {
    return {
      token: state.auth.token,
      totalPrice: state.cart.totalPrice,
      order: state.order.order,
      numOfOrder: state.order.numOfOrder,
    };
  });
  //! redux =========

  useEffect(() => {
    console.log("IN EFFECT");
    getOrders();
  }, []);

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
    console.log("numOfOrder", numOfOrder);

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
  console.log(order);
  return (
    <div className="order_admin">
      <h3>Order List</h3>
      <table id="productT">
        <tr>
          <th>#</th>
          <th>User Email</th>
          <th>Num Of Product </th>
          <th>Date Of Order </th>
          <th>List Of Products </th>
        </tr>
        {order.length &&
          order.map((element, index) => {
            console.log(element[0].create_Date)

            return (
              <tr key={index}>
                <td>
                  <p className="user_order">{index + 1}</p>
                </td>
                <td>{element[0].email}</td>
                <td>
                  <p className="number_product">{element.length}</p>
                </td>

                <td>
                  <p className="number_product"> {/* {element[0].create_Date} */}
                  {new Date(element[0].create_Date).toLocaleString("es-CL")}</p>
                </td>
                <td>
                  {element.length &&
                    element.map((element2) => <p>{element2.title}</p>)}
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default AdminOrder;
