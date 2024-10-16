import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import instance from "../AxiosInstance/axiosInstance";


const AdminHomePage=()=>{

    const homePageState=useSelector(state=>state.homePageReducer);
    const dispatch=useDispatch();
   
    const navigate = useNavigate()

    const [f_Image, setImg] = useState();

    const [emaivalidate, setEmailValidate] = useState();

    const [employeeDet, setEmployeeDet] = useState([]);

    const [errorMessage, setErrorMessage] = useState();

    const [editData, setEditData] = useState();

    useEffect(() => {
        async function getEmployeeDet() {
            const response = await instance.get("http://localhost:4000/GetEmployeeDetails");
            setEmployeeDet([...response.data.data]);
        }
        getEmployeeDet();
    }, [])

    const name = useRef();
    const email = useRef();
    const mobile = useRef();
    const designation = useRef();
    const gender = useRef();
    const course = useRef();
    const password = useRef();


    /*------Functions Starts-------*/

    //Image file upload function
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        convertToBase64(file).then((result) => {
            setImg(result);
        })
    }

    //Convert Image to base64 file Function
    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    //
    const createEmployee = async (e) => {
        e.preventDefault();

        try {
            const d = new Date();
            if (name.current.value != "" && email.current.value != "" && mobile.current.value != "" && designation.current.value != "" && gender.current.value != "" && course.current.value != "" && password.current.value != "" && f_Image != "") {
                const data = {
                    f_Id: Math.random(),
                    f_Image,
                    f_Name: name.current.value,
                    f_Email: email.current.value,
                    f_Mobile: mobile.current.value,
                    f_Designation: designation.current.value,
                    f_Gender: gender.current.value,
                    f_Course: course.current.value,
                    f_Password:password.current.value,
                    f_CreatedDate: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
                }

                const response = await instance.post("/CreateEmployee", data);
                if (response.data.message === "data added successfully") {
                    setErrorMessage("success");
                    setEmployeeDet((prev) => {
                        return [...prev, data]
                    })
                } else {
                    console.log(response.data.message)
                }
            } else {
                setErrorMessage("fieldsRequired")
            }



        } catch (e) {
            console.log(e)
        }

    }

    const validateEmail = (e) => {
        const email = e.target.value;

        if (validator.isEmail(email)) {
            setEmailValidate("Valid Email");
        } else {
            setEmailValidate("Enter valid Email!");
        }
    };

    async function editEmployee(id) {
        try {
            setDisplayContent("Employee Edit");
            employeeDet.forEach((val) => {
                if (val.f_Id === id) {
                    setEditData(val);
                }
            })
        } catch (e) {

        }
    }

    async function editEmployeeDet(e){
        e.preventDefault();
        try{
            
            const response=await axios.put("http://localhost:4000/EditEmployeeDet",editData);
            if(response.data.message==="updated successfully"){
                const editedData=employeeDet.map((val)=>{
                    if(val.f_Id===editData.f_Id){
                        return {
                            ...editData
                        }
                    }else{
                        return val
                    }
                })

                setEmployeeDet(editedData);
            }
        }catch(e){
            console.log(e)
        }
    }

    async function deletEmployee(id){
        try{
            const response=await axios.delete("http://localhost:4000/EditEmployeeDet/deleteEmp",{
                headers:{
                    id:id
                }
            });
            if(response.data.message==="data deleted success"){
                const deletedData=employeeDet.filter((val)=>{
                    if(val.f_Id!=id){
                        return val
                    }
                })
                setEmployeeDet(deletedData)
            }
        }catch(e){

        }
    }

    /*------Functions End-------*/


    return(
        <>
        <div className="d-flex justify-content-between p-3" style={{ backgroundColor: "rgb(222,234,246)", border: "1px solid black" }}>
            <a style={{ cursor: "pointer" }} onClick={() => dispatch({type:"adminDashBoard"})}>Home</a>
            <a style={{ cursor: "pointer" }} onClick={() => dispatch({type:"adminCreateEmployee"})}>Create Employee</a>
            <a>Employee Edit</a>
            <a style={{ cursor: "pointer" }} onClick={() => dispatch({type:"adminEmployeeList"})}>Employee List</a>
            <div>
                <a>{localStorage.getItem("userName")} - </a>
                <a style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Logout</a>
            </div>
        </div>
        <p style={{ backgroundColor: "yellow", fontSize: "25px" }}>{homePageState.Admin.content}</p>


        {/*----------- Dash Board Start------------*/}
        {homePageState.Admin.content === "DashBoard" && <h4 className="w-auto" style={{textAlign:"center", marginTop: "200px" }}>Welcome To Admin Panel</h4>}
        {/*----------- Dash Board End------------*/}


        {/*----------- Creat Employee form Start------------*/}
        {homePageState.Admin.content === "Create Employee" && <div className="w-50 ms-5 mt-5">
            <form onSubmit={createEmployee}>
                <div className="row w-100 mb-3">
                    <label className="col-3 form-label" htmlFor="Name">Name</label>
                    <input type="text" className="col form-control" id="Name" ref={name}></input>
                </div>

                <div className="row w-100 mb-3">
                    <label className="col-3 form-label" htmlFor="Email">Email</label>
                        <input type="text" className="col form-control" id="Email" ref={email} onChange={(e) => validateEmail(e)}></input>
                        {emaivalidate === "Enter valid Email!" && <sapn className="text-center text-danger">{emaivalidate}</sapn>}
                        {emaivalidate === "Valid Email" && <label className="text-center text-success">{emaivalidate}</label>}
                </div>

                <div className="row w-100 mb-3">
                    <label className="col-3 form-label" htmlFor="Mobile">Mobile Number</label>
                    <input type="number" className="col form-control" id="Mobile" ref={mobile}></input>
                </div>

                <div className="row w-100 mb-3">
                    <label className="col-3 form-label" htmlFor="Designation">Designation</label>

                    <select className="form-select col" aria-label="Default select example" id="Designation" ref={designation}>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>

                <div className="row w-100 mb-3">
                    <label className="col-3 form-label" htmlFor="gender">Gender</label>
                    <div className="col">

                        <div className="form-check">
                            <input className="form-check-input" type="radio" value="Male" id="male" ref={gender} />
                            <label className="form-check-label" htmlFor="male">
                                Male
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" value="Female" id="female" ref={gender} />
                            <label className="form-check-label" htmlFor="female">
                                Female
                            </label>
                        </div>

                    </div>
                </div>

                <div className="row w-100 mb-3">
                    <label className="col-3 form-label" htmlFor="course">Course</label>

                    <div className="col">

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="BSC" id="BSC" ref={course} />
                            <label className="form-check-label" htmlFor="BSC">
                                BSC
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="MCA" id="MCA" ref={course} />
                            <label className="form-check-label" htmlFor="MCA">
                                MCA
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="BCA" id="BCA" ref={course} />
                            <label className="form-check-label" htmlFor="BCA">
                                BCA
                            </label>
                        </div>

                    </div>
                </div>

                <div className="row w-100 mb-3">
                    <label className="col-3 form-label" htmlFor="imgupload">Img Upload</label>
                    <div className="col">
                    <input type="file" className="form-control" id="imgupload" accept='.jpeg, .png, .jpg' onChange={(e) => handleFileUpload(e)}></input>
                    {f_Image != "" && <img src={f_Image} width={50} className="mt-1"></img>}
                    </div>
                </div>

                <div className="row w-100 mb-3">
                    <label className="col-3 form-label" htmlFor="password">Password</label>
                    <input type="password" className="col form-control" id="password" ref={password}></input>
                </div>

                <div className="row w-100 mb-3">
                    <label className="col-3 form-label" htmlFor="imgupload"></label>

                    <div className="col">
                        <input type="submit" className="form-control btn btn-success" id="imgupload" value={"Submit"}></input>
                    </div>

                </div>
                {errorMessage === "fieldsRequired" && <label className="d-block text-center text-danger">Please fill all the required details</label>}
                {errorMessage === "success" && <label className="d-block text-center text-success">data added successfully</label>}

            </form>
        </div>}
        {/*----------- Creat Employee form End------------*/}


        {homePageState.Admin.content === "Employee Edit" && <div className="w-50 ms-5 mt-5">
            <form onSubmit={editEmployeeDet}>
                <div className="row w-100 mb-3">
                    <label className="col-3 form-label" htmlFor="Name">Name</label>
                    <input type="text" className="col form-control" id="Name" value={editData.f_Name} onChange={(e)=>setEditData((prev)=>{return {...prev,f_Name:e.target.value}})}></input>
                </div>

                <div className="row w-100 mb-3">
                    <label className="col-3 form-label" htmlFor="Email">Email</label>

                    <div className="col">
                        <input type="text" className="form-control" id="Email" onChange={(e) =>{
                            validateEmail(e);
                            setEditData((prev)=>{
                                return {...prev,f_Email:e.target.value}
                            })
                        
                        }} value={editData.f_Email}></input>
                        {emaivalidate === "Enter valid Email!" && <label className="text-center text-danger">{emaivalidate}</label>}
                        {emaivalidate === "Valid Email" && <label className="text-center text-success">{emaivalidate}</label>}
                    </div>

                </div>

                <div className="row w-100 mb-3">
                    <label className="col-3 form-label" htmlFor="Mobile">Mobile Number</label>
                    <input type="number" className="col form-control" id="Mobile" value={editData.f_Mobile} onChange={(e)=>{
                        setEditData((prev)=>{
                            return {...prev,f_Mobile:e.target.value}
                        })
                    }}></input>
                </div>

                <div className="row w-100 mb-3">
                    <label className="col-3 form-label" htmlFor="Designation">Designation</label>

                    <select className="form-select col" aria-label="Default select example" id="Designation" value={editData.f_Designation} onChange={(e)=>{
                        setEditData((prev)=>{
                            return {...prev,f_Designation:e.target.value}
                        })
                    }}>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>

                <div className="row w-100 mb-3">
                    <label className="col-3 form-label" htmlFor="gender">Gender</label>
                    <div className="col">

                        <div className="form-check">
                            {editData.f_Gender === "Male" ? <><input className="form-check-input" type="radio" value="Male" id="male" checked onChange={(e)=>{
                                setEditData((prev)=>{
                                    return {...prev,f_Gender:e.target.value}
                                })
                            }}/>
                                <label className="form-check-label" htmlFor="male">
                                    Male
                                </label> </> : <><input className="form-check-input" type="radio" value="Male" id="male" onChange={(e)=>{
                                setEditData((prev)=>{
                                    return {...prev,f_Gender:e.target.value}
                                })
                            }} />
                                <label className="form-check-label" htmlFor="male">
                                    Male
                                </label></>}

                        </div>

                        <div className="form-check">
                            {editData.f_Gender === "Female" ? <><input className="form-check-input" type="radio" value="female" id="female" onChange={(e)=>{
                                setEditData((prev)=>{
                                    return {...prev,f_Gender:e.target.value}
                                })
                            }}checked />
                                <label className="form-check-label" htmlFor="female">
                                    Female
                                </label> </> : <><input className="form-check-input" type="radio" value="Female" id="female" onChange={(e)=>{
                                setEditData((prev)=>{
                                    return {...prev,f_Gender:e.target.value}
                                })
                            }} />
                                <label className="form-check-label" htmlFor="female">
                                    Female
                                </label></>}
                        </div>

                    </div>
                </div>

                <div className="row w-100 mb-3">
                    <label className="col-3 form-label" htmlFor="course">Course</label>

                    <div className="col">

                        <div className="form-check">
                            {editData.f_Course === "BSC" ? <><input className="form-check-input" type="checkbox" value="BSC" id="BSC" checked />
                                <label className="form-check-label" htmlFor="BSC">
                                    BSC
                                </label> </> : <><input className="form-check-input" type="checkbox" value="BSC" id="BSC" ref={course} />
                                <label className="form-check-label" htmlFor="BSC">
                                    BSC
                                </label></>}

                        </div>

                        <div className="form-check">

                            {editData.f_Course === "MCA" ? <>
                                <input className="form-check-input" type="checkbox" value="MCA" id="MCA" ref={course} checked />
                                <label className="form-check-label" htmlFor="MCA">
                                    MCA
                                </label>
                            </> : <><input className="form-check-input" type="checkbox" value="MCA" id="MCA" ref={course} />
                                <label className="form-check-label" htmlFor="MCA">
                                    MCA
                                </label></>}

                        </div>

                        <div className="form-check">
                            {editData.f_Course==="BCA" ? <>
                            <input className="form-check-input" type="checkbox" value="BCA" id="BCA" checked/>
                            <label className="form-check-label" htmlFor="BCA">
                                BCA
                            </label>
                            </> :<>                               
                            <input className="form-check-input" type="checkbox" value="BCA" id="BCA" />
                            <label className="form-check-label" htmlFor="BCA">
                                BCA
                            </label></>}
                            
                        </div>

                    </div>
                </div>

                <div className="row w-100 mb-3">
                    <label className="col-3 form-label" htmlFor="imgupload">Img Upload</label>
                    <input type="file" className="col form-control" id="imgupload" accept='.jpeg, .png, .jpg' onChange={(e) => handleFileUpload(e)}></input>
                </div>

                <div className="row w-100 mb-3">
                    <label className="col-3 form-label" htmlFor="imgupload"></label>

                    <div className="col">
                        {editData.f_Image != "" && <img src={editData.f_Image} width={50} className="mb-3"></img>}
                        <input type="submit" className="form-control btn btn-success" id="imgupload" value={"Submit"}></input>
                    </div>

                </div>
                {errorMessage === "fieldsRequired" && <label className="d-block text-center text-danger">Please fill all the required details</label>}
                {errorMessage === "success" && <label className="d-block text-center text-success">data added successfully</label>}

            </form>
        </div>}

        {homePageState.Admin.content === "Employee List" && <div className="container">
            <table className="tabel" border={1}>
                <thead style={{ backgroundColor: "rgb(189,214,238)" }}>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th colSpan={3} style={{ textAlign: "end" }}>Search</th>
                        <th colSpan={4}><input type="text" className="w-100"></input></th>
                    </tr>
                    <tr>
                        <th style={{ border: "1px solid black" }}>Id</th>
                        <th style={{ border: "1px solid black" }}>Image</th>
                        <th style={{ border: "1px solid black" }}>Name</th>
                        <th style={{ border: "1px solid black" }}>Email</th>
                        <th style={{ border: "1px solid black" }}>Mobile No</th>
                        <th style={{ border: "1px solid black" }}>Designation</th>
                        <th style={{ border: "1px solid black" }}>Gender</th>
                        <th style={{ border: "1px solid black" }}>Course</th>
                        <th style={{ border: "1px solid black" }}>Created Date</th>
                        <th style={{ border: "1px solid black" }}>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {employeeDet.length > 0 && <>{employeeDet.map(val => (
                        <tr key={val.f_Id}>
                            <td style={{ border: "1px solid black" }}>{val.f_Id}</td>
                            <td style={{ border: "1px solid black" }}><img src={val.f_Image} alt="..." width={70}></img></td>
                            <td style={{ border: "1px solid black" }}>{val.f_Name}</td>
                            <td style={{ border: "1px solid black" }}><a href="#">{val.f_Email}</a></td>
                            <td style={{ border: "1px solid black" }}>{val.f_Mobile}</td>
                            <td style={{ border: "1px solid black" }}>{val.f_Designation}</td>
                            <td style={{ border: "1px solid black" }}>{val.f_Gender}</td>
                            <td style={{ border: "1px solid black" }}>{val.f_Course}</td>
                            <td style={{ border: "1px solid black" }}>{val.f_CreatedDate}</td>
                            <td style={{ border: "1px solid black" }}><a style={{ cursor: "pointer" }} onClick={() => editEmployee(val.f_Id)}>Edit - </a><a style={{ cursor: "pointer" }} onClick={()=>deletEmployee(val.f_Id)}>Delete</a></td>
                        </tr>
                    ))}</>}
                </tbody>
            </table>
        </div>}


    </>
    )
}

export default AdminHomePage;