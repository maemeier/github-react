import React from "react";
import Navbar from "./components/layout/Navbar";
import User from "./components/users/User";
import "./App.css";

import axios from "axios";

class App extends React.Component {
  state = {
    users: [],
    loading: false
  };
  async componentDidMount() {
    const res = await axios.get("https://api.github.com/users");
    console.log(res.data);
  }
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
