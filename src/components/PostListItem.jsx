import React from 'react';

import {Button,ButtonGroup,} from "react-bootstrap";

import { Link } from 'react-router-dom';
 
import { useNavigate } from 'react-router-dom';

const PostListItem = ({data,deleteRecord,isLoggedIn}) => {
  
  const navigate=useNavigate();
  const deleteHandler =(item)=>{
    if(window.confirm(`are you sure you want to delete  ${item.title}?`))
    {
      deleteRecord(item.id);
    }
    
  }

    const records=data.map((el,idx)=>(
        <tr key={el.id}>
        <td>#{++idx}</td>
        <td>
          <Link to={`post/${el.id}`}>{el.title}</Link>
        </td>
        <td>
          <ButtonGroup aria-label="Basic example">
            <Button variant="success" onClick={()=>navigate(`post/${el.id}/edit`)} disabled={!isLoggedIn}>Edit</Button>
            <Button variant="danger" onClick={()=>deleteHandler(el)} disabled={!isLoggedIn}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
      ))
  return (
    <>
    {records}
    </>

  );
}

export default PostListItem;
