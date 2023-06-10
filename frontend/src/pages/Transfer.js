import { Container } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/navbar/Header"
import { TransferForm } from "../components/transfer/TransferForm"

export let TransferPage = () => {
  let navigate = useNavigate();  

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Header prop={'transfer'}/>  
      <Container>
        <TransferForm />
      </Container>
    </>
  );
};
