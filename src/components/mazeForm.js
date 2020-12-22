import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { GiBrickWall } from "react-icons/gi";
import { FaCat, FaDog, FaKiwiBird } from "react-icons/fa";

class MazeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        width: 0,
        height: 0,
        startX: 0,
        startY: 0,
        wallCount: 0,
        catCount: 0,
        dogCount: 0,
        birdCount: 0,
      },
      isFormValid: false,
    };
  }

  handleWidthChange = (event) => {
    this.setState((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        width: parseInt(event.target.value),
      },
    }));
    event.preventDefault();
  };

  handleHeightChange = (event) => {
    this.setState((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        height: parseInt(event.target.value),
      },
    }));
    event.preventDefault();
  };

  handleStartXChange = (event) => {
    this.setState((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        startX: parseInt(event.target.value) - 1,
      },
    }));
    event.preventDefault();
  };

  handleStartYChange = (event) => {
    this.setState((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        startY: parseInt(event.target.value) - 1,
      },
    }));
    event.preventDefault();
  };

  handleWallCountChange = (event) => {
    this.setState((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        wallCount: parseInt(event.target.value),
      },
    }));
    event.preventDefault();
  };
  handleCatCountChange = (event) => {
    this.setState((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        catCount: parseInt(event.target.value),
      },
    }));
    event.preventDefault();
  };
  handleDogCountChange = (event) => {
    this.setState((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        dogCount: parseInt(event.target.value),
      },
    }));
    event.preventDefault();
  };
  handleBirdCountChange = (event) => {
    this.setState((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        birdCount: parseInt(event.target.value),
      },
    }));
    event.preventDefault();
  };

  handleSubmit = (event) => {
    /*let form = event.target;
    let formValues = {
      width: parseInt(form.elements.width.value),
      height: parseInt(form.elements.height.value),
    };*/
    this.isFormValid();
    event.preventDefault();
    console.log("maze form values:");
    console.log(this.state.form);
  };

  isFormValid = () => {
    const { width, height } = this.state.form;
    let v = width < 41 && width > 1 && height < 41 && height > 1;
    this.setState({
      isFormValid: v,
    });
    this.props.isFormValid(v);
    v && this.props.formData(this.state.form);
  };

  getXOptions = () => {
    const { width } = this.state.form;
    let xOptions = [];
    for (var x = 1; x < width + 1; x++) {
      xOptions.push(x);
    }
    return xOptions;
  };

  getYOptions = () => {
    const { height } = this.state.form;
    let yOptions = [];
    for (var x = 1; x < height + 1; x++) {
      yOptions.push(x);
    }
    return yOptions;
  };

  render() {
    const { form, isFormValid } = this.state;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Row style={{ margin: "2em" }}>
            <Form.Group as={Col}>
              <Form.Label>
                <div>
                  <div
                    style={{
                      color: "grey",
                      fontSize: "1.2em",
                      fontWeight: "bold",
                    }}
                  >
                    Please Enter Maze Width{" "}
                  </div>
                  <div style={{ color: "grey", fontSize: "0.75em" }}>
                    (Width must be between 2 and 40)
                  </div>
                </div>
              </Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Enter size"
                name="width"
                onChange={this.handleWidthChange}
                isInvalid={form.width < 2 || form.width > 40}
                disabled={isFormValid}
              />
              <Form.Control.Feedback type="invalid">
                Maze width must be between 2 and 40
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>
                <div>
                  <div
                    style={{
                      color: "grey",
                      fontSize: "1.2em",
                      fontWeight: "bold",
                    }}
                  >
                    Please Enter Maze Height{" "}
                  </div>
                  <div style={{ color: "grey", fontSize: "0.75em" }}>
                    (Height must be between 2 and 40)
                  </div>
                </div>
              </Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Enter Height"
                name="height"
                isInvalid={form.height < 2 || form.height > 40}
                onChange={this.handleHeightChange}
                disabled={isFormValid}
              />
              <Form.Control.Feedback type="invalid">
                Maze height must be between 2 and 40
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row style={{ margin: "2em" }}>
            <Form.Group as={Col}>
              <Form.Label>
                <div
                  style={{
                    color: "grey",
                    fontSize: "1.2em",
                    fontWeight: "bold",
                  }}
                >
                  Select Start Point X Coordinate
                </div>
              </Form.Label>
              <Form.Control
                as="select"
                defaultValue="Choose..."
                name="startX"
                onChange={this.handleStartXChange}
                disabled={isFormValid}
              >
                {this.getXOptions().map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>
                <div
                  style={{
                    color: "grey",
                    fontSize: "1.2em",
                    fontWeight: "bold",
                  }}
                >
                  Select Start Point Y Coordinate
                </div>
              </Form.Label>
              <Form.Control
                as="select"
                defaultValue="Choose..."
                name="startY"
                onChange={this.handleStartYChange}
                disabled={isFormValid}
              >
                {this.getYOptions().map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row style={{ margin: "2em" }}>
            <Form.Group as={Col}>
              <Form.Label>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "3em",
                      marginRight: "0.5em",
                    }}
                  >
                    <GiBrickWall />
                  </div>
                  <div
                    style={{
                      color: "grey",
                      fontSize: "1.2em",
                      fontWeight: "bold",
                    }}
                  >
                    Please Enter Wall Count
                  </div>
                </div>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter wall count"
                name="wall"
                onChange={this.handleWallCountChange}
                isInvalid={
                  form.wallCount > form.width * form.height ||
                  form.wallCount === form.width * form.height
                }
                disabled={isFormValid}
              />
              <Form.Control.Feedback type="invalid">
                Wall count cannot be more than cell count
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "3em",
                      marginRight: "0.5em",
                      color: "red",
                    }}
                  >
                    <FaCat />
                  </div>
                  <div
                    style={{
                      color: "grey",
                      fontSize: "1.2em",
                      fontWeight: "bold",
                    }}
                  >
                    Please Enter Cat Count
                  </div>
                </div>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter cat count"
                name="cat"
                onChange={this.handleCatCountChange}
                isInvalid={
                  form.catCount > form.width * form.height ||
                  form.catCount === form.width * form.height
                }
                disabled={isFormValid}
              />
              <Form.Control.Feedback type="invalid">
                Cat count cannot be more than cell count
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row style={{ margin: "2em" }}>
            <Form.Group as={Col}>
              <Form.Label>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "3em",
                      marginRight: "0.5em",
                      color: "orange",
                    }}
                  >
                    <FaDog />
                  </div>
                  <div
                    style={{
                      color: "grey",
                      fontSize: "1.2em",
                      fontWeight: "bold",
                    }}
                  >
                    Please Enter Dog Count
                  </div>
                </div>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter dog count"
                name="dog"
                onChange={this.handleDogCountChange}
                isInvalid={
                  form.dogCount > form.width * form.height ||
                  form.dogCount === form.width * form.height
                }
                disabled={isFormValid}
              />
              <Form.Control.Feedback type="invalid">
                Dog count cannot be more than cell count
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "3em",
                      marginRight: "0.5em",
                      color: "#e8d129",
                    }}
                  >
                    <FaKiwiBird />
                  </div>
                  <div
                    style={{
                      color: "grey",
                      fontSize: "1.2em",
                      fontWeight: "bold",
                    }}
                  >
                    Please Enter Bird Count
                  </div>
                </div>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter bird count"
                name="bird"
                onChange={this.handleBirdCountChange}
                isInvalid={
                  form.birdCount > form.width * form.height ||
                  form.birdCount === form.width * form.height
                }
                disabled={isFormValid}
              />
              <Form.Control.Feedback type="invalid">
                Bird count cannot be more than cell count
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Button
            variant="primary"
            type="submit"
            disabled={isFormValid}
            style={{ margin: "2em" }}
          >
            Create Maze
          </Button>
        </Form>
      </div>
    );
  }
}

export default MazeForm;
