// import ("./style.css")
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popup } from "../popup";

import "./style.css";

import Payment from "../payment";

import {
  getCartAction,
  deleteFromCartAction,
  emptyCartAction,
  setTotalPriceAction,
  setquantityAction,
  reducequantityAction,
  iccuresquantityAction,
} from "../../redux/reducers/cart";

import StripeCheckout from "react-stripe-checkout";

import { toast } from "react-toastify";

const Cart = () => {
  //! redux =========
  const dispatch = useDispatch();

  const { token, isLoggedIn, cart, quantity } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      cart: state.cart.cart,
      quantity: state.cart.quantity,
    };
  });
  //! redux =========
  //?==============================
  const [test, setTest] = useState(false);
  const [test2, setTest2] = useState(false);
  const [subtotal, SetSubTotal] = useState(0);

  useEffect(() => {
    getCartItems();
  }, [quantity]);

  useEffect(() => {
    func();
  }, []);

  const getCartItems = async () => {
    await axios
      .get(`https://meraki-project-5-backend.herokuapp.com/cart`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(getCartAction(result.data.result));
        console.log(cart);
        console.log(result.data.result);
        let priceTotal = result.data.result.reduce((acc, element, index) => {
          return acc + element.price * element.quantity;
        }, 0);

        SetSubTotal(priceTotal);

        dispatch(setTotalPriceAction(priceTotal));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const func = async () => {
    await axios
      .get(`https://meraki-project-5-backend.herokuapp.com/cart`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(setquantityAction(result.data.result[0].AvailableQuantity));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addToCart = (id, quantity) => {
    if (!token) return alert("Please login to continue buying");
    const orderId = localStorage.getItem("orderId");
    console.log("add to cart orderid", orderId);
    axios
      .post(
        `https://meraki-project-5-backend.herokuapp.com/cart`,
        {
          productId: id,
          quantity: quantity,
          order_id: orderId,
        },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((result) => {
        console.log(result.data);

        getCartItems();
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const deleteItemsFromCart = async (id) => {
    await axios
      .delete(`https://meraki-project-5-backend.herokuapp.com/cart/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(deleteFromCartAction(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="cart_containerr">
      {cart.length ? (
        <div className="title_productt">
          <p>IMAGE</p>
          <p>NAME</p>
          <p>PRICE</p>
          <p>QUANTITY</p>
          <p>
            <p>AVAILABLE </p>
            <br></br>
            <p>QUANTITY</p>
          </p>

          <p>ACTIONS</p>
        </div>
      ) : (
        <></>
      )}

      {isLoggedIn ? (
        cart.length === 0 ? (
          <h1 className="empty">Your shopping cart is empty!</h1>
        ) : (
          cart.length &&
          cart.map((element, index) => {
            return (
              <div>
                <div className="product_detailss" key={index}>
                  <div className="img">
                    <img src={element.image} alt="product image" />
                  </div>

                  <div className="name">
                    <div>
                      <p className="product_titlee">
                        {element.title}
                        
                      </p>
                    </div>
                  </div>

                  <div className="price_product">
                    <p>{element.price * element.quantity}JOD</p>
                  </div>
                  <div className="product_quantity">
                    <p className="product-quantityy">{element.quantity}</p>
                  </div>
                  <div className="available_quantity">
                    <p>{quantity - 1}</p>
                  </div>

                  {element.AvailableQuantity === 0 ? (
                    <p>Sold Out</p>
                  ) : (
                    <div className="information_cartt">
                      <div className="action">
                        <button
                          className="decreess"
                          id={element.id}
                          onClick={(e) => {
                            element.AvailableQuantity !== quantity ? (
                              dispatch(iccuresquantityAction())
                            ) : (
                              <></>
                            );

                            element.quantity > 1 ? (
                              addToCart(element.id, -1)
                            ) : (
                              <></>
                            );
                          }}
                        >
                          -
                        </button>

                        <button
                          className="increasee"
                          id={element.id}
                          onClick={(e) => {
                            quantity - 1 !== 0 ? (
                              addToCart(element.id, 1)
                            ) : (
                              <></>
                            );

                            quantity - 1 === 0 ? (
                              <></>
                            ) : (
                              dispatch(reducequantityAction())
                            );
                          }}
                        >
                          +
                        </button>

                        <button
                          className="delete"
                          id={element.id}
                          onClick={(e) => {
                            setTest(true);
                          }}
                        >
                          ×
                        </button>

                        {/* //!=================== */}
                        {test ? (
                          <div className="popup">
                            <div className="popup-inner">
                              <h1>Delete Shop Cart</h1>
                              <p>Are you sure to delete the shopping cart</p>

                              <button
                                className="close-btn"
                                onClick={() => {
                                  deleteItemsFromCart(element.id);
                                  setTest(false);
                                }}
                              >
                                yes
                              </button>
                              <button
                                className="close-btn2"
                                onClick={() => {
                                  setTest(false);
                                }}
                              >
                                no
                              </button>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}

                        {/* //!=================== */}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )
      ) : (
        <h1>Please Login First</h1>
      )}

      {cart.length === 0 ? (
        <></>
      ) : (
        <>
          <h4 className="sub_total">TOTAL PRICE : {subtotal} JOD</h4>
          <div className="final">
            <Payment />
            <button
              className="empty_cart"
              onClick={(e) => {
                // emptyCart();
                setTest2(true);
              }}
            >
              Empty Cart
            </button>

            {/* //!=================== */}
            {test2 ? (
              <div className="popup">
                <div className="popup-inner">
                  <h1>Delete Product</h1>
                  <p>Are you sure to delete all products in thecart</p>

                  <button
                    className="close-btn"
                    onClick={() => {
                      emptyCart();
                      setTest2(false);
                    }}
                  >
                    yes
                  </button>
                  <button
                    className="close-btn2"
                    onClick={() => {
                      setTest2(false);
                    }}
                  >
                    no
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}

            {/* //!=================== */}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
