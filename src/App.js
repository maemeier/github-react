import React from "react";
import Navbar from "./components/layout/Navbar";
import User from "./components/users/User";
import style from "./App.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar title="Githib Finder" icon="fab fa-github" />
        <div className="container">
          <User />
        </div>
      </div>
    );
  }
}

export default App;
