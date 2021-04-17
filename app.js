const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3000 } = process.env;

const app = express();

const cardsRouter = require("./routes/cards");
const usersRouter = require("./routes/users");

app.use((req, res, next) => {
  req.user = {
    _id: "607aaa3a22cfed2f1c96acef",
  };
  next();
});

module.exports.createCard = (req) => {
  console.log(req.user._id);
};

app.use("/cards", cardsRouter);
app.use("/users", usersRouter);

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
