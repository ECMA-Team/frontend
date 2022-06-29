import { useNavigate } from "react-router-dom";
import { Chart } from "../chart";
import { useDispatch, useSelector } from "react-redux";
import Brand from "../brand/beands";
import { useEffect } from "react";
import("./style.css");
const AdminDashbord = () => {
  const navigate = useNavigate();
  //! redux =========
  const dispatch = useDispatch();

  const { isAdmin, token, isLoggedIn, users } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      users: state.users.users,
      isAdmin: state.auth.isAdmin
    };
  });
  //! redux =========

useEffect (()=>{
if (!isAdmin) {
  navigate("/")
}
},[])
  
  return (
    <div className="AdminDash">

      {isAdmin ? (<>  <h2 style={{ fontFamily: "cursive" }}>📊 Dashboard</h2>
        <hr></hr>
        <Chart /></>) : (<></>)};
    </div>
  );
};

export default AdminDashbord;
