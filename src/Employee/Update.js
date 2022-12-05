import React,{useEffect, useState} from 'react'
import { Card,Button,Form } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate,useParams } from 'react-router-dom'

const InsetForm = () => {

  const navigate = useNavigate();

  const { id } = useParams()
  
  const option=[
    {lable:"Author",value:"Author"},
    {lable:"Editor",value:'editor'},
    {lable:"Subsciber",value:'subsciber'},
    {lable:"administrator",value:'administrator'},
  ]
  
  const [fullName,setFullName]=useState()
  const [email,setEmail]=useState()
  const [role,setRole]=useState()  
   
    useEffect(()=>{
     axios.get(`http://localhost:8000/api/assignment/${id}`)
    .then(({data})=>{
      setFullName(data.data.fullname)
      setEmail(data.data.email)
      setRole(data.data.role)
      })
   },[])
 
   
    const submitHandler=(e)=>{
        e.preventDefault()
        const data={
      'fullname':fullName,
      'email':email,
      'role':role
  }
         axios.put(`http://localhost:8000/api/assignment/${id}`,data)
        .then(({data})=>{
          Swal.fire({
            icon:"success",
            text:data.message
          })
          navigate("/")
      })
      .catch(({response})=>{
       
        
      })
        
    }
    
  return (
    <div><Card style={{ width: '68rem' }}>
 
    <Card.Body>
    <Link to="/"> <Button variant="primary">Dashboard</Button></Link>

      <Card.Title className='text-center'>Add New Employee</Card.Title>
      <Card>
  
  <Card.Body>
  
  <Form onSubmit={submitHandler}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label> Full Name</Form.Label>
    <Form.Control required type="text"  onChange={(event)=>{setFullName(event.target.value)}} 
    name="fullname" value={fullName} placeholder="Please Enter Full Name" />
   
  </Form.Group>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control required type="email" onChange={(event)=>{setEmail(event.target.value)}}
     name="email" value={email} placeholder="Enter email" />
  </Form.Group>

  <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Example select</Form.Label>
    <Form.Control required={true}  as="select" value={role}  name='role' 
    onChange={(event)=>{setRole(event.target.value)}}>
    <option disabled>select</option>
      {option.map((options,i)=>{
        return(<option key={i+1}  value={options.value}>{options.lable}</option>)
        
      })}
      </Form.Control>
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
  </Card.Body>
</Card>
  
    </Card.Body>
  </Card>
    </div>
  )
}

export default InsetForm