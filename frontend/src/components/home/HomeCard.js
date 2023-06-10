import React,{useEffect, useState} from 'react';
import {Card, Col, ListGroup, Row} from 'react-bootstrap';
import {RestService} from '../../rest';
import './homeCard.css'

export let HomeCard = () => {
  const [user, setUser] = useState({})
  const [account, setAccount] = useState({})
  let loadData = async () => {
      let token = localStorage.getItem("token")
      let user = JSON.parse(localStorage.getItem('user'))
      setUser(user)
      let userId = user?._id
      if(token && userId){
          let result = await RestService.getAccount(userId, token)
          setAccount(result?.data)
      }
  }

  useEffect(()=>{
    loadData() 
  },[])

  return (
    <div className='flex-row'>
        <Card className=" mx-auto mt-5 rounded-1 newCard">
            <Card.Header className='bg-white fs-5'>{`Welcome ${user?.name}`}</Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col md>
                      <p className='text-muted'>YOUR ID</p>
                    </Col>
                    <Col md>
                      <p>{account?.accountId}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md>
                      <p className='text-muted'>YOUR BALANCE</p>
                    </Col>
                    <Col md>
                      <p>{account?.balance} INR</p>
                    </Col>
                  </Row>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    </div>
  )
}