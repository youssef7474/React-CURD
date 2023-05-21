import React from 'react';
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';
import { insertPost } from '../state/postSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const FormSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    description: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const Add = () => {
  const navigate=useNavigate();
  const id =Math.floor(Math.random() * 500);
  const dispatch=useDispatch();
 
  const {loading,error} =useSelector((state)=>state.posts)





    const formik = useFormik({
      initialValues: {
        title: '',
        description: '',
      },
      validationSchema:FormSchema,
      onSubmit: (values) => {
        const data={
          id:id,
          title:values.title,
          description:values.description,
        }
        dispatch(insertPost(data)).unwrap().then(()=>{
          navigate("/")
        }).catch((error)=>{
          console.log(error)
        })
      },
    });
  return (
    <Form onSubmit={formik.handleSubmit}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>title</Form.Label>
      <Form.Control
      type="text"
      name='title'
      onChange={formik.handleChange}
      value={formik.values.title}
    />
    {formik.errors.title && formik.touched.title ? (
      <div style={{color: "red"}}>{formik.errors.title}</div>
    ) : null}
    </Form.Group>
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
      <Form.Label>description</Form.Label>
      <Form.Control
      as="textarea"
      rows={3}
      name='description'
      onChange={formik.handleChange}
      value={formik.values.description}
    />
    {formik.errors.description && formik.touched.description ? (
      <div style={{color: "red"}}>{formik.errors.description}</div>
    ) : null}
    </Form.Group>
    <Loading loading={loading} error={error}>
        <Button variant="primary" type='submit'>submit</Button>
    </Loading>
  </Form>
  );
}

export default Add;
