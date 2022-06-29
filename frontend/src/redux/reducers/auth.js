import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || "",
    isLoggedIn: localStorage.getItem("token") ? true : false,
    orderId:localStorage.getItem("orderId")|| "",
    isAdmin: localStorage.getItem("TEST")||false,
    openPopup:false,
  },
  reducers: {
    // payload :token
    loginAction: (state, action) => {
      localStorage.setItem("token", action.payload);
      state.token = action.payload;
      state.isLoggedIn = true;
    },

    logoutAction: (state, action) => {
      localStorage.clear();
      state.token = null;
      state.isLoggedIn = false;
      state.isAdmin=false
    },

    orderAction:(state,action)=>{
      localStorage.setItem("orderId", action.payload);
      state.orderId = action.payload;      
    }
    ,
    setIsAdmainAction:(state , action)=>{      
      localStorage.setItem("TEST", action.payload)
      state.isAdmin=action.payload
    },
    setOpenPopupAction:(state , action)=>{
      state.openPopup=action.payload
    }
  },
});
export const { logoutAction, loginAction ,orderAction ,setIsAdmainAction , setOpenPopupAction} = auth.actions;

export default auth.reducer;
