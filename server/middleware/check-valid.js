const { body } = require("express-validator");

// function checkValid(req, res, next) {
//   body("email","Неверная почта").isEmail().normalizeEmail()
//   body("password","Убедитесь что пароль содержит более 4 символов").notEmpty().isLength({ min: 5 })
//   console.log(req.body)
//   next();
// };
 const arr =[ body("username","Неверное имя").notEmpty().trim(),
body("password","Убедитесь что пароль содержит более 4 символов").notEmpty().isLength({ min: 5 })]

module.exports = arr;
