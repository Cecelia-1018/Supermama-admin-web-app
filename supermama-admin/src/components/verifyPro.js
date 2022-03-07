import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  where,
  QuerySnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { Button } from "react-bootstrap";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
//Calling Bootstrap 4.5 css
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "material-table";

function VerifyPro(){
    const [verifyPro, SetVerifyPro] = useState([]);
    
    useEffect(() => {
       const q = query(collection(db, "verifyPro"));
       onSnapshot(q, (querySnapshot) => {
         SetVerifyPro(
           querySnapshot.docs.map((doc) => ({
             id: doc.id,
             data: doc.data(),
           }))
         );
       });
     }, []);

     if(isEmpty(verifyPro)) {
       return "No verification";
     }

    return (
      <div>
      <div className="container">
        <table id="example" class="display table">
          <thead class="thead-dark">
            <tr>
              <th>Detail</th>
              <th>Certificate</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {verifyPro.map((verify) => (
             <tr>
              <td align="left">
                  <b>VerifyID:</b> <br />
                  {verify.id}
                  <br /><b>User Id:</b> <br />
                  {verify.data.userId} <br />
                  <b>Professional Field:</b> <br />
                  {verify.data.proField} <br />
                  
              </td>

             <td>Picture</td>

             <td>{verify.data.status}</td>
             
             <td>
                  
             <Button variant="outline-primary">Verify</Button>
                  <br />
                  <br />
                  <Button variant="danger">Reject</Button>
                </td>

             </tr>
            
            ))} 
        
     
          
    
          </tbody>
         </table>
      </div>
     </div>
       
        
    )
}

export default VerifyPro;
