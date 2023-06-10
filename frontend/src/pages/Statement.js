import { Container } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/navbar/Header";
import { StatementForm } from "../components/statement/StatementForm"

export let StatementPage = () => {
  let navigate = useNavigate();  

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Header prop={'statement'}/>  
      <Container>
        <StatementForm/>
      </Container>
    </>
  );
};
