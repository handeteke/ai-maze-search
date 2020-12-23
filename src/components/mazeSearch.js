import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { MazeSearcher } from "./mazeSearcher.js";

export default class MazeSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchOptions: ["DFS", "BFS", "A*", "Greedy Best First Search"],
      selectedSearch: "DFS",
      grid: this.setGridValues(),
      searchResults: [],
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

  getPathCost = (searchedGrid) => {
    const { grid } = this.state;
    let cost = 0;
    for (var y = 0; y < searchedGrid.length; y++) {
      for (var x = 0; x < searchedGrid[0].length; x++) {
        if (searchedGrid[y][x] === 2) {
          if (grid[y][x] !== "s" && grid[y][x] !== "g") {
            cost = cost + grid[y][x];
          }
        }
      }
    }
    return cost;
  };

  getVisitedCount = (searchedGrid) => {
    const { grid } = this.state;
    console.log("state grid");
    console.log(grid);
    console.log("searchedGrid");
    console.log(searchedGrid);
    let count = 0;
    for (var y = 0; y < searchedGrid.length; y++) {
      for (var x = 0; x < searchedGrid[0].length; x++) {
        if (searchedGrid[y][x] === 2 || searchedGrid[y][x] === 1) {
          if (grid[y][x] !== "s" && grid[y][x] !== "g") {
            count = count + 1;
          }
        }
      }
    }
    return count;
  };

  getDfsSearchResult = () => {
    const { searchResults } = this.state;
    let searchedGrid = MazeSearcher.getDfsSearchedGrid();
    let results = searchResults;
    results.push(
      <div
        style={{
          marginLeft: "2em",
          fontWeight: "bold",
          fontSize: "1.1em",
          marginBottom: "2em",
        }}
      >
        <div>DFS PATH COST: {this.getPathCost(searchedGrid)}</div>
        <div>DFS VISITED CELL COUNT: {this.getVisitedCount(searchedGrid)}</div>
      </div>
    );
    this.setState({
      searchResults: results,
    });
  };

  getBfsSearchResult = () => {
    const { searchResults } = this.state;
    let searchedGrid = MazeSearcher.getBfsSearchedGrid();
    let results = searchResults;
    results.push(
      <div
        style={{
          marginLeft: "2em",
          fontWeight: "bold",
          fontSize: "1.1em",
          marginBottom: "2em",
        }}
      >
        <div>BFS PATH COST: {this.getPathCost(searchedGrid)}</div>
        <div>BFS VISITED CELL COUNT: {this.getVisitedCount(searchedGrid)}</div>
      </div>
    );
    this.setState({
      searchResults: results,
    });
  };

  getAStarSearchResult = () => {
    const { searchResults } = this.state;
    let searchedGrid = MazeSearcher.getAStarSearchedGrid();
    let results = searchResults;

    results.push(
      <div
        style={{
          marginLeft: "2em",
          fontWeight: "bold",
          fontSize: "1.1em",
          marginBottom: "2em",
        }}
      >
        <div>A* PATH COST: {this.getPathCost(searchedGrid)}</div>
        <div>A* VISITED CELL COUNT: {this.getVisitedCount(searchedGrid)}</div>
      </div>
    );
    this.setState({
      searchResults: results,
    });
  };

  getGreedyBestFirstSearchResult = () => {
    const { searchResults } = this.state;
    let searchedGrid = MazeSearcher.getGreedyBestFirstSearchedGrid();
    let results = searchResults;

    results.push(
      <div
        style={{
          marginLeft: "2em",
          fontWeight: "bold",
          fontSize: "1.1em",
          marginBottom: "2em",
        }}
      >
        <div>
          GREEDY BEST FIRST SEARCH PATH COST: {this.getPathCost(searchedGrid)}
        </div>
        <div>
          GREEDY BEST FIRST SEARCH VISITED CELL COUNT:{" "}
          {this.getVisitedCount(searchedGrid)}
        </div>
      </div>
    );
    this.setState({
      searchResults: results,
    });
  };

  getSearchResults = () => {
    const { selectedSearch } = this.state;
    if (selectedSearch === "DFS") {
      this.getDfsSearchResult();
    }
    if (selectedSearch === "BFS") {
      this.getBfsSearchResult();
    }
    if (selectedSearch === "A*") {
      this.getAStarSearchResult();
    }
    if (selectedSearch === "Greedy Best First Search") {
      this.getGreedyBestFirstSearchResult();
    }
  };

  handleSearchMethodChange = (event) => {
    this.setState({
      selectedSearch: event.target.value,
    });
    event.preventDefault();
  };

  handleGo = (event) => {
    let searchInputGrid = this.state.grid.map(function (arr) {
      return arr.slice();
    });
    MazeSearcher.search(
      searchInputGrid,
      event.target.elements.searchMethod.value
    );
    this.getSearchResults();
    event.preventDefault();
  };

  render() {
    const { searchOptions, searchResults } = this.state;
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
                defaultValue="DFS"
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
        {searchResults.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    );
  }
}
