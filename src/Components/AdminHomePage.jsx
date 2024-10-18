import { useReducer } from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import instance from "../AxiosInstance/axiosInstance";


const AdminHomePage = () => {

    //redux reducers
    const homePageState = useSelector(state => state.homePageReducer);
    const employeeDetailsState = useSelector(state => state.getEmployeeDetailsReducer);
    const dispatch = useDispatch();

    //Reducer dispatch function for useReducer
    const statesDispatchFun = (state, action) => {
        switch (action.type) {
            case "Male":
                return {
                    ...state,
                    gender: "Male"
                }
            case "Female":
                return {
                    ...state,
                    gender: "Female"
                }
            case "BSC":
                return {
                    ...state,
                    course: "BSC"
                }
            case "MCA":
                return {
                    ...state,
                    course: "MCA"
                }
            case "BCA":
                return {
                    ...state,
                    course: "BCA"
                }
            case "Reset":
                return state
            default:
                return state
        }
    }
    //States Handeling reducer
    const [states, stateDispatch] = useReducer(statesDispatchFun, {
        gender: "",
        course: "",
    })

    const navigate = useNavigate();

    const [f_Image, setImg] = useState();

    const [emaivalidate, setEmailValidate] = useState();

    const [errorMessage, setErrorMessage] = useState();

    const [editEmp, setEditEmp] = useState({
        f_Name: "",
        f_Designation: "",
        f_Email: "",
        f_Mobile: "",
    });


    useEffect(() => {
        async function getEmployeeDet() {
            const response = await instance.get("http://localhost:4000/GetEmployeeDetails");
            dispatch({ type: "setEmployeeDet", data: response.data.data })
        }
        getEmployeeDet();
    }, [])


    //Create employee useRef
    const name = useRef();
    const email = useRef();
    const mobile = useRef();
    const designation = useRef();
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
            if (name.current.value != "" && email.current.value != "" && mobile.current.value != "" && designation.current.value != "" && states.gender != "" && states.course != "" && password.current.value != "" && f_Image != "") {
                const data = {
                    f_Id: Math.random(),
                    f_Image,
                    f_Name: name.current.value,
                    f_Email: email.current.value,
                    f_Mobile: mobile.current.value,
                    f_Designation: designation.current.value,
                    f_Gender: states.gender,
                    f_Course: states.course,
                    f_Password: password.current.value,
                    f_CreatedDate: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
                }

                const response = await instance.post("/CreateEmployee", data);
                if (response.data.message === "data added successfully") {
                    setErrorMessage("success");
                    stateDispatch({ type: "Reset" })
                    dispatch({ type: "addNewEmployeeDet", data })
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

    //Edit data function set the value to edit
    async function editEmployee(id) {
        try {
            dispatch({ type: "adminEditEmployee" })
            employeeDetailsState.forEach((val) => {
                if (val.f_Id === id) {
                    if (val.f_Gender === "Male") {
                        stateDispatch({ type: "Male" })
                    } else {
                        stateDispatch({ type: "Female" })
                    }

                    if (val.f_Course === "BCA")
                        stateDispatch({ type: "BCA" });
                    else if (val.f_Course === "BSC")
                        stateDispatch({ type: "BSC" });
                    else if (val.f_Course === "MCA")
                        stateDispatch({ type: "MCA" });

                    setImg(val.f_Image)
                    setEditEmp(val)
                }
            })
        } catch (e) {

        }
    }

    //Function to edit data in redux store and backend
    async function editEmployeeBackEnd(e) {
        e.preventDefault();
        try {
            const data = {
                ...editEmp,
                f_Gender: states.gender,
                f_Course: states.course,
                f_Image
            }

            const response = await instance.put("EditEmployeeDet", data);
            if (response.data.message === "updated successfully") {
                const editedData = employeeDetailsState.map((val) => {
                    if (val.f_Id === data.f_Id) {
                        return data
                    } else {
                        return val;
                    }
                })
                dispatch({ type: "editedData", data: editedData })
                dispatch({ type: "adminEmployeeList" });
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function deletEmployee(id) {
        try {
            const response = await instance.delete("/deleteEmp", {
                headers: {
                    id: id
                }
            });
            if (response.data.message === "data deleted success") {
                const deletedData = employeeDetailsState.filter((val) => {
                    if (val.f_Id != id) {
                        return val
                    }
                })
                dispatch({ type: "deletData", data: deletedData })
            }
        } catch (e) {

        }
    }

    /*------Functions End-------*/


    return (
        <>
            <div className="d-flex justify-content-between p-3" style={{ backgroundColor: "rgb(222,234,246)", border: "1px solid black" }}>
                <a style={{ cursor: "pointer" }} onClick={() => dispatch({ type: "adminDashBoard" })}>Home</a>
                <a style={{ cursor: "pointer" }} onClick={() => dispatch({ type: "adminCreateEmployee" })}>Create Employee</a>
                <a>Employee Edit</a>
                <a style={{ cursor: "pointer" }} onClick={() => dispatch({ type: "adminEmployeeList" })}>Employee List</a>
                <div>
                    <a>{localStorage.getItem("userName")} - </a>
                    <a style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Logout</a>
                </div>
            </div>
            <p style={{ backgroundColor: "yellow", fontSize: "25px" }}>{homePageState.Admin.content}</p>


            {/*----------- Dash Board Start------------*/}
            {homePageState.Admin.content === "DashBoard" && <h4 className="w-auto" style={{ textAlign: "center", marginTop: "200px" }}>Welcome To Admin Panel</h4>}
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
                                <input className="form-check-input" type="radio" value="Male" id="male" checked={states.gender === "Male"} onChange={(e) => stateDispatch({ type: "Male" })} />
                                <label className="form-check-label" htmlFor="male">
                                    Male
                                </label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" type="radio" value="Female" id="female" checked={states.gender === 'Female'} onChange={(e) => stateDispatch({ type: "Female" })} />
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
                                <input className="form-check-input" type="checkbox" value="BSC" id="BSC" checked={states.course === "BSC"} onChange={(e) => stateDispatch({ type: "BSC" })} />
                                <label className="form-check-label" htmlFor="BSC">
                                    BSC
                                </label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="MCA" id="MCA" checked={states.course === "MCA"} onChange={(e) => stateDispatch({ type: "MCA" })} />
                                <label className="form-check-label" htmlFor="MCA">
                                    MCA
                                </label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="BCA" id="BCA" checked={states.course === "BCA"} onChange={(e) => stateDispatch({ type: "BCA" })} />
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


            {/*----------- Edit Employee form Start------------*/}
            {homePageState.Admin.content === "Employee Edit" && <div className="w-50 ms-5 mt-5">
                <form onSubmit={editEmployeeBackEnd}>
                    <div className="row w-100 mb-3">
                        <label className="col-3 form-label" htmlFor="editName">Name</label>
                        <input type="text" className="col form-control" id="editName" value={editEmp.f_Name} onChange={(e) => setEditEmp((prev) => { return { ...prev, f_Name: e.target.value } })}></input>
                    </div>

                    <div className="row w-100 mb-3">
                        <label className="col-3 form-label" htmlFor="editEmail">Email</label>
                        <input type="text" className="col form-control" id="editEmail" value={editEmp.f_Email} onChange={(e) => { validateEmail(e); setEditEmp((prev) => { return { ...prev, f_Email: e.target.value } }) }}></input>
                        {emaivalidate === "Enter valid Email!" && <sapn className="text-center text-danger">{emaivalidate}</sapn>}
                        {emaivalidate === "Valid Email" && <label className="text-center text-success">{emaivalidate}</label>}
                    </div>

                    <div className="row w-100 mb-3">
                        <label className="col-3 form-label" htmlFor="editMobile">Mobile Number</label>
                        <input type="number" className="col form-control" id="editMobile" value={editEmp.f_Mobile} onChange={(e) => setEditEmp((prev) => { return { ...prev, f_Mobile: e.target.value } })}></input>
                    </div>

                    <div className="row w-100 mb-3">
                        <label className="col-3 form-label" htmlFor="editDesignation">Designation</label>

                        <select className="form-select col" aria-label="Default select example" id="editDesignation" value={editEmp.f_Designation} onChange={(e) => setEditEmp((prev) => { return { ...prev, f_Designation: e.target.value } })}>
                            <option value="HR">HR</option>
                            <option value="Manager">Manager</option>
                            <option value="Sales">Sales</option>
                        </select>
                    </div>

                    <div className="row w-100 mb-3">
                        <label className="col-3 form-label" htmlFor="editGender">Gender</label>
                        <div className="col">

                            <div className="form-check">
                                <input className="form-check-input" type="radio" value="Male" id="editMale" checked={states.gender === "Male"} onChange={(e) => stateDispatch({ type: "Male" })} />
                                <label className="form-check-label" htmlFor="editMale">
                                    Male
                                </label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" type="radio" value="Female" id="editFemale" checked={states.gender === 'Female'} onChange={(e) => stateDispatch({ type: "Female" })} />
                                <label className="form-check-label" htmlFor="editFemale">
                                    Female
                                </label>
                            </div>

                        </div>
                    </div>

                    <div className="row w-100 mb-3">
                        <label className="col-3 form-label" htmlFor="editCourse">Course</label>

                        <div className="col">

                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="BSC" id="editBSC" checked={states.course === "BSC"} onChange={(e) => stateDispatch({ type: "BSC" })} />
                                <label className="form-check-label" htmlFor="editBSC">
                                    BSC
                                </label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="MCA" id="editMCA" checked={states.course === "MCA"} onChange={(e) => stateDispatch({ type: "MCA" })} />
                                <label className="form-check-label" htmlFor="editMCA">
                                    MCA
                                </label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="BCA" id="editBCA" checked={states.course === "BCA"} onChange={(e) => stateDispatch({ type: "BCA" })} />
                                <label className="form-check-label" htmlFor="editBCA">
                                    BCA
                                </label>
                            </div>

                        </div>
                    </div>

                    <div className="row w-100 mb-3">
                        <label className="col-3 form-label" htmlFor="editImgupload">Img Upload</label>
                        <div className="col">
                            <input type="file" className="form-control" id="editImgupload" accept='.jpeg, .png, .jpg' onChange={(e) => handleFileUpload(e)}></input>
                            {f_Image != "" && <img src={f_Image} width={50} className="mt-1"></img>}
                        </div>
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
            {/*----------- Edit Employee form End------------*/}

            {/*-----------Employee List form Start------------*/}
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
                        {employeeDetailsState.length > 0 && <>{employeeDetailsState.map(val => (
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
                                <td style={{ border: "1px solid black" }}><a style={{ cursor: "pointer" }} onClick={() => editEmployee(val.f_Id)}>Edit - </a><a style={{ cursor: "pointer" }} onClick={() => deletEmployee(val.f_Id)}>Delete</a></td>
                            </tr>
                        ))}</>}
                    </tbody>
                </table>
            </div>}
            {/*-----------Employee List form End------------*/}


        </>
    )
}

export default AdminHomePage;