import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import instance from "../AxiosInstance/axiosInstance";
import { useEffect } from "react";

const Login = () => {

    const [message, setMessage] = useState();

    useEffect(()=>{
        localStorage.clear();
    },[])

    //User State admin or employee
    const homePagaeState=useSelector(state=>state.homePageReducer);
    const dispatch=useDispatch();

    const userName = useRef();
    const password = useRef();

    const navigate=useNavigate();

    /*---------functions Start-------------*/

    //Function to Login
    const loginFunction = async (e) => {
        e.preventDefault();

        if (message != null) {
            setMessage();
        }
       
        if (userName.current.value != "" && password.current.value != "") {
            if(homePagaeState.Admin.page){
                const data={
                    name:userName.current.value,
                    password:password.current.value
                }
    
                const response=await instance.post("/AdminLogin",data);
    
                if(response.data.message==="Login successful"){
                    localStorage.setItem("token",response.data.token);
                    localStorage.setItem("userName",userName.current.value);
                    navigate("/Home")
                }else if(response.data.message=="user not found"){
                    setMessage("user not found invalid userName or password")
                }
            }else{

            }

        } else {
            setMessage("Please Enter all the required filelds");
        }
    }

    //Function to set user state for login
    const setTheUserLogin=()=>{
        if(homePagaeState.Admin.page){
           dispatch({type:"pageSetEmp"})
        }else{
            dispatch({type:"pageSetAdmin"})
        }
    }

    /*---------functions End-------------*/

    return (
        <div className="container">
            <div className="w-50 border" style={{ marginTop: "200px", marginLeft: "300px" }}>
                {homePagaeState.Admin.page ? <h3 style={{ backgroundColor: "yellow" }}>Admin Login</h3> : <h3 style={{ backgroundColor: "yellow" }}>Employee Login</h3>}
                
                <form className="p-3" onSubmit={loginFunction}>
                    <div className="row w-100">
                        <label className="col-3 form-label" htmlFor="formUserName">User Name</label>
                        <input type="text" className="col form-control" id="formUserName" ref={userName}></input>
                    </div>

                    <br></br>

                    <div className="row w-100">
                        <label className="col-3 form-label" htmlFor="formPassword">Password</label>
                        <input type="password" className="col form-control" id="formPassword" ref={password}></input>
                    </div>

                    <br></br>

                    <input type="submit" value={"submit"} className="btn btn-success w-100 mb-3"></input>

                    {message != "" && <label className="d-block text-center text-danger">{message}</label>}

                    {homePagaeState.Admin.page ? <a className="d-block text-center" style={{cursor:"pointer"}} onClick={setTheUserLogin}>Admin Login</a> : <a className="d-block text-center" style={{cursor:"pointer"}} onClick={setTheUserLogin}>Employee Login</a>}
                </form>
                
            </div>
        </div>
    )
}
export default Login;