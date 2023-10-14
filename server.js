const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/config");
const { Snowflake } = require("@theinternetfolks/snowflake");
const userRoute = require('./src/routes/userRoutes')
const roleRoute = require('./src/routes/roleRoutes')
const communityRoute = require('./src/routes/communityRoutes')
const memberRoute = require('./src/routes/memberRoutes')

dotenv.config();

const app = express();

connectDB();

const PORT = process.env.PORT || 5001;

app.use(express.json());


app.use('/api/users', userRoute);
app.use('/api/roles', roleRoute);
app.use('/api/community', communityRoute);
app.use('/api/member', memberRoute);


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
