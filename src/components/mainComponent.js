import React, { Component } from "react";

class MainComponent extends Component {
  state = {};
  render() {
    return (
      <div style={{ display: "flex", background: "#ffc10712" }}>
        <div
          style={{
            margin: "3em",
            display: "flex",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <p
            style={{
              color: "darksalmon",
              fontSize: "2em",
              fontWeight: "bold",
              margin: "0",
            }}
          >
            Bil 541 Course Project: Maze Search
          </p>
          <p
            style={{ color: "darksalmon", fontSize: "1em", fontWeight: "bold" }}
          >
            Created by Ş. Hande Teke and Ceyda Soylu
          </p>
        </div>
      </div>
    );
  }
}

export default MainComponent;
