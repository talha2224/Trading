// reducers/adminReducer.js
const initialState = {
    
    admin: null,
    token: localStorage.getItem("adminToken") || null,
    isAuthenticated: !!localStorage.getItem("adminToken"),
    error: null,
    users: [],
    loading: false,
    createUserLoading: false
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

            case 'FETCH_USERS_REQUEST':
                return {
                  ...state,
                  loading: true,
                  error: null
                };
                
              case 'FETCH_USERS_SUCCESS':
                return {
                  ...state,
                  loading: false,
                  users: action.payload,
                  error: null
                };
                
              case 'FETCH_USERS_FAILURE':
                return {
                  ...state,
                  loading: false,
                  error: action.payload
                };
                
              case 'CREATE_USER_REQUEST':
                return {
                  ...state,
                  createUserLoading: true,
                  error: null
                };
                
              case 'CREATE_USER_SUCCESS':
                return {
                  ...state,
                  createUserLoading: false,
                  error: null
                };
                
              case 'CREATE_USER_FAILURE':
                return {
                  ...state,
                  createUserLoading: false,
                  error: action.payload
                };

        default:
            return state; // Return the current state for unknown actions
    }
};

export default adminReducer;