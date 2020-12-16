import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class MazeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        width: 0,
        height: 0,
      },
      isFormValid: false,
    };
  }

  handleSubmit = (event) => {
    let form = event.target;
    let formValues = {
      width: parseInt(form.elements.width.value),
      height: parseInt(form.elements.height.value),
    };
    this.setState(
      {
        form: formValues,
      },
      () => {
        this.isFormValid();
      }
    );
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

  render() {
    const { form, isFormValid } = this.state;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formMazeCreation">
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
              isInvalid={form.width < 10 || form.width > 35}
              disabled={isFormValid}
            />
            <Form.Control.Feedback type="invalid">
              Maze width must be between 10 and 35
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formMazeCreation">
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
              placeholder="Enter size"
              name="height"
              isInvalid={form.height < 10 || form.height > 35}
              disabled={isFormValid}
            />
            <Form.Control.Feedback type="invalid">
              Maze height must be between 10 and 35
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={isFormValid}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default MazeForm;
