import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";

const store=configureStore({
    reducer:{
        todoReducer:todoSlice
    }
})
export default store