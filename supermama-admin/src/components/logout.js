import React, { useState, useEffect } from "react";
import { auth, db, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import image from "./logout.jpg";

function Logout() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);
  return (
    <div>
      <img width="500" height="600" src={image} />
      <div>
        <text>
          --------------------------------------------------------------------------
        </text>
      </div>
      <div>
        <Button
          variant="outline-secondary"
          className="dashboard__btn"
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Logout;
