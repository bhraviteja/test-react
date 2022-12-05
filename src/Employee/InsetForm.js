import React, { useEffect, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const InsetForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullname: "",
    email: "",
    role: "",
  });

  const { fullname, email } = data;

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(data);

    axios
      .post("http://localhost:8000/api/assignment", data)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        navigate("/");
      })
      .catch(({ response }) => {
        Swal.fire({
          icon: "error",
          text: response.data.message.email,
        });
      });
  };

  return (
    <div>
      <Card style={{ width: "68rem" }}>
        <Card.Body>
          <Link to="/">
            {" "}
            <Button variant="primary">Dashboard</Button>
          </Link>

          <Card.Title className="text-center">Add New Employee</Card.Title>
          <Card>
            <Card.Body>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label> Full Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    onChange={changeHandler}
                    name="fullname"
                    value={fullname}
                    placeholder="Please Enter Full Name"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    onChange={changeHandler}
                    name="email"
                    value={email}
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Example select</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    name="role"
                    onChange={changeHandler}
                  >
                    <option>Select Option</option>
                    <option value="author">Author</option>
                    <option value="editor">Editor</option>
                    <option value="subsciber">Subscriber</option>
                    <option value="administrator">Administrator</option>
                  </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </div>
  );
};

export default InsetForm;
