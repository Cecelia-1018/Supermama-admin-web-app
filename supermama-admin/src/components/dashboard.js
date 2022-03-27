// import React from 'react';
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  onSnapshot,
  getDocs,
  where,
} from "firebase/firestore";
import { auth, db, logout } from "../firebase";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "users"));
    onSnapshot(q, (querySnapshot) => {
      setUsers(
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
        Logged in as
        {/* <div>{name}</div> */}
        <text>"Admin"</text>
        <div>
          {/* <h1>This is dashboard Page</h1> */}
          {users.map((user) => (
            <h2> {user.data.name} </h2>

            //   {user.data.name}
          ))}
          <button className="dashboard__btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
