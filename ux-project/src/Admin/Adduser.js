import { React, Component, useState, setState , useEffect } from "react"; 
import {useNavigate} from "react-router-dom";
import Axios from "axios";
import {
    Card,
    InputGroup,
    FormControl,
    Button,
    Form,
    Col,
    Row,
  }
   from "react-bootstrap"; 
   import "./Css/Adduser.css"; 
  // localStorage.setItem('token',res.data.token);
  
function Adduser () {
  const navi = useNavigate();
  const [nameevent, setNameevent] = useState([]);
  const [password, setPassword] = useState([]);

  const [mail, setMail] = useState([]); 
  const [userlist, setUserlist] = useState([]); 
  const [totaluser, setTotaluser] = useState(0); 
  const getname = localStorage.getItem("nameevent"); 
  const [login, setLogin] = useState([]);
  const authen = localStorage.getItem("user");  
  const tokenC = localStorage.getItem("token"); 
  useEffect(() => { 
    prepare_userle();
    generatePassword();
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

  const generatePassword = () => { 
      // Create a random password
          setPassword(Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)); 
        console.log(password)
     
      // Set the generated password as state 
    }   
  const prepare_userle = (e) => { 
    Axios.post("http://localhost:3001/Resuluser", {
      getname: getname,
    }).then((res) => { 
      setTotaluser(res.data.userlength);
      console.log(res.data.massage);   
      console.log("data.User"); 
      });  
  };
  const prepare_user = (e) => {  
         generatePassword();  
    if ( getname.length > 0 && mail.length > 0  ) {
      console.log("resp.data");
      Axios.post("http://localhost:3001/createuser", {
        totaluser:totaluser,
        mail: mail, 
        password:password,
        getname: getname, 
      })
        .then((res,err) => {
          if(res.data.massage == "FailUser"){
            alert("Checkmail");
          } else {
            setUserlist([
            ...userlist,
            {
              totaluser :totaluser,
              mail: mail, 
              password:password,
              getname: getname, 
            },
          ]); 
          alert("Add User")
          setTotaluser(res.data.lengthdata) 
          console.log("mail ==> ", mail);
          console.log("password ==> ", password);
          console.log(res);
          } 
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log(getname.length,
        mail.length );
      alert("data fail");
    }
  };

  const sendname = () => {
    console.log(getname);
    alert(getname)  
  }

    return (
      <div className='AddUseMain'>
        <header id="Headermain">
        <h1 id="main">{getname}</h1>

          <div id="Number">
            <p>{login}</p>
            <a href="/">Logout</a>
          </div>
        </header>
        <div>
        <Form id ='AddUse'>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <h3>Add User</h3>
                  <Form.Control 
                  type="email" 
                  placeholder="Email User"
                  onChange={(e) => {
                    setMail(e.target.value);
                  }}/>
                </Form.Group>

                <div >
                  <h3>Total User = {totaluser} </h3>
                </div>
               
                <Button href="/Event/Addcandidate" variant="outline-secondary" id="button-addon2">
                    Back
                  </Button>
                  <Button  variant="outline-secondary" id="button-addon2" onClick={prepare_user}>
                    ADD
                  </Button>
                  <Button onClick={sendname} href="/Result_user" type="submit" > NextPage </Button>
                
              </Form>
        </div>
      </div>
    )
  }  
export default Adduser
