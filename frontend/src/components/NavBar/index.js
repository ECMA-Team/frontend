import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../redux/reducers/auth";
import { setShoeAction } from "../../redux/reducers/brand";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { AiOutlinePoweroff, AiOutlineSearch ,} from "react-icons/ai";
import { FiLogIn,FiLogOut} from "react-icons/fi";


import { getSearchAction } from "../../redux/reducers/sreach";
import Getbrand from "../getbrand";

import "./style.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Check, setCheck] = useState(false);

  const [searchArray, setsearchArray] = useState([]);

  const { isLoggedIn, search, products, brands, category, show } = useSelector(
    (state) => {
      return {
        isLoggedIn: state.auth.isLoggedIn,
        search: state.search.search,
        products: state.products.products,
        brands: state.brands.brands,
        category: state.category.category,
        show: state.brands.show,
      };
    }
  );
  // const Check=false
  const searchFunction = (searchInput) => {
    if (searchInput.length === 0) {
      setsearchArray([]);
      setCheck(false);
    } else {
      axios
        .get(`https://meraki-project-5-backend.herokuapp.com/products`)
        .then((result) => {
          console.log(result);
          const search1 = result.data.result.filter((element, index) => {
            return element.title.includes(searchInput);
          });
          if (search1.length === 0) {
            setCheck(false);
          } else {
            setCheck(true);
          }
          setsearchArray(search1);
          
        })
        .catch((err) => {
          console.log(err);
        });
    }

  };
console.log(searchArray);
  return (
    <div className="navv">
      <div className="navbar">
        {/* //!icon */}
        <i
          onClick={() => {
            dispatch(setShoeAction(!show));
          }}
          className="first_icon"
          class="fa fa-bars"
          aria-hidden="true"
        ></i>
        {/* //!logo */}
        <img
          className="logo_img"
          src="https://res.cloudinary.com/hudhud/image/upload/v1655496474/maxqgc69/ECMA_vxqmns.jpg"
        />
        {/* //! search */}

        {
          <div className="navbarsearch">
            <form>
            <input
            type="search"
              id="serxchinput"
              placeholder="Search.."
              className="searchss"
              name="search"
              onChange={(e) => {
                searchFunction(e.target.value);
              }}
            />
  <button type="submit">Search</button>
</form>
            {Check ? (
              <div className="navbar_section">
                {searchArray.length &&
                  searchArray.map((element, index) => {
                    if (searchArray.length !== 0) {
                      return (
                        <div
                          className="SERCHa"
                          onClick={(e) => {
                            navigate(`/product/${element.id}`);
                            setsearchArray([]);
                            setCheck(false);
                          }}
                        >
                          <img
                            className="Serch_img"
                            src={element.image}
                            alt="image product"
                          />

                          <p className="Serch_title">{element.title}</p>
                        </div>
                      );
                    } else {
                      return <></>;
                    }
                  })}
              </div>
            ) : (
              <></>
            )}
          </div>
        }
        {/* //!all product  */}
        <Link className="All_Product_nav" to="product">
          All Product
        </Link>

        {/* //! login & register & cart & logout */}
        {isLoggedIn ? (
          <>
            <a
              className="logout"
              onClick={() => {
                dispatch(logoutAction());
                navigate("/");
              }}
            >

              <AiOutlinePoweroff/>
            </a>
            <Link className="cart" to="/cart">
              <i class="fa fa-cart-plus" aria-hidden="true"></i>
            </Link>
          </>
        ) : (
          <>
            <Link className="login_link" to="/login">
            <FiLogIn/>
            </Link>
            <Link className="register_link" to="/register">
              SignUp
            </Link>
          </>
        )}
      </div>
      <div className="added">
      <i
          onClick={() => {
            dispatch(setShoeAction(!show));
          }}
          className="first_icon"
          class="fa fa-bars"
          aria-hidden="true"
          
        ></i>
        <a href="/">HOME</a>
        <a href="/contact">CONTACT</a>
        <a href="/privacy-policy">PRIVACY-POLICY</a>
        <a href="/about">ABOUT</a>
      </div>
    </div>
  );
};

export default Dashboard;
