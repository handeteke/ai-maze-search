import React, { Component } from "react";
import { MazeCreator } from "./mazeCreator.js";
import { GiSquirrel } from "react-icons/gi";
import { GiBrickWall, GiAcorn } from "react-icons/gi";
import { FaCat, FaDog, FaKiwiBird } from "react-icons/fa";

export default class MazeControl extends Component {
  constructor(props) {
    super(props);

    MazeCreator.initialize(this.props.form);

    this.props.grid(MazeCreator.grid);

    this.state = {
      grid: this.getGridUI(),
    };
  }

  grid() {
    this.setState({
      grid: this.getGridUI(),
    });
  }

  getGridUI() {
    let grid = MazeCreator.grid;
    var elements = [];
    let key = 0;

    for (var y = 0; y < grid.length; y++) {
      for (var x = 0; x < grid[0].length; x++) {
        if (grid[y][x] === 0) {
          elements.push(<div key={key} className="cell open"></div>);
        }
        if (grid[y][x] === "w") {
          elements.push(
            <div key={key} className="cell wall">
              <GiBrickWall />
            </div>
          );
        }
        if (grid[y][x] === "s") {
          elements.push(
            <div key={key} className="cell start">
              <GiSquirrel />
            </div>
          );
        }
        if (grid[y][x] === "c") {
          elements.push(
            <div key={key} className="cell cat">
              <FaCat />
            </div>
          );
        }
        if (grid[y][x] === "d") {
          elements.push(
            <div key={key} className="cell dog">
              <FaDog />
            </div>
          );
        }
        if (grid[y][x] === "b") {
          elements.push(
            <div key={key} className="cell bird">
              <FaKiwiBird />
            </div>
          );
        }
        if (grid[y][x] === "g") {
          elements.push(
            <div key={key} className="cell goal">
              <GiAcorn />
            </div>
          );
        }
        key = key + 1;
      }
      elements.push(<div key={key} className="clear"></div>);
      key = key + 1;
    }
    return elements;
  }
  
  isMazeCreated = () => {
    return MazeCreator.IS_SUCCESSFULL;
  };

  render() {
    return (
      <div className="maze">
        {MazeCreator.IS_SUCCESSFULL ? (
          <div>{this.state.grid}</div>
        ) : (
          <div style={{ color: "red", fontSize: "2em" }}>
            THIS MAZE CANNOT BE CREATED
          </div>
        )}
      </div>
    );
  }
}
