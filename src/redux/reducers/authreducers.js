// authReducer.js
const initialState = {
    loading: false,
    token: null,
    user: null,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      // Handle REGISTER actions
      case "auth/registerUser/pending":
        return {
          ...state,
          loading: true,
          error: null,
        };
      case "auth/registerUser/fulfilled":
        return {
          ...state,
          loading: false,
          token: action.payload.token, // Update token
          user: action.payload.user, // Update user data
          error: null,
        };
      case "auth/registerUser/rejected":
        return {
          ...state,
          loading: false,
          error: action.payload, // Update error message
        };

        
        case 'auth/forgotPassword/pending':
            return {
              ...state,
              loading: true,
              error: null,
            };
          case 'auth/forgotPassword/fulfilled':
            return {
              ...state,
              loading: false,
              error: null,
            };
          case 'auth/forgotPassword/rejected':
            return {
              ...state,
              loading: false,
              error: action.payload,
            };
          


            
            case 'auth/resetPassword/pending':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'auth/resetPassword/fulfilled':
      return {
        ...state,
        loading: false,
        error: null,
      };
    case 'auth/resetPassword/rejected':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    
  
      // Handle other actions (LOGIN, LOGOUT, etc.)
      default:
        return state;
    }
  };
  
  export default authReducer;