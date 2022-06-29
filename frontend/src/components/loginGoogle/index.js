import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { orderAction ,setIsAdmainAction} from "../../redux/reducers/auth";

import { loginAction } from "../../redux/reducers/auth";

import axios from "axios";
const LogGoogle = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();

  //!redux===============
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      isAdmin: state.auth.isAdmin,
    };
  });
  //!redux===============
  
  const getRole = () => {
    axios
      .post(`https://meraki-project-5-backend.herokuapp.com/admin/users`, { email: email })
      .then((result) => {
        if (result.data.result[0].role == "ADMIN") {
        dispatch(setIsAdmainAction(true));
        }else{
            dispatch(setIsAdmainAction(false));  
        }
        
      })
      .catch((err) => {
        console.log(err);
      });
  };





  const getLiveOrder = (email) => {
    axios
      .get(`https://meraki-project-5-backend.herokuapp.com/order/live/${email}`)
      .then((result) => {
        if(result.data.order.length===0){
          dispatch(orderAction(result.data.orderId))
        }else{
          dispatch(orderAction(result.data.order[0].id));
        }
        console.log(result);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const responseGoogle = (response) => {
    console.log(response.profileObj.email);
    axios
      .post("https://meraki-project-5-backend.herokuapp.com/loginGoogle", {
        firstName: response.profileObj.email,
        lastName: response.profileObj.familyName,
        email: response.profileObj.email,
      })
      .then((result) => {
        console.log("result-------",result);
        setEmail(response.profileObj.email)
        dispatch(loginAction(result.data.token));
        getLiveOrder(response.profileObj.email);
        
        navigate("/");

      })
      .catch((err) => {
        console.log({ err });
      });
      getRole()
  };

  return (
    <div>
      <GoogleLogin
        clientId="994328639474-ub85dkgodp4vrm5nvfaemiklfko5jpt9.apps.googleusercontent.com"
        buttonText="Log in with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default LogGoogle;
