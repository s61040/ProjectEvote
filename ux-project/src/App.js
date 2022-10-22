import "./App.css";
import { Button } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home/Home";
import Result from "./Result/Result";
import Detail from "./Result/Detail";
import Statistics from "./Result/Statistics";
import Main from "./Admin/Main";
import Event from "./Admin/Event"; 
import Edit from "./Admin/Edit"; 
import Submit from "./Admin/Submit"; 
import Staff from "./Admin/Staff" 
import Addcandidate from "./Admin/Addcandidate";
import Adduser from "./Admin/Adduser" 
import EditEvent from "./Admin/EditEvent"; 
import Approve from "./Admin/Approve"; 
import DeleteCan from "./Admin/DeleteCan";
import Usermain  from "./User/Usermain";
import Election from "./User/Election";
import Result_user from "./Admin/Result_user";
import StaffCreate from "./Admin/StaffCreate";

import Testimage from "./Home/Testimage";

 

function App() {
  return (
    <div className="App">
      <Routes>  
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Home />} />
        <Route path="/Result" element={<Result />} />
        <Route path="/Detail" element={<Detail />} />
        <Route path="/Statistics" element={<Statistics />} />
        <Route path="/MainAdmin" element={<Main/>} />
        <Route path="/Event" element={<Event/>} />
        <Route path="/Edit" element={<Edit/>} />
        <Route path="/Submit" element={<Submit/>} /> 
        <Route path="/Staff" element={<Staff/>} />
        <Route path="/Event/Addcandidate" element={<Addcandidate/>} /> 
        <Route path="/Adduser" element={<Adduser/>} />   
        <Route path="/EditEvent" element={<EditEvent/>} />  
        <Route path="/DeleteCan" element={<DeleteCan/>} />  
        <Route path="/Approve" element={<Approve/>} />  
        <Route path="/Usermain" element={<Usermain/>} />   
        <Route path="/Election" element={<Election/>} />   
        <Route path="/Result_user" element={<Result_user/>} />   
        <Route path="/Staff/StaffCreate" element={<StaffCreate/>} />   
        <Route path="/Testimage" element={<Testimage/>} />   
        
      </Routes>
    </div>
  );








  function Error() {
    return (
      <div>
        <nav>
          <ul>
            <Link to="/">Home</Link>
          </ul>
        </nav>
      </div>
    );
  }
}
export default App;
