const employeeProfileState={

};

const employeeProfilereducer=(state=employeeProfileState,action)=>{
    switch(action.type){
        case "addProfile":
            return{
                ...action.data
            }
        default: 
        return state
    }
}

export default employeeProfilereducer;