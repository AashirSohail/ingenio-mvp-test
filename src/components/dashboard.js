import React, { Component } from "react";
import axios from "axios";

class Dashboard extends Component {

state = {
  userID: "",
  loggedIn: "",
  balance: 0,
  userAddress: "",
  sendUserId: "",
  amount: "",
  stocks: [],
  stockStatus: "",
  sendMimStatus: "",
  userStocks: [],
  companyBalance: ""
}

stockTemplate = this.state.stocks.map((stock, index) => {
  console.log(stock)
  console.log("running map ftn")
  return (
    <li key={index} className="list-group-item justify-content-between align-items-center">
    {stock.symbol}
    <span className="badge badge-primary badge-pill">{stock.price}</span>
    <a href = "/" className="btn btn-primary mr-3 pl-3 pr-3">Buy</a>
    </li>  
  );
});

renderUserStocks = ()=> {
  return (
    <ul className="list-group list-group-flush">
    {this.state.userStocks.map((stock, index) => (
        <li key = {index} className="list-group-item text-left">{stock.stock} Purchase Price {stock.cost} 
        <a href="#" className="btn btn-secondary ml-5 pl-3 pr-3 text-right" onClick={e=> {this.sellStock(e, index)}}>Sell</a></li>
    ))}</ul>
    );
}

sellStock = (e, index)=> {
  e.preventDefault();
  const payload = {
    id: this.state.userStocks[index]._id,
    cost: this.state.userStocks[index].cost,
    address: this.state.userAddress
  }
  axios({
    url: "/sellStock",
    method: "post",
    data: payload
  })
  .then(response=> {
    console.log(response)
  })
  .catch(error=> (console.log(error)))
}

handleChange = (e)=> {
  this.setState({
    [e.target.name]: e.target.value
  })
  console.log(this.state)
}

async stocksGet (){
  return new Promise((resolve,reject)=>{
  let stockNames = ['IBM','GOOGL','AAPL']
  let tempStockArray = [];
  let counter = 0;
  
  stockNames.forEach( async function(s){
    let stock = {symbol: '', timestamp: '', price: ''}
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${s}&interval=5min&outputsize=compact&apikey=N9SUKXTJE3657J9P`
    //let response = await fetch(url);
    //let commits = await response.json();

   await fetch(url)
    .then(response => response.json())
    .then(result => {
        let timeSeries = Object.keys(result['Time Series (5min)'])
        let latest = timeSeries[0]
        let prices = Object.values(result['Time Series (5min)'][latest])
        
        stock.symbol = result['Meta Data']['2. Symbol'];
        stock.timestamp = latest;
        stock.price = prices['3'];
        
        tempStockArray.push(stock)
        counter ++;
        if (counter === 3) {
          resolve(tempStockArray);
        }
    })
   })
  });
}



//N9SUKXTJE3657J9P
async componentDidMount(){

  this.stocksGet()
  .then(response=> {
    console.log("here 2")
    console.log(response);
    this.setState({
      stocks: response,
      stockStatus: "true"
    })
    console.log(this.state.stocks)
  })
  //this.setState({stocks:tempStockArray})
  //this.state.stocks = tempStockArray;
  //console.log(this.state.stocks)
}
  signIn = (e)=> {
    e.preventDefault();
    axios({
      url: "/signIn",
      method: "post",
      data: {userID: this.state.userID}
    })
    .then(response=> {
      console.log(response);
      this.setState({
        userAddress: response.data.address })

      const payload = {
        address: response.data.address
      }
      console.log(response.data.address)

      axios({
        url: "/getBalance",
        method: "post",
        data: payload
      })
      .then(response=> {
        this.setState({
          balance: response.data.userBalance,
          companyBalance: response.data.companyBalance
        })
        console.log(this.state.balance)

        const payload2 = {
          userID: this.state.userID
        }
        axios({
          url: "/getStocks",
          method: "post",
          data: payload2
        })
        .then(response=> {
          console.log(response)
          this.setState({
            loggedIn: "true",
            userStocks: response.data
          })

        })
        .catch(error=>{
          (console.log(error))
        })
      })
      .catch(error=> {
        (console.log(error))
      })
    })
    .catch(error=>(console.log(error)))
  }

  signOut = (e)=> {
    e.preventDefault();
    this.setState({
      userID: "",
      loggedIn: "",
      balance: 0,
      userAddress: "",
      sendUserId: "",
      amount: "",
      sendMimStatus: "",
      userStocks: [],
      companyBalance: ""
    })
  }


  sendMiM = (e)=> {
    e.preventDefault();
    this.setState({
      sendMimStatus: ""
    })
    const payload= {
      userID: this.state.sendUserId,
      amount: this.state.amount
    }

    axios({
      url: "/sendMiM",
      method: "post",
      data: payload
    })
    .then(response=> {
      console.log(response)
      this.setState({
        sendMimStatus: "MiM sucessfully sent to account"
      })
    })
    .catch(error=> {
      console.log(error.response.data.error)
      this.setState({
        sendMimStatus: error.response.data.error

      })
    })
  }

  refreshBalance = (e)=> {
    e.preventDefault();
    this.setState({
      balance: ":--",
      companyBalance: ":--",
      sendMimStatus: ""
    })
    const payload = {
      address: this.state.userAddress
    }
    axios({
      url: "/getBalance",
      method: "post",
      data: payload
    })
    .then(response=> {
      this.setState({
        balance: response.data.userBalance,
        companyBalance: response.data.companyBalance

      })
    })
    .catch(error=>(console.log(error)))
  }

  buyStock = (e, name, price)=> {
    e.preventDefault();
    const payload ={
      userID: this.state.userID,
      stock: name,
      cost: price,
      amount: "1",
      addressS: this.state.userAddress,
    }
    axios({
      url: "/purchaseStock",
      method: "post",
      data: payload
    })
    .then(response=> {
      console.log(response)
    })
    .catch(error=>(console.log(error)))
  }

  refreshStock = (e)=> {
    e.preventDefault();
    this.setState({

    })
    const payload = {
      userID: this.state.userID
    }
    axios({
      url: "/getStocks",
      method: "post",
      data: payload
    })
    .then(response=> {
      console.log(response)
      this.setState({
        userStocks: response.data
      })
    })
    .catch(error=>{
      (console.log(error))
    })

  }

  render() {
    return (
      <>
      <div className="container mt-3">
      {this.state.stockStatus ? 
        (
        <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center">
        {this.state.stocks[0].symbol}
        <span className="badge badge-primary badge-pill">{this.state.stocks[0].price}</span>
        <a href = "/" className="btn btn-primary mr-3 pl-3 pr-3" onClick={e => {this.buyStock(e, this.state.stocks[0].symbol, this.state.stocks[0].price)}}>Buy</a>
        </li>  
        <li className="list-group-item d-flex justify-content-between align-items-center">
        {this.state.stocks[1].symbol}
        <span className="badge badge-primary badge-pill">{this.state.stocks[1].price}</span>
        <a href = "/" className="btn btn-primary mr-3 pl-3 pr-3" onClick={e=> {this.buyStock(e, this.state.stocks[1].symbol, this.state.stocks[1].price)}}>Buy</a>
        </li> 
        <li className="list-group-item d-flex justify-content-between align-items-center">
        {this.state.stocks[2].symbol}
        <span className="badge badge-primary badge-pill">{this.state.stocks[2].price}</span>
        <a href = "/" className="btn btn-primary mr-3 pl-3 pr-3" onClick={e=> {this.buyStock(e, this.state.stocks[2].symbol, this.state.stocks[2].price)}}>Buy</a>
        </li> 
        </ul>
        ):
        <ul className="list-group">
        </ul>
      }

        <div className="row mt-5 mb-5 justify-content-center">
          <div className="col-3">
            <div className="card" style={{ width: "18rem" }}>
              <img
                className="card-img-top"
                src="https://i2.wp.com/airlinkflight.org/wp-content/uploads/2019/02/male-placeholder-image.jpeg?ssl=1"
                alt="Card cap"
              />

              {this.state.loggedIn ? (
                    <div className="card-body">
                  <h5 className="card-title">{this.state.userID}</h5>
                  <h5 className="card-title">Balance: {this.state.balance}</h5>
                  <p className="card-text"></p>
                  <div className="text-center">
                    <a href="/" className="btn btn-secondary pl-3 pr-3" onClick={this.refreshBalance}>
                    Refresh Balance
                  </a>
                  <a href="#" className="btn btn-secondary pl-3 pr-3" onClick={this.signOut}>
                  Sign Out
                </a>
                  <br/>
                <a href="#" className="btn btn-secondary pl-3 pr-3" onClick={this.refreshStock}>
                  Refresh Stocks
                </a>
                  </div>
                </div>
                ): 
                  <div className="card-body">
                  <h5 className="card-title">Sign In</h5>
                  <p className="card-text"></p>
                  <div className="text-center">
                  <form onSubmit={this.signIn}>
                    <input
                    type="text"
                    value={this.state.userID}
                    name="userID"
                    placeholder="Enter UserID here"
                    onChange={this.handleChange}
                    />
                    <br/>
                    <button className = "mt-3 btn" type="submit">Sign In</button>
                  </form>
                  </div>
                </div>
            }
            </div>
          </div>
          <div className="d-flex justify-content-center ml-5 col-5">
            {this.state.loggedIn? (

              <div className="card wid">
                {this.renderUserStocks()}
              </div>
            ):
            <div className="card wid">
            </div>
            }
          </div>

          <div className="justify-content-left col-3">

          <h2>Send MiM</h2>
          <h3>Company Balance: {this.state.companyBalance}</h3>
          <form onSubmit={this.sendMiM}>
          <input
          type="text"
          name="sendUserId"
          value={this.state.sendUserId}
          placeholder="Enter UserID here"
          onChange={this.handleChange}
          className = "mt-3"
          />
          <input
          type="text"
          name="amount"
          value={this.state.amount}
          placeholder="Enter amount here"
          onChange={this.handleChange}
          className = "mt-3"
          />
          <button className = "mt-3 btn" type="submit">Send</button>
          </form>
          <h3>{this.state.sendMimStatus}</h3>
          </div>
        </div>
      </div>
    </>
    );
  }
}

export default Dashboard;
