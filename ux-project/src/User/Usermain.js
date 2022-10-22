import { React, Component, useState, setState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Css/Main.css";
import { Card, CardGroup, Container, Button } from "react-bootstrap";
import Axios from "axios"; 




const getname = localStorage.getItem("eventname");
function Usermain() {  
  useEffect(() => { 
    prepare_candidate();
  }, []);
  
  
  const [candidate, setCandidate] = useState([]);
  
  const prepare_candidate = (e) => {
      Axios.get("http://localhost:3001/userevent", {
        getname: getname,
      }).then((res) => {
        setCandidate(res.data.massage);
        console.log(res.data.massage);
        console.log("data.candidate");
      });
    }; 
 
    return (
      <div>
        <header id="Headermain">
          <h1 id="main"> {getname}</h1>

          <div id="Number">
            <p>..............</p>
            <a href="/">Logout</a>
          </div>
        </header>
        <div className="Mainadmin">
          <Card>
            <Card.Header>Selected Election </Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p> สำหรับ User เข้ามาลงคะแนนเสียงเพื่อคนที่คุณไว้ใจ </p>
                <footer className="blockquote-footer">
                  Power!!! <cite title="Source Title">Title</cite>
                </footer>
              </blockquote>
            </Card.Body>
          </Card>

          <div className="Card">
            <Card border="primary" id="cardEvent">
              <Card.Header>Event Name</Card.Header>
              <Card.Body>
                <div class="row">
                  <div class="col">
                    <Button href="/Election" variant="primary">
                    Election
                    </Button>
                  </div>
                  <div class="col">
                    <Card.Img
                      
                      variant="top"
                      src={require("../image/ResultsDetail/d1.png")}
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="Card">
            <Card border="primary" id="cardEvent">
              <Card.Header>Event Name</Card.Header>
              <Card.Body>
                <div class="row">
                  <div class="col">
                    <Button href="/Election" variant="primary">
                    Election
                    </Button>
                  </div>
                  <div class="col">
                    <Card.Img
                      
                      variant="top"
                      src={require("../image/ResultsDetail/d1.png")}
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="Card">
            <Card border="primary" id="cardEvent">
              <Card.Header>Event Name</Card.Header>
              <Card.Body>
                <div class="row">
                  <div class="col">
                    <Button href="/Election" variant="primary">
                    Election
                    </Button>
                  </div>
                  <div class="col">
                    <Card.Img
                      
                      variant="top"
                      src={require("../image/ResultsDetail/d1.png")}
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="Card">
            <Card border="primary" id="cardEvent">
              <Card.Header>Event Name</Card.Header>
              <Card.Body>
                <div class="row">
                  <div class="col">
                    <Button href="/Election" variant="primary">
                    Election
                    </Button>
                  </div>
                  <div class="col">
                    <Card.Img
                      
                      variant="top"
                      src={require("../image/ResultsDetail/d1.png")}
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    ); 
} 
export default Usermain;
