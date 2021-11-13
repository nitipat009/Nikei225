const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// const dataRouter = require('.route/data_route');
const dataRouter = require('./route/data_route');


app.use('/api', dataRouter);



const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true,useUnifiedTopology: true }
    );
    const connection = mongoose.connection;
    connection.once('open', () => {
      console.log("MongoDB database connection established successfully");
      
    })

var server = app.listen(port, () => {console.log(`Server is running on port: ${port}`);}
);

module.exports = server;