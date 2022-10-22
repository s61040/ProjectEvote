import { React, Component, useState, setState , useEffect } from "react";  
import "./Css/Staff.css";
import Axios from "axios";

import {Card,
  InputGroup,
  FormControl,
  Button,
  Form,
  Col,
  Row,
}
 from "react-bootstrap";  

function Staff () { 
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [authen, setAuthen] = useState([]);
  const [level, setLevel] = useState([]); 
  const [admin, setAdmin] = useState([]); 
  const [login, setLogin] = useState([]);
  const authenc = localStorage.getItem("user");
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
          setLogin(authenc); 
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
  const Createadmin = () => {
    console.log("In") 
    Axios.post("http://localhost:3001/createadmin", {
      username: username,
      password: password,
      authen: authen,
      level: level,
    })
      .then((res, err) => {
        console.log("Create")
        setAdmin([
          ...admin,
          {
            username: username,
            password: password,
            authen: authen,
            level: level,
          },
        ]); 
        console.log("data", res.data);
        alert(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
    return (
      <div>
         <header id="Headermain">
          <h1 id = 'main'> Election </h1>  
          <div id = 'Number'>
            <p>..............</p>
            <a href="/">Logout</a>
          </div> 
        </header>
        <div className="Addcan">
            <Form id ='fromcan'>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <h3>Username</h3>
                  <Form.Control 
                  type="Username" 
                  placeholder="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }} />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <h3>PassWord</h3>
                  <Form.Control 
                   type="PassWord"
                   placeholder="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                  }}/>
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1" 
                >
                  <h3>Authen</h3>
                  <Form.Control
                   type="Username"
                    placeholder="Authen"
                    onChange={(e) => {
                      setAuthen(e.target.value);
                    }}/>
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                > 
                  <h3>Level</h3>
                  <Form.Control
                   type="Level"
                    placeholder="Level"
                    onChange={(e) => {
                      setLevel(e.target.value);
                    }}/>
                </Form.Group> 
                <div style={{ display: "flex" }}>

                <Button 
                  variant="primary"
                  // type="submit"
                  style={{ width: 200, marginLeft: 200 }}
                  onClick={Createadmin}
                >
                  Submit
                </Button>
                <Button
                  href="./ "
                  variant="primary"
                  type="submit"
                  style={{ width: 200, marginLeft: 500 }}
                >
                  Back
                </Button>
              </div> 
              </Form> 
        </div>
      </div>
    );
  } 

export default Staff
