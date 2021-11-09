const { Router } = require("express");
const Post = require('../model/createPost.modal')
const route = Router();
const { validationResult } = require('express-validator')
const { body } = require("express-validator");



route.post("/createpost",body('postTheme', 'Введите название темы').trim().notEmpty(),
                       body('postText', 'Введите текст темы').trim().notEmpty(),
                       async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({message: "Ошибка при создании темы", errors})
  }
    const {username,postTheme,postText,date}=req.body;
    const uniqueTest =await Post.findOne({postTheme})
    if(uniqueTest){
      const errors ={
        errors:[{
          param:'postTheme',
          msg: 'Такая тема уже существует'
        }],
      }
      return res.status(400).json({message: 'Такая тема уже существует',errors})
    }

    const post = new Post({
      username,
      postTheme,
      postText,
      date
    })
  const ansPost = await post.save()
  return res.status(201).json({ message: 'Тема создана', ansPost });
  } catch (e) {
    console.log(e);
  }
});
route.get('/createpost',async (req,res)=>{
  const posts = await Post.find()
  if(posts){
   return res.status(200).json(posts)
  }
  return res.status(400).json({message: "Тем нету"})
  
})
route.delete('/createpost/:themeTitle', async (req,res)=>{
  try{
    if(req.params.themeTitle){
      const exist =await Post.findOneAndDelete({postTheme:req.params.themeTitle})
      if(exist){
        return res.status(200).json({message:'Пост удалён'})
      }
      return res.status(400).json({message:'Что то пошло не так'})
     
    }
    return res.status(400).json({message:'Что то пошло не так'})


  }catch(e){(e=> console.log(e))}

  
})
route.put("/createpost",body('postTheme', 'Введите название темы').trim().notEmpty(),
                       body('postText', 'Введите текст темы').trim().notEmpty(),
                       async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({message: "Ошибка при обновлении темы", errors})
  }
    const {postTheme,postText}=req.body;
    const ansPost = await Post.findOneAndUpdate({postTheme},{postText},{useFindAndModify:false})
    if (ansPost){
      return res.status(201).json({ message: 'Тема обновлена', ansPost });
    }
    return res.status(400).json({message:'Что то пошло не так'})

  } catch (e) {
    console.log(e);
  }
});

module.exports = route;
