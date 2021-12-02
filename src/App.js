import React from 'react'
import {Routes, Route, useLocation, Navigate, useRoutes} from 'react-router-dom'
import './App.css';
import { AuthContext, fakeAuthProvider, useAuth } from './app/auth';
import routes from './app/routes';
import Home from './pages/home';
import Login from './pages/login';
import Overview from './pages/overview';


function AuthProvider({children}) {
  let [user, setUser] = React.useState(localStorage.getItem('user') ||  null);

  let signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      localStorage.setItem('user', newUser);
      callback();
    })
  }
  
  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      localStorage.setItem('user', null);
      callback();
    })
  }
  let value = {user, signin, signout}
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
function PublicPage() {
  return (
    <div>公共页面</div>
  )
}

function RequireAuth({children}) {
  let auth = useAuth();
  let location = useLocation();
  if (!auth.user) {
    return <Navigate to="/login" state={{from: location}}/>
  }
  return children
}

function App() {
  return (
    <AuthProvider>
      {useRoutes(routes)}
      {/* <Routes>
        <Route element={<Home/>}>
          <Route path="/" element={<Navigate to="/overview"/>}/>
          <Route path="/overview" 
            element={
              <RequireAuth>
                <Overview/>
              </RequireAuth>
            }
          />
        </Route>
        <Route path="/login" element={<Login/>}/>
      </Routes> */}
    </AuthProvider>
  );
}

export default App;
