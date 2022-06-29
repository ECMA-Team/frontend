import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getBrandsAction,
  addToBrandAction,
  deleteFromBrand,
} from "../../redux/reducers/brand";
import {
  getCloudinaryAction,
  addToCloudinaryAction,
} from "../../redux/reducers/cloudinary";
import { FaTrash } from "react-icons/fa";

import Upload from "../upload";
import "./style.css";
const notifyAdd = () => toast("Added successfully");
const BrandAdmin = () => {
  const [test, setTest] = useState(false);
  //! redux =========
  const dispatch = useDispatch();
  const [brandName, setBrandName] = useState("");
  const [image, setImage] = useState("");

  const { token, isLoggedIn, category, brands, cloudinary } = useSelector(
    (state) => {
      return {
        token: state.auth.token,
        isLoggedIn: state.auth.isLoggedIn,
        brands: state.brands.brands,
        cloudinary: state.cloudinary.cloudinary,
      };
    }
  );
  console.log(brands);
  //! redux =========
  const navigate = useNavigate();

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

  const deleteBrandAdmin = (id) => {
    axios
      .delete(`https://meraki-project-5-backend.herokuapp.com/brand/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(deleteFromBrand(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addBrandAdmin = () => {
    axios
      .post(
        `https://meraki-project-5-backend.herokuapp.com/brand`,
        { brand: brandName, image: cloudinary },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((result) => {
        console.log(result);
        dispatch(
          addToBrandAction({
            id: result.data.result.insertId,
            brand: brandName,
            image: image,
            is_deleted: 0,
          })
        );
        notifyAdd();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBrandAdmin();
  }, []);

  return (
    <div className="BrandAdmin">
      <div className="create_Brand">
        <div className="inputDiv">
          <div className="brand_Name">
            <h3>Add Brand</h3>
            <Upload />
            <h6> Brand Name :</h6>
            <input
              type="text"
              className="brandInput"
              placeholder="Brand Name"
              onChange={(e) => {
                setBrandName(e.target.value);
              }}
            />
          </div>

          <button
            className="add_brand"
            onClick={() => {
              addBrandAdmin();
            }}
          >
            Add Brand{" "}
          </button>
        </div>
      </div>

      <div className="category_contener">
        <h2>🗄 Brand Table</h2>
        <hr />
        <table id="adminT">
          <tr>
            <th>#</th>
            <th>Brand image </th>
            <th>Brand Name </th>
            <th>Actions</th>
          </tr>

          {brands.length &&
            brands.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img className="tableImage" src={element.image} />
                  </td>
                  <td>{element.brand}</td>
                  <td>
                    <button
                      className="DeleteBrand"
                      onClick={() => {
                        setTest(true);
                      }}
                    >
                      <FaTrash /> Delete
                    </button>

                    {/* //!=================== */}
                    {test ? (
                      <div className="popup">
                        <div className="popup-inner">
                          <h1>Delete Brand</h1>
                          <p>Are you sure you will delete the brand?</p>

                          <button
                            className="close-btn"
                            onClick={() => {
                              deleteBrandAdmin(element.id);
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
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
};

export default BrandAdmin;
