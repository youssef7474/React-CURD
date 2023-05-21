import React from 'react';
import {Button} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import {LogInOut} from "../state/authslice.js"
import {useDispatch } from 'react-redux';

const AuthPage = () => {

  const navigate=useNavigate();
  const dispatch=useDispatch();

  const clickHandler =()=>{
    dispatch(LogInOut())
    navigate('/',{replace:true})
  }
  return (
    <div>
      <h1>please log in first</h1>
      <Button style={{display:"flex" ,alignItems:"center" ,marginLeft:"300px" ,marginTop:"50px"}} variant="primary" onClick={()=>clickHandler()}>logIn</Button>
    </div>
  );
}

export default AuthPage;
