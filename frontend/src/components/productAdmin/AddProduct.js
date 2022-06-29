import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import products, {
  setProductsAction,
  addProductAction,
  updateProductAction,
  deleteProductAction,
} from "../../redux/reducers/products";
import Upload from "../upload";
import {
  getCloudinaryAction,
  addToCloudinaryAction,
} from "../../redux/reducers/cloudinary";
import "./style.css";

const AddProductAdmin = () => {
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [brandOnClick, setBrandOnClick] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, seQuantity] = useState(0);

  const [image, setImage] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [sub_category_id, setSub_Category_id] = useState("");
  const [brand_id, setBrand_id] = useState("");

  //! redux =========
  const dispatch = useDispatch();

  const { token, isLoggedIn, users, products, cloudinary, category, brands } =
    useSelector((state) => {
      return {
        token: state.auth.token,
        isLoggedIn: state.auth.isLoggedIn,
        products: state.products.products,
        cloudinary: state.cloudinary.cloudinary,
        brands: state.brands.brands,
        category: state.category.category,
      };
    });

  //! redux =========
  const notifyAdd = () => toast("Edited successfully");




  const creatProduct = () => {
    axios
      .post(
        `https://meraki-project-5-backend.herokuapp.com/products`,
        {
          title: title,
          description: description,
          price: price,
          image: cloudinary,
          category_id: category_id,
          sub_category_id: sub_category_id,
          brand_id: brand_id,
          AvailableQuantity: quantity,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((result) => {
        console.log(result);
        dispatch(addProductAction(result));
        notifyAdd();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const func = () => {
    axios
      .get(`https://meraki-project-5-backend.herokuapp.com/filter/display/category/id/${brand_id}`)
      .then((result) => {
        setCategoryFilter(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(func, [brand_id]);
  return (
    <div className="AddProductAdmin">
      <div className="UpdateProductAdmin">
        
        <div className="input_container">
        
            <h5 className="titleH5">Title</h5>
          <input
            placeholder="  Title"
            type="text"
            className="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          
          
          <h5 className="descriptionProduct">Description</h5>
          <textarea
            placeholder="  Description"
            type="text"
            className="des_input"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

          
          
          <h5 className="priceProduct">Price</h5>
          <input
            placeholder="  Price"
            type="number"
            className="Price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />

          
          
          <h5 className="QuantityProduct">Quantity</h5>
          <input
            placeholder="  Quantity"
            type="number"
            className="Quantity"
            onChange={(e) => {
              seQuantity(e.target.value);
            }}
          />

         
          
          <h5 className="brandProduct">Brand</h5>

          <select className="productsss"
            onClick={(e) => {
              
              setBrand_id(e.target.value);
              func();
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

          
             

          <h5 className="CategoryProduct">Category</h5>
          <select className="Category"
            onClick={(e) => {
              setCategory_id(e.target.value);
            }}
          >
            <option value="0">Select</option>
            {categoryFilter &&
              categoryFilter.map((element, index) => {
                return (
                  <>
                    <option value={element.id}>{element.category}</option>
                  </>
                );
              })}
          </select>
              

          <h5 className="subCategoryProduct">sub Category</h5>
          <input className="subCat"
            type="number"
            
            onChange={(e) => {
              setSub_Category_id(e.target.value);
            }}
          />
           

        </div>
       
        <div className="image_container">
          <Upload />
          <button
          className="but_add_pro"
          onClick={() => {
            creatProduct();
          }}
        >
          Create Product
        </button>
        </div>

      </div>
    </div>
  );
};
export default AddProductAdmin;
