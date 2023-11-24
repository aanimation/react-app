import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'
import ConfigService from '../../services/configService';


export default function List() {
  const url = process.env.REACT_APP_API_URL;
  const config = ConfigService()
  const [users, setUsers] = useState([])

  useEffect(()=>{ 
    fetchUsers()
  },[])

  const fetchUsers = async () => {
    await axios.get(url+`/api/users`, config).then(({data})=>{
      setUsers(data.users)
    })
  }

  const deleteProduct = async (id) => {
    const isConfirm = await Swal.fire({
      title: 'Are you sure to delete?',
      text: "This action cannot be undo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      return result.isConfirmed
    });

    if(!isConfirm){ return; }

    await axios.delete(url+`/api/delete/${id}`, config).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      fetchUsers()
    }).catch(({response:{data}})=>{
      Swal.fire({
        icon:"error",
        text:data.message
      })
    })
  }

  const logoutHandler = () => {  //TODO: to be develop mo
    sessionStorage.clear()
    window.location.reload()
  }

  return (
    <div className="container">
      <div className="row">
        <div className='col-12'>
          <Link className='btn btn-primary mb-2 float-end' to={"/create"}>
            Create
          </Link>
        </div>
        <div className="col-12">
        
          <div className="card rounded shadow-sm">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table mb-0 text-center">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      users.length > 0 && (
                        users.map((row, key)=>(
                          <tr key={key}>
                            <td>{row.name}</td>
                            <td>{row.email}</td>
                            <td>
                              <Link to={`/edit/${row.id}`} className='btn btn-success me-2'>
                                Edit
                              </Link>
                              <Button variant="danger" onClick={()=>deleteProduct(row.id)}>
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))
                      )
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <Button className='mt-2' variant="light" onClick={()=>logoutHandler()}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}