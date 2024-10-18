import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const EmployeeHomePage = () => {

    const homePageReducer=useSelector(state=>state.homePageReducer);
    const employeeProfilereducer=useSelector(state=>state.employeeProfilereducer)

    const dispatch=useDispatch();
     
    const navigate = useNavigate();
    return (
        <>
            <div className="d-flex justify-content-between p-3" style={{ backgroundColor: "rgb(222,234,246)", border: "1px solid black" }}>
                <a style={{ cursor: "pointer" }} onClick={()=>dispatch({type:"empdashboard"})}>Home</a>
                <a style={{ cursor: "pointer" }} onClick={()=>dispatch({type:"empChatRoom"})}>Chat Room</a>
                <a style={{ cursor: "pointer" }} onClick={()=>dispatch({type:"empProfile"})}>Employee Profile</a>
                <div>
                    <a>{employeeProfilereducer.f_Name} - </a>
                    <a style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Logout</a>
                </div>
            </div>
            <p style={{ backgroundColor: "yellow", fontSize: "25px" }}>{homePageReducer.Employee.content}</p>

            {homePageReducer.Employee.content==='DashBoard' && <h4 className="w-auto" style={{ textAlign:"center", marginTop: "200px" }}>Welcome To Employee Page</h4>}
            {/* <h4 className="w-auto" style={{ textAlign:"center", marginTop: "200px" }}>Welcome To Employee Page</h4> */}

            {homePageReducer.Employee.content==='Chat Room'  && <div className="container mt-5" style={{height:"70vh"}}>
            <div className="row justify-content-center h-100">
         
            <div className="col-lg-5 h-100">
            <h4 className="text-center m-0" style={{backgroundColor: "yellow"}}>Welcome To Chat room</h4>
                <div className="w-100 h-75" style={{backgroundColor: "rgb(222,234,246)"}}>

                </div>
                <input className="w-75" placeholder="Send Message"></input><button className="w-25">Send</button>
            </div>

            </div>
        </div>}

            {/* <div className="container mt-5" style={{height:"70vh"}}>
            <div className="row justify-content-center h-100">
         
            <div className="col-lg-5 h-100">
            <h4 className="text-center m-0" style={{backgroundColor: "yellow"}}>Welcome To Chat room</h4>
                <div className="w-100 h-75" style={{backgroundColor: "rgb(222,234,246)"}}>

                </div>
                <input className="w-75" placeholder="Send Message"></input><button className="w-25">Send</button>
            </div>

            </div>
        </div> */}

        {homePageReducer.Employee.content==='Employee Profile'  &&  <div className="w-50 mx-auto mt-5">
                <h2 className="text-center">Profile</h2>
                <img src={employeeProfilereducer.f_Image} alt="..." width={150} height={150} className="rounded-circle mx-auto d-block"></img>
                <hr></hr>
                <span style={{ fontSize: '20px' }} className="h6">Name : </span><span style={{ fontSize: '20px' }}>{employeeProfilereducer.f_Name}</span><br></br><br></br>
                <span style={{ fontSize: '20px' }} className="h6">Email : </span><span style={{ fontSize: '20px' }}>{employeeProfilereducer.f_Email}</span><br></br><br></br>
                <span style={{ fontSize: '20px' }} className="h6">Mobile : </span><span style={{ fontSize: '20px' }}>{employeeProfilereducer.f_Mobile}</span><br></br><br></br>
                <span style={{ fontSize: '20px' }} className="h6">Designation : </span><span style={{ fontSize: '20px' }}>{employeeProfilereducer.f_Designation}</span><br></br><br></br>
                <span style={{ fontSize: '20px' }} className="h6">Gender : </span><span style={{ fontSize: '20px' }}>{employeeProfilereducer.f_Gender}</span><br></br><br></br>
                <span style={{ fontSize: '20px' }} className="h6">Course : </span><span style={{ fontSize: '20px' }}>{employeeProfilereducer.f_Course}</span><br></br>


            <hr></hr>
            </div>}
        </>
    )
}

export default EmployeeHomePage;