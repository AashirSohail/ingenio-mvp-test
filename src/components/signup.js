import React, { Component } from "react";
import axios from "axios"; 

class Signup extends Component {

  state = {
    userID: "",
    response: ""
  }

  handleChange = (e)=> {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state)
    
  }

  signUp = (e)=> {
    this.setState({
      response: ""
    })
    e.preventDefault();
    const payload = {
      userID: this.state.userID
    }
    console.log("payload")
    console.log(payload);
    axios({
      url: "/signUp",
      method: "post",
      data: payload
    })
    .then((res)=> {
      this.setState({
        response: res.data.success
      })
    })
    .catch((err)=> {
      this.setState({
        response: err.response.data.error
      })
    })
  }

  render() {
    return (
      <div className = "container">
        <form onSubmit={this.signUp}>
          <div className="form-group">
            <label htmlFor="inputAddress">Username</label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="Jhon Doe"
              name="userID"
              value={this.state.userID}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" >
            Sign up
          </button>
        </form>
        <div>
        <h3>{this.state.response}</h3>
        </div>
      </div>
    );
  }
}

export default Signup;
