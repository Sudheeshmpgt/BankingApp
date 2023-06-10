import React,{useState} from 'react';
import {Card, Form} from 'react-bootstrap';
import {RestService} from '../../rest';
import Toast from '../sweetAlert/sweetAlert';
import './depositForm.css'

export let DepositForm = () => {
  const [amount, setAmount] = useState(0);
  const [errors, setErrors] = useState({});

  let clearFields = () => {
    setAmount(0);
    setErrors({})
  }

  let handleSubmit = () => {
    let errors = {
      amount:false, 
    }
    let setError = false
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
        amount: amount
      }
      RestService.deposit(body, token)
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
          title: "Transaction failed",
        });
      })
    }
  }
  return (
    <div>
        <Card className=" mx-auto mt-5 rounded-1 newCard">
            <Card.Header className='bg-white fs-5'>Deposit Money</Card.Header>
            <Card.Body >
                <div className='mt-3 mb-3'>
                    <label>Amount</label>
                    <Form.Control 
                    className='mt-1 rounded-1'
                    type='number'
                    name='amount'
                    placeholder='Enter amount to deposit'
                    isInvalid={errors.amount}
                    value={amount}
                    onChange={(e)=>setAmount(e.target.value)}
                    />
                    {errors?.amount && (
                        <span className='text-danger'>{errors?.amount}</span>
                    )}
                </div>
                <div className='mt-3 mb-2 btn btn-primary rounded-1' onClick={handleSubmit}>Deposit</div>
            </Card.Body>
        </Card>
    </div>
  )
}