const router = require("express").Router();

const { createCard, likeCard, dislikeCard } = require("../controllers/cards");

router.get("/cards"); //— возвращает все карточки
router.post("/cards", createCard); //— создаёт карточку
router.delete("/cards/:cardId"); //— удаляет карточку по идентификатору
router.put("/cards/:cardId/likes", likeCard); //— поставить лайк карточке
router.delete("/cards/:cardId/likes", dislikeCard); //— убрать лайк с карточки

module.exports = router;
