const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDatabase = require("./config/database");
const AuthRouter = require("./routes/userRoute");
const BlogRouter = require("./routes/constblogrouter")
const { connect } = require("mongoose");
const app = express(); 
app.use(bodyParser.urlencoded({ limit: "25mb", extended: true }));
app.use(bodyParser.json({ limit: "25mb", extended: true })); 
app.use(cors({
    origin:"http://localhost:3000",
    methods:['GET','POST','PUT','DELETE']
    // credentials:true
}));
dotenv.config({ path: "./config/config.env" });
connectDatabase();
app.get("/", (req, res) => {
    res.send("Hello")
})
app.use("/auth", AuthRouter);
app.use("/blogs", BlogRouter);
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})

