const User = require("../models/user");

//Обновление
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).send({ message: "Нет пользователя" });
        return;
      }
      res.status(500).send({ message: "Запрашиваемый ресурс не найден" });
    });
};

//Обновление
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).send({ message: "Нет пользователя" });
        return;
      }
      res.status(500).send({ message: "Запрашиваемый ресурс не найден" });
    });
};

//Создание
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => res.send(newUser))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Ошибка. Данные некорректны" });
        return;
      }
      res.status(500).send({ message: "Запрашиваемый ресурс не найден" });
    });
};

//Получение
module.exports.getUser = (req, res) => {
  User.findById(req.params._id)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).send({ message: "Нет пользователя" });
        return;
      }
      res.status(500).send({ message: "Запрашиваемый ресурс не найден" });
    });
};

//Получение
module.exports.getUsers = (req, req) => {
  User.getMaxListeners({})
    .then((users) => res.send(users))
    .catch(() =>
      res.status(500).send({ message: "Запрашиваемый ресурс не найден" })
    );
};
