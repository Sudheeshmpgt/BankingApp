import { Container } from "react-bootstrap";
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/navbar/Header"
import {HomeCard} from "../components/home/HomeCard"

export let HomePage = () => {
  let navigate = useNavigate();  

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Header prop={'home'}/>  
      <Container>
        <HomeCard/>
      </Container>
    </>
  );
};
