 
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
import "./Css/Addcandidate.css";


function Addcandidate () {
  
  const navi = useNavigate();
  const [nameevent, setNameevent] = useState([]);
  const [url, setUrl] = useState([]);

  const [userInfo, setuserInfo] = useState({
    file:[],
    filepreview:null,
   });

  const [detailc, setDetailc] = useState([]);
  const [namec, setNamec] = useState([]); 
  const [candidatelist, setCandidatelist] = useState([]); 
  const [totalcandidate, setTotalcandidate] = useState(0);  
  const [login, setLogin] = useState([]);
  const getname = localStorage.getItem("nameevent"); 
  const authen = localStorage.getItem("user");  
  const tokenC = localStorage.getItem("token"); 

  useEffect(() => {  
    prepare_candidatele();
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

  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file:event.target.files[0],
      filepreview:URL.createObjectURL(event.target.files[0]),
    });

  } 
  const prepare_candidatele = (e) => {
    Axios.post("http://localhost:3001/Resulcan", {
      getname: getname,
    }).then((res) => { 
      setTotalcandidate(res.data.candidatelength);
      console.log(res.data.massage); 
      console.log("data.candidate");
    });
  };

  const prepare_candidate = (e) => {
    if ( getname.length > 0 && detailc.length > 0 && namec.length > 0  ) {
      console.log("resp.data");
      const formdata = new FormData();
      formdata.append("avatar", userInfo.file);
      Axios.post("http://localhost:3001/image",formdata)
       .then((res,err) => {
          if(res.data.massage == "FailCandidate"){
            alert("Check candidate Name")
          }else {
            Axios.post("http://localhost:3001/createcandidate",{ 
        totalcandidate : totalcandidate,
        getname: getname,
        namec: namec, 
        detailc: detailc, 
      }) .then((res,err) => {
         setCandidatelist([
            ...candidatelist,
            {
              totalcandidate:totalcandidate,
              getname: getname,
              namec: namec, 
              detailc: detailc,
               
            },
          ]);
          setTotalcandidate(res.data.lengthdata);  
          console.log("data" , res.data);
          alert( res.data )
      })
            
          } 
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log(getname.length,
        detailc.length,
        namec.length );
      alert("dupplicate");
    }
  };




    return (
      <div className="AddCanMain">
        <header id="Headermain">
          <h1 id="main">{getname}</h1>
          <div id="Number">
            <p>{login}</p>
            <a href="/">Logout</a>
          </div>
        </header>
        <div className="Addcan">
          <Form id="fromcan">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <h3>Name Candidate</h3>
              <Form.Control
                type="email"
                placeholder="Candidate"
                onChange={(e) => {
                  setDetailc(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <h3>Detail</h3>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => {
                  setNamec(e.target.value);
                }}
              />
            </Form.Group>
            <div>
              <h3>Total Candidate = {totalcandidate} </h3>
            </div>
            <h3>Candidate</h3>
            <div >
              <input type="file" onChange={handleInputChange}/> 
            </div>
            {/* <img id="imgcan" src={require("../image/ResultsDetail/d3.png")} />
             */}
              {userInfo.filepreview !== null ? 
              <div>
                <img className="previewimg"  src={userInfo.filepreview} alt="UploadImage" />
                <p>{userInfo.filepreview}</p>
              </div> 
              : null}
            <br />
            <br />
            <Button
              href="/Event"
              variant="outline-secondary"
              id="button-addon2"
            >
              Back
            </Button>
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={prepare_candidate}
            >
              ADD
            </Button>
            <Button href="/Adduser" type="submit">
              {" "}
              NextPage{" "}
            </Button>
          </Form>
        </div>
      </div>
    );
  }  
export default Addcandidate;
