import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/reducers/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./style.css";

const Product = () => {
  //! redux =========
  const dispatch = useDispatch();
  const [sorts, setSorts] = useState([]);
  const [arrayofPage, setArrayofPage] = useState([]);
  const [index, setIndex] = useState(0);
  const [numberOfPage, setNumberOfPage] = useState(0);
  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
  //! redux =========
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const notifyCart = () => toast("added successufully");
  const getAllProductNoLimit = () => {
    axios
      .get("https://meraki-project-5-backend.herokuapp.com/products")
      .then((result) => {
        setNumberOfPage(Math.ceil(result.data.result.length / 6));
        setArrayofPage(Array(Math.ceil(result.data.result.length / 12)).fill(0));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const gitAllProduct = () => {
    axios
      .get(
        `https://meraki-project-5-backend.herokuapp.com/products/pagination/${page}`
      )
      .then((result) => {
        setProducts(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToCart = async (id) => {
    if (!token) return alert("Please login to continue buying");
    const orderId = localStorage.getItem("orderId");

    await axios
      .post(
        `https://meraki-project-5-backend.herokuapp.com/cart`,
        {
          productId: id,
          quantity: 1,
          order_id: orderId,
        },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const sortFunction = (e) => {
    if (e == "high Price") {
      let sortedProduct = products.sort((a, b) => b.price - a.price);
      setSorts(sortedProduct);
    } else if (e == "low Price") {
      let sortedProduct = products.sort((a, b) => a.price - b.price);
      setSorts(sortedProduct);
    } else if (e == "Select") {
      setSorts(products);
    }
  };

  useEffect(gitAllProduct, [page]);
  useEffect(getAllProductNoLimit, []);

  return (
    <div className="main">
      <div className="sort">
        <h5>Sort By</h5>
        <select
          onClick={(e) => {
            sortFunction(e.target.value);
          }}
        >
          {sorts.length &&
            sorts.map((element, index) => {
              return (
                <div key={index}>
                  <p>{element.price}</p>
                </div>
              );
            })}
          <option>select</option>
          <option>high Price</option>
          <option>low Price</option>
        </select>
      </div>
      <div className="All_product">
        {products.length &&
          products.map((e, i) => {
            return (
              <div className="oneProductALL">
                <img src={e.image} alt="" />
                <h4 className="TitleAll">{e.title}</h4>
                <p>{e.price} JOD</p>
                <div className="Add">
                  {e.AvailableQuantity > 0 ? (
                    <button
                      className="add_cart"
                      onClick={() => {
                        addToCart(e.id);
                        notifyCart();
                      }}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <p>SoldOut</p>
                  )}
                  <button
                    className="view"
                    onClick={() => {
                      navigate(`/product/${e.id}`);
                    }}
                  >
                    View Product
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      {/* <div className="products">
        {products.length &&
          products.map((e, i) => {
            return (
              <div className="card">
                <ul className="ul">
                  <li>
                    <i></i>
                  </li>
                  <li>
                    <i></i>
                  </li>
                  <li>
                    <i></i>
                  </li>
                  <li>
                    <i></i>
                  </li>
                </ul>
                <img src={e.image} alt="" />
                <div className="con-text">
                  <h2>{e.title}</h2>
                  <p>{e.price} JOD</p>
                  <p>
                    
                    {e.AvailableQuantity > 0 ? (
                      <button
                        className="add_to_cart"
                        onClick={() => {
                          addToCart(e.id);
                          notifyCart();
                        }}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <p>SoldOut</p>
                    )}
                    <button
                      onClick={() => {
                        navigate(`/product/${e.id}`);
                      }}
                    >
                      View Product
                    </button>
                  </p>
                </div>
              </div>
            );
          })}
      </div> */}
      <div className="pagination">
        {page != 1 ? (
          <>
            <button
              onClick={() => {
                setPage(index - 1);
                setIndex(index - 1);
                gitAllProduct();
              }}
            >
              &laquo;
            </button>
          </>
        ) : (
          <></>
        )}
        {arrayofPage.map((element, index) => {
          return (
            <div key={index}>
              <button
                onClick={() => {
                  setPage(index + 1);
                  gitAllProduct();
                  setIndex(index + 1);
                }}
              >
                {index + 1}
              </button>
            </div>
          );
        })}

        {page != numberOfPage ? (
          <>
            <button
              onClick={() => {
                setPage(index + 1);
                setIndex(index + 1);

                gitAllProduct();
              }}
            >
              &raquo;
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default Product;
