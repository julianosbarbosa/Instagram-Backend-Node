const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
mongoose.connect(
  "mongodb+srv://goweek:goweek123@cluster0-ddl8a.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true
  }
);

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);
app.use(cors());

app.use(require("./routes"));

server.listen(3333, () => {
  console.log("server started");
});
