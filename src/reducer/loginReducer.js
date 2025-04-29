export const initialState = {
  isAuthenticated: false,
};

export function loginReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false };
    case 'INIT':
      return { ...state, isAuthenticated: action.payload };
    default:
      return state;
  }
}