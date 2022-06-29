import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCloudinaryAction,
  addToCloudinaryAction,
} from "../../redux/reducers/cloudinary";
import "./style.css"
function Upload() {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async () => {
    // e.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "maxqgc69");
    setLoading(true);
    await axios
      .post(`https://api.cloudinary.com/v1_1/hudhud/image/upload`, data)
      .then((result) => {
        console.log(result.data.secure_url);
        setImage(result.data.secure_url);
        dispatch(addToCloudinaryAction(result.data.secure_url));
        setLoading(true);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="upload">
       {!loading ? <div style={{background:"none"}}><p></p></div> : <img className="img_cloudenary" src={image} style={{ width: "300px" }} />}
     


      <input
      placeholder="Upload an image"
        type="file"
        name="file"
        
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
       <button 
        onClick={(e) => {
          uploadImage(e);
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default Upload;
