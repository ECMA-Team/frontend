import LogGoogle from "../../components/loginGoogle";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/reducers/auth";
import { useNavigate } from "react-router-dom";
import { orderAction, setIsAdmainAction } from "../../redux/reducers/auth";

import("./style.css");

const Login = () => {
  const navigate = useNavigate();
  //!redux===============
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      orders: state.auth.orderId,
      isAdmin: state.auth.isAdmin,
    };
  });
  //!redux===============
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();

  const getLiveOrder = () => {
    axios
      .get(`https://meraki-project-5-backend.herokuapp.com/order/live/${email}`)
      .then((result) => {
        dispatch(orderAction(result.data.order[0].id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getRole = () => {
    axios
      .post(`https://meraki-project-5-backend.herokuapp.com/admin/users`, { email: email })
      .then((result) => {
        if (result.data.result[0].role == "ADMIN") {


          dispatch(setIsAdmainAction(true));

          navigate("/admin");
        } else {


          dispatch(setIsAdmainAction(false));
          navigate("/")
        }

      })
      .catch((err) => {
        console.log(err);
      });
  };
  const login = () => {
    axios
      .post("https://meraki-project-5-backend.herokuapp.com/login", { email, password })
      .then((result) => {
        setMessage("Login Successfuly");
        dispatch(loginAction(result.data.token));
        getLiveOrder();


        getRole();
        



      })
      .catch((err) => {
        console.log(err);

        setMessage(err.response.data.message);
      });
    // getRole();
  };

  return (
    <div className="loginn">


      <div className="loginDiv">
        <h2 className="titleR">Login Form</h2>
        <br></br>
        <input
          type={"email"}
          className="input1"
          placeholder="Enter Your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type={"password"}

          className="input2"
          placeholder="Enter Your Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button className="button" onClick={login}>
          Log in
        </button>
        <h1 className="ms">{message}</h1>
        <LogGoogle />
      </div>
    </div>

  );
};
export default Login;
