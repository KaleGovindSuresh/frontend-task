import React from "react";
import "./App.css";
import NavigationBar from "./components/sidebar/NavigationBar";
import Dashboard from "./components/dashboard/Dashboard";

const App = () => {
  return (
    <div className="app">
      <NavigationBar />
      <div className="content">
        <Dashboard />
      </div>
    </div>
  );
};

export default App;
