import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate();
  return (
    <div>
     <Navbar bg="dark" data-bs-theme="dark">
        <Container className='justify-content-between'>
          <Navbar.Brand onClick={()=>navigate('/')}>Navbar</Navbar.Brand>
          <Nav>
            <Nav.Link onClick={()=>navigate('/')}>Home</Nav.Link>
            <Nav.Link onClick={()=>navigate('/add')}>Add</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
