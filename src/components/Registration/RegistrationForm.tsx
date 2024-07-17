/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import apiClient from "../../Services/apiClient";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

interface RegisterFormProps {
  onSubmit?: (formData: RegisterFormData) => void;
}

interface RegisterFormData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: Role;
}

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    role: Role.USER, // Default role is USER
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmitForm: SubmitHandler<RegisterFormData> = (data) => {
    apiClient
      .post("/auth/register", data)
      .then((response: any) => {
        console.log("response", response);
        alert("Registration successful");
        navigate("/login");
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.error("Registration failed:", error);
      });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <Form
          onSubmit={handleSubmit(onSubmitForm)}
          className="p-4 border border-dark rounded"
        >
          <div className="mb-12">
            <h3>Registration</h3>
          </div>

          <Form.Group className="mb-12 row p-2">
            <Form.Label htmlFor="firstName" className="col-sm-4 col-form-label">
              First Name
            </Form.Label>
            <div className="col-sm-6">
              <Form.Control
                type="text"
                id="firstName"
                {...register("firstName", {
                  required: "First name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Only alphabetic characters are allowed",
                  },
                })}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName?.message}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <Form.Group className="mb-12 row p-2">
            <Form.Label htmlFor="lastName" className="col-sm-4 col-form-label">
              Last Name
            </Form.Label>
            <div className="col-sm-6">
              <Form.Control
                type="text"
                id="lastName"
                {...register("lastName", {
                  required: "Last name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Only alphabetic characters are allowed",
                  },
                })}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName?.message}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <Form.Group className="mb-12 row p-2">
            <Form.Label htmlFor="username" className="col-sm-4 col-form-label">
              Username
            </Form.Label>
            <div className="col-sm-6">
              <Form.Control
                type="text"
                id="username"
                {...register("username", {
                  required: "Username is required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Only alphabetic characters are allowed",
                  },
                })}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username?.message}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <Form.Group className="mb-12 row p-2">
            <Form.Label htmlFor="password" className="col-sm-4 col-form-label">
              Password
            </Form.Label>
            <div className="col-sm-6">
              <Form.Control
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    message:
                      "Password must be at least 8 characters long, contain at least one numeric digit, one uppercase, and one lowercase letter",
                  },
                })}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <Form.Group className="mb-12 row p-2">
            <Form.Label htmlFor="role" className="col-sm-4 col-form-label">
              Role
            </Form.Label>
            <div className="col-sm-6">
              <Form.Control
                as="select"
                id="role"
                {...register("role", { required: "Role is required" })}
                isInvalid={!!errors.role}
              >
                <option value={Role.USER}>User</option>
                <option value={Role.ADMIN}>Admin</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.role?.message}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <div className="mb-12 row p-2">
            <div className="col-sm-6 offset-sm-2">
              <Button type="submit" className="btn btn-primary">
                Register
              </Button>
            </div>
          </div>
          <div className="mb-12 row p-2">
            <Link to="/login">Already have an account? Login here</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
