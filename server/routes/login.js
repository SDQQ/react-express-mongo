const {Router} = require('express')
const router = Router()
const User = require('../model/user.modal')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validCheck = require('../middleware/check-valid')
const { validationResult } = require('express-validator')



router.post('/login',validCheck,async (req,res)=>{
  try{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({message: "Ошибка при регистрации", errors})
  }
    const {username, password} = req.body
    const candidate =await User.findOne({username})
    if(!candidate){
     return res.status(401).json({message:`Пользователь с именем: ${username} не найден`})
    }
    const validPassword = bcrypt.compareSync(password,candidate.password)
    if(!validPassword) return res.status(401).json({message:"Неверный пароль"})
  
    const token= jwt.sign({userId:candidate._id,username:candidate.username}, process.env.ACCESS_TOKEN_SECRET)
    return res.status(200).json({token:`Bearer ${token}`})
  }catch(e){console.log(e)}
})

router.get('/login', (req,res)=>{
  const token= req.headers.authorization.split(' ')[1]

  if (!token) {
    return res.status(403).json({message: "Пользователь не авторизован"})
  }
  const decodedData = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
  return res.status(200).json(decodedData)

})
module.exports = router