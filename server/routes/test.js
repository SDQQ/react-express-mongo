const { Router } = require("express");

const route = Router()

route.get('/test', (req,res)=>{
  console.log('test')
  return res.status(200).json({message: 'test'})
})

module.exports = route