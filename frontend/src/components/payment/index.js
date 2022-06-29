//!==============================

import { useState } from "react";

import StripeCheckout from "react-stripe-checkout";

import axios from "axios";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { orderAction } from "../../redux/reducers/auth";

import {
  getCartAction,
  deleteFromCartAction,
  emptyCartAction,
  setTotalPriceAction,
  setquantityAction,
  reducequantityAction,
  iccuresquantityAction,
} from "../../redux/reducers/cart";

function Payment() {
  //!-------------- reducer--------------
  const dispatch = useDispatch();
  const { token, isLoggedIn, totalPrice, cart, quantity, orders } = useSelector(
    (state) => {
      return {
        token: state.auth.token,
        isLoggedIn: state.auth.isLoggedIn,
        cart: state.cart.cart,
        quantity: state.cart.quantity,
        totalPrice: state.cart.totalPrice,
        orders: state.auth.orderId,
      };
    }
  );
  //!-------------- reducer--------------

  console.log("cart-------------------,",cart);
  const emptyCart = async () => {
    await axios
      .delete(
        "https://meraki-project-5-backend.herokuapp.com/cart/",

        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((result) => {
        dispatch(emptyCartAction());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateOrder = () => {
    const orderId = localStorage.getItem("orderId");
    console.log("orderId from localStorage",orderId);
    axios
      .put(
        `https://meraki-project-5-backend.herokuapp.com/order/`,
        {
          orderId: orderId,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createOrder = () => {
    axios
      .post(
        `https://meraki-project-5-backend.herokuapp.com/order/`,
        {},
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((result) => {
        console.log(result.data.result.insertId);
        // console.log("create order front end", result.);
        dispatch(orderAction(result.data.result.insertId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateProductSold=(product_id,sold,AvailableQuantity)=>{
    axios.put(`https://meraki-project-5-backend.herokuapp.com/products/update/product`,{
      product_id:product_id,
      sold:sold,
      AvailableQuantity:AvailableQuantity
    }).then((result)=>{
      console.log(result);

    }).catch((err)=>{
      console.log(err);
    })
  }

  const [product] = useState({
    name: "Ecma shop",
    price: totalPrice,
    description: "This is a product",
  });

  async function handleToken(token, addresses) {
    console.log(totalPrice);
    const response = await axios.post("https://meraki-project-5-backend.herokuapp.com/checkout", {
      token,
      product,
    });

    console.log(response.status);

    if (response.status === 200) {
      toast("Success! Check email for details", { type: "success" });
      console.log("success");
      cart.length&&cart.map((element,index)=>{
        updateProductSold(element.product_id,element.quantity+element.sold,element.AvailableQuantity-element.quantity)
      })
      updateOrder();
      emptyCart();
      createOrder();
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  return (
    <div className="payment_div">
     
  
        <div className="form-group container">
          <StripeCheckout
            className="center"
            stripeKey="pk_test_51L7FmeFUovKQAs7tzXDWBjxwe0bDN5TjP7Ymdw28krNO6i3HUVKoe3OvG1xtcRu8p4O9jQCvhZR9Gm0Bgx2aK2sC00oM8KfmIm"
            token={handleToken}
            amount={totalPrice}
            name="Ecma shop"
            billingAddress
            shippingAddress
          />

       
      </div>
    </div>
  );
}

export default Payment;
