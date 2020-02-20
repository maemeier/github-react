import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import SingleUser from "./components/users/SingleUser";
import "./App.css";

import axios from "axios";

class App extends React.Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
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

  // get single user
  getUser = async username => {
    this.setState({ loading: true });
    const res = await axios.get(
      `http://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECERT}`
    );
    this.setState({ user: res.data, loading: false });
  };

  // clear onClearUsers
  handleClearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  // alert
  setAlert = (message, type) => {
    this.setState({
      alert: { message, type }
    });

    setTimeout(() => this.setState({ alert: null }), 3000);
  };
  render() {
    const { loading, users, user } = this.state;
    return (
      <Router>
        <div>
          <Navbar title="Githib Finder" icon="fab fa-github" />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search
                      onSearchUsers={this.handleSearchUsers}
                      onClearUsers={this.handleClearUsers}
                      onShowClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <User loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={props => (
                  <SingleUser
                    {...props}
                    getUser={this.getUser}
                    user={user}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
