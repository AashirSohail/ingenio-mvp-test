const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const path = require("path")

const routes = require("./routes/routes.js")

const app = express();
const MONGODB_URI= "mongodb+srv://murtrax:THEAVENTADOR@cluster0.lkt3k.mongodb.net/Cluster0?retryWrites=true&w=majority";

const PORT = process.env.PORT || 8080;
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", ()=> {
    console.log("Mongoose is connected!")
})

app.use(morgan("tiny"));
app.use("/", routes);



app.listen(PORT, console.log(`Server is starting at port ${PORT}`));