import { configureStore } from "@reduxjs/toolkit";
import homePageReducer from "./ReduxReducer/homePageReduce";
import getEmployeeDetailsReducer from "./ReduxReducer/getEmployeeDetailReducer";

const reduxStore=configureStore({
    reducer:{
        homePageReducer,
        getEmployeeDetailsReducer
    }
});

export default reduxStore;