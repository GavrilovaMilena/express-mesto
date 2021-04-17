const router = require("express").Router();

router.get("/cards"); //— возвращает все карточки
router.post("/cards", createCard); //— создаёт карточку
router.delete("/cards/:cardId"); //— удаляет карточку по идентификатору
router.put("/cards/:cardId/likes"); //— поставить лайк карточке
router.delete("/cards/:cardId/likes"); //— убрать лайк с карточки

module.exports = router;