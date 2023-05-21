import React from 'react';
import usePostDetials from '../hooks/use-post-details';
import Loading from '../components/Loading';
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editPost,cleanRecords } from '../state/postSlice';
import { useNavigate } from "react-router-dom";


const Edit = () => {
  const {loading , error ,record}=usePostDetials();
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const dispatch=useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if(record)
    {
      setTitle(record?.title);
      setDescription(record?.description);
    }
  },[record])

  useEffect(()=>{
    return()=>{
      dispatch(cleanRecords())
    }
  },[dispatch])

  const formHandler = (e) => {
    e.preventDefault();
    dispatch(editPost({ id: record.id, title, description }))
      .unwrap()
      .then(() => navigate("/"));
  };


  
  return (
    <Loading loading={loading} error={error}>
        <Form onSubmit={formHandler}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>title</Form.Label>
          <Form.Control
          type="text"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>description</Form.Label>
          <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />
        </Form.Group>
            <Button variant="primary" type='submit'>submit</Button>
      </Form>
    </Loading>
  );
}

export default Edit;
