import { React, Component, useState, setState , useEffect } from "react"; 
import {useNavigate} from "react-router-dom";
import Axios from "axios";
import "./Css/Main.css";
import { Card, CardGroup, Container, Button, Alert } from "react-bootstrap"; 
import Home from './../Home/Home'; 

function Main () { 
  const [login, setLogin] = useState([]);
  const authen = localStorage.getItem("user");
  const tokenC = localStorage.getItem("token"); 
  useEffect(() => {   
    check_authen();
  },[]);  
 
  const check_authen = () =>{
    Axios.post("http://localhost:3001/authen", { 
      tokenC : tokenC,
    })  
      .then((res , err) => {
        if (tokenC != null) {  
          if(res.data.message == "admin"){
            console.log("res = ", res);
            alert(res.data); 
          setLogin(authen); 
          console.log("res.data" ,  res.data.message);   
          }  else {
            alert("Fail Authen");
            localStorage.clear();
            window.location = "/"; 
          }
        } else if(tokenC != res.data.tokenC){  

          alert("No Token");
          localStorage.clear();
          window.location = "/"; 
          // window.location = "/"; 

        }
      }).catch((err) => { 
        alert("authen catch"); 
         localStorage.clear();
        window.location = "/"; 
        console.log("err")  
      });
  } 
 
    return (
      <div>
        <header id="Headermain">
          <h1 id="main"> Election </h1>

          <div id="Number">
            <p>{login}</p>
            <a href="/">Logout</a>
          </div>
        </header>
        <div className="Mainadmin">
          <Card>
            <Card.Header>Setting Election </Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p>
                  {" "}
                  สำหรับ Admin และ Staff เพื่อการตั้งค่าการโหวตได้อย่างรวดเร็ว{" "}
                </p>
                <footer className="blockquote-footer">
                  Power!!! <cite title="Source Title">Title</cite>
                </footer>
              </blockquote>
            </Card.Body>
          </Card>

          <div className="Event">
            <div className="Card1">
              <Card border="primary" style={{ width: "18rem" }}>
                <Card.Header>Create Event</Card.Header>
                <Card.Body>
                  <Button href="/Event" variant="primary">
                    Create
                  </Button>
                </Card.Body>
              </Card>
            </div>

            <div className="Card2">
              <Card border="primary" style={{ width: "18rem" }}>
                <Card.Header>Edit Event</Card.Header>
                <Card.Body>
                  <Button href="/Edit" variant="primary">
                    Edit
                  </Button>
                </Card.Body>
              </Card>
            </div>

            <div className="Card3">
              <Card border="primary" style={{ width: "18rem" }}>
                <Card.Header>Submit Results</Card.Header>
                <Card.Body>
                  <Button href="/Submit" variant="primary">
                    Results
                  </Button>
                </Card.Body>
              </Card>
            </div>

            <div className="Card4">
              <Card border="primary" style={{ width: "18rem" }}>
                <Card.Header>Create Staff</Card.Header>
                <Card.Body>
                  <Button href="/Staff" variant="primary">
                    Create
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  } 

export default Main;
