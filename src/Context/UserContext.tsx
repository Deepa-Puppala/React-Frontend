import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../components/Utils/Constants";
import React from "react";

export interface UserContextType {
  users: User[];
  addUser: (user: User[]) => void;
  deleteUser: (email: string) => void;
}
// eslint-disable-next-line react-refresh/only-export-components
const UserContext = createContext<UserContextType>({
  users: [],
  addUser: () => {},
  deleteUser: () => {},
});

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (user: User[]) => {
    setUsers(user);
    // setUsers(user);
  };
  const deleteUser = (email: string) => {
    setUsers(users.filter((user: User) => user.email !== email));
  };
  return (
    <UserContext.Provider value={{ users, addUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export { UserContext, UserProvider };
