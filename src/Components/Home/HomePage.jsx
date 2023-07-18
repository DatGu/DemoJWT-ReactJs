import { useEffect } from "react";
import "./home.css";
import { deleteUser, getAllUsers } from "../../redux/apiRequest";
import {useDispatch} from 'react-redux'
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom'
import { loginSuccess } from "../../redux/authSlice";
import { useSelector } from "react-redux";
import { createAxios } from "../../createInstance";

const HomePage = () => {
  const currentUser= useSelector((state)=>state.auth.login.currentUser)
  const allUsers= useSelector((state)=> state.user.allUsers.allUsers)
  const msgDeleteUser = useSelector((state)=>state.user.msg)
  const dispath = useDispatch()
  const navigate= useNavigate()
  
  const axiosJWT = createAxios(currentUser,dispath,loginSuccess)

  useEffect(()=>{
    if(!currentUser) navigate('/login')
    getAllUsers(currentUser?.accessToken, dispath , axiosJWT )
  }, [])

  const handleDelete=(id)=>{
    deleteUser(id, currentUser?.accessToken,dispath , axiosJWT )
  }



  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">Your role: {currentUser?.user.admin?'Admin':'User'}</div>
      <div className="home-userlist">
        {allUsers?.map((user) => {
          return (
            <div className="user-container">
              <div className="home-user">{user.userName}</div>
              <div className="delete-user" onClick={()=>handleDelete(user._id)}> Delete </div>
            </div>
          );
        })}
      </div>
      <div className="home-delete-msg">{msgDeleteUser}</div>
    </main>
  );
};

export default HomePage;
