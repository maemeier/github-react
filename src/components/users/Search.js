import React from "react";

class Search extends React.Component {
  state = {
    text: ""
  };

  handleChange = event => {
    this.setState({
      text: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.text);
  };
  render() {
    const { text } = this.state;
    return (
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
    );
  }
}

export default Search;
