let projectData = {};

const express = require("express");

const app = express();

const cors = require("cors");

app.use(cors());

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("website"));

app.use(express.static("./website"));

function getAllData(req, res) {
  res.status(200).send(projectData);
}
app.get("/all", getAllData);

const postData = (req, res) => {
  projectData = req.body;
  res.status(200).send(projectData);
  console.log(projectData);
};
app.post("/add", postData);

const port = 8080;
const hostname = "localhost";

const listening = () => console.log(` running http://${hostname}:${port}`);

app.listen(port, listening);
