import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate();
  const [Inputs , setInputs] = useState({
    email: "",
    name: "",
    password: ""
  });

  const change = (e) => {
    const { name , value } = e.target;
    setInputs({ ...Inputs , [name] : value });
  };

  const submit = async (e) => {
    e.preventDefault();
    await axios
    .post("http://localhost:5000/api/v1/register" , Inputs)
    .then((response)=> {
      if ( response.data.message === "User already exist"){
        alert(response.data.message);
        navigate("/login");
      }
      else{
        alert(response.data.message);
        setInputs({
          email: "",
          name: "",
          password: ""
        })
        navigate("/login");
      }
    })
  }

  return (
    <div className='flex flex-col'>
      <input className='p-2 my-2'
      type='email'
      name='email'
      placeholder='Enter Your Email'
      onChange={change}
      value={Inputs.email}/>
      <input className='p-2 my-2'
      type='name'
      name='name'
      placeholder='Enter Your Name'
      onChange={change}
      value={Inputs.name}/>
      <input className='p-2 my-2'
      type='password'
      name='password'
      placeholder='Enter Your Password'
      onChange={change}
      value={Inputs.password}/>
      <button onClick={submit}>Sign Up</button>
    </div>
  )
}

export default Signup
