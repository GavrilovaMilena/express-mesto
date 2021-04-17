const router = require("express").Router();

router.get("/users"); //— возвращает всех пользователей
router.get("/users/:userId"); //- возвращает пользователя по _id
router.post("/users", createUser); //— создаёт пользователя

module.exports = router;