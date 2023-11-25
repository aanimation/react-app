import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Swal from 'sweetalert2';


export default function LoginUser({ setToken }) {
  const loginUrl = process.env.REACT_APP_API_URL+'/api/login';

  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("");

  const [validation, setValidation] = useState({});

  const loginHandler = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    await axios.post(loginUrl, formData).then((res) => {
      setToken(res.data.access_token)
      window.location.reload()
    }).catch((error) => {
      Swal.fire({
        icon:"warning",
        text:error.response.data.message ?? 'Invalid input'
      })
      setValidation(error.response.data);
    })
  };

  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h4 className='fw-bold text-center'>
            {process.env.REACT_APP_NAME}
          </h4>
          <div className="card rounded shadow-sm">
            <div className="card-body">
              {
                validation.message && (
                  <div className="alert alert-danger">{validation.message}</div>
                )
              }
              <form onSubmit={loginHandler}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                {
                  validation.email && (
                    <div className="alert alert-danger">{validation.email[0]}</div>
                  )
                }
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {
                  validation.password && (
                    <div className="alert alert-danger">{validation.password[0]}</div>
                  )
                }
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">LOGIN</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

LoginUser.propTypes = {
  setToken: PropTypes.func.isRequired
}