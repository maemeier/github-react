import React, { Fragment } from "react";
import Repos from "../../repos/Repos";
import Spinner from "../../components/layout/spinner";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

class SingleUser extends React.Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
  }

  static propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired
  };

  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      html_url,
      login,
      following,
      public_repos,
      public_gists,
      hireable,
      blog,
      company,
      followers
    } = this.props.user;

    const { loading, repos } = this.props;
    if (loading) {
      return <Spinner />;
    }
    return (
      <Fragment>
        <Link to="/" className="btn btn-light">
          Back to search
        </Link>
        Hireable: {""}
        {hireable ? (
          <i className="fas fa-check text-sucess" />
        ) : (
          <i className="fas fa-times-circle text-danger" />
        )}
        <div className="card grid-2">
          <div className="all-center">
            <img
              src={avatar_url}
              alt="avatar"
              className="round-img"
              style={{ width: "150px" }}
            />
            <h3>Name: {name}</h3>
            <p>Location: {location}</p>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h4>Bio</h4>
                <p>{bio}</p>
              </Fragment>
            )}
            <a href={html_url} className="btn btn-dark my-1">
              Visit github profile
            </a>

            <ul>
              <li>
                {login && (
                  <Fragment>
                    <strong>Username: </strong> {login}
                  </Fragment>
                )}
              </li>

              <li>
                {login && (
                  <Fragment>
                    <strong>Company: </strong> {company}
                  </Fragment>
                )}
              </li>

              <li>
                {login && (
                  <Fragment>
                    <strong>website: </strong> {blog}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
          <div className="badge badge-primary">Followers+ : {followers}</div>
          <div className="badge badge-success">Following : {following}</div>
          <div className="badge badge-light">Public Repos : {public_repos}</div>
          <div className="badge badge-dark">Public Gists : {public_gists}</div>
        </div>
        <Repos repos={repos} />
      </Fragment>
    );
  }
}
export default SingleUser;
