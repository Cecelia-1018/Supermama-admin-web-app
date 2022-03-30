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

  const [users, setUsers] = useState('');

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
    const q = query(collection(db, "verifyPro"),where("status","==","Verified"));
    onSnapshot(q, (querySnapshot) => {
      setVerify(querySnapshot.size);
    });
  }, []);

  const [forumCatH, setForumCatH] = useState("");
  useEffect(() => {
    const q = query(collection(db, "forums"),where("category","==","Healthcare"));
    onSnapshot(q, (querySnapshot) => {
      setForumCatH(querySnapshot.size);
    });
  }, []);

  

  const series = [
    { name: "Entertainments", data: [ent], color: "	#FFC0CB" },
    { name: "Feeds", data: [feed], color: "#FFB6C1" },
    { name: "Forums", data: [forum], color: "	#FF69B4" },
  ];

  const series1 = [
    { name: "Verified User", data: [verify], color: "red" },
    { name: "Normal User", data: [users], color: "#FFB6C1" },
   
  ];
//a 'Education', b 'Food', c 'Female Disease', d'Heathcare', e'Life',f'Pregnancy',g'Parenting',h'Other'
  const series2 = [
    { name: "a", data: [3], color: "blue" },
    { name: "b", data: [5], color: "blue" },
    { name: "c", data: [7], color: "blue" },
    { name: "d", data: [forumCatH], color: "blue" },
    { name: "e", data: [4], color: "blue" },
    { name: "f", data: [7], color: "blue" },
    { name: "g", data: [8], color: "blue" },
    { name: "h", data: [7], color: "blue" },
   
   
  ];

  return (
    <>
      <div>
        {/* Logged in as
        {/* <div>{name}</div> */}
        {/* <text>"Admin"</text> */}
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
              <Col sm>
                <h3>Hot Categories Discussed on Forum</h3>
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
            </Row>
            <br />
            {/* <Row>
              <Col sm>
                <h3>Current Popular Questions on Forum</h3>
                <Chart
                  width={600}
                  height={300}
                  series={[
                    {
                      data: [1, 2, 3],
                      name: "John",
                    },
                    {
                      data: [5, 7, 11],
                      name: "Jane",
                    },
                    {
                      data: [13, 17, 19],
                      name: "James",
                    },
                  ]}
                  minY={0}
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: "0.75em",
                  }}
                >
                  <Layer width="80%" height="90%" position="top center">
                    <Ticks
                      axis="y"
                      lineLength="100%"
                      lineVisible
                      lineStyle={{
                        stroke: "lightgray",
                      }}
                      labelStyle={{
                        dominantBaseline: "middle",
                        fill: "lightgray",
                        textAnchor: "end",
                      }}
                      labelAttributes={{
                        x: -5,
                      }}
                    />
                    <Ticks
                      axis="x"
                      label={function noRefCheck() {}}
                      labelStyle={{
                        dominantBaseline: "text-before-edge",
                        fill: "lightgray",
                        textAnchor: "middle",
                      }}
                      labelAttributes={{
                        y: 3,
                      }}
                    />
                    <Bars groupPadding="3%" innerPadding="0.5%" />
                  </Layer>
                </Chart>
              </Col>
              <Col sm>
                <h3>Current Popular Posts on Entertainments</h3>
                <Chart
                  width={600}
                  height={300}
                  series={[
                    {
                      data: [1, 2, 3],
                      name: "John",
                    },
                    {
                      data: [5, 7, 11],
                      name: "Jane",
                    },
                    {
                      data: [13, 17, 19],
                      name: "James",
                    },
                  ]}
                  minY={0}
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: "0.75em",
                  }}
                >
                  <Layer width="80%" height="90%" position="top center">
                    <Ticks
                      axis="y"
                      lineLength="100%"
                      lineVisible
                      lineStyle={{
                        stroke: "lightgray",
                      }}
                      labelStyle={{
                        dominantBaseline: "middle",
                        fill: "lightgray",
                        textAnchor: "end",
                      }}
                      labelAttributes={{
                        x: -5,
                      }}
                    />
                    <Ticks
                      axis="x"
                      label={function noRefCheck() {}}
                      labelStyle={{
                        dominantBaseline: "text-before-edge",
                        fill: "lightgray",
                        textAnchor: "middle",
                      }}
                      labelAttributes={{
                        y: 3,
                      }}
                    />
                    <Bars groupPadding="3%" innerPadding="0.5%" />
                  </Layer>
                </Chart>
              </Col>
            </Row> */}
          </Container>
          {/* {users.map((user) => (
            <h2> {user.data.name} </h2>

            //   {user.data.name}
          ))} */}
          {/* <button className="dashboard__btn" onClick={logout}>
            Logout
          </button> */}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
