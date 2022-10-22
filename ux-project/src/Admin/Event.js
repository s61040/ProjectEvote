import { React, Component, useState, setState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Css/Event.css";
import {
  Card,
  InputGroup,
  FormControl,
  Button,
  Form,
  Col,
  Row,
} from "react-bootstrap";

function Event() {
  const navi = useNavigate();
  const [nameevent, setNameevent] = useState([]);

  const [detaile, setDetaile] = useState([]);
  const [starte, setStarte] = useState([]);

  const [ende, setEnde] = useState([]);
  const [checka, setChecka] = useState(0);

  const [level, setLevel] = useState(0);
  const [eventlist, setEventlist] = useState([]);

  const [login, setLogin] = useState([]);
  const useruserlogin = localStorage.getItem("user");
  const tokenC = localStorage.getItem("token");

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  useEffect(() => {
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
          setLogin(useruserlogin); 
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

  const prepare = (e) => {
    const dateS = new Date(starte);
    const dateE = new Date(ende);

    if (
      nameevent.length > 0 &&
      detaile.length > 0 &&
      starte.length > 0 &&
      ende.length > 0 &&
      checka != 0
    ) {
      if (current >= dateS) {
        alert("CheckDate");
      }
      else if(dateS > dateE) {
        alert("Check-Date");
      } else {
        Axios.post("http://localhost:3001/createevnet", {
          nameevent: nameevent,
          detaile: detaile,
          starte: starte.substring(0, 10),
          ende: ende.substring(0, 10),
          checka: checka,
        })
          .then((res) => {
            if (res.data.massage == "FailEventname") {
              alert("Check EventName");
            } else {
              setEventlist([
                ...eventlist,
                {
                  nameevent: nameevent,
                  detaile: detaile,
                  starte: starte,
                  ende: ende,
                  checka: checka,
                },
              ]);
              localStorage.setItem("nameevent", nameevent);
              console.log(res.data);
              navi('\Addcandidate');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      console.log(
        nameevent.length,
        detaile.length,
        starte.length,
        ende.length,
        checka
      );
      alert("data fail");
    }
  };

  return (
    <div className="EvenMain">
      <header id="Headermain">
        <h1 id="main"> Election </h1>
        <div id="Number">
          <p>{login}</p>
          <a href="/">Logout</a>
        </div>
      </header>

      <div className="MainEvent">
        <Card id="Cardevent">
          <Card.Header as="h5">Featured</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <h3>Name Event</h3>
                <Form.Control
                  type="text"
                  placeholder="Name Event"
                  onChange={(e) => {
                    setNameevent(e.target.value);
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
                  placeholder="detail"
                  onChange={(e) => {
                    setDetaile(e.target.value);
                  }}
                />
              </Form.Group>
              <h3>Date Time </h3>
              <Row>
                <Col>
                  <Form.Control
                    type="date"
                    placeholder="End Date"
                    onChange={(e) => {
                      setStarte(e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="date"
                    placeholder="End Time"
                    onChange={(e) => {
                      setEnde(e.target.value);
                    }}
                  />
                </Col>
              </Row>

              <br />
              <Row>
                <Col>
                  <Form.Group id="checka" className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Anonimus"
                      onChange={(e) => {
                        setChecka(1);
                      }}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Unanonimus"
                      onChange={(e) => {
                        setChecka(2);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Button onClick={prepare}> NextPage </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Event;
