import React from "react";
import PropTypes from "prop-types";

class Search extends React.Component {
  state = {
    text: ""
  };

  static propTypes = {
    onSearchUsers: PropTypes.func.isRequired,
    onClearUsers: PropTypes.func.isRequired,
    onShowClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
  };

  // handleChange
  handleChange = event => {
    this.setState({
      text: event.target.value
    });
  };

  //handleSubmit

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.text === "") {
      this.props.setAlert("Please enter the users", "light");
    } else {
      this.props.onSearchUsers(this.state.text);
      this.setState({ text: "" });
    }
  };
  render() {
    const { text } = this.state;
    const { onClearUsers, onShowClear } = this.props;
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="text"
            placeholder="search user...."
            value={text}
            onChange={this.handleChange}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        {onShowClear && (
          <button className="btn btn-light btn-block" onClick={onClearUsers}>
            clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
