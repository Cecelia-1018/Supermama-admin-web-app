// import React from 'react';
import React,{useState, useEffect} from 'react'
import {collection, query, onSnapshot} from "firebase/firestore"
import {db} from '../firebase'

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
    return (
         <>
        <div>
            {/* <h1>This is dashboard Page</h1> */}
             {verifyPro.map((verify) => (
            <h6>  {verify.data.proField} </h6>
            // <h6>  {verify.data.userId} </h6>
            // <h6>  {verify.data.proField} </h6>
        
     
          
        ))}
        </div>
        </>
    )
}

export default VerifyPro;
