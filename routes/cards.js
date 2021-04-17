const router = require("express").Router();

const {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/cards", getCard); //— возвращает все карточки
router.post("/cards", createCard); //— создаёт карточку
router.delete("/cards/:cardId", deleteCard); //— удаляет карточку по идентификатору
router.put("/cards/:cardId/likes", likeCard); //— поставить лайк карточке
router.delete("/cards/:cardId/likes", dislikeCard); //— убрать лайк с карточки

module.exports = router;
