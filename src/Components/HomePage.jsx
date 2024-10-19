
import AdminHomePage from "./AdminHomePage";
import EmployeeHomePage from "./EmployeeHomePage";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



const HomePage = () => {
    
    const homePageState=useSelector(state=>state.homePageReducer);

    const navigate=useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("token")===null){
            navigate("/")
        }
    },[])


    return (
        <>
        {homePageState.Admin.page ? <AdminHomePage></AdminHomePage> :  <EmployeeHomePage homePageState={homePageState}></EmployeeHomePage>}
        </>
    )
}

export default HomePage;