import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderAction } from "../../redux/reducers/auth";
import ("./style.css")


const Register = () => {
 //!redux===============
 const dispatch = useDispatch();
 const {token,isLoggedIn,orders} = useSelector((state) => {
   return {
     token: state.auth.token,
     isLoggedIn: state.auth.isLoggedIn,
     orders:state.auth.orderId
   };
 });
 //!redux===============

  const [firstName, setfirstname] = useState("");
  const [lastName, setlastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const register = () => {
    axios
      .post("https://meraki-project-5-backend.herokuapp.com/register", {
        firstName,
        lastName,
        email,
        password,
      })
      .then((result) => {
        console.log("REGISTER RESULT",result);
        setMessage(result.data.massage);
        dispatch(orderAction(result.data.orderId))
      })
      .catch((err) => {
        setMessage(err.response.data.massage);
      });
  };

  return (
    <div className="registerCont">

    <div className="register">
      <h2 className="titleR">Register Form</h2>
      <br></br>
      <input
      type={"text"}

        placeholder="Enter First Name"
        onChange={(e) => {
          setfirstname(e.target.value);
        }}
      />

      <input
      type={"text"}

        placeholder="Enter Last Name"
        onChange={(e) => {
          setlastname(e.target.value);
        }}
      />

      <input
      type={"email"}
        placeholder="Enter Your email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
      type={"password"}

        placeholder="Enter Your Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      
      <h1 className="mss">{message}</h1>
      <button onClick={register}>Sign Up</button>
    </div>
    </div>

  );
};
export default Register;
