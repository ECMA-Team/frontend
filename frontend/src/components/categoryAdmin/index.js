import axios from "axios";
import Upload from "../upload";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryAction,
  addToCategoryAction,
  deleteFromCategory,
} from "../../redux/reducers/categoryAdmin";
import { FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import("./style.css");

const CategoryAdmin = () => {
  const [test, setTest] = useState(false);
  const [image, setImage] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [brand, setBrand] = useState("");
  //! redux =========
  const dispatch = useDispatch();

  const { token, isLoggedIn, category, cloudinary, brands } = useSelector(
    (state) => {
      return {
        token: state.auth.token,
        isLoggedIn: state.auth.isLoggedIn,
        category: state.category.category,
        cloudinary: state.cloudinary.cloudinary,
        brands: state.brands.brands,
      };
    }
  );
  console.log(brand);
  //! redux =========
  const navigate = useNavigate();
  const notifyAdd = () => toast("Edited successfully");
  const addCategoryAdmin = (categoryName) => {
    axios
      .post(
        `https://meraki-project-5-backend.herokuapp.com/category`,
        { category: categoryName, img: cloudinary, brand_id: brand },
        { headers: { authorization: `Bearer ${token}` } }
      )
      // img
      .then((result) => {
        dispatch(
          addToCategoryAction({
            id: result.data.result.insertId,
            category: categoryName,
            img: cloudinary,
            brand_id: brand,
            is_deleted: 0,
          })
        );
        notifyAdd();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addSubCategoryAdmin = (subCategory) => {
    axios
      .post(
        `https://meraki-project-5-backend.herokuapp.com/category/sub`,
        { sub_category: subCategory },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategoryAdmin = () => {
    axios
      .get(`https://meraki-project-5-backend.herokuapp.com/category`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(getCategoryAction(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCategoryAdmin = (id) => {
    axios
      .delete(`https://meraki-project-5-backend.herokuapp.com/category/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(deleteFromCategory(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategoryAdmin();
  }, []);

  return (
    <div className="BrandAdmin">
      <div className="create_Brand">
        <div className="inputDiv">
          
          <div className="brand_Name">
            <h3>🗄 Add Category</h3>
            <Upload />
            <h6>Title</h6>
            <input
              className="brandInput"
              placeholder="category Name"
              onChange={(e) => {
                setCategoryName(e.target.value);
              }}
            />
            <h6>Brand</h6>
            <select
              onClick={(e) => {
                setBrand(e.target.value);
              }}
            >
              <option value="0">Select</option>
              {brands &&
                brands.map((element, index) => {
                  return (
                    <>
                      <option value={element.id}>{element.brand}</option>
                    </>
                  );
                })}
            </select>
          </div>
          <button
            className="add_brand"
            onClick={() => {
              addCategoryAdmin(categoryName);
            }}
          >
            Add Category{" "}
          </button>
        </div>
      </div>

      <div className="category_contener">
        <h2>🗄 Category Table</h2>
        <hr />
        <table id="adminT">
          <tr>
            <th>#</th>
            <th>Category Image</th>
            <th>Category Name</th>
            <th>Brand</th>

            <th>Actions</th>
          </tr>

          {category.length &&
            category.map((element, index) => {
              console.log(element);
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={element.img}
                      style={{ width: "100px", aspectRatio: "1/1.25" }}
                    />
                  </td>
                  <td>{element.category}</td>
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
                          <h1>Delete Category</h1>
                          <p>Are you sure to delete category</p>

                          <button
                            className="close-btn"
                            onClick={() => {
                              deleteCategoryAdmin(element.id);
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

export default CategoryAdmin;
