const router = require("express").Router();

router.get("/cards"); //— возвращает все карточки
router.post("/cards", createCard); //— создаёт карточку
router.delete("/cards/:cardId"); //— удаляет карточку по идентификатору

module.exports = router;