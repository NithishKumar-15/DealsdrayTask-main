const homePageState = {
    Admin: {
        page: true,
        content: "DashBoard"
    },
    Employee: {
        page: false,
        content: "DashBoard"
    }
}

const homePageReducer = (state = homePageState, action) => {

    switch (action.type) {
        case "pageSetEmp":
            return {
                ...state,
                Admin: {
                    ...state.Admin,
                    page: false
                },
                Employee: {
                    ...state.Employee,
                    page: true
                }

            }
        case "pageSetAdmin":
            return {
                ...state,
                Admin: {
                    ...state.Admin,
                    page: true
                },
                Employee: {
                    ...state.Employee,
                    page: false
                }
            }
        case "adminDashBoard":
            return {
                ...state,
                Admin: {
                    ...state.Admin,
                    content: "DashBoard"
                }
            }
        case "adminCreateEmployee":
            return {
                ...state,
                Admin: {
                    ...state.Admin,
                    content: "Create Employee"
                }
            }
        case "adminEditEmployee":
            return {
                ...state,
                Admin: {
                    ...state.Admin,
                    content: "Employee Edit"
                }
            }
        case "adminEmployeeList":
            return {
                ...state,
                Admin: {
                    ...state.Admin,
                    content: "Employee List"
                }
            }

        case "empdashboard":
            return {
                ...state,
                Employee: {
                    ...state.Employee,
                    content: "DashBoard"
                }
            }
        case "empChatRoom":
            return {
                ...state,
                Employee: {
                    ...state.Employee,
                    content: "Chat Room"
                }
            }
        case "empProfile":
            return {
                ...state,
                Employee: {
                    ...state.Employee,
                    content: "Employee Profile"
                }
            }
        case "resetHomePage":
            return homePageState

        default:
            return state

    }

}

export default homePageReducer;