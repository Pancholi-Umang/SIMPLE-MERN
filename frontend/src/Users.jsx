import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Users = () => {

  const [Users, setUsers] = useState([])
  const navigate = useNavigate()

  const GetAllUsers = async () => {
    await axios.get("http://192.168.1.16:3001/")
    .then(({ data }) => setUsers(data))
    .catch((err)=>console.error(err))
  }

  useEffect(() => {
    GetAllUsers()
  }, [])

  const handleEditUser = (id) => {
    navigate(`/update/${id}`)
  }
  
  const handleDeleteUser = (id) => {
    axios?.delete("http://192.168.1.16:3001/deleteUser/"+id)
    .then((result)=>{
      console.log(result?.data)
      GetAllUsers()
    })
    .catch((err)=>console.error(err))
  }

  return (
    <section className="table_outer">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="card border-0 shadow">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover mb-0  ">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">NAME</th>
                        <th scope="col">AGE</th>
                        <th scope="col">EMAIL</th>
                        <th scope="col">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Users && Array?.isArray(Users) && Users?.length > 0 && Users.map((user, index) => {
                          const { _id, name, email, age } = user
                          return (
                            <tr key={index}>
                              <td>{name}</td>
                              <td>{age}</td>
                              <td>{email}</td>
                              <td>
                                <button onClick={() => handleEditUser(_id)} type="button" className="btn btn-success btn-sm mx-1">
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button onClick={() => handleDeleteUser(_id)} type="button" className="btn btn-danger btn-sm mx-1">
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Users
