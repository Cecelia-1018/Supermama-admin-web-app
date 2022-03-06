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
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
//Calling Bootstrap 4.5 css
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "material-table";

function VerifyFeed() {
  const [feeds, setFeeds] = useState([]);
  // const firestoreQuery = {
  //     collection: "feed",
  //     where: [
  //       ["post", "==", false],

  //     ],

  //     limit: 50
  //   };
  // const [open, setOpen] = useState(false);
  // const handleDetailsClose = () => {
  //     setOpen(!open);
  // };
  // useFirestoreConnect(() => [firestoreQuery]);

  // const feed = useSelector(state => state.firestore.feed);

  // if (!isLoaded(feed)){
  //     return "Loading";
  // }

  // if (isEmpty(feed)){
  //     return "No new feed";
  // }

  // console.debug(feed[1]);
  // const columns = [
  //     {title: "Feed Id", field: "feedId"},
  //     {title: "Username", field: "username"},
  //     {title: "Image", export: false, field:"image",
  // render: rowData => (
  //     <image src={rowData.image} alt="image" style={{width: 50, borderRadius: 10}}/>
  // )}
  // ];

  // Set the "capital" field of the city 'DC'
  function updateFeed(id) {
    updateDoc(doc(db, "feed", id), {
      post: true,
    });
  }
  function deleteFeed(id) {
    deleteDoc(doc(db, "feed", id));
  }

  useEffect(() => {
    const q = query(collection(db, "feed"), where("post", "==", false));
    // const snapshot = await citiesRef.where("post", "==", false).get();
    onSnapshot(q, (querySnapshot) => {
      setFeeds(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  if (isEmpty(feeds)) {
    return "No new feed";
  }
  return (
    <div>
      <div className="container">
        <table id="example" class="display table">
          <thead class="thead-dark">
            <tr>
              <th>Feed Id</th>
              <th>Username</th>
              <th>Content</th>
              <th>Image</th>
              <th>Verification</th>
            </tr>
          </thead>
          <tbody>
            {feeds.map((feeds) => (
              <tr>
                <td>{feeds.id}</td>
                <td>{feeds.data.username}</td>
                <td align="left">
                  Title: <br />
                  {feeds.data.title}
                  <br /> Description: <br />
                  {feeds.data.description} <br />
                  Detail: <br />
                  {feeds.data.details} <br />
                  Hashtag: <br />
                  {feeds.data.hashtag}
                </td>
                <td>
                  <img
                    src={feeds.data.image}
                    style={{ width: 150, height: 150 }}
                  />
                </td>
                <td>
                  <br />
                  <button onClick={updateFeed.bind(this, feeds.id)}>
                    Approve
                  </button>
                  <br />
                  <br />
                  <button onClick={deleteFeed.bind(this, feeds.id)}>
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

export default VerifyFeed;
