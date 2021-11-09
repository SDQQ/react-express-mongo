const {Schema, model} =require('mongoose')

const Post = new Schema({
  username:{
    type: String,
    required: true,
    
  },
  postTheme:{
    type: String,
    required: true,
    unique : true
  },
  postText:{
    type: String,
    require: true,
  },
  date:{
    type : String
  }
})

module.exports= model('Posts',Post)