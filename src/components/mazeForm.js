import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";

class MazeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        width: 0,
        height: 0,
        startX: 0,
        startY: 0,
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

  handleSubmit = (event) => {
    /*let form = event.target;
    let formValues = {
      width: parseInt(form.elements.width.value),
      height: parseInt(form.elements.height.value),
    };*/
    this.isFormValid();
    event.preventDefault();
  };

  isFormValid = () => {
    const { width, height } = this.state.form;
    let v = width < 36 && width > 9 && height < 36 && height > 9;
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
          <Form.Row>
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
                    (Width must be between 10 and 35)
                  </div>
                </div>
              </Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Enter size"
                name="width"
                onChange={this.handleWidthChange}
                isInvalid={form.width < 10 || form.width > 35}
                disabled={isFormValid}
              />
              <Form.Control.Feedback type="invalid">
                Maze width must be between 10 and 35
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
                    (Height must be between 10 and 35)
                  </div>
                </div>
              </Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Enter Height"
                name="height"
                isInvalid={form.height < 10 || form.height > 35}
                onChange={this.handleHeightChange}
                disabled={isFormValid}
              />
              <Form.Control.Feedback type="invalid">
                Maze height must be between 10 and 35
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
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
                  <option>{item}</option>
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
                  <option>{item}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit" disabled={isFormValid}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default MazeForm;
