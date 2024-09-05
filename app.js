const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const loginRouter = require("./Router/loginRouter");
const userRouter = require("./Router/userRouter");
const inboxRouter = require("./Router/inboxRouter");
const moment = require("moment");

const { notFoundHandler, errorHandler } = require("./middlewawre/common/errorHandler");

const app = express();
const server = http.createServer(app); // Create an HTTP server instance

dotenv.config();

const io = require("socket.io")(server); // Pass the server instance to socket.io

global.io = io;

app.locals.moment = moment;

mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => console.log("Connection successful!")).catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

app.use("/", loginRouter);
app.use("/users", userRouter);
app.use("/inbox", inboxRouter);

app.use(notFoundHandler);
app.use(errorHandler);

server.listen(process.env.MONGO_CONNECTION_PORT, () => {
    console.log(`Listening to port ${process.env.MONGO_CONNECTION_PORT}`);
});
