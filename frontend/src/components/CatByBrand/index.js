import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style.css"
const CatByBrand = () => {
  const navigate = useNavigate();
  const { brand } = useParams();
  const [allCat, setAllCat] = useState([]);

  


  const func = () => {
    axios
      .get(`https://meraki-project-5-backend.herokuapp.com/filter/display/category/${brand}`)
      .then((result) => {
        console.log(result.data.result);
        setAllCat(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };




  useEffect(func, [brand]);




  return (
    <div className="all_category">
      {allCat.length &&
        allCat.map((element, index) => {
          return (
            <div key={index} className="categorydiv">
              <img className="img_category"
                onClick={() => {
                  navigate(`PRO/${brand}/${element.category}`);
                }}
                src={`${element.img}`}
              ></img>
              <p className="name_category">{element.category}</p>
            </div>
          );
        })}
    </div>
  );
};

export default CatByBrand;
