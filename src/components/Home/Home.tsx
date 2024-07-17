// Layout.tsx
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Form } from "react-bootstrap";
import { User } from "../Utils/Constants";
import { addUser_Redux, deleteUser_Redux, RootState } from "../Redux/UserSlice";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmitForm: SubmitHandler<User> = (data) => {
    const newUser = {
      ...data,
    };
    dispatch(addUser_Redux(newUser));
    alert("User added successfully");
  };

  const users = useSelector((state: RootState) => state.users.users);

  const handleDelete = (id: string) => {
    dispatch(deleteUser_Redux(id));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <Form
          onSubmit={handleSubmit(onSubmitForm)}
          className="p-4 border border-dark rounded"
        >
          <div className="mb-12">
            <h3>Add User - Redux </h3>
          </div>

          <Form.Group className="mb-12 row p-2">
            <Form.Label htmlFor="firstname" className="col-sm-4 col-form-label">
              First Name
            </Form.Label>
            <div className="col-sm-6">
              <Form.Control
                type="text"
                id="firstname"
                {...register("firstname", {
                  required: "First name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Only alphabetic characters are allowed",
                  },
                })}
                isInvalid={!!errors.firstname}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstname?.message}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <Form.Group className="mb-12 row p-2">
            <Form.Label htmlFor="lastname" className="col-sm-4 col-form-label">
              Last Name
            </Form.Label>
            <div className="col-sm-6">
              <Form.Control
                type="text"
                id="lastname"
                {...register("lastname", {
                  required: "Last name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Only alphabetic characters are allowed",
                  },
                })}
                isInvalid={!!errors.lastname}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastname?.message}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <Form.Group className="mb-12 row p-2">
            <Form.Label htmlFor="email" className="col-sm-4 col-form-label">
              email
            </Form.Label>
            <div className="col-sm-6">
              <Form.Control
                type="text"
                id="email"
                {...register("email", {
                  required: "email is required",
                })}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <Form.Group className="mb-12 row p-2">
            <Form.Label htmlFor="number" className="col-sm-4 col-form-label">
              number
            </Form.Label>
            <div className="col-sm-6">
              <Form.Control
                type="number"
                id="number"
                {...register("number", {
                  required: "number is required",
                })}
                isInvalid={!!errors.number}
              />
              <Form.Control.Feedback type="invalid">
                {errors.number?.message}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <div className="mb-12 row p-2">
            <div className="col-sm-6 offset-sm-2">
              <Button type="submit" className="btn btn-primary">
                Add
              </Button>
            </div>
          </div>
        </Form>
        <br />
        <div className="row">
          {users.map((user, index) => (
            <div key={index} className="col-md-4 mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>
                    {user.firstname} {user.lastname}
                  </Card.Title>
                  <Card.Text>
                    Email: {user.email}
                    <br />
                    {user.number}
                  </Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(user.email)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
