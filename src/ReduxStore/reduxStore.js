import { configureStore } from "@reduxjs/toolkit";
import homePageReducer from "./ReduxReducer/homePageReduce";
import getEmployeeDetailsReducer from "./ReduxReducer/getEmployeeDetailReducer";
import employeeProfilereducer from "./ReduxReducer/employeeProfileReducer";

const reduxStore = configureStore({
    reducer: {
        homePageReducer,
        getEmployeeDetailsReducer,
        employeeProfilereducer
    }
});

export default reduxStore;