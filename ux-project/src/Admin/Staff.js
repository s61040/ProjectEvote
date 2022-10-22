import { React, Component, useState, setState, useEffect } from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom";
import "./Css/Edit.css";
import { Space, Tag, Input } from "antd";
import "antd/dist/antd.css";
import {
  Table,
  InputGroup,
  FormControl,
  Navbar,
  Nav,
  Button,
  Container,
} from "react-bootstrap";

const { Search } = Input;
const onSearch = (value) => console.log(value);
const { Column, ColumnGroup } = Table;
function Staff () { 

  const navi = useNavigate(); 
  const [user, setUser] = useState([]);
  const [candidate, setCandidate] = useState([]);
  const [namestaff, setNamestaff] = useState([]);
  const [login, setLogin] = useState([]);
  const authen = localStorage.getItem("user");  
 
  const tokenC = localStorage.getItem("token");
  useEffect(() => {
    Showevent();
    check_authen();  
  }, []);

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
 
  const Showevent = (e) => { 
    Axios.get("http://localhost:3001/showStaff")
    .then((res) => {
      setNamestaff(res.data.massage);  
      console.log(res.data.massage);   
      console.log("data.User"); 
      });  
  };

  const Create_staff = () =>{  
    navi('\StaffCreate');
  }

  const Delete_data =(id) =>{
    console.log(id);
    Axios.post("http://localhost:3001/Deleteuser", {
        id:id,
    }).then((res) => { 
      console.log(res.data );
      console.log("Delete = " , id);
    });
  }; 

  return (
    <div>
      <header id="Headermain">
        <h1 id="main"> Election </h1>
        <div id="Number">
          <p>{login}</p>
          <a href="/">Logout</a>
        </div>
      </header>
      <div>
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          style={{
            width: 304,
            marginLeft: 1000,
          }}
          onSearch={onSearch}
        />
        <Container style={{ padding: 20 }}>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Name Event</th>
                <th>Total Candidate</th>
                <th>Total User</th>
                <th>Edit</th> 
              </tr>
            </thead>
            <tbody>
              {namestaff.map((item) => (
                <tr key={item.id_user}>
                  <td>{item.id_user}</td>
                  <td>{item.email}</td>
                  <td>{item.name_event}</td>
                  <td>{item.level}</td> 
                  
                  <td>
                  {" "}
                      <Button 
                        variant="contained"
                        onClick={() => (item.p_name_event)}
                        type="submit"
                      >
                       Chang Password
                      </Button>
                      {" "}
                      <Button 
                        variant="contained"
                        onClick={() => Delete_data(item.id_user)}
                        type="submit"
                        href = "/Staff"
                      >
                       Delete
                      </Button>
                    </td>  
                </tr>
              ))}
            </tbody>
          </Table> 
          <Button 
            variant="contained"
            onClick={() => Create_staff()}
            type="submit"
          >
            Create Admin
          </Button>
        </Container>
      </div>
    </div>
  );
  } 

export default Staff
