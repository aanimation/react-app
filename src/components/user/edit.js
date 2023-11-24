import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import ConfigService from '../../services/configService';

export default function EditUser() {
  const url = process.env.REACT_APP_API_URL
  const config = ConfigService()
  const navigate = useNavigate()
  const { id } = useParams()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const [validationError,setValidationError] = useState({})

  useEffect(()=>{
    fetchUser()
  },[])

  const fetchUser = async () => {
    await axios.get(url+`/api/detail/${id}`, config).then(({data})=>{
      const { name, email } = data.data
      setName(name)
      setEmail(email)
    }).catch(({response:{data}})=>{
      Swal.fire({
        text:data.message,
        icon:"error"
      })
    })
  }

  const updateUser = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('_method', 'POST');
    formData.append('name', name)
    formData.append('email', email)

    await axios.post(url+`/api/update/${id}`, formData, config).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/")
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
      }else{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Update User</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value])=>(
                                <li key={key}>{value}</li>   
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <Form onSubmit={updateUser}>
                  <Row> 
                    <Col>
                      <Form.Group controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={(event)=>{
                          setName(event.target.value)
                        }}/>
                      </Form.Group>
                    </Col>  
                  </Row>
                  <Row className="my-3">
                    <Col>
                      <Form.Group controlId="Description">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" value={email} onChange={(event)=>{
                          setEmail(event.target.value)
                        }}/>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" className="mt-2" block="block" type="submit">
                    Update
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}