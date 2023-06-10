import React,{useState} from 'react';
import {Card, Form} from 'react-bootstrap';
import {RestService} from '../../rest';
import Toast from '../sweetAlert/sweetAlert';
import './transferForm.css'

export let TransferForm = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [errors, setErrors] = useState({})

  let clearFields = () => {
    setEmail("");
    setAmount(0);
    setErrors({})
  }

  let handleSubmit = () => {
    let errors = {
      email:false,
      amount:false
    }
    let setError = false
    if(email === ""){
        errors.email = "Invalid email id"
        setError = true
    }
    if(amount === 0){
        errors.amount = "Invalid amount"
        setError = true
    }
    setErrors(errors)
    if(!setError){
      let token = localStorage.getItem("token")
      let user = JSON.parse(localStorage.getItem('user'))
      let body = {
        userId: user?._id, 
        accountId: user?.accountId, 
        amount: amount,
        transferEmail: email
      }
      RestService.transfer(body, token)
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
          clearFields();
        }
      })
      .catch((error)=>{
        Toast.fire({
          icon: "error",
          title: "Transaction failded",
        });
      })
    }
  }
  return (
    <div>
        <Card className=" mx-auto mt-5 rounded-1 newCard">
            <Card.Header className='bg-white fs-5'>Transfer Money</Card.Header>
            <Card.Body >
                <div className='mt-2 mb-3'>
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
                    <label>Amount</label>
                    <Form.Control 
                    className='mt-1 rounded-1'
                    type='number'
                    name='amount'
                    placeholder='Enter amount to withdraw'
                    isInvalid={errors.amount}
                    value={amount}
                    onChange={(e)=>setAmount(e.target.value)}
                    />
                    {errors?.amount && (
                        <span className='text-danger'>{errors?.amount}</span>
                    )}
                </div>
                <div className='mt-3 mb-2 btn btn-primary rounded-1' onClick={handleSubmit}>Transfer</div>
            </Card.Body>
        </Card>
    </div>
  )
}