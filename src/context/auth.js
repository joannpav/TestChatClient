import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
  user: null
};

if (localStorage.getItem('jwtToken')) {
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

  const testing=decodedToken.exp;
  console.log(`decodedToken.exp * 1000 ${testing} `)
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
  } else {
    initialState.user = decodedToken;
    initialState.user.orgName = localStorage.getItem('orgName');
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {}
});

function authReducer(state, action) {
  console.log(`in authReducer, what is action ${JSON.stringify(action)} and what is state ${JSON.stringify(state)}`)  
  console.log(`in authReducer, what is payload ${action.payload}`);
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        orgName: action.payload.orgName
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null
      };      
    default:      
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {    
    localStorage.setItem('jwtToken', userData.token);
    localStorage.setItem('orgName', userData.orgName);
    console.log(`auth.js: login: ${JSON.stringify(userData)}`);
    dispatch({
      type: 'LOGIN',
      payload: userData
    });
  }

  function logout() {
    localStorage.removeItem('jwtToken');
    dispatch({ type: 'LOGOUT' });
  }

  return (    
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />    
  );
}

export { AuthContext, AuthProvider };