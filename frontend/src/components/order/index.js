import axios from "axios";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  updateOrderAction,
  setNumOfOrderAcion,
  setCompletedOrderAction,
} from "../../redux/reducers/order";
import "./style.css";

const Order = () => {
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
    getOrders();
  }, []);

  const getOrders = () => {

    axios
      .get(`https://meraki-project-5-backend.herokuapp.com/order/product/cart`, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        dispatch(setCompletedOrderAction([]));
        result.data.order.map((element, index) => {
          getOrderById(element.id);
        });

        dispatch(setNumOfOrderAcion(result.data.order));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getOrderById = (id) => {
    

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


  return (
    <div className="orderss">
      
      <div className="order_container">
       

      <h2 className="Title">
        Order History
      </h2>

        {order.length===0 ?<h3>No order yet</h3>  :order.length &&
          order.map((element, index) => (

            <div className="one_order">



              
                <h3 className="title1"># <hr></hr></h3>
                <p className="user_order">{index + 1}</p>
              
             
                <h3 className="title2">Number Of Products <hr></hr></h3>
                <p className="number_product">{element.length}</p>
              

              
                <h3 className="title3"> Date Of Order <hr></hr></h3>
                <p className="date_order">
                  {element[element.length - 1].created_at}
                </p>
             
              
                <h3 className="title4">Products <hr></hr></h3>
                <div>
                  {element.length &&
                    element.map((element2) => (
                      <div className="all_product">
                       
                        <p className="titleProduct">{element2.title}</p>
                          
                        
                      </div>
                    ))}
                </div>
              
            </div>
          ))}
      </div>
    </div>
  );
};

export default Order;
