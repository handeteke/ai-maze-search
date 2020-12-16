import React, { Component } from "react";
import MazeControl from "./mazeControl";

class CreateMaze extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { form } = this.props;
    return (
      <div>
        <div style={{ marginTop: "5em" }}>
          <MazeControl form={form} />
        </div>
      </div>
    );
  }
}

export default CreateMaze;
