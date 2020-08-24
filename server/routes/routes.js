const express = require("express")
const router = express.Router();
const purchase = require("../models/purchase");
const SmartChain = require("../node-komodo-rpc");
const address = require("../models/address");
const user = require("../models/user");
//update the 

var config = {
  rpchost: "15.228.22.68",
  rpcport: 14167,
  rpcuser: "user1108218060",
  rpcpassword: "pass6d86615ca0e3e8b28e16470001bab7b34a57e2b1c974a69919bef31e91bf08cc9f"
};

const komodo = new SmartChain({ config });
//console.log(komodo.config); // Prints the config being used by the komodo instance

config = {
  rpchost: "54.207.152.105",
  rpcport: 14167,
  rpcuser: "user1589035635",
  rpcpassword: "passc21b03c080d927b161e7d74604a4ce6d35f860ac9953dc4e54f19417ce745507c0",
};


const komodo2 = new SmartChain({ config });

const komodoRPC = komodo.rpc();
const komodoRPC2 = komodo2.rpc();


//console.log(komodo.config); // Prints the config being used by the komodo instance
//console.log(komodo2.config);

router.get("/getInfo",(req,res)=> {

    komodoRPC
    .getinfo()
    .then(info => {
        console.log("Node 1 Info")
        // console.log(info);
        const node1 = info;
        // console.log("/********************************************************************/")

        komodoRPC2
        .getinfo()
        .then(info => {
            console.log("Node 2 Info")
            //console.log(info);
            //console.log("/********************************************************************/")
            const node2 = info
            res.json({node1, node2})
            })
            .catch(error => console.log(error));
        })
    .catch(error => console.log(error));
    
})

router.get("/getZaddress", (req,res) => {

  const address = this.getNewZAddress()
    res.json({address: address});

})

router.post("/sendMim", (req,res) => {
  const data = req.body;
  komodoRPC2
  .z_getbalance("zs18t53rvgl65r6tjhflj4epsxk354qzvzxl7msknye6s29l4sxne3cu3jstcl3ud43nx8xv9q87xe")
  .then(response=> {
    if (response < data.amount) {
      res.status(400).json({error: "The system is currently busy or there may be insufficent balance, please try again!"})
    }
    else {
    user.findOne({userID: data.userID})
    .then(response=> {
      console.log(response);
      komodoRPC2.
      z_sendmany("zs18t53rvgl65r6tjhflj4epsxk354qzvzxl7msknye6s29l4sxne3cu3jstcl3ud43nx8xv9q87xe", [{"address": response.address, "amount": data.amount}])
      .then(info=> {
        console.log(info);
        res.json(info)
      })
      .catch(error=>(consol.log(error)))
    })
    .catch(error=> (console.log(error)))
  }
  })
  .catch(error=> {
    console.log(error)
  })
    
})

router.post("/getBalance", (req,res)=> {

  const data = req.body;
  console.log("getbalance")
  console.log(data.address);

    komodoRPC2.
    z_getbalance(data.address)
    .then(info=> {
      console.log(info);
      const userBalance = info;
      komodoRPC2
      .z_getbalance("zs18t53rvgl65r6tjhflj4epsxk354qzvzxl7msknye6s29l4sxne3cu3jstcl3ud43nx8xv9q87xe")
      .then(response=>{
        console.log(response)
        res.json({userBalance: userBalance, companyBalance: response})
      })
      .catch(error=>(console.log(error)))
    })
    .catch(error=>(console.log(error)))
})

router.get("/getNewAddress", (req,res)=> {

  komodoRPC2
  .z_getnewaddress()
  .then(info=> {
    const newAddress = info;
    console.log(info);
    const data = {
      userID: "1",
      address: newAddress
    }

    const addr = new address(data);
    addr.save(err => {
      if(err){
        console.log(err)
      }
      else {
        console.log("new address generated")
      }
    });
  })
  .catch(error=> (console.log(error)))
})

router.post("/purchaseStock", (req,res)=> {
  const data = req.body;
  console.log(data)
  komodoRPC2.
    z_getbalance(data.address)
    .then(balance=> {
      if (balance > data.cost) {
        komodoRPC2.
        z_sendmany(data.addressS , [{"address": "zs18t53rvgl65r6tjhflj4epsxk354qzvzxl7msknye6s29l4sxne3cu3jstcl3ud43nx8xv9q87xe", "amount": data.cost}])
        .then(info=> {
          komodoRPC2
          .z_getoperationstatus([info])
          .then(response=> {
            console.log(response);
            /*
            console.log(info);
            const payload = {
              userID: data.userID,
              stock: data.stock,
              cost: data.cost,
              amount: "1",
              addressS: data.addressS,
            }
            const newPurchase = new purchase(payload)
            newPurchase.save()
            .then(response=> {
              console.log(response)
              res.json({success: "stock purchased successfully"})
            })
            .catch(error=>(console.log(error)))*/
          })
          .catch(error=> {
            
          })
      
        })
        .catch(error=>(consol.log(error)))
      }
      else {
        res.status(400).json({error: "Insufficent Balance"})
      }
    })
  .catch(error=> (console.log(error)))
})


router.post("/signUp", (req,res)=> {
  const data = req.body;
  console.log(data);

  user.findOne({userID: data.userID})
  .then(async response=> {
    if (response) {
      console.log("userID taken")
      res.status(400).json({error: "UserID already taken"})
    }
    else {
      await getNewZAddress()
      .then(response=> {
        console.log(response);
        const payload = {
          userID: data.userID,
          address: response
        }
        const newUser = new user(payload)
        newUser.save(error=> {
          if (error) {
            res.status(400).json({error: "Error in saving UserID"})
          }
          else {
            res.json({success: "User ID sucessfully saved"})
          }
        })
      })
      .catch(error=>(console.log(error)))
    }
  })
  .catch(error=>(console.log(error)))
})

async function getNewZAddress() {
  return new Promise((resolve,reject)=>{
    komodoRPC2
    .z_getnewaddress()
    .then(info=> {
    resolve(info);
    })
    .catch(error=> (console.log(error)))
  })
  
}

router.post("/signIn", (req,res)=> {
  const data = req.body;
   user.findOne({userID: data.userID})
   .then(response=> {
    console.log(response)
    res.json({address: response.address})
   })
   .catch(error=>(console.log(error)))
})

router.post("/getStocks", (req,res)=> {
  const data = req.body;
  console.log(data)
  purchase.find({userID: data.userID})
  .then(response=> {
    res.json(response)
  })
  .catch(error=> (console.log(error)))
})

router.post("/sellStock", (req,res)=> {
  const data = req.body;
  purchase.deleteOne({_id: data.id})
  .then(response=> {
    komodoRPC2.
    z_sendmany("zs18t53rvgl65r6tjhflj4epsxk354qzvzxl7msknye6s29l4sxne3cu3jstcl3ud43nx8xv9q87xe" , [{"address": data.address, "amount": data.cost}])
    .then(response=> {
      res.json(response);
    })
    .catch(error=> (console.log(error)))
  })
  .catch(error=>(console.log(error)))
})

module.exports = router;