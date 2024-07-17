import React from "react";
import { Card, Button } from "react-bootstrap";
import { UserContextType } from "../../Context/UserContext";
import { User } from "../Utils/Constants";

interface UserCardProps {
  user: User;
  userContext: UserContextType;
}
const UserCard: React.FC<UserCardProps> = ({ user, userContext }) => {
  const handleDelete = () => {
    userContext.deleteUser(user.email);
  };

  return (
    <Card style={{ width: "18rem", margin: "1rem" }}>
      <Card.Body>
        <Card.Title>
          {user.firstname} {user.lastname}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
        <Card.Text>{user.number}</Card.Text>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
