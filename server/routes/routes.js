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

router.get("/sendMim", (req,res) => {
  komodoRPC2
  .z_listaddresses()
  .then(info=> {
    const addresses = info;

    komodoRPC2.
    z_sendmany(addresses[0], [{"address": addresses[1], "amount": "50"}])
    .then(info=> {
      console.log(info);
      res.json(info)
    })
    .catch(error=>(consol.log(error)))
  })
  .catch(error=> (console.log(error)))
})

router.get("/getBalance", (req,res)=> {
  komodoRPC2
  .z_listaddresses()
  .then(info=> {
    const addresses = info;

    komodoRPC2.
    z_getbalance(addresses[0])
    .then(info=> {
      console.log(info);
      res.json(info)
    })
  })
  .catch(error=> (console.log(error)))
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

router.get("/purchaseStock", (req,res)=> {
  komodoRPC2.
    z_getbalance(addresses[0])
    .then(info=> {
      console.log(info);
      res.json(info)
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

module.exports = router;