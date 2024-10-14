import { useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [message, setMessage] = useState();

    const userName = useRef();
    const password = useRef();

    const navigate=useNavigate();


    const loginFunction = async (e) => {
        e.preventDefault();

        if (message != null) {
            setMessage();
        }
       
        if (userName.current.value != "" && password.current.value != "") {
            const data={
                name:userName.current.value,
                password:password.current.value
            }

            const response=await axios.post("http://localhost:4000/Login",data);

            if(response.data.message==="Login successful"){
                localStorage.setItem("userName",userName.current.value);
                navigate("/Home")
            }else if(response.data.message=="user not found"){
                setMessage("user not found invalid userName or password")
            }

            // user not found invalid userName or password
        } else {
            setMessage("Please Enter all the required filelds");
        }
    }

    return (
        <div className="container">
            <div className="w-50 border" style={{ marginTop: "200px", marginLeft: "300px" }}>
                <h3 style={{ backgroundColor: "yellow" }}>Login</h3>
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

                </form>
            </div>
        </div>
    )
}
export default Login;