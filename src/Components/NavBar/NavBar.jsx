import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import {useDispatch, useSelector} from 'react-redux'
import { logOutUser } from "../../redux/apiRequest";
import { createAxios } from "../../createInstance";
import {logOutSuccess, loginSuccess} from '../../redux/authSlice'

const NavBar = () => {
  const user= useSelector((state)=> state.auth.login.currentUser)
  console.log(user)
  const dispatch= useDispatch()
  const navigate = useNavigate()
  const axiosJWT= createAxios(user, dispatch, loginSuccess)
  const handleLogOut= async()=>{
    await logOutUser(user?.accessToken, dispatch, navigate, axiosJWT)
  }

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home"> Home </Link>
      {user? (
        <>
        <p className="navbar-user">Hi, <span> {user.user.userName}  </span> </p>
        <Link to="/logout" className="navbar-logout" onClick={handleLogOut}> Log out</Link>
        </>
      ) : (    
        <>
      <Link to="/login" className="navbar-login"> Login </Link>
      <Link to="/register" className="navbar-register"> Register</Link>
      </>
)}
    </nav>
  );
};

export default NavBar;
