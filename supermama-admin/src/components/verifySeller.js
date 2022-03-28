import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
//Calling Bootstrap 4.5 css
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "material-table";

function VerifySeller() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);
  const [products, setProducts] = useState([]);
  function updateFeed(id) {
    updateDoc(doc(db, "product", id), {
      approve: "approved",
    });
  }
  function deleteFeed(id) {
    updateDoc(doc(db, "product", id), {
      approve: "rejected",
    });
  }

  useEffect(() => {
    const q = query(
      collection(db, "product"),
      where("approve", "==", "pending")
    );
    // const snapshot = await citiesRef.where("post", "==", false).get();
    onSnapshot(q, (querySnapshot) => {
      setProducts(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  if (isEmpty(products)) {
    return "No new feed";
  }
  return (
    <div>
      <div className="container">
        <table id="example" class="display table">
          <thead class="thead-dark">
            <tr>
              <th>Product Id</th>
              <th>Username</th>
              <th>Content</th>
              <th>Image</th>
              <th>Verification</th>
            </tr>
          </thead>
          <tbody>
            {products.map((products) => (
              <tr>
                <td>{products.id}</td>
                <td>{products.data.username}</td>
                <td align="left">
                  Category: <br />
                  {products.data.category}
                  <br /> Name: <br />
                  {products.data.name} <br />
                  Detail: <br />
                  {products.data.description} <br />
                  Price: <br />
                  {products.data.price}
                </td>
                <td>
                  <img
                    src={products.data.image}
                    style={{ width: 150, height: 150 }}
                  />
                </td>
                <td>
                  <br />
                  <button onClick={updateFeed.bind(this, products.id)}>
                    Approve
                  </button>
                  <br />
                  <br />
                  <button
                    onClick={() => {
                      deleteFeed.bind(this, products.id);
                    }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VerifySeller;
