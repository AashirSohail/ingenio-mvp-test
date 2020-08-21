import React, { Component } from "react";

class Dashboard extends Component {

state = {
  userID: ""
}


//N9SUKXTJE3657J9P
async componentDidMount(){
    let url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=1&apikey=N9SUKXTJE3657J9P'
    let response = await fetch(url);
    let commits = await response.json();
    console.log(commits['Meta Data']['2. Symbol'])
    //console.log(commits.symbol)

}
  render() {
    return (
      <>
        <div className="container mt-3">
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Cras justo odio
              <span className="badge badge-primary badge-pill">14</span>
              <a href="#" className="btn btn-primary mr-3 pl-3 pr-3">
                Buy
              </a>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Dapibus ac facilisis in
              <span className="badge badge-primary badge-pill">2</span>
              <a href="#" className="btn btn-primary mr-3 pl-3 pr-3">
                Buy
              </a>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Morbi leo risus
              <span className="badge badge-primary badge-pill">1</span>
              <a href="#" className="btn btn-primary mr-3 pl-3 pr-3">
                Buy
              </a>
            </li>
          </ul>

          <div className="row mt-5 mb-5 justify-content-center">
            <div className="col-3">
              <div className="card" style={{ width: "18rem" }}>
                <img
                  className="card-img-top"
                  src="https://i2.wp.com/airlinkflight.org/wp-content/uploads/2019/02/male-placeholder-image.jpeg?ssl=1"
                  alt="Card image cap"
                />

                {this.state.userID ? (
                      <div className="card-body">
                    <h5 className="card-title">Sign In</h5>
                    <p className="card-text"></p>
                    <div className="text-center">
                    <form>
                      <input
                      type="text"
                      value={this.state.userID}
                      name="userID"
                      placeholder="Enter UserID here"
                      />
                    </form>

                    </div>
                  </div>
                  ): 
                    <div className="card-body">
                    <h5 className="card-title">Sign In</h5>
                    <p className="card-text"></p>
                    <div className="text-center">
                      <a href="#" className="btn btn-primary mr-3 pl-3 pr-3">
                        Buy
                      </a>
                      <a href="#" className="btn btn-secondary pl-3 pr-3">
                        Sell
                      </a>
                    </div>
                  </div>
              }
              </div>
            </div>
            <div className="d-flex justify-content-left ml-5 col-8">
              <div className="card wid">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item text-left">Cras justo odio <a href="#" className="btn btn-secondary ml-5 pl-3 pr-3 text-right">Sell</a></li>
                  <li className="list-group-item text-left">Dapibus ac faci<a href="#" className="btn btn-secondary ml-5  pl-3 pr-3 text-right">Sell</a></li>
                  <li className="list-group-item text-left">Vestibulum at e<a href="#" className="btn btn-secondary ml-5  pl-3 pr-3 text-right">Sell</a></li>
                  <li className="list-group-item text-left">Dapibus ac faci<a href="#" className="btn btn-secondary ml-5  pl-3 pr-3 text-right">Sell</a></li>
                  <li className="list-group-item text-left">Cras justo odio <a href="#" className="btn btn-secondary ml-5 pl-3 pr-3 text-right">Sell</a></li>
                  <li className="list-group-item text-left">Vestibulum at e<a href="#" className="btn btn-secondary ml-5  pl-3 pr-3 text-right">Sell</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
