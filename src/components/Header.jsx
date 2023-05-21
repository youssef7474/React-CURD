import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import {LogInOut} from "../state/authslice.js"
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate=useNavigate();
  const dispatch=useDispatch();

  const{isLoggedIn}=useSelector((state)=>state.auth);
  
  const clickHandler =()=>{
    dispatch(LogInOut())
    navigate("/")
  }
  return (
    <div className="header">
      <h1>CRUD APP</h1>
      <ul className="nav">
        <li>
          <NavLink to='/' end>Home</NavLink>
        </li>
        <li>
          <NavLink to='post/add'>Add Post</NavLink>
        </li>
        <li className="login" onClick={()=>clickHandler()} style={{cursor:"pointer"}} >
            {isLoggedIn ? 'log out' : 'log in'}
        </li>
      </ul>
    </div>
  );
};

export default Header;
