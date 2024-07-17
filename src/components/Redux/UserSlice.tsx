import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../Utils/Constants";

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser_Redux(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    deleteUser_Redux(state, action: PayloadAction<string>) {
      state.users = state.users.filter((user) => user.email !== action.payload);
    },
  },
});

console.log("user slice", userSlice);

// Configure store
const store = configureStore({
  reducer: {
    users: userSlice.reducer,
  },
});

export const { addUser_Redux, deleteUser_Redux } = userSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
