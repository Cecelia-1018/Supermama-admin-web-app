import React, { useState, useEffect, useRef } from "react";
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
import { Button, Overlay, Popover, Header } from "react-bootstrap";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
//Calling Bootstrap 4.5 css
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "material-table";
import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION,
} from "react-image-magnifiers";

function VerifyPro() {
  const [verifyPro, SetVerifyPro] = useState([]);

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

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

  if (isEmpty(verifyPro)) {
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
                  <br />
                  <b>User Id:</b> <br />
                  {verify.data.userId} <br />
                  <b>Professional Field:</b> <br />
                  {verify.data.proField} <br />
                </td>

                <td align="center">
                <GlassMagnifier
                            imageSrc={verify.data.photoURL}
                            imageAlt="Certificate"
                            style={{ width: 500, height: 600 ,}}
                            largeImageSrc={verify.data.photoURL} // Optional
                            
                          /> 
                </td>

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
  );
}

export default VerifyPro;
