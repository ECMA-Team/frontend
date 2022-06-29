import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/reducers/auth";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./style.css";

const ProductMain = () => {
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
  const [category, setCategory] = useState([]);
  const [page, setPage] = useState(1);

  const getAllProductNoLimit = () => {
    axios
      .get("https://meraki-project-5-backend.herokuapp.com/products")
      .then((result) => {
        console.log({ all: result.data.result.length });
        console.log(Math.ceil(result.data.result.length / 6));
        setNumberOfPage(Math.ceil(result.data.result.length / 6));
        setArrayofPage(Array(Math.ceil(result.data.result.length / 6)).fill(0));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const notifyCart = () => toast("added successufully");
  const gitAllProduct = () => {
    axios
      .get(`https://meraki-project-5-backend.herokuapp.com/products/four/pagination/${page}`)
      .then((result) => {
        setProducts(result.data.result);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const addToCart = async (id) => {
    if (!token) return alert("Please login to continue buying");
    const orderId = localStorage.getItem("orderId")

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
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(token);
        console.log(err);
      });
  };

  const gitAllCategory = () => {
    axios
      .get(`https://meraki-project-5-backend.herokuapp.com/category/pagination/${page}`)
      .then((result) => {
        setCategory(result.data.result);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const sortFunction = (e) => {

    if (e == "high Price") {
      let sortedProduct = products.sort((a, b) => b.price - a.price);
      setSorts(sortedProduct);
      console.log("product", sortedProduct);
    } else if (e == "low Price") {
      let sortedProduct = products.sort((a, b) => a.price - b.price);
      setSorts(sortedProduct);
      console.log("product", sortedProduct);
    } else if (e == "Select") {
      setSorts(products);
      console.log("product", products);
    }
  };
  useEffect(gitAllCategory, [page]);
  useEffect(gitAllProduct, [page]);
  useEffect(getAllProductNoLimit, []);

  return (
    <div className="mainn">

      <p>NEW PRODUCTS</p>

      <div className="pro_main">

        {products.length &&
          products.map((e, i) => {
            return (
              <div className="product_main">



                <img onClick={() => {
                  navigate(`/product/${e.id}`);
                }} src={e.image} alt="" />
                <div className="innfo">
                  <h2>{e.title}</h2>


                  <p>{e.price} JOD</p>
                  {e.AvailableQuantity > 0 ? (<>
                  <button className="addcart"
                    onClick={() => {
                      addToCart(e.id);
                      notifyCart()
                    }}>Add to Cart</button>
                    
                    </>
                    
                    
                    ) : (<button className="Sold_out_productmain" style={{ backgroundColor: "red" }}>SoldOut</button>)}

                </div>
               

              </div>
            );
          })}

      </div>




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
export default ProductMain;
