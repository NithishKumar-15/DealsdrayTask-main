const employeeDetState = [];

const getEmployeeDetailsReducer = (state = employeeDetState, action) => {
    switch (action.type) {
        case "setEmployeeDet":
            return [
                ...action.data
            ]
        case "addNewEmployeeDet":
            return [
                ...state,
                action.data
            ]
        case "editedData":
            return [...action.data]
        case "deletData":
            return [...action.data]
        default:
            return state
    }
}
export default getEmployeeDetailsReducer;