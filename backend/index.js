const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

require("dotenv").config();

const { PORT, MONGODB_URI } = process.env;
const {
  logger,
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
} = require("./utils/middlewares");

const app = express();

const candidateRouter = require("./controllers/candidates");
const loginRouter = require("./controllers/login");
const courseRouter = require("./controllers/courses");
const hackathonRouter = require("./controllers/hackathons");
const lmsRouter = require("./controllers/lms");
const jobRouter = require("./controllers/jobs");

console.log("connecting to", MONGODB_URI);
mongoose.set("strictQuery", true);
mongoose
  .connect(MONGODB_URI)
  .then((res) => console.log("connected to mongodb"))
  .catch((error) => console.log(error.message));

app.use(express.json());
app.use(cors());
app.use("/images", express.static("images"));
app.use(logger);
app.use(tokenExtractor);

app.get("/", async (req, res) => {
  res.send("<h1>hello world</h1>");
});

app.use("/api/candidate", candidateRouter);
app.use("/api/login", loginRouter);
app.use("/api/hackathons", hackathonRouter);
app.use("/api/courses", courseRouter);
app.use("/api/lms", lmsRouter);
app.use("/api/jobs", jobRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => console.log("server running on port", PORT));
