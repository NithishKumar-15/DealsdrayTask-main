import { configureStore } from "@reduxjs/toolkit";
import homePageReducer from "./ReduxReducer/homePageReduce";

const reduxStore=configureStore({
    reducer:{
        homePageReducer,
    }
});

export default reduxStore;