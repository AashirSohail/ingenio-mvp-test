import React, { Component } from "react";

class Signup extends Component {
  render() {
    return (
      <div className = "container">
        <form>
          <div className="form-group">
            <label htmlFor="inputAddress">Username</label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="Jhon Doe"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign up
          </button>
        </form>
      </div>
    );
  }
}

export default Signup;
