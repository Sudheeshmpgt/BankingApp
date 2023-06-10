import { Container } from "react-bootstrap";
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/navbar/Header"
import { DepositForm } from "../components/deposit/DepositForm"


export let DepositPage = () => {
  let navigate = useNavigate();  

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Header prop={'deposit'}/>  
      <Container>
        <DepositForm />
      </Container>
    </>
  );
};
