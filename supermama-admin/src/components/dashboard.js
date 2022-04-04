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
import {
  // main component
  Chart,
  // graphs
  Bars,
  Cloud,
  Dots,
  Labels,
  Lines,
  Pies,
  RadialLines,
  Ticks,
  Title,
  // wrappers
  Layer,
  Animate,
  Transform,
  Handlers,
  // helpers
  DropShadow,
  Gradient,
} from "rumble-charts";
import {
  Button,
  Overlay,
  Popover,
  Header,
  Row,
  Container,
  Col,
} from "react-bootstrap";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  const [users, setUsers] = useState("");

  useEffect(() => {
    const q = query(collection(db, "users"));
    onSnapshot(q, (querySnapshot) => {
      setUsers(querySnapshot.size);
    });
  }, []);

  const [ent, setEnt] = useState("");
  useEffect(() => {
    const q = query(collection(db, "entertainment"));
    onSnapshot(q, (querySnapshot) => {
      setEnt(querySnapshot.size);
    });
  }, []);

  const [feed, setFeed] = useState("");
  useEffect(() => {
    const q = query(collection(db, "feed"));
    onSnapshot(q, (querySnapshot) => {
      setFeed(querySnapshot.size);
    });
  }, []);

  const [forum, setForum] = useState("");
  useEffect(() => {
    const q = query(collection(db, "forums"));
    onSnapshot(q, (querySnapshot) => {
      setForum(querySnapshot.size);
    });
  }, []);

  const [verify, setVerify] = useState("");
  useEffect(() => {
    const q = query(
      collection(db, "verifyPro"),
      where("status", "==", "Verified")
    );
    onSnapshot(q, (querySnapshot) => {
      setVerify(querySnapshot.size);
    });
  }, []);

  const [forumCatH, setForumCatH] = useState("");
  useEffect(() => {
    const q = query(
      collection(db, "forums"),
      where("category", "==", "Healthcare"),
      where("approve", "==", "approved")
    );
    onSnapshot(q, (querySnapshot) => {
      setForumCatH(querySnapshot.size);
    });
  }, []);

  const [food, setFood] = useState("");
  useEffect(() => {
    const q = query(
      collection(db, "product"),
      where("category", "==", "Food"),
      where("approve", "==", "approved")
    );
    onSnapshot(q, (querySnapshot) => {
      setFood(querySnapshot.size);
    });
  }, []);

  const [balloon, setBalloon] = useState("");
  useEffect(() => {
    const q = query(
      collection(db, "product"),
      where("category", "==", "Balloon"),
      where("approve", "==", "approved")
    );
    onSnapshot(q, (querySnapshot) => {
      setBalloon(querySnapshot.size);
    });
  }, []);

  const [cake, setCake] = useState("");
  useEffect(() => {
    const q = query(
      collection(db, "product"),
      where("category", "==", "Cake"),
      where("approve", "==", "approved")
    );
    onSnapshot(q, (querySnapshot) => {
      setCake(querySnapshot.size);
    });
  }, []);

  const [artcraft, setArtCraft] = useState("");
  useEffect(() => {
    const q = query(
      collection(db, "product"),
      where("category", "==", "Art & Craft"),
      where("approve", "==", "approved")
    );
    onSnapshot(q, (querySnapshot) => {
      setArtCraft(querySnapshot.size);
    });
  }, []);

  const [toy, setToy] = useState("");
  useEffect(() => {
    const q = query(
      collection(db, "product"),
      where("category", "==", "Toy"),
      where("approve", "==", "approved")
    );
    onSnapshot(q, (querySnapshot) => {
      setToy(querySnapshot.size);
    });
  }, []);

  const [container, setContainer] = useState("");
  useEffect(() => {
    const q = query(
      collection(db, "product"),
      where("category", "==", "Container"),
      where("approve", "==", "approved")
    );
    onSnapshot(q, (querySnapshot) => {
      setContainer(querySnapshot.size);
    });
  }, []);

  const [payment, setPayment] = useState("");
  useEffect(() => {
    const q = query(collection(db, "cart"), where("payment", "==", true));
    onSnapshot(q, (querySnapshot) => {
      setPayment(querySnapshot.size);
    });
  }, []);

  const [paymentF, setPaymentF] = useState("");
  useEffect(() => {
    const q = query(collection(db, "cart"), where("payment", "==", false));
    onSnapshot(q, (querySnapshot) => {
      setPaymentF(querySnapshot.size);
    });
  }, []);

  const series = [
    { name: "Entertainments", data: [ent], color: "	#FFC0CB" },
    { name: "Feeds", data: [feed], color: "#FFB6C1" },
    { name: "Forums", data: [forum], color: "	#FF69B4" },
  ];

  const series1 = [
    { name: "Verified User", data: [verify], color: "red" },
    { name: "Normal User", data: [users], color: "red" },
  ];

  const series2 = [
    { name: "Food", data: [food], color: "#A10559" },
    { name: "Balloon", data: [balloon], color: "#A10559" },
    { name: "Cake", data: [cake], color: "#A10559" },
    { name: "Art&Craft", data: [artcraft], color: "#A10559" },
    { name: "Toy", data: [toy], color: "#A10559" },
    { name: "Container", data: [container], color: "#A10559" },
  ];

  const series3 = [{ data: [payment, paymentF] }];

  return (
    <>
      <div>
        <div>
          <Container>
            <Row>
              <Col sm>
                <h3>Total Posts Based On Types</h3>
                <Chart width={400} height={300} series={series} minY={0}>
                  <Layer width="80%" height="80%" position="middle center">
                    <Transform method="transpose">
                      <Ticks
                        axis="y"
                        lineLength="100%"
                        lineVisible
                        lineStyle={{ stroke: "lightgray" }}
                        labelStyle={{
                          textAnchor: "end",
                          dominantBaseline: "middle",
                          fill: "#485465",
                        }}
                        labelAttributes={{ x: -5 }}
                      />
                      <Ticks
                        ticks={{ minDistance: 1 }}
                        axis="x"
                        label={({ index, props }) => series[index].name}
                        labelStyle={{
                          textAnchor: "middle",
                          dominantBaseline: "text-before-edge",
                          fill: "#485465",
                        }}
                        labelAttributes={{ y: 3 }}
                      />
                      <Bars
                        barAttributes={({ seriesIndex }) => ({
                          fill: series[seriesIndex].color,
                        })}
                        innerPadding="4.5%"
                        groupPadding="3%"
                        opacity={0.9}
                      />
                    </Transform>
                  </Layer>
                </Chart>
              </Col>
              <Col sm>
                <h3>Number of User Types</h3>
                <Chart width={400} height={300} series={series1} minY={0}>
                  <Layer width="80%" height="80%" position="middle center">
                    <Transform method="transpose">
                      <Ticks
                        axis="y"
                        lineLength="100%"
                        lineVisible
                        lineStyle={{ stroke: "lightgray" }}
                        labelStyle={{
                          textAnchor: "end",
                          dominantBaseline: "middle",
                          fill: "#485465",
                        }}
                        labelAttributes={{ x: -5 }}
                      />
                      <Ticks
                        ticks={{ minDistance: 1 }}
                        axis="x"
                        label={({ index, props }) => series1[index].name}
                        labelStyle={{
                          textAnchor: "middle",
                          dominantBaseline: "text-before-edge",
                          fill: "#485465",
                        }}
                        labelAttributes={{ y: 3 }}
                      />
                      <Bars
                        barAttributes={({ seriesIndex }) => ({
                          fill: series1[seriesIndex].color,
                        })}
                        innerPadding="4.5%"
                        groupPadding="3%"
                        opacity={0.9}
                      />
                    </Transform>
                  </Layer>
                </Chart>
              </Col>
            </Row>
            <Row>
              <Col sm>
                <h3>Number of Product Approved for Sell Based on Category</h3>
                <Chart width={400} height={300} series={series2} minY={0}>
                  <Layer width="80%" height="80%" position="middle center">
                    <Transform method="transpose">
                      <Ticks
                        axis="y"
                        lineLength="100%"
                        lineVisible
                        lineStyle={{ stroke: "lightgray" }}
                        labelStyle={{
                          textAnchor: "end",
                          dominantBaseline: "middle",
                          fill: "#485465",
                        }}
                        labelAttributes={{ x: -5 }}
                      />
                      <Ticks
                        ticks={{ minDistance: 1 }}
                        axis="x"
                        label={({ index, props }) => series2[index].name}
                        labelStyle={{
                          textAnchor: "middle",
                          dominantBaseline: "text-before-edge",
                          fill: "#485465",
                        }}
                        labelAttributes={{ y: 3 }}
                      />
                      <Bars
                        barAttributes={({ seriesIndex }) => ({
                          fill: series2[seriesIndex].color,
                        })}
                        innerPadding="4.5%"
                        groupPadding="3%"
                        opacity={0.9}
                      />
                    </Transform>
                  </Layer>
                </Chart>
              </Col>
              <Col sm>
                <h3>Total Valid and Non-Valid Payment Sales Records</h3>
                <Chart width={400} height={300} series={series3}>
                  <Transform method={["transpose", "stack"]}>
                    <Pies combined={true}   />
                  </Transform>
                </Chart>
                <br/>
                <h6>Dark blue - represent valid</h6>
                <h6>Light blue - represent non-valid</h6>
              </Col>
            </Row>
            <br />
          </Container>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
