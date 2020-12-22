import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { MazeSearcher } from "./mazeSearcher.js";

export default class MazeSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchOptions: ["Recursive Search", "DFS", "BFS", "A*"],
      selectedSearct: "",
      grid: this.setGridValues(),
    };
  }

  setGridValues = () => {
    const { grid } = this.props;
    let newGrid = grid.map(function (arr) {
      return arr.slice();
    });
    for (var y = 0; y < newGrid.length; y++) {
      for (var x = 0; x < newGrid[0].length; x++) {
        if (newGrid[y][x] === 0) {
          newGrid[y][x] = 5;
        }
        if (newGrid[y][x] === "c") {
          newGrid[y][x] = 60;
        }
        if (newGrid[y][x] === "d") {
          newGrid[y][x] = 40;
        }
        if (newGrid[y][x] === "b") {
          newGrid[y][x] = 20;
        }
      }
    }
    return newGrid;
  };

  handleSearchMethodChange = (event) => {
    this.setState({
      selectedSearct: parseInt(event.target.value),
    });
    event.preventDefault();
  };

  handleGo = (event) => {
    MazeSearcher.search(
      this.state.grid,
      event.target.elements.searchMethod.value
    );
    event.preventDefault();
  };

  render() {
    const { searchOptions } = this.state;
    return (
      <div>
        <Form onSubmit={this.handleGo}>
          <Form.Row style={{ marginLeft: "2em" }}>
            <Form.Group as={Col}>
              <Form.Label>
                <div
                  style={{
                    color: "grey",
                    fontSize: "1.2em",
                    fontWeight: "bold",
                  }}
                >
                  Select Search Method
                </div>
              </Form.Label>
              <Form.Control
                as="select"
                defaultValue="Choose..."
                name="searchMethod"
                onChange={this.handleSearchMethodChange}
              >
                {searchOptions.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Button
            variant="primary"
            type="submit"
            style={{ marginLeft: "2em", marginBottom: "3em" }}
          >
            GO
          </Button>
        </Form>
      </div>
    );
  }
}
