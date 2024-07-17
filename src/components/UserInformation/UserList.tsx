import React from "react";
import { Row, Col } from "react-bootstrap";
import withUserContext from "../HOC/withContextUserList";
import UserCard from "./UserCard";
import { UserContextType } from "../../Context/UserContext";
import { User } from "../Utils/Constants";

interface UserListProps {
  userContext?: UserContextType;
}

const UserList: React.FC<UserListProps> = ({ userContext }) => {
  return (
    <Row>
      {userContext &&
        userContext.users.map((user, index) => (
          <Col key={index}>
            <UserCard user={user} userContext={userContext} />
          </Col>
        ))}
    </Row>
  );
};

export default withUserContext(UserList);
