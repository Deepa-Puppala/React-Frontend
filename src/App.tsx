import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";
import AppRouter from "./AppRouter";
import { UserProvider } from "./Context/UserContext";

function App() {
  return <AppRouter />;
}

export default App;
