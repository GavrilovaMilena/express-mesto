const router = require("express").Router();

router.get("/users"); //— возвращает всех пользователей
router.get("/users/:userId"); //- возвращает пользователя по _id
router.post("/users", createUser); //— создаёт пользователя
router.patch("/users/me"); //— обновляет профиль
router.patch("/users/me/avatar"); //— обновляет аватар

module.exports = router;