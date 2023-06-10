import { Container } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/navbar/Header"
import { WithdrawForm } from "../components/withdraw/WithdrawForm"


export let WithdrawPage = () => {
  let navigate = useNavigate();  

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Header prop={'withdraw'}/>  
      <Container>
        <WithdrawForm />
      </Container>
    </>
  );
};
