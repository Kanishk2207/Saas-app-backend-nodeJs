const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/config");
const { Snowflake } = require("@theinternetfolks/snowflake");
const userRoute = require('./src/routes/userRoutes')
const roleRoute = require('./src/routes/roleRoutes')
const communityRoute = require('./src/routes/communityRoutes')

dotenv.config();

const app = express();

connectDB();

const PORT = process.env.PORT || 5001;

app.use(express.json());

app.get("/api/test", (req,res)=>{
    try {
        res.status(200).json("api is working")
    } catch (err) {
        res.status(400).json(err)
    }
})

app.use('/api/users', userRoute);
app.use('/api/roles', roleRoute);
app.use('/api/community', communityRoute);


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
