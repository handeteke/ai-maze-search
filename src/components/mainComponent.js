import React, { Component } from "react";
import MazeForm from "./mazeForm";
import MazeControl from "./mazeControl";

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
      form: {},
      grid: []
    };
  }

  isFormValid = (v) => {
    this.setState({ isFormValid: v });
  };

  getGrid = (g) => {
    console.log("main component grid");
    console.log(g);
    this.setState({ grid: g });
  }
 
  setForm = (formData) => {
    this.setState({ form: formData });
  };

  render() {
    const { isFormValid, form } = this.state;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "5em",
          marginRight: "5em",
          marginTop: "2em",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            marginBottom: "5em",
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
        <div>
          <MazeForm isFormValid={this.isFormValid} formData={this.setForm} />
        </div>
        {
          isFormValid && (
            <MazeControl form={form} grid={this.props.grid} />
          )
        }
      </div>
    );
  }
}

export default MainComponent;
