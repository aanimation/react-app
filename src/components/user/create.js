import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import ConfigService from '../../services/configService';


export default function CreateUser() {
  const url = process.env.REACT_APP_API_URL
  const config = ConfigService()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")

  const [validation, setValidation] = useState({})

  const createUser = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('password_confirm', passwordConfirm)

    await axios.post(url+`/api/create`, formData, config).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/")
    }).catch(({response})=>{
      Swal.fire({
        icon:"error",
        text:response.data.message ?? 'Invalid input request'
      })
      setValidation(response.data)
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Create User</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validation).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validation).map(([key, value])=>(
                                <li key={key}>{value}</li>   
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <Form onSubmit={createUser}>
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
                      <Form.Group controlId="Email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" value={email} onChange={(event)=>{
                          setEmail(event.target.value)
                        }}/>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col>
                      <Form.Group controlId="Password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className="mb-2" type="password" value={password} onChange={(event)=>{
                          setPassword(event.target.value)
                        }} placeholder="password"/>
                      </Form.Group>
                      <Form.Group controlId="PasswordConfirm">
                        <Form.Control type="password" value={passwordConfirm} onChange={(event)=>{
                          setPasswordConfirm(event.target.value)
                        }} placeholder="confirmation"/>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" className="mt-2" block="block" type="submit">
                    Submit
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