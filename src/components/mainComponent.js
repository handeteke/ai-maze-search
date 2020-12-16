import React, { Component } from "react";
import MazeForm from "./mazeForm";
import CreateMaze from "./createMaze";

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
      form: {},
    };
  }

  isFormValid = (v) => {
    this.setState({ isFormValid: v });
  };

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
            <CreateMaze form={form}/>
          )
        }
      </div>
    );
  }
}

export default MainComponent;
