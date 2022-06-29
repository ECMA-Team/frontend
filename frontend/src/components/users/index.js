import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsersAction,
  addToUsersAction,
  deleteFromUsers,
  updateProductAction,
} from "../../redux/reducers/users";
import { FaTrash } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./style.css";

const UsersComponent = () => {
  const [test, setTest] = useState(false);
  //! redux =========
  const dispatch = useDispatch();

  const { token, isLoggedIn, users } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      users: state.users.users,
    };
  });
  //! redux =========
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers();
  }, []);
  const notifyEdit = () => toast("Edited successfully");
  const getAllUsers = () => {
    axios
      .get(`https://meraki-project-5-backend.herokuapp.com/admin/users`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(getUsersAction(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteUserAdmin = (id) => {
    axios
      .delete(`https://meraki-project-5-backend.herokuapp.com/admin/users/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(deleteFromUsers(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUserAdmin = (id) => {
    axios
      .put(`https://meraki-project-5-backend.herokuapp.com/admin/users/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        getAllUsers()
        notifyEdit();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  
  return (
    <div className="UsersComponent">
      <h3>Users Table</h3>
      
      <br></br>
      

      <table id="usersT">
        <tr>
          <th>#</th>
          <th>User Name </th>
          <th>Email</th>
          <th>Register Date</th>
          <th>Last Login </th>
          <th>Role</th>
          <th className="thAction">Actions</th>
        </tr>

        {users.length &&
          users.map((element, index) => {
            return (
              <>
                <tr>
                  <td>{index+1}</td>
                  <td>{element.firstName }</td>
                  <td>{element.email}</td>
                  <td>
                    {new Date(element.created_at).toLocaleString("es-CL")}
                  </td>
                  <td>
                     {new Date(element.userLoginTime).toLocaleString("es-CL")}
                  </td>
                 

                  <td>{element.role}</td>

                  <td className="ActionsCont"
                    onClick={() => {
                      updateUserAdmin(element.id);
                    }}
                  >
                    
                    <button className="Update"
                      onClick={() => {
                        updateUserAdmin(element.id);
                      }}
                    >
                      <FaUserEdit/>  Make Admin
                    </button>
                    
                  

                    <button className="Delete"
                      onClick={ () => {
                        // deleteUserAdmin(element.id);
                        // console.log("in button" ,element.id);
                         setTest(true)

                          {/* //!=================== */}
                          
 


                        
                      }}
                    >
                      <FaTrash/>  Delete User
                    </button>


 {/* //!=================== */}
 {test ? (
        <div className="popup">
          <div className="popup-inner">
            <h1>Delete User</h1>
            <p>Are you sure to delete user</p>
 
            <button
              className="close-btn"
              onClick={() => {
                console.log("in popup------",element.id);
                deleteUserAdmin(element.id);
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
              </>
            );
          })}
      </table>
    </div>
  );
};


export default UsersComponent;
