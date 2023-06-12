const express = require('express');
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");


// dotenv configuration
dotenv.config({ path: "./.env" });

// Configure cors
app.use(cors());

// Configure express to collect form data
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Mongo db configuration
mongoose.connect(`${process.env.MONGO_DB_CLOUD_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => {
    console.log(" React Social DB Connected Successfully....");
}).catch((err) => {
    console.log(err);
    process.exit(1);
})

// Router config
app.use('/api/users', require('./router/userRouter'));
app.use('/api/profile', require('./router/profileRouter'));
app.use('/api/post', require('./router/postRouter'));
// Testing url
app.get("/", (request, response) => {
    response.send(`<h2>Wellcome to React social backed server</h2>`)
});


app.listen(PORT, () => {
    console.log(`Express Server is running at ${PORT} Successfully`)
})