import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const navigate = useNavigate();
    const [patient, setPatient] = useState({name: '', age: null, purpose: '', fee: ''})
    const [error, setError] = useState(false)

    const handleChange = (e) => setPatient((prev) => ({...prev, [e.target.name]: e.target.value }))

    const handleSave = async (e) => {
        e.preventDefault();
       try{
        axios.post("http://localhost:5000/patients", patient);
        navigate("/");
       }catch(err){ 
        console.error(err);
        setError(true)
       }
    }

  return (
    <div>
      <h1>Add New Patient</h1>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name='name' placeholder="Enter Name" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Age</Form.Label>
            <Form.Control type="number" name='age' max='100' placeholder="Enter Age" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Purpose</Form.Label>
            <Form.Control as="textarea" name='purpose' rows={3} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Fee</Form.Label>
            <Form.Control type="text" name='fee' placeholder="Enter Fee" onChange={handleChange} />
        </Form.Group>
        <Button variant="outline-secondary">Cancle</Button>{' '}
        <Button variant="outline-primary" onClick={handleSave}>Save</Button>{' '}
        {error && <Card>Something went wrong!</Card>}
    </Form>
    </div>
  )
}

export default Add
