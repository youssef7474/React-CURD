import React from 'react';
import {
    Container,
    Row,
    Col,
  } from "react-bootstrap";
  
import { Outlet } from 'react-router-dom';
import Header from "../components/Header";


const RootLayOut = () => {
  return (
    <Container>
    <Header />
    <Row>
      <Col xs={{ span: 8, offset: 2 }}>
          <Outlet></Outlet>
      </Col>
    </Row>
  </Container>
  );
}

export default RootLayOut;
