const Card = require('../models/card');

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('CastError');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Данные некорректны' });
      } else if (err.statusCode === 404) {
        res.status(404).send({
          message: 'Карточки не существует, невозможно проставить лайк',
        });
      } else {
        res.status(500).send({ message: 'Запрашиваемый ресурс не найден' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('CastError');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.statusCode === 404) {
        res
          .status(404)
          .send({ message: 'Карточки не существует, невозможно убрать лайк' });
        return;
      }
      res.status(500).send({ message: 'Запрашиваемый ресурс не найден' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((newCard) => res.send(newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Ошибка. Данные некорректны' });
        return;
      }
      res.status(500).send({ message: 'Запрашиваемый ресурс не найден' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .orFail(() => {
      const error = new Error('CastError');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Данные некорректны' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: 'Ошибка удаления карточки' });
      } else {
        res.status(500).send({ message: 'Запрашиваемый ресурс не найден' });
      }
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Запрашиваемый ресурс не найден' }));
};
