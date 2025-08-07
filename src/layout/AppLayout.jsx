import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './AppLayout.style.css'; 
import { useState } from 'react';

const AppLayout = () => {

  const [keyword, setKeryword] = useState("")
  const navigate = useNavigate()

  const searchByKeyword = (e) => {
    e.preventDefault()
    //url을 바꿔 줌
    navigate(`/movies?q=${keyword}`)
    //이미 사용된 setKeyword는 초기화
    setKeryword("")
  }

  return (
    <div>
      <Navbar expand="lg" className="netflix-navbar">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img 
              src="https://images.ctfassets.net/4cd45et68cgf/4nBnsuPq03diC5eHXnQYx/d48a4664cdc48b6065b0be2d0c7bc388/Netflix-Logo.jpg"
              alt="Netflix Logo"
              style={{ height: '80px', width: 'auto', display: 'block' }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto netflix-nav">
              <Nav.Link as={Link} to="/" className="netflix-link">Home</Nav.Link>
              <Nav.Link as={Link} to="/movies" className="netflix-link">Movies</Nav.Link>
            </Nav>
            <Form className="d-flex netflix-search-form" onSubmit={searchByKeyword}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 netflix-search-input"
                aria-label="Search"
                value={keyword}
                onChange={(e) => setKeryword(e.target.value)}
              />
              <Button variant="outline-danger" className="netflix-search-btn" type="submit">
                <span className="netflix-search-icon">&#128269;</span>
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{minHeight:'100vh' , background:'#000'}}>
        <Outlet/>
      </div>
    </div>
  )
}

export default AppLayout