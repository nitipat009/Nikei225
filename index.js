const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// const usersRouter = require('./routes/user_routes');
// const checkinRouter = require('./routes/checkin_route');

app.use('/api', usersRouter);
// app.use('/api/checkin',checkinRouter);


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