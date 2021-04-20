const User = require('../models/user');

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true })
    .orFail(() => {
      const error = new Error('CastError');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).send({ message: 'Нет пользователя' });
        return;
      }
      res.status(500).send({ message: 'Запрашиваемый ресурс не найден' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true })
    .then((user) => res.send(user))
    .orFail(() => {
      const error = new Error('CastError');
      error.statusCode = 404;
      throw error;
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).send({ message: 'Нет пользователя' });
        return;
      }
      res.status(500).send({ message: 'Запрашиваемый ресурс не найден' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => res.send(newUser))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Ошибка. Данные некорректны' });
        return;
      }
      res.status(500).send({ message: 'Запрашиваемый ресурс не найден' });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params._id)
    .orFail(() => {
      const error = new Error('CastError');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Данные некорректны' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: 'Нет пользователя' });
      } else {
        res.status(500).send({ message: 'Запрашиваемый ресурс не найден' });
      }
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Запрашиваемый ресурс не найден' }));
};
