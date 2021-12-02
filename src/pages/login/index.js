import React from 'react'
import {Routes, Route, Link, useNavigate, useLocation} from 'react-router-dom'
import { useAuth} from '../../app/auth';

const Login = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from  = location.state?.from?.pathName || '/';

  function handleSubmit (event) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("username");

    auth.signin(username, () => {
      navigate(from, {replace: true});
    })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{" "}
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login