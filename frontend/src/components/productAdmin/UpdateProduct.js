import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import products, {
  setProductsAction,
  addProductAction,
  updateProductAction,
  deleteProductAction,
} from "../../redux/reducers/products";
import { useEffect } from "react";
import { useState } from "react";
import Upload from "../upload";

const UpdateProductAdmin = () => {
  const [test, setTest] = useState(false);
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [sub_category_id, setSub_Category_id] = useState("");

  //! redux =========
  const dispatch = useDispatch();

  const { token, isLoggedIn, users, products, cloudinary } = useSelector(
    (state) => {
      return {
        token: state.auth.token,
        isLoggedIn: state.auth.isLoggedIn,
        products: state.products.products,
        cloudinary: state.cloudinary.cloudinary,
      };
    }
  );
  const navigate = useNavigate();
  const notifyEdit = () => toast("Edited successfully");
  const updateProduct = () => {
    axios
      .put(
        `https://meraki-project-5-backend.herokuapp.com/products/${id}`,
        {
          title: title,
          description: description,
          price: price,
          image: cloudinary,
          category_id: category_id,
          sub_category_id: sub_category_id,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((result) => {
        dispatch(updateProductAction(id));
        notifyEdit();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="UpdateProductAdmin">
      
      <div className="input_containerAA">
        <h5 className="titleH5">Title</h5>
        <input
          type="text"
          className="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <h5 className="descriptionProduct">Description</h5>
        <input
          type="text"
          className="Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <h5 className="priceProduct">Price</h5>
        <input
          type="number"
          className="Price"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
      </div>
      <div className="image_container">
        <h5> add new Picture</h5>
        <Upload />
        <button
        className="but_add_pro"
        onClick={() => {
          setTest(true);
        }}
      >
        Edit Product
      </button>
      </div>


      

      {/* //!=================== */}
      {test ? (
        <div className="popup">
          <div className="popup-inner">
            <h1>Update Product</h1>
            <p>Are you sure to Update Product</p>

            <button
              className="close-btn"
              onClick={() => {
                updateProduct();
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
  );
};

export default UpdateProductAdmin;
