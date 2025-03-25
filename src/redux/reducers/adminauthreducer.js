const initialState = {
    admin: null,
    token: localStorage.getItem("adminToken") || null,
    isAuthenticated: !!localStorage.getItem("adminToken"), // Initialize based on localStorage
    error: null,
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_ADMIN_SUCCESS':
            return {
                ...state,
                admin: action.payload, // Save the registered admin details
                error: null, // Clear any previous errors
            };

        case 'REGISTER_ADMIN_FAILURE':
            return {
                ...state,
                admin: null, // Clear admin details on failure
                error: action.payload, // Save the error message
            };

        case 'LOGIN_SUCCESS':
            console.log("Admin Reducer - Login Success Payload:", action.payload);
            return {
                ...state,
                admin: action.payload.admin, // Ensure this contains `role: "admin"`
                token: action.payload.token,
                isAuthenticated: true, // Set isAuthenticated to true
                error: null,
            };

        case 'LOGIN_FAILURE':
            return {
                ...state,
                admin: null,
                token: null,
                isAuthenticated: false,
                error: action.payload,
            };

        case 'LOGOUT':
            return {
                ...state,
                admin: null,
                token: null,
                isAuthenticated: false,
                error: null,
            };

        default:
            return state; // Return the current state for unknown actions
    }
};

export default adminReducer;