import { React, Component, useState, setState, useEffect } from "react";
import Axios from "axios";
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
function Edit() {
  const [user, setUser] = useState([]);
  const [candidate, setCandidate] = useState([]);
  const [nameevent, setNameevent] = useState([]);
  const [login, setLogin] = useState([]);
  const useruserlogin = localStorage.getItem("user");  
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
          setLogin(user); 
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
    Axios.get("http://localhost:3001/showevent")
    .then((res) => {
      setNameevent(res.data.massage);  
      console.log(res.data.massage);   
      console.log("data.User"); 
      });  
  };

  const Edit_Event = (name_event) =>{
    localStorage.setItem('name_edit',name_event);
    window.location = "/EditEvent";
  }

  const Delete_Event = (name_event) =>{
    Axios.post("http://localhost:3001/Delete_e", { 
      name_event : name_event,
    }).then((res) =>{
      alert("Delete Data Event")
      console.log(res);
    }).catch((err) =>{
      console.log(err);
    })  
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
              {nameevent.map((item) => (
                <tr key={item.p_id_c}>
                  <td>{item.p_id_c}</td>
                  <td>{item.p_name_event}</td>
                  <td>{item.total_candidate}</td>
                  <td>{item.total_user}</td> 
                  <td>
                  {" "}
                      <Button 
                        variant="contained"
                        onClick={() => Edit_Event(item.p_name_event)}
                        type="submit"
                      >
                        Edit
                      </Button>
                      {" "}
                      <Button 
                        variant="contained"
                        onClick={() => Delete_Event(item.p_name_event)}
                        type="submit"
                        href = "/Edit"
                      >
                        Delete
                      </Button>
                    </td> 
                </tr>
              ))}
            </tbody>
          </Table> 
        </Container>
      </div>
    </div>
  );
}
export default Edit;
