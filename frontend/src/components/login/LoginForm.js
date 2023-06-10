import React,{useState} from 'react';
import {Card, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {RestService} from '../../rest';
import Toast from '../sweetAlert/sweetAlert'
import './loginForm.css'

export let LoginForm = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({})

  let handleSignup = () => {
    navigate('/signup')
  }

  let handleLogin = () => {
    let errors = {
      email:false,
      password:false
  }
  let setError = false
  if(email === ""){
      errors.email = "Invalid Email"
      setError = true
  }
  if(password === ""){
      errors.password = "Invalid Password"
      setError = true
  }
  setErrors(errors)
  if(!setError){
      let body = {
          email,
          password
      }
      RestService.login(body)
      .then((res)=>{
        if(res?.error){
          Toast.fire({
            icon: "error",
            title: res?.message,
          });
        }else{
          Toast.fire({
            icon: "success",
            title: res?.message,
          });
          delete res.user.password
          res.user.accountId = res?.account?._id
          localStorage.setItem('token', res?.token)
          localStorage.setItem('user', JSON.stringify(res?.user))
          navigate('/home')
        }
      })
      .catch((error)=>{
        Toast.fire({
          icon: "error",
          title: "Something went wrong",
        });
      })
    }
  }
  return (
    <div className='newForm' >
        <div className='mb-4'>
            <h3>ABC BANK</h3>
        </div>
        <Card className="rounded-1 newCard">
            <Card.Body >
                <Card.Title className='mt-2 mb-4'>Login to your account</Card.Title>
                <div className='mb-3'>
                    <label>Email address</label>
                    <Form.Control 
                    className='mt-1 rounded-1'
                    type='email'
                    name='email'
                    placeholder='Enter email'
                    isInvalid={errors.email}
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                    {errors?.email && (
                        <span className='text-danger'>{errors?.email}</span>
                    )}
                </div>
                <div className='mb-3'>
                    <label>Password</label>
                    <Form.Control 
                    className='mt-1 rounded-1'
                    type='password'
                    name='password'
                    placeholder='Enter password'
                    isInvalid={errors.password}
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                    {errors?.password && (
                        <span className='text-danger'>{errors?.password}</span>
                    )}
                </div>
                {/* <div className='mb-3'>
                    <Form.Check
                        type="checkbox"
                        id="rememberMe"
                        label="Remember me"
                    />
                </div> */}
                <div className='mt-3 mb-2 btn btn-primary rounded-1' onClick={handleLogin}> Sign in </div>
            </Card.Body>
        </Card>
        <div className='mt-4'>
            <p>Don't have account yet? <a className='text-decoration-none showPointer' onClick={handleSignup}>Sign Up</a></p>
        </div>
    </div>
  )
}