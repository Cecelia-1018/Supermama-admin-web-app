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
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
//Calling Bootstrap 4.5 css
import "bootstrap/dist/css/bootstrap.min.css";

function VerifyPost() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);
  const [posts, setPosts] = useState([]);
  function updatePost(id) {
    updateDoc(doc(db, "entertainment", id), {
      post: true,
    });
  }
  function deletePost(id) {
    deleteDoc(doc(db, "entertainment", id));
  }

  useEffect(() => {
    const q = query(
      collection(db, "entertainment"),
      where("post", "==", false)
    );
    // const snapshot = await citiesRef.where("post", "==", false).get();
    onSnapshot(q, (querySnapshot) => {
      setPosts(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  if (isEmpty(posts)) {
    return "No new post";
  }
  return (
    <div>
      <div className="container">
        <table id="example" class="display table">
          <thead class="thead-dark">
            <tr>
              <th>Post Id</th>
              <th>Username</th>
              <th>Content</th>
              <th>Image</th>
              <th>Verification</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((posts) => (
              <tr>
                <td>{posts.id}</td>
                <td>{posts.data.username}</td>
                <td align="left">
                  Description: <br />
                  {posts.data.description} <br />
                  Hashtag: <br />#{posts.data.hashtag}
                </td>
                <td>
                  <img
                    src={posts.data.image}
                    style={{ width: 150, height: 150 }}
                  />
                </td>
                <td>
                  <br />
                  <button onClick={updatePost.bind(this, posts.id)}>
                    Approve
                  </button>
                  <br />
                  <br />
                  <button
                    onClick={() => {
                      if (window.confirm("Delete the item?")) {
                        deletePost.bind(this, posts.id);
                      }
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

export default VerifyPost;
