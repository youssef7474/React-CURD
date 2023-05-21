import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const WithGurd = ({children}) => {
    const navigate=useNavigate();
        
    const{isLoggedIn}=useSelector((state)=>state.auth);
    useEffect(()=>{
        if(!isLoggedIn)
        {
            navigate("/loginPage")
        }
    },[isLoggedIn,navigate])

  return children;
}

export default WithGurd;
