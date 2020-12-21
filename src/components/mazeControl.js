import React, { Component } from "react";
import { MazeManager } from "./mazeManager.js";

export default class MazeControl extends Component {
  constructor(props) {
    super(props);

    MazeManager.initialize(this.props.form["width"], this.props.form["height"]);

    this.state = {
      width: this.props.form["width"] || 10,
      height: this.props.form["height"] || 10,
      grid: this.gridElementsByNumbers(),
    };
  }

  grid() {
    this.setState({
      grid: this.gridElementsByNumbers(),
    });
  }

  gridElementsByNumbers() {
    let grid_with_numbers = this.gridNumbers();
    var elements = [];

    for (var y = 0; y < grid_with_numbers.length; y++) {
      for (var x = 0; x < grid_with_numbers[0].length; x++) {
        if (grid_with_numbers[y][x] === 0) {
          elements.push(<div className="cell open"></div>);
        }
        if (grid_with_numbers[y][x] === "n") {
          elements.push(<div className="cell closed"></div>);
        }
      }
      elements.push(<div className="clear"></div>);
    }

    return elements;
  }

  gridNumbers() {
    var grid_cells = [];
    // Initialize cells to 0.
    for (var y = 0; y < MazeManager.grid.length * 2 + 1; y++) {
      for (var x = 0; x < MazeManager.grid[0].length * 2 + 1; x++) {
        grid_cells[y] = grid_cells[y] || [];
        if (y === 0) {
          //Initialize top border
          grid_cells[y][x] = "n";
        } else {
          grid_cells[y][x] = 0;
        }
      }
    }

    let x_grid = 0;
    let y_grid = 0;

    for (var y = 0; y < MazeManager.grid.length; y++) {
      grid_cells[2 * y][0] = "n";
      grid_cells[2 * y + 1][0] = "n";

      for (var x = 0; x < MazeManager.grid[0].length; x++) {
        //grid indexes
        x_grid = x * 2 + 1;
        y_grid = y * 2 + 1;
        // Add a cell for the room.
        grid_cells[y_grid][x_grid] = 0;
        if (
          (MazeManager.grid[y][x] & MazeManager.DIRECTION.BOTTOM) ===
          MazeManager.DIRECTION.BOTTOM
        ) {
          // Open a passage to the south.
          grid_cells[y_grid + 1][x_grid] = 0;
        } else {
          // Close a passage to the south.
          grid_cells[y_grid + 1][x_grid] = "n";
        }

        // Add closed passage to next row between rooms.
        grid_cells[y_grid + 1][x_grid + 1] = "n";

        if (
          (MazeManager.grid[y][x] & MazeManager.DIRECTION.RIGHT) ===
          MazeManager.DIRECTION.RIGHT
        ) {
          // Open a passage to the east.
          grid_cells[y_grid][x_grid + 1] = 0;
        } else {
          // Close a passage to the east.
          grid_cells[y_grid][x_grid + 1] = "n";
        }
      }
    }
    grid_cells[MazeManager.grid.length * 2][0] = "n";
    console.log("grid_cells");
    console.log(grid_cells);
    return grid_cells;
  }

  redraw = (event) => {
    MazeManager.initialize(this.state.width, this.state.height);
    this.grid();
  };

  componentWillReceiveProps(nextProps) {
    // Update maze when width or height property changes.
    this.setState(
      { width: nextProps.width, height: nextProps.height },
      function () {
        this.redraw();
      }
    );
  }

  render() {
    return (
      <div className="maze">
        <div>{this.state.grid}</div>
      </div>
    );
  }
}
