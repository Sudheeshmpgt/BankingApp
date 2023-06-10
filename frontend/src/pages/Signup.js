import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { SignUpForm } from '../components/signup/SignupForm'

export let SignUpPage = () => {

  return (
    <Container fluid>
      <SignUpForm/>
    </Container>
  )
}