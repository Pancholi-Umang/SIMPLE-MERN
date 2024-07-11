import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateUser = () => {

  const { id } = useParams();

  const initialState = {
    name: '',
    email: '',
    age: '',
    password: ''
  }

  const [user, setUser] = useState(initialState);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://192.168.1.16:3001/singleUser/${id}`)
      .then((res) => setUser(res?.data))
      .catch((err) => console.error(err))
  }, [id])



  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios?.put(`http://192.168.1.16:3001/updateUser/${id}`, user)
      .then((res) => {
        console.log(res);
        setUser(initialState)
        navigate("/")
      })
  };


  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age:</label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            value={user.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="text"
            className="form-control"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create User</button>
      </form>
    </div>
  )
}

export default UpdateUser
