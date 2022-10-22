import "./Home.css";
import { Button, Form } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import Axios from "axios";
import { useState , setState } from "react";
import { withSuccess } from "antd/lib/modal/confirm";
import {useNavigate} from "react-router-dom";


function Home() {
  const navi = useNavigate();
  
  const [ide, setID] = useState(0);

  const [passwordl, setPasswordl] = useState([]);
  const [idss, setIdss] = useState([]);

  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [level, setLevel] = useState(0); 
  const [adminList, setAdminList] = useState([]); 
  
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;


  const getAdmin = () => {
    Axios.get("http://localhost:3001/admin")
    .then((response) => {
      setAdminList(response.data);
    });
  };

  const checklogin = () => {
     if(idss.length > 0 && passwordl.length > 0){
        Axios.post("http://localhost:3001/checklogin", {
          idss: idss,        
        }).then((res,err) => {
          console.log(res.data);
          if(res.data.massage == "Login"){
            console.log(idss,passwordl);
            console.log(idss.length,passwordl.length);
            login();
          } 
          else if(res.data.massage != "Login") {
            alert("CheckUsername or Password");
          }
        })
     }
     else{
        alert("Login fail");
     }
  };

  const login = (e) =>
  {
    console.log("loginleaw");
    Axios.post("http://localhost:3001/login", { 
      idss: idss,
      passwordl: passwordl,  
    }).then((res,err) =>    
    {   
      console.log(res.data);
         if(res.data.message === 'admin' || res.data.message === 'staff' || res.data.message === 'user' )
         {
          Axios.get( "http://localhost:3001/authen", {
            headers: { 
                    "Content-type": "Application/json",
                    "Authorization": `Bearer ${res.data.token}`
                    }   
                }
          )
          if(res.data.message == 'user')
          {
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('eventname',res.data.nameevent);
            localStorage.setItem('user',res.data.user);
            console.log(res.data);
            navi('\Usermain');
          } 
          if(res.data.message == 'admin')
          {
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('eventname',res.data.nameevent);
            localStorage.setItem('user',res.data.user);
            console.log(res.data);
            navi('\MainAdmin');
          } 
          else if(res.data.message == 'staff')
          {
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('eventname',res.data.nameevent);
            localStorage.setItem('user',res.data.user);
            console.log(res.data);
            navi('\Election');
          } 
         
         } 
         else{
          console.log(res.data.message);  
         }
    }) 
    .catch((error) => { 
      console.log(error); 
    });  
  } 

  
  const addAdmin = (e) => { 
    e.preventDefault();
    Axios.post("http://localhost:3001/create", { 
      username: username,
      password: password,
      level: level,
    })
      .then(() => {
        setAdminList([
          ...adminList,
          {
            username: username,
            password: password,
            level: level, 
          }
        ])
        console.log("resp.admin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = () => {
    // 👇️ clear input field value
    console.log("hi")
    setUsername("")
    setID("")
    setPassword("")
  };
 
  return (
    <div className="App">
      <div className="Home">
        <body className="bodyleft">
          <div>
            <h1>{date}</h1>
            <h1>Check</h1>
            <br></br>
            <Button href="/Result" variant="primary" type="submit">
              Submit
            </Button>  
            <div> 
            <br></br>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                onChange={(e) => {
                  setUsername(e.target.value)
                }} 
              />

              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                onChange={ (e) => {
                  setPassword(e.target.value)
                }} 
              />

              <input 
                type="text"
                className="form-control"
                placeholder="Enter name"
                onChange={ (event) => {
                  setLevel(event.target.value)
                } } 
              /> 
             <br></br> 
              <Button  onClick={addAdmin} href = "/"  type="submit"  variant="primary" >
                add
              </Button>
             <br></br>  
              <Button href = "/" type="submit"  variant="primary" >
                delete
              </Button>
            </div>
          </div>
        </body>
        <body className="bodyright">
          <div>
            <h1>Login</h1>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control name="id" type="id" placeholder="Enter" onChange={ (event) => {
                  setIdss(event.target.value)
                } }/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control name="password" type="password" placeholder="Password" onChange={ (event) => {
                  setPasswordl(event.target.value)
                } } />
              </Form.Group>  
              <Button onClick={checklogin}   variant="primary" >
                Login Admin
              </Button>
              <Button
                id="user"
                href="/Usermain"
                variant="primary"
                type="submit"
              >
                Login User
              </Button>
            </Form>

            <br></br>
            <Button onClick={getAdmin} variant="primary">
              Test asdasdasd
            </Button>

            {adminList.map((val, key) => {
              return (
                <div className="admin card">
                  <div className="card-body text-left">
                    <p className="card-text">ID:{val.id}</p>
                    <p className="card-text">Username:{val.username}</p>
                    <p className="card-text">Password:{val.password}</p>
                    <p className="card-text">Level{val.level}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </body>
      </div>
    </div>
  );
}

export default Home;
