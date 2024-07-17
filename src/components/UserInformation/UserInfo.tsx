// AddUser.tsx
import React, { useState, useContext, useCallback, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { User } from "../Utils/Constants";
import { Container } from "react-bootstrap";
import UserList from "./UserList";

const UserInfo: React.FC = () => {
  const { users, addUser } = useContext(UserContext);

  const [form, setForm] = useState<User>({
    firstname: "",
    lastname: "",
    email: "",
    number: 0,
  });

  // const navigate = useNavigate();

  const addUseronSubmit = useCallback(() => {
    const newUser = [...users, form];
    addUser(newUser);
    setForm({
      firstname: "",
      lastname: "",
      email: "",
      number: 0,
    });
  }, [addUser, form]);

  useEffect(() => {
    console.log("users ", users);
  }, [users]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    console.log(name, value);
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <>
      <div className="row justify-content-center mt-20">
        <div className="col-md-6">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <h4>Add User Details - Use Context</h4>
            </div>
          </div>

          <form className="form mt-70">
            <div className="formControl">
              <label>First Name:</label>
              <input
                type="text"
                name="firstname"
                value={form.firstname}
                onChange={handleInputChange}
              />
            </div>
            <div className="formControl">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastname"
                value={form.lastname}
                onChange={handleInputChange}
              />
            </div>

            <div className="formControl">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="formControl">
              <label>Phone Number</label>
              <input
                type="tel"
                name="number"
                pattern="[0-9]{10}"
                value={form.number}
                onChange={handleInputChange}
              />
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={addUseronSubmit}
            >
              Add User
            </button>
          </form>
          <div className=" row justify-content-center mt-10">
            <div className="col-md-12 ">
              <h4>User Information</h4>

              <UserList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
