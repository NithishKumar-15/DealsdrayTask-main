import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const EmployeeHomePage = () => {

    const homePageReducer=useSelector(state=>state.homePageReducer);


    const dispatch=useDispatch();
     
    const navigate = useNavigate();
    return (
        <>
            <div className="d-flex justify-content-between p-3" style={{ backgroundColor: "rgb(222,234,246)", border: "1px solid black" }}>
                <a style={{ cursor: "pointer" }} onClick={()=>dispatch({type:"empdashboard"})}>Home</a>
                <a style={{ cursor: "pointer" }} onClick={()=>dispatch({type:"empChatRoom"})}>Chat Room</a>
                <a style={{ cursor: "pointer" }} onClick={()=>dispatch({type:"empAssignTask"})}>Assigned Task</a>
                <div>
                    <a>{localStorage.getItem("userName")} - </a>
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

        {homePageReducer.Employee.content==='Assigned Task'  &&  <div className="w-50 mx-auto mt-5">
                <h3>Tasks</h3>
                <hr></hr>
                <span style={{ fontSize: '20px' }} className="h6">Task Name : </span><span style={{ fontSize: '20px' }}>Nav</span>
                <h5 className="mt-3">Description :</h5>
                <p style={{textAlign:"justify"}}>Socket.IO is a library that enables real-time, two-way communication between a server and a client. It can be used for a variety of applications, including: Instant messaging, Multi-user collaboration, Real-time analytics, File sharing, and Notifications.
                    How to use socket.io with Node.js – Node.js Socket.io ...
                    Socket.IO works by establishing a connection between the client and the server using a WebSocket, HTTP long-polling, or WebTransport. The connection is then upgraded to the best available method, which is usually a WebSocket</p>
            <button className="btn btn-secondary">Task Completed</button>
            <hr></hr>
            </div>}
        </>
    )
}

export default EmployeeHomePage;