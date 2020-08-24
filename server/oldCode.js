/*
komodoRPC2
.tokenlist()
.then(obj=> {
  const tokenID = obj[0];
  console.log("Printing token ID of asset")
  console.log(tokenID)

  komodoRPC2
  .tokenbid("1",tokenID,"1")
  .then(obj=>{
    const hex = obj.hex;
    console.log("Printing hex value of the txs to be broadcast")
    console.log(hex);

    komodoRPC2
    .sendrawtransaction(hex)
    .then(obj=> {
      console.log("raw txs broadcast")
      console.log(obj)
      const bidID = obj
      komodoRPC
      .tokenfillbid(tokenID, bidID, "1")
      .then(obj => {
        console.log("Fullfill Bid")
        console.log(obj.hex);
        let hexBid = obj.hex
        komodoRPC2
        .sendrawtransaction(hexBid)
        .then(obj=> {
          console.log("Broadcast raw txs of fillbid")

          console.log(obj);
        })
        .catch(error=> (console.log(error)))
      })
      .catch(error=> (console.log(error)))
    })
    .catch(error=> (console.log(error)));
  })
  .catch(error=> (console.log(error)))
})
.catch(error=>(console.log(error)))




komodoRPC2
  .getinfo()
  .then(info => {
    console.log("Inside get info method")  
    console.log(info);
  })

komodoRPC
  .getinfo()
  .then(info => {
    console.log("Inside get info method")  
    console.log(info);
    
  komodoRPC
  .cclibinfo()
  .then(outs => {
    console.log(outs);
    
  })
  .catch(error => console.log(error));
  })
  .catch(error => {
    console.log(error);
    throw new Error(error);
  });

  komodoRPC
  .tokenlist()
  .then(outs => {
        console.log(outs);
        let tokenID = outs[0];

        komodoRPC
      .tokeninfo(tokenID)
      .then(rst => {
          console.log(rst);
          sendCoins("RGNoYyeGewNiQpYXktzkouone2v4qUsm8U")
          komodoRPC
          .tokenlist()
          .then(outs => {
                console.log(outs);
                let tokenID = outs[0];
        
                komodoRPC
              .tokeninfo(tokenID)
              .then(rst => {
                  console.log(rst);
                  sendCoins("RGNoYyeGewNiQpYXktzkouone2v4qUsm8U")
        
              })
              .catch(error => console.log(error));
            
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
    
  })
  .catch(error => console.log(error));

*/
