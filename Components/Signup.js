import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  // Creating a useState hook for email and password
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })

  // Creating an object for useNavigate hook
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({ name, email, password })
    });
    // const note = await response.json(); // parses JSON response into native JavaScript objects
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      navigate("/");
    }
    else {
      props.showAlert("Invalid credentials", "danger");
    }
  }

  // This function is executed whenever there is an input
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <>
      <form className='container' onSubmit={handleSubmit}>
        <div className="container d-block w-25 translate-middle position-absolute top-50 start-50 border p-5 rounded shadow-lg mb-5 bg-body">
          <div className="mb-4">
            <h4>Create a Notes Account</h4>
          </div>
          <div className="mb-3">
            <div className="form-floating">
              <input type="name" className="form-control" id="name" name="name" placeholder='Name' value={credentials.name} onChange={onChange} />
              <label htmlFor="name">Name</label>
            </div>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <div className="form-floating">
              <input type="email" className="form-control" id="email" placeholder='Email address' name="email" value={credentials.email} onChange={onChange} />
              <label htmlFor="email">Email address</label>
            </div>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <div className="form-floating">
              <input type="password" className="form-control" id="password" name="password" placeholder='password' value={credentials.password} onChange={onChange} />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div id="emailHelp" className="form-text">Password must be atleast 6 characters.</div>
          </div>
          <div className="mb-4">
            <div className="form-floating">
              <input type="password" className="form-control" id="cpassword" name="cpassword" placeholder='Confirm Password' value={credentials.cpassword} onChange={onChange} />
              <label htmlFor="floatingPassword">Confirm Password</label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </>
  )
}

export default Signup