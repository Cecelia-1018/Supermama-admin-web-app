// import React from 'react';
import React,{useState, useEffect} from 'react'
import {collection, query, onSnapshot} from "firebase/firestore"
import {db} from '../firebase'

function Dashboard(){
  const [users, setUsers] = useState([])

  useEffect(() => {
  const q = query(collection(db, 'users'))
  onSnapshot(q, (querySnapshot) => {
    setUsers(querySnapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
    })))
  })
},[])

    return (
        <>
        <div>
            {/* <h1>This is dashboard Page</h1> */}
             {users.map((user) => (
         <h2>  {user.data.name} </h2>
        
        //   {user.data.name} 
          
        ))}
        </div>
        </>
    )
}

export default Dashboard;
