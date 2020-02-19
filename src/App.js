import React from "react";
import Navbar from "./components/layout/Navbar";
import User from "./components/users/User";
import Search from "./components/users/Search";
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

    const res = await axios.get(
      `https://api.github.com/users?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECERT}`
    );
    this.setState({ users: res.data, loading: false });
  }

  // search users
  handleSearchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECERT}`
    );
    this.setState({ users: res.data.items, loading: false });
  };

  // clear onClearUsers
  handleClearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  render() {
    const { loading, users } = this.state;
    return (
      <div>
        <Navbar title="Githib Finder" icon="fab fa-github" />
        <div className="container">
          <Search
            onSearchUsers={this.handleSearchUsers}
            onClearUsers={this.handleClearUsers}
            onShowClear={this.state.users.length > 0 ? true : false}
          />
          <User loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
