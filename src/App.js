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
    this.setState({
      loading: true
    });
    const res = await axios.get("https://api.github.com/users");
    this.setState({ users: res.data, loading: false });
  }
  render() {
    const { loading, users } = this.state;
    return (
      <div>
        <Navbar title="Githib Finder" icon="fab fa-github" />
        <div className="container">
          <User loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
