import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

const ProCB = () => {
  const { token, isLoggedIn } = useSelector((state) => {
   

    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
  const navigate = useNavigate();
  const { brand, category } = useParams();
  const [allPCat, setPAllCat] = useState([]);

  const func = () => {
    console.log(`yyyyyyyyyyyyyyyyyyyyy${ brand}uuuuuuuuuuu${category}`);
    axios
      .post(`https://meraki-project-5-backend.herokuapp.com/filter/display/proCB`, {
        brand,
        category,
      })
      .then((result) => {
        setPAllCat(result.data.result);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addToCart = async (id) => {
    if (!token) return alert("Please login to continue buying");
    await axios
      .post(
        `https://meraki-project-5-backend.herokuapp.com/cart`,
        {
          productId: id,
          quantity: 1,
        },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(func, [category]);

  
  return (
    <div className="products">
    {allPCat.length &&
      allPCat.map((e, i) => {
        return (
          <div className="card">
          <ul className="ul">
          <li>
            <i>{e.price} $</i>
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
            <p>{e.description} <button      className="add_to_cart"
              onClick={() => {
               addToCart(e.id);
              }}>Add to Cart</button>
              <button onClick={() => {
              navigate(`/product/${e.id}`);
             }}>View Product</button></p>
          </div>
          </div>
      
          );
        })}
    </div>
  );
};

export default ProCB;
