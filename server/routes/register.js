const {Router} = require("express");
const User = require('../model/user.modal')
const route = Router();
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const validCheck = require('../middleware/check-valid')


route.post("/register", validCheck, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({message: "Ошибка при регистрации", errors})
    }
    const {username, password} = req.body;
    const candidate = await User.findOne({username})
    if (candidate) {
      return res.status(400).json({message: 'Такое имя уже занято'})
    }

    const hashPass = bcrypt.hashSync(password, 8)
    const user = new User({
      username: username,
      password: hashPass
    })
    await user.save()
    return res.status(201).json({message: 'Пользователь создан'});
  } catch (e) {
    console.log(e);
  }
});

module.exports = route;
