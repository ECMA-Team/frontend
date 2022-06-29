import { createSlice } from "@reduxjs/toolkit";

export const users = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    // payload :array of users [users]
    getUsersAction: (state, action) => {
      state.users = action.payload;
    },
 //payload :{id}    
    addToUsersAction: (state, action) => {
        state.users = state.users.map((e) => {
            if (e.id == action.payload.id) {
              return action.payload.neUser;
            }
            return e;
      })},
    // payload: id
    deleteFromUsers: (state, action) => {
      state.users = state.users.filter((element) => {
        return element.id != action.payload;
      });
    },
    // payload: role

    updateProductAction: (state, action) => {
      state.users = state.users.map((e) => {
        if (e.id == action.payload.id) {
          return action.payload.newUsers;
        }
        return e;
      });
    },
  },
});

export const { getUsersAction, addToUsersAction, deleteFromUsers,updateProductAction } =
users.actions;

export default users.reducer;
